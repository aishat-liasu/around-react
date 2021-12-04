import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState('Name');
  const [description, setDescription] = useState('About');

  const [buttonText, setButtonText] = useState('Save');

  // Subscription to the context
  const currentUser = useContext(CurrentUserContext);

  // After loading the current user from the API
  // their data will be used in managed components.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    setButtonText('Saving');
    // Pass the values of the managed components to the external handler
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title='Edit Profile'
      name='edit'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Save'
      onSubmit={handleSubmit}
    >
      <label className='popup__label'>
        <input
          type='text'
          id='profile-title'
          name='profileName'
          className='popup__field popup__field_el_title'
          minLength='2'
          maxLength='45'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <span className='popup__field-error' id='profile-title-error'></span>
      </label>

      <label className='popup__label'>
        <input
          type='text'
          id='profile-subtitle'
          name='profileJob'
          className='popup__field popup__field_el_subtitle'
          minLength='2'
          maxLength='200'
          placeholder='About'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <span className='popup__field-error' id='profile-subtitle-error'></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
