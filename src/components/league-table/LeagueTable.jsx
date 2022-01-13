import React from "react";

const LeagueTable = ({ item, i }) => {
  return (
    <tr className="table-content-row" key={item.team.id}>
      <td className="align-middle">{i + 1}</td>
      <td>
        <div className="table-group">
          <span className="table-image">
            <img src={item.team.crestUrl} alt={item.team.name} />
          </span>

          {item.team.name}
        </div>
      </td>
      <td className="align-middle">{item.playedGames}</td>
      <td className="align-middle">{item.won}</td>
      <td className="align-middle">{item.draw}</td>
      <td className="align-middle">{item.lost}</td>
      <td className="align-middle">{item.goalsFor}</td>
      <td className="align-middle">{item.goalsAgainst}</td>
      <td className="align-middle">{item.points}</td>
    </tr>
  );
};

export default LeagueTable;
