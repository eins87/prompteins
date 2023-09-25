export const GET = async (req) => {
    const url = process.env.HASHTAGS_URL;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.HASHTAGS_KEY,
            'X-RapidAPI-Host': process.env.HASHTAGS_HOST,
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.text();

        return new Response(result, { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch all tags", { status: 500 })
    }
}