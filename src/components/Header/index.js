// import npm
import { Link } from 'react-router-dom';
// import local
import logo from 'src/assets/img/logoV2.png';
import './style.scss';

export default function Header() {
  return (
    <header className="header">

      <Link className="header__link-logo" to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>

    </header>
  );
}
