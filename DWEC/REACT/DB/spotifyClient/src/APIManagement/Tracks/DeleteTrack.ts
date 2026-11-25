export async function DeleteTrack(id: string) {
    await fetch(
        `http://localhost:3000/tracks/${id}`,
        {
            method: "DELETE"
        }
    )
}
