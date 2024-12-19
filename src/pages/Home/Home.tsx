import React from 'react'
import styles from './home.module.scss'
import ProfileImage from "../../assets/icons/profile.svg";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const {  logout, email, firstName } = useContext(AuthContext);

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
          <img src={ProfileImage} alt="Profile" />
        </div>
        <h2 className={styles.userName}>{firstName}</h2>
        <p className={styles.userEmail}>{email}</p>
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Home