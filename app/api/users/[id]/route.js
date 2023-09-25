import User from "@models/user";
import Prompt from "@models/prompt";
import Comment from "@models/comment";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
    // create varialbe to store user data
    let userData = {
        user: '',
        prompts: [],
        comments: []
    }

    try {
        await connectToDB()
        userData.user = await User.findOne({ username: params.id })
        userData.prompts = await Prompt.find({ creator: userData.user._id })
        
        // get comments for each prompt
        for (let i = 0; i < userData.prompts.length; i++) {
            userData.comments.push(await Comment.find({ prompt: userData.prompts[i]._id }))
        }

        // flatten comments array
        userData.comments = userData.comments.flat()
        
        return new Response(JSON.stringify(userData), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch user", { status: 500 })
    }
}