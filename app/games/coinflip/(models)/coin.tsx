'use client'

import { GameModel } from '@/states'
import { CoinAction, ModelProps } from '@/types/games.types'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { AnimationAction } from 'three'

const Model = ({ action, initial, setStart, start }: ModelProps) => {
  const { scene, animations } = useGLTF(
    '/models/coinflip/coin_old-optimized.gltf'
  )

  const { actions } = useAnimations(animations, scene)

  if (initial == GameModel.Side.Heads) {
    scene.rotation.y = -1.82
  } else if (initial == GameModel.Side.Tails) {
    scene.rotation.y = 1.58
  }
  scene.scale.set(1, 1, 1)

  useEffect(() => {
    const rotation = actions[CoinAction.Rotation] as AnimationAction

    rotation.stop()
    if (action != CoinAction.Stop) {
      const current = actions[action] as AnimationAction
      current.stop()
      current.play()
      current.clampWhenFinished = false
      if (action != CoinAction.Rotation) {
        current.setLoop(2200, 1)
        start && current.setDuration(start)
        setStart && setStart(1.6)
      }
    }
  }, [initial, action])

  return <primitive object={scene} />
}

export default Model

useGLTF.preload('/models/coinflip/coin_old-optimized.gltf')
