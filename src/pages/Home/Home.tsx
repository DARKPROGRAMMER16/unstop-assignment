import styles from './home.module.scss'
import ProfileImage from "../../assets/icons/profile.svg";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Constants } from '../Constants';
import { toast } from 'react-toastify';

const Home = () => {

  const {  logout, userData} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.error("User Logged Out");
    navigate("/login");
  }

  const { firstName, email, gender} = userData;

  return (
    <div className={styles.container}>
      <div className={styles.welcomeSection}>
        <h1>{Constants.WELCOME_TO}</h1>
        <h1 className={styles.brandName}>{Constants.BRAND_NAME}</h1>
      </div>

      <div className={styles.profileCard}>
        <div className={styles.profileImage}>
          <img 
            src={ProfileImage} 
            alt="Profile" 
            loading="lazy"
          />
        </div>
        {/* data here is directly fetched from the context, where user data is backed throught local storage */}
        <h2 className={styles.userName}>{firstName}</h2>
        <p className={styles.userEmail}>{email}</p>
        <p className={styles.userEmail}>{gender}</p>
        <button 
          className={styles.logoutButton} 
          onClick={handleLogout}
          aria-label="Logout"
        >
          {Constants.LOGOUT}
        </button>
      </div>
    </div>
  )
}

export default Home
