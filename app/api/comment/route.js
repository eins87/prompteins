import Comment from "@models/comment";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
    try {
        await connectToDB()

        const comments = await Comment.find({}).populate('creator')

        return new Response(JSON.stringify(comments), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 