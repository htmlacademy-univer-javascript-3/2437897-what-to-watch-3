type VideoPlayerProps = {
  videoPath: string;
  posterPath: string;
  width: number;
  height: number;
  shouldLoop?: boolean;
}

export function VideoPlayer({videoPath, posterPath, height, width, shouldLoop = true}: VideoPlayerProps){
  return (
    <video
      src={videoPath}
      width={width}
      height={height}
      poster={posterPath}
      loop={shouldLoop}
      autoPlay
      muted
    />
  );
}

