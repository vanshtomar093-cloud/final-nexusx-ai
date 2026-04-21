'use client'

import { useRef, useEffect } from 'react'

interface VideoBackgroundProps {
  src: string
  opacity?: number
}

export default function VideoBackground({ src, opacity = 0.6 }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.playbackRate = 0.75
    video.play().catch(() => {})
  }, [])

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        className="video-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ opacity }}
      />
      <div className="video-overlay" />
    </>
  )
}