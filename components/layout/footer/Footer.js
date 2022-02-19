import styles from "./Footer.module.css";
import { Container, Row, Col } from "reactstrap";
import logo from "../../../public/images/scopeout-logo.png";
import { AiOutlineCopyright } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <Container>
        <Row>
          <Col className={styles.footerCol} m="4" lg="4">
            <div className={styles.footerLogo}>
              <Image src={logo} alt="ScopeOut Logo" />
            </div>
          </Col>
          <Col className={styles.footerCol} m="8" lg="8">
            <Row>
              <Col m="6" lg="6">
                <h5>Product</h5>
                <ul className={styles.footerLinkList}>
                  <Link href="/" passHref>
                    <li>
                      <span className={styles.footerLink}>Get Started</span>
                    </li>
                  </Link>
                  <Link href="/markets" passHref>
                    <li>
                      <span className={styles.footerLink}>Market Trends</span>
                    </li>
                  </Link>
                  {/* <Link href="/dashboard" passHref>
                    <li>
                      <span className={styles.footerLink}>Terms and Conditions</span>
                    </li>
                  </Link> */}
                  {/* <Link href="/dashboard" passHref>
                    <li>
                      <span className={styles.footerLink}>Privacy</span>
                    </li>
                  </Link> */}
                </ul>
              </Col>
              <Col m="6" lg="6">
                <h5>Resources</h5>
                <ul className={styles.footerLinkList}>
                  <Link href="/about" passHref>
                    <li>
                      <span className={styles.footerLink}>About</span>
                    </li>
                  </Link>
                  <Link href="/reportbug" passHref>
                    <li>
                      <span className={styles.footerLink}>Report a Bug</span>
                    </li>
                  </Link>
                  {/* <Link href={{ pathname: "https://scopeout.freshdesk.com/" }} target="_blank" passHref>
                    <li>
                      <span className={styles.footerLink}>Help Center</span>
                    </li>
                  </Link> */}
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className={styles.copyright}>
            <p>
              <AiOutlineCopyright size={15} style={{ paddingRight: "3px" }} />
              Copyright 2021 ScopeOut
            </p>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
