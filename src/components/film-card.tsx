import {Link} from 'react-router-dom';
import {FilmInfo} from '../types/film';
import {MouseEventHandler} from 'react';

type FilmCardProps = {
  onMouseOver: MouseEventHandler<HTMLElement> | undefined;
  onMouseLeave: MouseEventHandler<HTMLElement> | undefined;
}

export function FilmCard(props: FilmInfo & FilmCardProps){
  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={props.onMouseOver} onMouseLeave={props.onMouseLeave}>
      <div className="small-film-card__image">
        <img src={props.imagePath} alt={props.name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link to={`films/${props.id}`} className="small-film-card__link">{props.name}</Link>
      </h3>
    </article>
  );
}
