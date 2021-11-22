import React from "react";
import { connect } from "react-redux";
import { addPage } from "../Modalmove/subscribers/action";
import "./Message_card.css";
import Menu_left_nav from "../Common/Header/Menu_left_nav";

const divideDate = (inputDate) => {
  var redate = "";
  for (var i in inputDate) {
    if (inputDate[i] == "T") break;
    redate += inputDate[i];
  }
  return redate;
};

const Message_card = (getData) => {
  function clickEvent() {
    sessionStorage.setItem("messageId", getData.getData.id);
    getData.addPage("메시지상세조회");
  }

  return (
    <div className="Message-card-container" onClick={clickEvent}>
      <div className="Message-card-nav-container">
        <div className="Message-card-nav-producer-container">
          <p className="Message-card-producer-class">
            {getData.getData?.producer}
          </p>
        </div>
      </div>
      <div className="Message-card-content-container">
        <div className="Message-card-title-container">
          <p className="Message-card-title-class">{getData.getData?.title}</p>
        </div>
      </div>
      <div className="Message-card-footer-container">
        <div className="Message-card-date-container">
          <p className="Message-card-date-class">
            {divideDate(getData.getData?.date)}
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    page: state.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPage: (text) => dispatch(addPage(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message_card);
