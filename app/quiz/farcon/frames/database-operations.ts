import { sql } from "@vercel/postgres"
import { getAddressForFid } from "frames.js";

export async function saveUser(fid: number) {
    const existingUser = await sql`SELECT * FROM users WHERE fid = ${fid}`
    if (!existingUser.rowCount) {
        const walletAddress = await getAddressForFid({
            fid,
            options: { fallbackToCustodyAddress: true }
        });
        const collectiveId = await determineCollectiveForUser(fid)
        await sql`INSERT INTO users (fid, wallet_address, collective_id) VALUES (${fid}, ${walletAddress}, ${collectiveId});`
        const selectedNewUser = await sql`SELECT * FROM users WHERE fid = ${fid}`
        return selectedNewUser.rows[0]
    } else return existingUser.rows[0]
}

export async function saveUserQuestionResponse(
    questionId: string,
    fid: number,
    response: string,
    correctResponse: boolean
) {
    const user = await getUserFromFid(fid)
    await sql`INSERT INTO user_question_responses (question_id, user_id, response, correct_response) VALUES (${questionId}, ${user?.id}, ${response}, ${correctResponse});`
}

export async function determineCollectiveForUser(fid: number) {
    if (await isPowerBadgeUser(fid)) return 3 // power-badge = collective_id = 3
    else if (fid < 10000) return 1 //OG = collective_id = 1
    else return 2 // new = collective_id = 2

}

export async function isPowerBadgeUser(
    fid: number
): Promise<boolean | void> {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            api_key: 'NEYNAR_API_DOCS',
        },
    }
    try {
        // Neynar api fetch
        const resp = await fetch(
            `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
            options
        )
        if (!resp.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await resp.json()
        if (data.users[0].power_badge) {
            return true
        } else return false
    } catch (error) {
        return console.error('Error fetching profile data:', error)
    }
}

export async function getCollective(collectiveName: string) {
    const existingCollective =
        await sql`SELECT * FROM collectives WHERE name = ${collectiveName}`
    return existingCollective.rows[0]
}

export async function getUserFromFid(fid: number) {
    const selectedNewUser = await sql`SELECT * FROM users WHERE fid = ${fid}`
    return selectedNewUser.rows[0]
}


export async function getUserQuestionResponseFromUserId(userId: number) {
    const response = await sql`SELECT * FROM user_question_responses WHERE user_id = ${userId}`
    return response.rows[0]
}

export async function getQuestionFromId(questionId: number) {
    const question = await sql`
    SELECT * FROM questions
    WHERE id = ${questionId}
    AND expires_at::timestamp AT TIME ZONE 'MST' > current_timestamp AT TIME ZONE 'MST';
    `
    return question.rows.length > 0 ? question.rows[0] : null
}


export function findDayFromUrl(ctx: any) {
    const parts = ctx.url.pathname.split("/");
    if (parts.length <= 4 || !parts[4]) {
        throw new Error("Frame question id not found");
    }
    return parts[4]
}


