import React, { useState, useEffect, useRef, useContext } from 'react';
import api from '../utils/api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = (props) => {
  const { name, about, avatar, _id } = useContext(CurrentUserContext);
  const userId = useRef('');

  const [cards, setCards] = useState([]);

  console.log(name, _id);

  useEffect(() => {
    api
      .getInitialCards()
      .then((result) => {
        userId.current = _id;
        setCards(result);
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }, []);

  return (
    <main className='main'>
      <section className='profile'>
        <div className='profile__content'>
          <div
            className='profile__avatar'
            style={{ backgroundImage: `url(${avatar})` }}
          >
            <div
              className='profile__overlay'
              onClick={props.onAvatarClick}
            ></div>
          </div>

          <div className='profile__info'>
            <div className='profile__title-edit'>
              <h1 className='profile__title'>{name || 'Aishat Liasu'}</h1>
              <button
                type='submit'
                className='profile__edit-button'
                onClick={props.onEditProfileClick}
              ></button>
            </div>
            <p className='profile__subtitle'>{about || 'Software Engineer'}</p>
          </div>
        </div>

        <button
          type='submit'
          className='profile__add-button'
          aria-label='add'
          onClick={props.onAddPlaceClick}
        ></button>
      </section>
      <section className='places'>
        {cards.map((item) => {
          return (
            <Card
              userId={userId.current}
              cardData={item}
              key={item._id}
              onCardClick={props.onCardClick}
              onDeleteButtonClick={props.onDeletePlaceClick}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
