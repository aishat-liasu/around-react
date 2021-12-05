import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({
  isOpen,
  onClose,
  onUpdateAvatar,
  buttonText,
  setButtonText,
}) => {
  const avatarRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    setButtonText('Saving');
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title='Update Profile Picture'
      name='change'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
    >
      <label className='popup__label'>
        <input
          type='url'
          name='profilePictureURL'
          id='profile-picture-url'
          className='popup__field popup__field_el_profile-picture-url'
          placeholder='Image URL'
          ref={avatarRef}
          required
        />
        <span
          className='popup__field-error'
          id='profile-picture-url-error'
        ></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
