import useSound from 'use-sound'

export const useSoundPlay = (path: string, volume = 1) => {
  const [playSound] = useSound(path, { volume })
  return playSound
}
