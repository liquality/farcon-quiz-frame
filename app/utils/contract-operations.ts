import ethers from 'ethers'
import { CMetadata, PoolParticipation } from '../types'
import {
  HONEYPOT,
  HONEYPOT_ABI,
  COLLECTIVE_FACTORY,
  COLLECTIVE_ABI,
  COLLECTIVE_FACTORY_ABI,
  POOL_ABI,
  C_WALLET_ABI,
  SPORK_NFT_ABI,
  SPORK_NFT,
} from './constants'
import { QueryResultRow } from '@vercel/postgres'

export async function createCollective(): Promise<CMetadata> {
  try {
    const provider = getProvider()
    const signer = getSigner(provider)

    const cFactory = getCFactory(signer)
    const salt = generateSalt()
    console.log(salt, 'wats salt?')

    const cAddress = await cFactory.getCollective(
      signer.address,
      signer.address,
      salt
    )
    console.log(cAddress, 'cAddress')
    const cWallet = await cFactory.getCWallet(cAddress, signer.address, salt)
    console.log(cWallet, 'cWallet')

    const tx1 = await cFactory.createCollective(
      signer.address,
      signer.address,
      salt
    )
    console.log(tx1, 'tx one')
    await provider.waitForTransaction(tx1.hash)

    const tx2 = await cFactory.createWallet(
      signer.address,
      signer.address,
      salt
    )
    await provider.waitForTransaction(tx2.hash)

    console.log('Collective created successfully! ', tx1, tx2)

    return { address: cAddress, wallet: cWallet, salt }
  } catch (error) {
    throw new Error('Error creating collective: ' + error)
  }
}

export async function createPool(cAddress: string): Promise<string> {
  try {
    const provider = getProvider()
    const signer = getSigner(provider)

    const honeyPot = HONEYPOT!
    const collective = getCollective(signer, cAddress)

    const tx = await collective.createPools(
      ['0x0000000000000000000000000000000000000000'],
      [honeyPot]
    )
    await provider.waitForTransaction(tx.hash)
    console.log('Pool created successfully! ', tx.hash)

    const pool = await collective.pools(honeyPot)
    return pool['id']
  } catch (error) {
    throw new Error('Error creating pool: ' + error)
  }
}

export async function recordParticipation(
  cAddress: string,
  cWalletAddress: string,
  poolAddress: string,
  participations: PoolParticipation[]
) : Promise<PoolParticipation[]> {
  let participantOnchain: PoolParticipation[] = []
  try {
    const provider = getProvider()
    const signer = getSigner(provider)
    console.log("signer: ", signer.address)

    const cWallet = getCWallet(signer, cWalletAddress)
    // let data: string[] = []
    // let value: number[] = []
    // let dest: string[] = []

    const pool = await getPool(signer, poolAddress)
    const participantRecorded = await pool.getParticipants()
    console.log("participantCount: ", participantRecorded.length)
    console.log("participations: ", participantRecorded)

    return participantOnchain
    
    for (const participation of participations) {
      const callData = getRecordPoolMintCallData(
        poolAddress,
        participation.user,
        participation.questionId,
        participation.engagement
      )
      // data.push(callData)
      // value.push(0)
      // dest.push(cAddress)

      const tx = await cWallet.execute(cAddress, 0, callData)
      await provider.waitForTransaction(tx.hash)
      participantOnchain.push(participation)
      console.log('Participation recorded onchain successfully! ', tx.hash)
    }

    // console.log(data.length, " << DATA ")
    // const tx = await cWallet.executeBatch(dest, value, data, {gasLimit: 300000})
    console.log('Participants added on-chain : ', participantOnchain)
    return participantOnchain
  } catch (error) {
    console.log('Error participants on-chain before error : ', participantOnchain)
    throw new Error('Error recording participation: ' + error)
  }
}

export async function setTopCollective(
  topContributor: string
): Promise<string> {
  try {
    const provider = getProvider()
    const signer = getSigner(provider)
    const honeyPot = getHonneyPot(signer)

    // console.log("topContributor: ", await honeyPot.getTopContributor());
    const tx = await honeyPot.setTopContributor(topContributor)
    await provider.waitForTransaction(tx.hash)
    console.log('Top contributor set successfully! ', tx.hash)

    return tx.hash
  } catch (error) {
    throw new Error('Error setting top collective: ' + error)
  }
}

// send honeyPot rewards to top contributor
export async function sendRewardToTopCollective(): Promise<string> {
  try {
    const provider = getProvider()
    const signer = getSigner(provider)
    const honeyPot = getHonneyPot(signer)

    const tx = await honeyPot.sendReward()
    await provider.waitForTransaction(tx.hash)
    console.log('Rewards sent successfully! ', tx.hash)

    return tx.hash
  } catch (error) {
    throw new Error('Error sending rewards to top collective: ' + error)
  }
}

// Distribute rewards in pool
export async function distributeRewards(poolAddress: string): Promise<string> {
  try {
    const provider = getProvider()
    const signer = getSigner(provider)
    const pool = await getPool(signer, poolAddress)

    const tx = await pool.distributeReward()
    await provider.waitForTransaction(tx.hash)
    console.log('Rewards distributed successfully! ', tx.hash)

    return tx.hash
  } catch (error) {
    throw new Error('Error distributing rewards: ' + error)
  }
}

// withdraw rewards
export async function batchWithdrawRewards(
  cWalletAddress: string,
  poolAddress: string,
  participants: QueryResultRow[]
): Promise<string> {
  try {
    const provider = getProvider()
    const signer = getSigner(provider)

    const cWallet = getCWallet(signer, cWalletAddress)
    let data: string[] = []
    let value: number[] = []
    let dest: string[] = []

    for (const participant of participants) {
      const callData = getPoolWithdrawCallData(participant.address)
      data.push(callData)
      value.push(0)
      dest.push(poolAddress)
    }

    const tx = await cWallet.executeBatch(dest, value, data, {
      gasLimit: 400000,
    })
    await provider.waitForTransaction(tx.hash)
    console.log('withdrawal successfully!', tx.hash)

    return tx.hash
  } catch (error) {
    throw new Error('Error batch withdrawing rewards: ' + error)
  }
}

// withdraw rewards
export async function withdrawRewards(
  poolAddress: string,
  participant: string
): Promise<string> {
  try {
    const provider = getProvider()
    const signer = getSigner(provider)
    const pool = await getPool(signer, poolAddress)

    const tx = await pool.withdrawReward(participant)
    await provider.waitForTransaction(tx.hash)
    console.log('Rewards withdrawn successfully! ', tx.hash)

    return tx.hash
  } catch (error) {
    throw new Error('Error withdrawing rewards: ' + error)
  }
}

export async function mintSporkNFT(
  participant: string,
  questionId: number
): Promise<string> {
  try {
    const provider = getProvider()
    const signer = getSigner(provider)
    const sporkNFT = getSporkNFT(signer)

    const tx = await sporkNFT.mint(participant, questionId, 1, '0x')
    await provider.waitForTransaction(tx.hash)
    console.log('Spork NFT minted successfully! ', tx.hash)

    return 'tx.hash'
  } catch (error) {
    throw new Error('Error minting Spork NFT: ' + error)
  }
}

async function getPool(signer: ethers.Wallet, poolAddress: string) {
  const pool = new ethers.Contract(poolAddress, POOL_ABI, signer)
  return pool
}

function getCollective(signer: ethers.ethers.Wallet, cAddress: string) {
  const collective = new ethers.Contract(cAddress, COLLECTIVE_ABI, signer)
  return collective
}

function getCFactory(signer: ethers.ethers.Wallet) {
  const cFactory = new ethers.Contract(
    COLLECTIVE_FACTORY,
    COLLECTIVE_FACTORY_ABI,
    signer
  )
  return cFactory
}

function getCWallet(signer: ethers.ethers.Wallet, cWalletAddress: string) {
  const cWallet = new ethers.Contract(cWalletAddress, C_WALLET_ABI, signer)
  return cWallet
}

function getHonneyPot(signer: ethers.ethers.Wallet) {
  const honeyPot = new ethers.Contract(HONEYPOT, HONEYPOT_ABI, signer)
  return honeyPot
}

function getSporkNFT(signer: ethers.ethers.Wallet) {
  const sporkNFT = new ethers.Contract(SPORK_NFT, SPORK_NFT_ABI, signer)
  return sporkNFT
}

function getSigner(provider: ethers.providers.JsonRpcProvider) {
  const signer = ethers.Wallet.fromMnemonic(
    process.env.OPERATOR_MNEMONIC as string
  ).connect(provider)
  return signer
}

function getProvider() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
  return provider
}

function getRecordPoolMintCallData(
  poolAddress: string,
  participant: string,
  questionId: number,
  engagement: number
) {
  const callData = new ethers.utils.Interface(
    COLLECTIVE_ABI
  ).encodeFunctionData('recordPoolMint', [
    poolAddress,
    participant,
    questionId,
    engagement,
    0,
  ])
  return callData
}

export function generateSalt(length: number = 16): number {
  const characters = '0123456789'
  const charactersLength = 4
  let salt = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength)
    salt += characters.charAt(randomIndex)
  }

  // Assuming you want to convert the string salt to a BigNumberish
  return Number(salt)
}

function getPoolWithdrawCallData(participant: string) {
  const callData = new ethers.utils.Interface(POOL_ABI).encodeFunctionData(
    'withdrawReward',
    [participant]
  )
  return callData
}
