import React from "react";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SingleCompetition = ({ competition }) => {
  const history = useHistory();
  const image = () => {
    let image = "";
    if (competition.id === 2016) {
      image =
        "https://sportify-git-master.itope84.vercel.app/img/ELC.12a0abbb.png";
    } else if (competition.id === 2021) {
      image =
        "https://sportify-git-master.itope84.vercel.app/img/PL.274c4545.png";
    } else if (competition.id === 2015) {
      image =
        "https://sportify-git-master.itope84.vercel.app/img/FL1.27ed7692.png";
    } else if (competition.id === 2002) {
      image =
        "https://sportify-git-master.itope84.vercel.app/img/BL1.7a2c67c2.png";
    } else if (competition.id === 2003) {
      image =
        "https://sportify-git-master.itope84.vercel.app/img/DED.99ae79ed.png";
    } else if (competition.id === 2017) {
      image =
        "https://sportify-git-master.itope84.vercel.app/img/PPL.aec4ede1.png";
    } else if (competition.id === 2014) {
      image =
        "https://sportify-git-master.itope84.vercel.app/img/PD.bf2f81de.png";
    }
    return image;
  };
  return (
    <Col
      className="bt-col"
      key={competition.id}
      sm={6}
      onClick={() =>
        history.push(
          `/competition?id=${competition.id}&&matchday=${competition.currentSeason.currentMatchday}`
        )
      }
    >
      <div className="competition">
        <img
          src={competition.emblemUrl ? competition.emblemUrl : image()}
          alt={competition.name}
        />
        <div className="competition-info">
          <h4>{competition.name}</h4>
          <p>{competition.country}</p>
        </div>
      </div>
    </Col>
  );
};

export default SingleCompetition;
