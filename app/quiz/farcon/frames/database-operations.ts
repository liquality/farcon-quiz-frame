import { sql } from "@vercel/postgres"
import { FramesContext } from "frames.js/types"

export async function saveUser(ud: any, channelName: string, walletAddress: string) {
    const channel = await getChannel(channelName)
    //If the user does not exist in db and this channel, create a new one
    const existingUser = await sql`SELECT * FROM users WHERE fid = ${ud.fid}`
    if (!existingUser.rowCount && walletAddress) {
        console.log(ud.fid, 'walletaddr:', walletAddress)
        const newIdQ = await sql`SELECT * FROM users ORDER BY id DESC LIMIT 1;`
        await sql`INSERT INTO users (fid, wallet_address) VALUES (${ud.fid}, ${walletAddress});`
        const selectedNewUser = await sql`SELECT * FROM users WHERE fid = ${ud.fid}`
        return selectedNewUser.rows[0]
    } else return existingUser.rows[0]
}

export async function getChannel(channel: string) {
    const existingChannel =
        await sql`SELECT * FROM channels WHERE name = ${channel}`
    return existingChannel.rows[0]
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


