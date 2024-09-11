import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import userPlaceholder from "../../assets/user.png"; // Placeholder image for user
import { StyleSheet, css } from "aphrodite";
import { AppContext } from "../App/AppContext"; // Import the AppContext

function Header() {
  const { user, logOut } = useContext(AppContext); // Use the context

  return (
    <div className={css(styles.headerContainer)}>
      <div className={css(styles.logoContainer)}>
        <img src={logo} alt="logo" className={css(styles.imgHeader)} />
        <h1 className={css(styles.level1)}>VocaFlip</h1>
      </div>

      {user.isLoggedIn && ( // Show user info only if logged in
        <div className={css(styles.userInfo)}>
          <img
            src={user.photoURL || userPlaceholder} // Use placeholder if no photo URL
            alt="User profile"
            className={css(styles.userImage)}
          />
          <p className={css(styles.userEmail)}>{user.email}</p>
          <button
            className={css(styles.logoutButton)}
            onClick={() => {
              logOut(); // Call logOut function from context
            }}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  imgHeader: {
    width: "15%",
    "@media (max-width:414px)": {
      width: "30%",
    },
    "@media (min-width:415px) and (max-width:900px)": {
      width: "20%",
    },
  },
  level1: {
    color: "#023047",
    fontSize: "2.6rem",
    fontWeight: "bold",
    marginLeft: "15px",
    "@media (max-width:414px)": {
      fontSize: "1.6rem",
    },
    "@media (min-width:415px) and (max-width:900px)": {
      fontSize: "2rem",
    },
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  userImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginBottom: "5px",
  },
  userEmail: {
    fontSize: "1rem",
    color: "#023047",
    fontWeight: "bold",
    marginBottom: "5px",
    "@media (max-width:414px)": {
      fontSize: "0.8rem",
    },
    "@media (min-width:415px) and (max-width:900px)": {
      fontSize: "0.9rem",
    },
  },
  logoutButton: {
    backgroundColor: "#023047",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#219ebc",
    },
  },
});

export default Header;
