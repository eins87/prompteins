import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// Find prompt by id
export const GET = async (req, { params }) => {
    try {
        await connectToDB()

        const prompts = await Prompt.findById(params.id).populate('creator')
        if (!prompts) return new Response("Prompt not found", { status: 404 })

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
};

// Update a prompt
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();

    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        existingPrompt.updateAt = Date.now();

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

// Delete a prompt
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};