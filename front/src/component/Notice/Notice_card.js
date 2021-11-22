import React, { Link, Route } from "react";
import "./Notice_card.css";
import ADMIN from "../../Img/Grade/0_admin.png";
import Notice_main from "./Notice_main";
import { connect } from "react-redux";
import { addPage } from "../../component/Modalmove/subscribers/action";

const gradefunction = (Grade) => {
  if (Grade === 0)
    //관리자
    return <img className="Notice-img-userimg" src={ADMIN}></img>;
};

//날짜 T이후로 쪼개는거
const dividedate = (inputdate) => {
  var redate = "";
  for (var i in inputdate) {
    if (inputdate[i] == "T") break;

    redate = redate + inputdate[i];
  }
  return redate;
};

const Notice_card = (getData) => {
  function clickevent() {
    sessionStorage.setItem("boardId", getData.getData.id);
    getData.addPage("공지사항조회");
  }
  return (
    <div className="Notice-card-container" onClick={clickevent}>
      <div className="Notice-card-nav-container">
        <div className="Notice-card-nav-usericon-class">
          {gradefunction(getData.getData?.writerLevel)}
        </div>
        <div className="Notice-card-nav-username-class">
          <p>{getData.getData?.writerNickname}</p>
        </div>
        <div className="Notice-card-nav-userstatus-container"></div>
      </div>
      <div className="Notice-card-content-container">
        <p className="Notice-card-content-class">{getData.getData?.title}</p>
      </div>
      <div className="Notice-card-footer-container">
        <div className="Notice-card-footer-date-container">
          <div className="Notice-card-footer-date-class">
            <p className="Notice-card-footer-date-p-class">
              {dividedate(getData.getData?.date)}
            </p>
          </div>
        </div>

        {/* {console.log(getData.getData?.id)} */}
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
export default connect(mapStateToProps, mapDispatchToProps)(Notice_card);
