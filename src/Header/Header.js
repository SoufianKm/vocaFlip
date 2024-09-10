import React from "react";
import logo from "../../assets/logo.png";
import { StyleSheet, css } from "aphrodite";

function Header() {
  return (
    <>
      <img src={logo} alt="logo" className={css(styles.imgHeader)} />
      <h1 className={css(styles.level1)}>VocaFlip</h1>
    </>
  );
}

const styles = StyleSheet.create({
  imgHeader: {
    width: "10%",
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
    fontWeight:"bold",
    "@media (max-width:414px)": {
      fontSize: "1.6rem",
    },
    "@media (min-width:415px) and (max-width:900px)": {
      fontSize: "2rem",
    },
  },
});

export default Header;
