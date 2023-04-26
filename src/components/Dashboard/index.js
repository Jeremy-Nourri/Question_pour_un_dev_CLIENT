// import npm
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import features
import { useGetScoresQuery, useDeleteUserMutation } from '../../features/API/apiSlice';
import { logout, selectCurrentUser } from '../../features/loginSlice';
import { openModal, selectIsOpen } from '../../features/modalSlice';
// import components
import Modal from '../Modal';
import Avatar from '../SignUp/Avatar';

import './style.scss';

export default function Dashboard () {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);
  const modalStatus = useSelector(selectIsOpen);

  const [deleteUser, { isSuccess: isDeleted }] = useDeleteUserMutation(user.id);
  const { data: scores } = useGetScoresQuery(user.id);

  const handleDelete = async () => {
    try {
      await deleteUser(user.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isDeleted) {
      dispatch(logout());
      dispatch(openModal());
      navigate('/');
    }
  }, [isDeleted]);

  if (modalStatus === true) {
    return (
      <Modal text="Ton compte a bien été supprimé" />
    );
  }

  if (user) {

    return ( 

      <main className="dashboard">
        
        <p className="dashboard__nickname">Bienvenue {user.nickname} !</p>

        <Avatar />

        <div className="dashboard__scores">
          <h2 className="dashboard__scores-title">Tes scores</h2>
            {scores === 0 && (
              <p className="dashboard__scores-text">Tu n'as pas encore de score enregistré</p>
            )}
          <div className="dashboard__scores-list">
            {scores && scores.map((item) => (
              <div className="dashboard__scores-item" key={item.id}>
                <img className="dashboard__scores-item-img" src={item.quiz.image} alt={item.quiz.topic} />
                <p className="dashboard__scores-item-text">{item.quiz.topic}</p>
                <p className="dashboard__scores-item-text">{item.difficulty.name}</p>

                <p className="dashboard__scores-item-text">{item.score} / 10</p>
              </div>
            ))}
          </div>
        </div>

        <div className='dashboard__remove'>
          <h2 className='dashboard__remove-title' >Supprimer ton compte</h2>
          <button className="dashboard__button" onClick={handleDelete}>Valider la suppression</button>
        </div>

      </main>
    );
  }
}

