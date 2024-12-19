import styles from './home.module.scss'
import ProfileImage from "../../assets/icons/profile.svg";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const {  logout, email, firstName, gender } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <div className={styles.container}>
      <div className={styles.welcomeSection}>
        <h1>Welcome to</h1>
        <h1 className={styles.brandName}>Unstop</h1>
      </div>

      <div className={styles.profileCard}>
        <div className={styles.profileImage}>
          <img 
            src={ProfileImage} 
            alt="Profile" 
            loading="lazy"
          />
        </div>
        <h2 className={styles.userName}>{firstName}</h2>
        <p className={styles.userEmail}>{email}</p>
        <p className={styles.userEmail}>{gender}</p>
        <button 
          className={styles.logoutButton} 
          onClick={handleLogout}
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home
