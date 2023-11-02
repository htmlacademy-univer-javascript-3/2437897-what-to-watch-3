import {useEffect, useRef, useState} from 'react';
import {useElementListener} from '../hooks/use-element-listener.ts';

type VideoPlayerProps = {
  videoPath: string;
  posterPath: string;
  width: number;
  height: number;
  isPlaying: boolean;
  isMuted?: boolean;
  shouldLoop?: boolean;
}

export function VideoPlayer({videoPath, posterPath, height, width, isPlaying, shouldLoop = true, isMuted = true}: VideoPlayerProps){
  const [isLoaded, setIsLoaded] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useElementListener('loadeddata', videoRef, () => setIsLoaded(true));
  useEffect(() => {
    const playerElement = videoRef.current;

    if (!isLoaded || !playerElement) {
      return;
    }

    if (isPlaying) {
      playerElement.play();
      return;
    }

    playerElement.load();
  }, [isPlaying, isLoaded]);


  return (
    <video
      ref={videoRef}
      src={videoPath}
      width={width}
      height={height}
      poster={posterPath}
      loop={shouldLoop}
      muted={isMuted}
    />
  );
}

