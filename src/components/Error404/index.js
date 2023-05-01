import error from 'src/assets/img/error.jpg';
import './style.scss';

export default function Error404() {
  return (
    <main className="error404">
      <img className="error404__img" src={error} alt="erreur 404" />
    </main>
  );
}
