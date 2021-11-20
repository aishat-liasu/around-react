import Popup from './Popup.js';

import React from 'react';

const PopupWithImage = () => {
  return (
    <section className='popup popup_type_image' id='popup_type_image'>
      <div className='popup__container'>
        <button
          type='reset'
          className='popup__close-button'
          aria-label='close'
        ></button>
        <img
          src="<%=require('./images/latemar.png')%>"
          alt='popup'
          className='popup__image'
        />
        <p className='popup__image-location'></p>
      </div>
    </section>
  );
};

export default PopupWithImage;

/* export default class PopupWithImage extends Popup {
  open({ name, link }) {
    const popupImage = this._popupElement.querySelector(".popup__image");
    const popupImageLocation = this._popupElement.querySelector(
      ".popup__image-location"
    );
    popupImage.src = link;
    popupImage.alt = `${name} picture`;
    popupImageLocation.textContent = name;
    super.open();
  }
} */
