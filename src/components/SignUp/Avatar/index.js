/* eslint-disable jsx-a11y/label-has-associated-control */
// import npm
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import features
import { useUploadImageMutation } from '../../../features/API/apiSlice';
import { selectCurrentUser } from '../../../features/loginSlice';

import './style.scss';

export default function Avatar() {
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);

  const [uploadImage, { isSuccess }] = useUploadImageMutation();

  const [previewAvatar, setPreviewAvatar] = useState();
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewAvatar(reader.result);
    };
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage({ avatar: reader.result, id: user.id });
    };
    reader.onerror = () => {
      console.log('error');
    };
  };

  useEffect(() => {
    if (isSuccess) {
      setFileInputState('');
      setSelectedFile();
      setPreviewAvatar();
      navigate('/');
    }
  }, [isSuccess]);

  const avatar = user.avatar && !previewAvatar ? (
    <img className="avatar__preview-image" src={user.avatar} alt="avatar" />
  ) : (
    <img className="avatar__previous_image" src={previewAvatar} alt="aperçu de avatar" />
  );

  return (
    <div className="avatar">

      <div className="avatar__preview-container">
        {avatar}
      </div>

      <form className="avatar__form" onSubmit={handleSubmit}>
        <label className="avatar__form-label" htmlFor="avatar">Télécharge ton avatar</label>
        <input
          className="avatar__form-input"
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg, image/jpg"
          value={fileInputState}
          required
          onChange={handleFileInputChange}

        />
        <input className="avatar__form-button" type="submit" value="Envoyer" />
      </form>

    </div>
  );
}
