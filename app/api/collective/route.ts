export const dynamic = "force-dynamic";
import { createCollective, createPool } from "../../utils/contract-operations";
import { createCollectives, updateCollective } from "../../quiz/farcon/frames/database-operations";

export async function GET() {
   try {
     for (const community of ['OG', 'new', 'power-badge']) {

       // Deploy a new collective and pool for each group
       const cMetadata = await createCollective()
       const cPool = await createPool(cMetadata.address)
 
       console.log(cMetadata, 'cMetadata')
       console.log(cPool, 'cPool')

       await updateCollective({ name: community, c_address: cMetadata.address, c_wallet: cMetadata.wallet, c_pool: cPool, salt: cMetadata.nonceKey})
     }
 
     return Response.json({ status: "OK", message: 'Collectives created successfully' })
 
   } catch (error) {
     console.error('Error creating collectives:', error)
     return Response.json({ error })
   } 
}
