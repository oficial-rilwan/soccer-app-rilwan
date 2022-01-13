import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import LeagueTable from "../components/league-table/LeagueTable";
import ChampionsLeague from "./ChampionsLeague";
import SingleTeam from "./SingleTeam";
import Footer from "../components/footer/Footer";

const Team = () => {
  const [standings, setStandings] = useState([]);
  const [competition, setCompetition] = useState([]);
  const [matches, setMatches] = useState([]);
  const [leagueTable, setTable] = useState(true);
  const [matchDay, setMatchDay] = useState(1);
  const [match, setMatch] = useState(false);

  const [loading, setLoading] = useState(false);

  // Champions League Group
  const [pre, setPre] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [gA, setGA] = useState([]);
  const [gB, setGB] = useState([]);
  const [gC, setGC] = useState([]);
  const [gD, setGD] = useState([]);
  const [gE, setGE] = useState([]);
  const [gF, setGF] = useState([]);
  const [gG, setGG] = useState([]);
  const [gH, setGH] = useState([]);
  const [final, setFinal] = useState([]);
  // const [] = useState([])

  const { id } = useParams();
  const history = useHistory();

  const fetchStandings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://api.football-data.org/v2/competitions/${id}/standings`,
        {
          headers: {
            "X-Auth-Token": "c456c5babe9d4669903df726010bf7e6",
          },
        }
      );
      setLoading(false);
      setMatchDay(data.season?.currentMatchday);
      setStandings(data.standings[0].table);
      setCompetition(data.competition);
      setPre(data.standings[0]?.table);
      setQualification(data.standings[1]?.table);
      setGA(data.standings[2]?.table);
      setGB(data.standings[3]?.table);
      setGC(data.standings[4]?.table);
      setGD(data.standings[5]?.table);
      setGE(data.standings[6]?.table);
      setGF(data.standings[7]?.table);
      setGG(data.standings[8]?.table);
      setGH(data.standings[9]?.table);
      setFinal(data.standings[10]?.table);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchMatches = async () => {
    try {
      const { data } = await axios.get(
        `http://api.football-data.org/v2/competitions/${id}/matches?matchday=${matchDay}`,
        {
          headers: {
            "X-Auth-Token": "c456c5babe9d4669903df726010bf7e6",
          },
        }
      );

      setMatches(data.matches);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStandings();
    fetchMatches();
    // eslint-disable-next-line
  }, [matchDay]);

  const handleMatches = () => {
    if (leagueTable) {
      setTable(false);
      setMatch(true);
    }
  };

  const handleTable = () => {
    if (match) {
      setMatch(false);
      setTable(true);
    }
  };

  return (
    <div className="teams-standings">
      <div className="banner">
        <img
          src="https://sportify-git-master.itope84.vercel.app/img/logo.efdde25b.png"
          alt="banner"
        />
      </div>
      <Container fluid="xl" className="p-0">
        <Row className="justify-content-center align-items-center">
          <Col>
            <div className="team-wrapper">
              <div className="header">
                <h5 className="team-header">
                  <span
                    onClick={() => history.push("/")}
                    style={{ cursor: "pointer" }}
                  >
                    All Competitions{" "}
                  </span>{" "}
                  / {competition.name}
                </h5>
                <h2>{competition.name}</h2>
              </div>
              <div className="standings-badge">
                <span
                  onClick={handleTable}
                  className={leagueTable ? "span-border" : undefined}
                >
                  STANDINGS
                </span>
                <span
                  onClick={handleMatches}
                  className={match ? "span-border" : undefined}
                >
                  MATCHES
                </span>
              </div>
              {leagueTable && (
                <div className="">
                  <div className="table-responsive">
                    {loading && id !== "2001" ? (
                      <div className="loading-spin">
                        <ReactLoading
                          type={"spokes"}
                          color={"#ccc"}
                          height={50}
                          width={50}
                        />
                      </div>
                    ) : (
                      <table className="table table-borderless">
                        {id !== "2001" && (
                          <thead>
                            <tr className="table-head-row">
                              <th scope="col"></th>
                              <th className="team-col" scope="col">
                                Team
                              </th>
                              <th scope="col">MP</th>
                              <th scope="col">W</th>
                              <th scope="col">D</th>
                              <th scope="col">L</th>
                              <th scope="col">GF</th>
                              <th scope="col">GA</th>
                              <th scope="col">Pts</th>
                            </tr>
                          </thead>
                        )}
                        <>
                          <tbody>
                            {standings.map((item, i) => {
                              return <LeagueTable item={item} key={i} i={i} />;
                            })}
                          </tbody>
                        </>
                      </table>
                    )}
                  </div>

                  <div className="champions-league-table">
                    {id === "2001" && (
                      <>
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
                            <div className="cl-table-wrapper">
                              <h4>PRELIMINARY ROUND</h4>
                              <div className="table-reponsive-sm">
                                <table className="table table-borderless">
                                  <thead>
                                    <tr className="table-head-row">
                                      <th scope="col"></th>
                                      <th className="team-col" scope="col">
                                        Team
                                      </th>
                                      <th scope="col">MP</th>
                                      <th scope="col">W</th>
                                      <th scope="col">D</th>
                                      <th scope="col">L</th>
                                      <th scope="col">GF</th>
                                      <th scope="col">GA</th>
                                      <th scope="col">Pts</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {pre.length > 0 &&
                                      pre.map((item, i) => {
                                        return (
                                          <LeagueTable
                                            item={item}
                                            key={i}
                                            i={i}
                                          />
                                        );
                                      })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="cl-table-wrapper">
                              <h4>QUALIFICATION</h4>
                              <table className="table table-borderless">
                                <thead>
                                  <tr className="table-head-row">
                                    <th scope="col"></th>
                                    <th className="team-col" scope="col">
                                      Team
                                    </th>
                                    <th scope="col">MP</th>
                                    <th scope="col">W</th>
                                    <th scope="col">D</th>
                                    <th scope="col">L</th>
                                    <th scope="col">GF</th>
                                    <th scope="col">GA</th>
                                    <th scope="col">Pts</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {qualification.length > 0 &&
                                    qualification.map((item, i) => {
                                      return (
                                        <LeagueTable
                                          item={item}
                                          key={i}
                                          i={i}
                                        />
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                            <div className="cl-table-wrapper">
                              <h4>GROUP A</h4>
                              <table className="table table-borderless">
                                <thead>
                                  <tr className="table-head-row">
                                    <th scope="col"></th>
                                    <th className="team-col" scope="col">
                                      Team
                                    </th>
                                    <th scope="col">MP</th>
                                    <th scope="col">W</th>
                                    <th scope="col">D</th>
                                    <th scope="col">L</th>
                                    <th scope="col">GF</th>
                                    <th scope="col">GA</th>
                                    <th scope="col">Pts</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {gA.length > 0 &&
                                    gA.map((item, i) => {
                                      return (
                                        <LeagueTable
                                          item={item}
                                          key={i}
                                          i={i}
                                        />
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                            <div className="cl-table-wrapper">
                              <h4>GROUP B</h4>
                              <table className="table table-borderless">
                                <thead>
                                  <tr className="table-head-row">
                                    <th scope="col"></th>
                                    <th className="team-col" scope="col">
                                      Team
                                    </th>
                                    <th scope="col">MP</th>
                                    <th scope="col">W</th>
                                    <th scope="col">D</th>
                                    <th scope="col">L</th>
                                    <th scope="col">GF</th>
                                    <th scope="col">GA</th>
                                    <th scope="col">Pts</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {gB.length > 0 &&
                                    gB.map((item, i) => {
                                      return (
                                        <LeagueTable
                                          item={item}
                                          key={i}
                                          i={i}
                                        />
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                            <div className="cl-table-wrapper">
                              <h4>GROUP C</h4>
                              <table className="table table-borderless">
                                <thead>
                                  <tr className="table-head-row">
                                    <th scope="col"></th>
                                    <th className="team-col" scope="col">
                                      Team
                                    </th>
                                    <th scope="col">MP</th>
                                    <th scope="col">W</th>
                                    <th scope="col">D</th>
                                    <th scope="col">L</th>
                                    <th scope="col">GF</th>
                                    <th scope="col">GA</th>
                                    <th scope="col">Pts</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {gC.length > 0 &&
                                    gC.map((item, i) => {
                                      return (
                                        <LeagueTable
                                          item={item}
                                          key={i}
                                          i={i}
                                        />
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                            <div className="cl-table-wrapper">
                              <h4>GROUP D</h4>
                              <table className="table table-borderless">
                                <thead>
                                  <tr className="table-head-row">
                                    <th scope="col"></th>
                                    <th className="team-col" scope="col">
                                      Team
                                    </th>
                                    <th scope="col">MP</th>
                                    <th scope="col">W</th>
                                    <th scope="col">D</th>
                                    <th scope="col">L</th>
                                    <th scope="col">GF</th>
                                    <th scope="col">GA</th>
                                    <th scope="col">Pts</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {gD.length > 0 &&
                                    gD.map((item, i) => {
                                      return (
                                        <LeagueTable
                                          item={item}
                                          key={i}
                                          i={i}
                                        />
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                            <div className="cl-table-wrapper">
                              <h4>GROUP E</h4>
                              <table className="table table-borderless">
                                <thead>
                                  <tr className="table-head-row">
                                    <th scope="col"></th>
                                    <th className="team-col" scope="col">
                                      Team
                                    </th>
                                    <th scope="col">MP</th>
                                    <th scope="col">W</th>
                                    <th scope="col">D</th>
                                    <th scope="col">L</th>
                                    <th scope="col">GF</th>
                                    <th scope="col">GA</th>
                                    <th scope="col">Pts</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {gE.length > 0 &&
                                    gE.map((item, i) => {
                                      return (
                                        <LeagueTable
                                          item={item}
                                          key={i}
                                          i={i}
                                        />
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                            <div className="cl-table-wrapper">
                              <h4>GROUP F</h4>
                              <table className="table table-borderless">
                                <thead>
                                  <tr className="table-head-row">
                                    <th scope="col"></th>
                                    <th className="team-col" scope="col">
                                      Team
                                    </th>
                                    <th scope="col">MP</th>
                                    <th scope="col">W</th>
                                    <th scope="col">D</th>
                                    <th scope="col">L</th>
                                    <th scope="col">GF</th>
                                    <th scope="col">GA</th>
                                    <th scope="col">Pts</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {gF.length > 0 &&
                                    gF.map((item, i) => {
                                      return (
                                        <LeagueTable
                                          item={item}
                                          key={i}
                                          i={i}
                                        />
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                            <div className="cl-table-wrapper">
                              <h4>GROUP G</h4>
                              <table className="table table-borderless">
                                <thead>
                                  <tr className="table-head-row">
                                    <th scope="col"></th>
                                    <th className="team-col" scope="col">
                                      Team
                                    </th>
                                    <th scope="col">MP</th>
                                    <th scope="col">W</th>
                                    <th scope="col">D</th>
                                    <th scope="col">L</th>
                                    <th scope="col">GF</th>
                                    <th scope="col">GA</th>
                                    <th scope="col">Pts</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {gG.length > 0 &&
                                    gG.map((item, i) => {
                                      return (
                                        <LeagueTable
                                          item={item}
                                          key={i}
                                          i={i}
                                        />
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                            <div className="cl-table-wrapper">
                              <h4>GROUP H</h4>
                              <table className="table table-borderless">
                                <thead>
                                  <tr className="table-head-row">
                                    <th scope="col"></th>
                                    <th className="team-col" scope="col">
                                      Team
                                    </th>
                                    <th scope="col">MP</th>
                                    <th scope="col">W</th>
                                    <th scope="col">D</th>
                                    <th scope="col">L</th>
                                    <th scope="col">GF</th>
                                    <th scope="col">GA</th>
                                    <th scope="col">Pts</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {gH.length > 0 &&
                                    gH.map((item, i) => {
                                      return (
                                        <LeagueTable
                                          item={item}
                                          key={i}
                                          i={i}
                                        />
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                            <div className="cl-table-wrapper">
                              <h4>FINAL STAGE</h4>
                              <table className="table table-borderless">
                                <thead>
                                  <tr className="table-head-row">
                                    <th scope="col"></th>
                                    <th className="team-col" scope="col">
                                      Team
                                    </th>
                                    <th scope="col">MP</th>
                                    <th scope="col">W</th>
                                    <th scope="col">D</th>
                                    <th scope="col">L</th>
                                    <th scope="col">GF</th>
                                    <th scope="col">GA</th>
                                    <th scope="col">Pts</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {final.length > 0 &&
                                    final.map((item, i) => {
                                      return (
                                        <LeagueTable
                                          item={item}
                                          key={i}
                                          i={i}
                                        />
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {match && (
                <div className="match">
                  <h2 className="mb-5">Matchweek {matchDay}</h2>
                  <Row className="justify-content-center align-items-center g-4">
                    {matches.map((item, i) => {
                      return <SingleTeam item={item} key={i} />;
                    })}
                  </Row>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Team;
