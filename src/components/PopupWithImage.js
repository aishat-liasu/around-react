import React from 'react';

const PopupWithImage = (props) => {
  console.log(props.cardData);
  return (
    <section
      className={`popup popup_type_image ${
        props.isOpen ? 'popup_opened' : ''
      } `}
      id='popup_type_image'
    >
      <div className='popup__container'>
        <button
          type='reset'
          className='popup__close-button'
          aria-label='close'
          onClick={props.onClose}
        ></button>
        <img
          src={props.cardData.link || ''}
          alt='popup'
          className='popup__image'
        />
        <p className='popup__image-location'>{props.cardData.name}</p>
      </div>
    </section>
  );
};

export default PopupWithImage;
