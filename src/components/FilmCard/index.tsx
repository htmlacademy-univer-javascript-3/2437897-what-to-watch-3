import React from 'react';

type FilmCardProps = {
  imagePath: string,
  imageAlt: string,
  name: string,
  href: string
}

const FilmCard = (props: FilmCardProps) => {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={props.imagePath} alt={props.imageAlt} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={props.href}>{props.name}</a>
      </h3>
    </article>
  );
};

export default FilmCard;


