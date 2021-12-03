import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = (props) => {
  const [isLoveButtonActive, setIsLoveButtonActive] = useState(false);
  const [isDeleteButtonHidden, setIsDeleteButtonHidden] = useState(false);
  const { _id } = useContext(CurrentUserContext);

  //console.log(props.cardData);
  useEffect(() => {
    if (props.cardData.owner._id !== _id) {
      setIsDeleteButtonHidden(true);
    }

    props.cardData.likes.some((item) => item._id === _id)
      ? setIsLoveButtonActive(true)
      : setIsLoveButtonActive(false);

    /*     if (props.cardData.likes.some((item) => item._id === _id)) {
      setIsLoveButtonActive(true);
      console.log(isLoveButtonActive);
    }

    return () => {}; */
  }, [props]);

  function likeCard() {
    //setIsLoveButtonActive(true);
    props.onCardLike(props.cardData);
  }

  function removeCard() {
    props.onDeleteButtonClick(true);
  }

  function handleCardClick() {
    props.onCardClick(props.cardData);
  }
  return (
    <div className='place'>
      <button
        className={`place__delete-button ${
          isDeleteButtonHidden ? 'hidden' : ''
        }`}
        onClick={removeCard}
      ></button>
      <img
        src={props.cardData.link || ''}
        alt={props.cardData.name}
        className='place__image'
        onClick={handleCardClick}
      />
      <h2 className='place__title'>{props.cardData.name || 'Title'}</h2>
      <div className='place__love-section'>
        <button
          className={`place__love-button ${
            isLoveButtonActive ? 'place__love-button_active' : ''
          }`}
          onClick={likeCard}
        ></button>
        <p className='place__love-count'>{props.cardData.likes.length}</p>
      </div>
    </div>
  );
};

export default Card;
