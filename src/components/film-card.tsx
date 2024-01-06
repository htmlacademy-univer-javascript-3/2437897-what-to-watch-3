import {useNavigate} from 'react-router-dom';
import {FilmInfoShort} from '../types/film';
import {useState} from 'react';
import {VideoPlayer} from './video-player.tsx';

export function FilmCard(props: FilmInfoShort){
  const [shouldPlayVideo, setShouldPlayVideo] = useState<boolean>(false);
  const [playVideoTimer, setPlayVideoTimer] = useState<NodeJS.Timeout | undefined>(undefined);
  const navigate = useNavigate();

  const onMouseEnter = () => {
    setPlayVideoTimer(
      setTimeout(() => {
        setShouldPlayVideo(true);
      }, 1000));
  };

  const onMouseLeave = () => {
    clearTimeout(playVideoTimer);
    setShouldPlayVideo(false);
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => navigate(`/films/${props.id}`)}
      style={{cursor: 'pointer'}}
    >
      <div className="small-film-card__image">
        <VideoPlayer
          videoPath={props.previewVideoLink}
          posterPath={props.previewImage}
          width={280}
          height={175}
          isPlaying={shouldPlayVideo}
        />
      </div>
      <h3 className="small-film-card__title">
        <p className="small-film-card__link">{props.name}</p>
      </h3>
    </article>
  );
}
