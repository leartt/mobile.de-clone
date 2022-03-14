import { Container } from "react-bootstrap";
import {
  BsFillBellFill as BellIcon,
  BsFillStarFill as StarIcon,
  BsBookmarkFill as BookmarkIcon,
} from "react-icons/bs";
import { FaUser as UserIcon } from "react-icons/fa";
import styles from "./Header.module.scss";
import GermanyFlag from "../../assets/germany.png";
import MobileDeLogo from "../../assets/mobile.de-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../state/reducers";
import { logout } from "../../state/actions/authActions";

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state: State) => state.auth);

  return (
    <div className={styles.Header}>
      <div className={styles.Header__upper}>
        <Container className={styles.container}>
          <div className={styles.upper_left}>
            <a href="#" className={styles.links}>
              Händlerbereich
            </a>
            <Link to="/contact" className={styles.links}>
              Kontakt
            </Link>
            <a href="#" className={styles.links}>
              <img src={GermanyFlag} alt="germany" />
            </a>
          </div>
          <div className={styles.upper_right}>
            <a href="#" className={styles.links}>
              <BellIcon />
              Benachrichtigungen
            </a>
            <a href="#" className={styles.links}>
              <StarIcon /> Meine Suchen
            </a>
            <a href="#" className={styles.links}>
              <BookmarkIcon /> Parkplatz
            </a>
            {isLoggedIn ? (
              <>
                <a href="#" className={styles.links}>
                  <UserIcon /> Welcome {user?.first_name}
                </a>
                <button
                  className={styles.logoutBtn}
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to={"/login"}>
                <button className={styles.loginButton}>Login</button>
              </Link>
            )}
          </div>
        </Container>
      </div>
      <div className={styles.Header__lower}>
        <Container className={styles.container}>
          <div className={styles.lower_left}>
            <Link to="/">
              <img src={MobileDeLogo} className={styles.logo} alt="mobile.de" />
            </Link>
            <p className={styles.claim}>Deutschlands größter Fahrzeugmarkt</p>
          </div>
          <div className={styles.lower_right}>
            <a href="#" className={styles.links}>
              Suchen
            </a>
            <NavLink to={"/listings/create"} className={styles.links}>
              Verkaufen
            </NavLink>
            <a href="#" className={styles.links}>
              Informieren
            </a>
            <a href="#" className={styles.links}>
              NEU: Auto-Abo
            </a>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Header;
