import { connectToDB } from "@utils/database";
import Comment from "@models/comment";

// Create a new comment and rating
export const POST = async (req) => {
    const { creator, prompt, rating, comment } = await req.json();

    try {
        await connectToDB();
        //check if the user has already commented on the prompt
        const existingComment = await Comment.findOne({ creator: creator, prompt: prompt });
        if (existingComment) {
            // give response that user has already commented on the prompt
            return new Response("User has already commented on the prompt", { status: 400 });
        }

        const newComment = new Comment({
            creator: creator,
            prompt: prompt,
            comment,
            rating,
            createAt: Date.now(),
        });

        await newComment.save();

        return new Response(JSON.stringify(newComment), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new comment", { status: 500 });
    }
};