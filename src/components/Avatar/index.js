/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import features
import { useUploadImageMutation } from '../../features/API/apiSlice';
import { selectCurrentUser, modifyAvatar } from '../../features/loginSlice';

import './style.scss';

export default function Avatar() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [uploadImage, { data: newAvatar, isSuccess }] = useUploadImageMutation();

  const [previewAvatar, setPreviewAvatar] = useState('');
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

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
  };

  useEffect(() => {
    if (isSuccess) {
      setFileInputState('');
      setSelectedFile(null);
      setPreviewAvatar('');
      dispatch(modifyAvatar(newAvatar.avatar));
    }
  }, [isSuccess]);

  return (
    <div className="avatar">

      <div className="avatar__preview-container">
        {previewAvatar
          ? <img className="avatar__preview-image" src={previewAvatar} alt="avatar" />
          : <img className="avatar__preview-image" src={user.avatar} alt="avatar" />}
      </div>

      <form className="avatar__form" onSubmit={handleSubmit}>
        <label className="avatar__form-label" htmlFor="avatar">
          Télécharge ton avatar
        </label>
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
