const audioPath = [
    '/tick.mp3',
    '/boom.mp3',
]

export const preloadAudio = () => {
    audioPath.map(path => {
        const audio = new Audio()
        return audio.src = path
    })
}