import React from "react";
import { Col } from "react-bootstrap";

const SingleTeam = ({ item }) => {
  let date = new Date(item.utcDate).getDate();
  let month = new Date(item.utcDate).getMonth();
  let time = new Date(item.utcDate).getHours();
  let minute = new Date(item.utcDate).getMinutes();

  const getHomes = () => {
    let color;
    if (item.score.fullTime.homeTeam > item.score.fullTime.awayTeam) {
      color = "green";
    } else if (item.score.fullTime.homeTeam < item.score.fullTime.awayTeam) {
      color = "red";
    } else {
      color = "";
    }
    return color;
  };
  const getAways = () => {
    let color;
    if (item.score.fullTime.awayTeam > item.score.fullTime.homeTeam) {
      color = "green";
    } else if (item.score.fullTime.awayTeam < item.score.fullTime.homeTeam) {
      color = "red";
    } else {
      color = "";
    }
    return color;
  };
  return (
    <Col className="mt-0 d-flex" md={6}>
      <div className="match-wrapper">
        <div className="teams">
          <div className="teams-col">
            <div className="name">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABYgAAAWIBXyfQUwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARkSURBVHic7ZtPbFRFHMc/P9pud7uL24VtmxbW0n/ERKhGKQdJTBsiLXrCJgZbggdPPaAePKAhcDHqgYsnTprQUI0k9aYpCQRjKAkVjRBITFsp3a2VupVaaHfrwu542O66K0275U3fhPR9kpfMm533m+9+MzNv3sx7opRiPbPBtADTCOACXge6gY1m5djGfaAP+AbgOKDW6XFcgDAQ8lRuxVMVsmTrk0J8KkL8zwmASDEQAtjyykGaDr1vVJhdjJw5yWjfSYDQuh8EHQPsrjAZn0elko/kq1SSZHzebjn2GhC7M86Frp1c6mlDqVQ2X6kUl3rauNC1k9idcTsl2WvAzI0rJBdizIWHWYhOZvMXopPMhYdJLsSYuXHFTkk2d4HcaXchaRsoziRmR34h/O1pywH925/H3/TciuUmL/ZTsjEAwIP7MwXF/uvaIPMTo5b0AdwbvZZNZw2IDp0nOnTecnDZUERr71Xcm6uXLTd8+tNVxf37158YOtppRdqSaO8CZdW1lPjKdYfFHayhNFChPW62BdR19lDX2WM5oKs8iMjKvr702QDuihogPQhefrdj2fLuYDVtvT+TKLC7LMdY/ynG+k8BOQYUub2UBiotBy8Ul39ztr5U4p+CrpHiEi0ai9zebNrWu8CGUs9/aZd76XROGTsoXrmIPipb9lK15zV8oaa8/lwaqKDh4HvMRUaobNlrpyR7DSjyeHnh2OdL/rb9raN2SsniPAyZFmAaASaALWXV2yirqTOtxxZik2PE/rgN8DvACcyvzZk6TmRWhd8ADgNPPbatTxb3gF7grDgbI+scowaIyBEROWJUg6kuICINQObhvlEp9ZsJHbbOBP/HLeCLnLQRnEHQZOUiUiUiVUY1GBwDgkBmDbxWKTVtQofJFrADKFs8dpgS4cwDTAswja23QRHxAHsW623O+Wm3iLiBh8CgUipumyY7B0ERGQJaVij2o1Jqtx16wH4DCqpMKSVrrSWDkZng1vYuQh3deXmRgT4mzn1puxYjBriDNZQ/82JeXvTqRRNSnLuAY4BpAaZxDDAtwDSOAaYFmMYxwLQA06x7A9Z8KiwiLuBZwJ/Ji0+FuXv9cl65+FQ495pWYBa4qZRKrKm+tXgaXFzvO0b62b+Z9P7j45AArgODwEdrsm6olNJ6AAeAKfTv5E4BB3Tr1doCRORj4IPMeV19A6HQ0wSDQVwlq2sEiQcJpqeniUTCjN3K2zT6RCn1oR7FGruAiLwMfA+I3++nveNVamu3aYk9Pn6bcwPfMTs7C+nW0KqU+kFHbC0GiIiXdF+t93g8dB86TCCwyXLcXGZm7tJ3ppd4PA7prbRmpZTlDwx03QbfBOoB9rXv1/7nAQKBTexr3585rV+s0zK6DNgF4PX5aGxs0hTyURobm/D6fHl1WkXXPGAXQCqZ5OzXX2kKuTSpZPZzGy0G6BoDokDQupxVMa2Usvz6uK4W8A7wtsZ4K/EQWPqV01XivB9gWoBp/gV9tEcX2GaPPwAAAABJRU5ErkJggg=="
                alt=""
              />
              <span>{item.homeTeam.name}</span>
            </div>
            <div className="team-score" style={{ color: getHomes() }}>
              {item.score.fullTime.homeTeam}
            </div>
          </div>
          <div className="teams-col">
            <div className="name">
              <img
                src="data:image/png;base64,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"
                alt=""
              />
              <span>{item.awayTeam.name}</span>
            </div>
            <div className="team-score" style={{ color: getAways() }}>
              {item.score.fullTime.awayTeam}
            </div>
          </div>
        </div>
        <div className="scores">
          <span>{item.status === "FINISHED" && "FT"}</span>
          <span>
            {date < 10 ? "0" + date : date}/
            {month < 10 ? "0" + (month + 1) : month + 1}
          </span>
          <span>
            {time < 10 ? "0" + time : time}:
            {minute < 10 ? "0" + minute : minute}
          </span>
        </div>
      </div>
    </Col>
  );
};

export default SingleTeam;
