export async function getEvents(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/events`)
    return await response.json()
}