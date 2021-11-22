import React, { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import Card from './Card';

const Main = (props) => {
  const [userName, setUserName] = useState('Jacques Cousteau');
  const [userDescription, setUserDescription] = useState('Explorer');
  const [userAvatar, setUserAvatar] = useState('');
  //const [userId, setUserId] = useState('');
  const userId = useRef('');

  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then((result) => {
        setUserName(result[0].name);
        setUserDescription(result[0].about);
        setUserAvatar(result[0].avatar);
        userId.current = result[0]._id;
        setCards(result[1]);
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
            style={{ backgroundImage: `url(${userAvatar})` }}
          >
            <div
              className='profile__overlay'
              onClick={props.onAvatarClick}
            ></div>
          </div>

          <div className='profile__info'>
            <div className='profile__title-edit'>
              <h1 className='profile__title'>{userName}</h1>
              <button
                type='submit'
                className='profile__edit-button'
                onClick={props.onEditProfileClick}
              ></button>
            </div>
            <p className='profile__subtitle'>{userDescription}</p>
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
