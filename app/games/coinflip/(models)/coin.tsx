'use client'

import { GameModel } from '@/states'
import { CoinAction } from '@/types/games.types'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { AnimationAction } from 'three'

interface ModelProps {
  action: CoinAction
  initial: GameModel.Side
}

const Model = ({ action, initial }: ModelProps) => {
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
      }
    }
  }, [initial, action])

  return <primitive object={scene} />
}

export default Model

useGLTF.preload('/models/coinflip/coin_old-optimized.gltf')
