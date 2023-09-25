import { connectToDB } from '@utils/database'
import Comment from '@models/comment'

// Get all comments and ratings for a prompt
export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const comments = await Comment.find({ prompt: params.id }).populate("creator");
        return new Response(JSON.stringify(comments), { status: 200 });
    } catch (error) {
        return new Response("Failed to get comments", { status: 500 });
    }
};