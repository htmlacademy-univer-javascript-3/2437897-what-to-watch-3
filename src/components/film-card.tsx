import {Link} from 'react-router-dom';
import {FilmInfo} from '../types/film';
import {MouseEventHandler, MouseEvent, useState} from 'react';
import {VideoPlayer} from './video-player.tsx';

type FilmCardProps = {
  onMouseEnter: MouseEventHandler<HTMLElement> | undefined;
  onMouseLeave: MouseEventHandler<HTMLElement> | undefined;
}

export function FilmCard(props: FilmInfo & FilmCardProps){
  const [shouldPlayVideo, setShouldPlayVideo] = useState<boolean>(false);
  const [playVideoTimer, setPlayVideoTimer] = useState<NodeJS.Timeout | undefined>(undefined);

  const onMouseEnter = (event: MouseEvent<HTMLElement>) => {
    setPlayVideoTimer(
      setTimeout(() => {
        setShouldPlayVideo(true);
      }, 1000));

    props.onMouseEnter?.(event);
  };

  const onMouseLeave = (event: MouseEvent<HTMLElement>) => {
    clearTimeout(playVideoTimer);
    setShouldPlayVideo(false);
    props.onMouseLeave?.(event);
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="small-film-card__image">
        {
          shouldPlayVideo ? (
            <VideoPlayer
              videoPath={props.videoUrl}
              posterPath={props.imagePath}
              width={280}
              height={175}
            />
          ) : <img src={props.imagePath} alt={props.name} width="280" height="175"/>
        }
      </div>
      <h3 className="small-film-card__title">
        <Link to={`films/${props.id}`} className="small-film-card__link">{props.name}</Link>
      </h3>
    </article>
  );
}
