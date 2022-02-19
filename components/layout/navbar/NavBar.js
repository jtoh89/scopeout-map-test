import { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import logo from "../../../public/images/scopeout-logo.png";
import { Navbar, Nav } from "reactstrap";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  useEffect(() => {
    const escapeCloseNav = (e) => {
      if (e.keyCode === 27) {
        toggleDropdown(false);
      }
    };
    window.addEventListener("keydown", escapeCloseNav);
    return () => window.removeEventListener("keydown", escapeCloseNav);
  }, []);

  const [showDropdown, toggleDropdown] = useState(false);

  return (
    <nav className={styles.navContainer}>
      <div className={styles.navLogoResize}>
        <Link href="/" passHref onClick={() => toggleDropdown(false)}>
          <Image layout="fill" objectFit="scale-down" src={logo} alt="ScopeOut Logo" />
        </Link>
      </div>
      <FaBars
        className={styles.hamburger}
        onClick={() => {
          toggleDropdown(!showDropdown);
        }}
      />
      <div
        className={
          showDropdown ? `${styles.navLinkWrapper} ${styles.active}` : `${styles.navLinkWrapper}`
        }
      >
        <div className={styles.navLinkList}>
          <AiOutlineClose className={styles.navClose} onClick={() => toggleDropdown(false)} />
          <Link href="/" passHref>
            <a className={styles.navLink} onClick={() => toggleDropdown(false)}>
              Property Search
            </a>
          </Link>
          <Link href="/markets" passHref>
            <a className={styles.navLink} onClick={() => toggleDropdown(false)}>
              Market Trends
            </a>
          </Link>
          <div className={styles.navLogo}>
            <Link href="/" passHref onClick={() => toggleDropdown(false)}>
              <Image src={logo} alt="ScopeOut Logo" />
            </Link>
          </div>
          <Link href="/about" passHref>
            <a className={styles.navLink} onClick={() => toggleDropdown(false)}>
              About
            </a>
          </Link>
          {/* <a className={styles.navLink} target="_blank" href="https://scopeout.freshdesk.com/" rel="noopener noreferrer">
            Help Center
          </a> */}
          <Link href="/reportbug" passHref>
            <a className={styles.navLink}>Report a Bug</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
