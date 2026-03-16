import { useCallback, useEffect, useRef, useState } from 'react'

type TonePlayer = {
  playTone: (frequencyHz: number) => void
  stopTone: () => void
  isPlaying: boolean
  currentFrequency: number | null
}

export function useTonePlayer(): TonePlayer {
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentFrequency, setCurrentFrequency] = useState<number | null>(null)

  const createContextIfNeeded = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  const stopTone = useCallback(() => {
    if (!audioContextRef.current) return
    const ctx = audioContextRef.current
    const oscillator = oscillatorRef.current
    const gainNode = gainNodeRef.current

    if (oscillator && gainNode) {
      const now = ctx.currentTime
      gainNode.gain.cancelScheduledValues(now)
      gainNode.gain.setValueAtTime(gainNode.gain.value, now)
      gainNode.gain.linearRampToValueAtTime(0, now + 0.1)

      oscillator.stop(now + 0.11)
      oscillatorRef.current = null
      gainNodeRef.current = null

      setIsPlaying(false)
      setCurrentFrequency(null)
    }
  }, [])

  const playTone = useCallback(
    (frequencyHz: number) => {
      createContextIfNeeded()
      const ctx = audioContextRef.current
      if (!ctx) return

      if (ctx.state === 'suspended') {
        // Some browsers require a resume after a user gesture
        ctx.resume()
      }

      if (oscillatorRef.current) {
        stopTone()
      }

      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.type = 'sine'
      oscillator.frequency.value = frequencyHz

      gainNode.gain.value = 0
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      const now = ctx.currentTime
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(0.4, now + 0.2)

      oscillator.start(now)

      oscillatorRef.current = oscillator
      gainNodeRef.current = gainNode

      setIsPlaying(true)
      setCurrentFrequency(frequencyHz)
    },
    [stopTone],
  )

  useEffect(() => {
    return () => {
      stopTone()
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
    }
  }, [stopTone])

  return { playTone, stopTone, isPlaying, currentFrequency }
}

