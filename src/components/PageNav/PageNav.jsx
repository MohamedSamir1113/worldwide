import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../Logo/Logo";
import { useState } from "react";

function PageNav() {
  const [burgerClick, setBurgerClick] = useState(false);

  return (
    <>
      <nav className={styles.nav}>
        <Logo />
        <ul>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <nav className={styles.burgerMenu}>
          <Logo />
          <div
            className={`${styles.burgerIcon} ${burgerClick ? styles.active : ""}`}
            onClick={() => setBurgerClick(!burgerClick)}
          ></div>
        </nav>
        <ul className={`${styles.burgerMenuItems} ${burgerClick ? styles.open : ""}`}>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default PageNav;
