import React from 'react';

const PopupwithForm = (props) => {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? 'popup_opened' : ''
      }`}
      id={`popup_type_${props.name}`}
    >
      <form
        className='popup__form'
        id={`popup__form_type_${props.name}`}
        noValidate
      >
        <button
          type='reset'
          className='popup__close-button'
          aria-label='close'
          onClick={props.onClose}
        ></button>
        <h2 className='popup__heading'>{props.title || 'Popup Title'}</h2>
        {props.children}
        <button type='submit' className='popup__submit-button'>
          {props.name === 'confirm' ? 'Yes' : 'Save'}
        </button>
      </form>
    </section>
  );
};

export default PopupwithForm;

/* class PopupWithForm extends Popup {
  constructor(callback, popupSelector) {
    super(popupSelector);
    this._callback = callback;
    this._popupForm = this._popupElement.querySelector('.popup__form');
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
  _getInputValues() {
    this._formValues = {};
    this._popupForm
      .querySelectorAll('.popup__field')
      .forEach((input) => (this._formValues[input.name] = input.value));
  }

  _onUpload = () => {
    this.submitButton = this._popupForm.querySelector('.popup__submit-button');
    this.submitButton.textContent = 'Saving...';
  };

  _afterUpload = () => {
    this.submitButton.textContent = 'Save';
  };

  _handleSubmitEvent = (e) => {
    e.preventDefault();
    this._getInputValues();
    this._callback(this._formValues, this._onUpload, this._afterUpload);
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._handleSubmitEvent);
  }
}
 */
