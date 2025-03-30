const API_URL ="https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0"
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY

async function generateAvatar(data) {

    const response = await fetch(API_URL, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({"inputs": data.prompt}),
    })
    console.log(response)
    return await response.blob()
}

export default generateAvatar