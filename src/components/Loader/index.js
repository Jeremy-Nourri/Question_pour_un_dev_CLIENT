import './style.scss';

export default function Loader() {
  return (
    <div className='loader'>
      <div className="loader__spin"></div>
      <p className="loader__text">Chargement en cours...</p>
    </div>
  );
}

