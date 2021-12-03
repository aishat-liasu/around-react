import React, { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = (props) => {
  const { name, about, avatar, _id } = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

  console.log(name);

  useEffect(() => {
    api
      .getInitialCards()
      .then((result) => {
        setCards(result);
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }, []);

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((i) => i._id === _id);

    // Send a request to the API and getting the updated card data
    api.changeCardLikeStatus(card._id, isLiked).then((newCard) => {
      console.log(newCard);
      setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

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
              cardData={item}
              key={item._id}
              onCardClick={props.onCardClick}
              onDeleteButtonClick={props.onDeletePlaceClick}
              onCardLike={handleCardLike}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
