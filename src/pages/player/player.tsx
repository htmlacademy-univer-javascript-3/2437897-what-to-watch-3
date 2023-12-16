import {useNavigate, useParams} from 'react-router-dom';
import {NotFoundPage} from '../not-found/not-found';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getSelectedFilm, isFilmDetailLoading} from '../../store/film-process/selectors.ts';
import {useEffect, useRef, useState} from 'react';
import {fetchFilmDetail} from '../../store/api-action.ts';
import {LoadingScreen} from '../loading-screen/loading-screen.tsx';

const formatLeftTime = (timeSeconds: number) => {
  const hours = Math.floor(timeSeconds / 3600);
  timeSeconds %= 3600;
  const minutes = Math.floor(timeSeconds / 60);
  timeSeconds %= 60;
  const res: number[] = [];
  if (hours > 0){
    res.push(hours);
  }
  res.push(minutes);
  res.push(timeSeconds);
  return res.map((numericTime) => numericTime.toString().padStart(2, '0')).join(':');
};

export function Player(){
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getSelectedFilm);
  const isFilmLoading = useAppSelector(isFilmDetailLoading);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerProgress, setPlayerProgress] = useState({
    timeLeft: 0,
    progressPercent: 0,
  });
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!id){
      return;
    }
    dispatch(fetchFilmDetail(id));
  }, [id, dispatch]);

  if (isFilmLoading){
    return <LoadingScreen/>;
  }

  if (!film){
    return <NotFoundPage/>;
  }

  const processPlay = () => {
    const videoPlayer = videoPlayerRef.current;
    if (!videoPlayer){
      return;
    }

    if (isPlaying) {
      videoPlayer.pause();
    } else {
      videoPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const processFullScreen = () => {
    if (!videoPlayerRef.current){
      return;
    }
    videoPlayerRef.current.requestFullscreen();
  };

  const onTimeUpdate = () => {
    if (!videoPlayerRef.current){
      return;
    }
    const totalTime = Math.floor(videoPlayerRef.current.duration);
    const currentTime = Math.floor(videoPlayerRef.current.currentTime);
    setPlayerProgress({
      timeLeft: totalTime - currentTime,
      progressPercent: currentTime * 100 / totalTime,
    });
  };

  return (
    <div className="player">
      <video
        className="player__video"
        src={film.videoLink}
        poster={film.posterImage}
        ref={videoPlayerRef}
        onDoubleClick={processFullScreen}
        onTimeUpdate={onTimeUpdate}
      />

      <button type="button" className="player__exit" onClick={() => navigate(`/films/${film.id}`)}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={playerProgress.progressPercent} max="100"></progress>
            <div className="player__toggler" style={{left: `${playerProgress.progressPercent}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{formatLeftTime(playerProgress.timeLeft)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={processPlay}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={processFullScreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
