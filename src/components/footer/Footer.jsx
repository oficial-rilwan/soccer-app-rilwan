import React from "react";
import { Container } from "react-bootstrap";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <Container fluid="xl">
        <div className="footer-wrapper">
          <p className="name">
            Built by <span>Rilwan Aribidesi</span>
          </p>
          <p className="credits">
            Credits: <span>Football data API</span>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
