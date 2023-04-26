// import npm
import { useDispatch } from 'react-redux';
import { GoX } from "react-icons/go";

// import features
import { closeModal } from '../../features/modalSlice';

import './style.scss';

export default function Modal ({ text }) {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(closeModal());
  };
  
  return (
    <div className='modal'>
      <div className='modal__container'>
        <GoX className='modal__icon' onClick={handleClick} />
        <p className='modal__text'>{text}</p>
      </div>
    </div>
  );
}

