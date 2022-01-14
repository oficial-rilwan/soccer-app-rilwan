import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import ReactLoading from "react-loading";
import "./competitions.css";
import SingleCompetition from "./SingleCompetition";

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCompetitions = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `http://api.football-data.org/v2/competitions?plan=TIER_ONE`,
      {
        headers: {
          "X-Auth-Token": "c456c5babe9d4669903df726010bf7e6",
          "X-Response-Control": "full",
        },
      }
    );
    setLoading(false);
    setCompetitions(
      data.competitions.filter((item) => {
        return item.id !== 2013 && item.id !== 2000 && item.id !== 2152;
      })
    );
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

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
              {loading ? (
                <div className="loading-spin">
                  <ReactLoading
                    type={"spokes"}
                    color={"#ccc"}
                    height={50}
                    width={50}
                  />
                </div>
              ) : (
                <>
                  {competitions.map((competition) => {
                    return (
                      <SingleCompetition
                        competition={competition}
                        key={competition.id}
                      />
                    );
                  })}
                </>
              )}
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Competitions;
