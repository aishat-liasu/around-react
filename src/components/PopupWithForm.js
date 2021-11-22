import React from 'react';

const PopupWithForm = (props) => {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? 'popup_opened' : ''
      }`}
      id={`popup_type_${props.name}`}
    >
      <form className='popup__form' id={`popup__form_type_${props.name}`}>
        <button
          type='reset'
          className='popup__close-button'
          aria-label='close'
          onClick={props.onClose}
        ></button>
        <h2 className='popup__heading'>{props.title || 'Popup Title'}</h2>
        {props.children}
        <button type='submit' className='popup__submit-button'>
          {props.buttonText}
        </button>
      </form>
    </section>
  );
};

export default PopupWithForm;
