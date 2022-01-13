import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import data from "../../data";
import "./competitions.css";

const Competitions = () => {
  const history = useHistory();
  return (
    <div className="competitions">
      <div className="banner">
        <img
          src="https://sportify-git-master.itope84.vercel.app/img/logo.efdde25b.png"
          alt="banner"
        />
      </div>
      <div className="competitions-list">
        <Container fluid="xl" className="p-0">
          <div className="competitions-wrapper">
            <h2 className="mb-3">All Competitions</h2>
            <Row className="justify-content-center g-4">
              {data.map((competition) => {
                return (
                  <Col
                    className="bt-col"
                    key={competition.id}
                    sm={6}
                    onClick={() => history.push(`/${competition.id}`)}
                  >
                    <div className="competition">
                      <img src={competition.image} alt={competition.name} />
                      <div className="competition-info">
                        <h4>{competition.name}</h4>
                        <p>{competition.country}</p>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Competitions;
