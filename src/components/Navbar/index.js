import styles from './Navbar.module.scss';
import Logo from '../../assets/tech_store_logo.png';
import classNames from 'classnames';
import {
  RiShoppingCart2Line,
  RiShoppingCartFill
} from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Busca from '../Busca';

const iconeProps = {
  color: 'white',
  size: 24
}


export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <nav className={styles.nav}>
      <img src={Logo} className={styles.logo} onClick={() => navigate('/')} />
      <div className={styles.buscaContainer}>
        <div className={styles.busca}>
          <Busca />
        </div>
        <div className={styles.icones}>
          <Link to="/carrinho">
            {location.pathname === '/carrinho'
              ? <RiShoppingCartFill {...iconeProps} />
              : <RiShoppingCart2Line {...iconeProps} />
            }
          </Link>
        </div>
      </div>
    </nav>
  )
}