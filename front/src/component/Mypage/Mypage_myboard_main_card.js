import React, { Link, Route } from "react";
import "./Mypage_myboard_main_card.css";
import BRONZE from "../../Img/Grade/4_bronze.png";
import SIVER from "../../Img/Grade/3_silver.png";
import GOLD from "../../Img/Grade/2_gold.png";
import VIP from "../../Img/Grade/1_vip.png";
import BLOODDROP from "../../Img/DirectedIMG/blood-drop.png";
import { connect } from "react-redux";
import { addPage } from "../Modalmove/subscribers/action";

const gradefunction = (Grade) => {
  if (Grade === 1)
    //BRONZE 예정
    return <img className="Directed-img-userimg" src={BRONZE}></img>;
  else if (Grade === 2)
    //SIVER 예정
    return <img className="Directed-img-userimg" src={SIVER}></img>;
  else if (Grade === 3)
    //GOLD 예정
    return <img className="Directed-img-userimg" src={GOLD}></img>;
  //레벨4 VIP
  else return <img className="Directed-img-userimg" src={VIP}></img>;
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

const Mypage_card = (getData) => {
  function clickevent() {
    sessionStorage.setItem("boardId", getData.getData.id);
    // getData.addPage("마이페이지");
  }
  return (
    <div className="Mypage-card-container" onClick={clickevent}>
      <div className="Mypage-card-nav-container">
        <div className="Mypage-card-nav-usericon-class">
          {gradefunction(getData.getData?.level)}
        </div>
        <div className="Mypage-card-nav-username-class">
          <p>{getData.getData?.nickname}</p>
        </div>
        <div className="Mypage-card-nav-userstatus-container">
          <div className="Mypage-card-nav-userstatus-class">
            <img
              src={BLOODDROP}
              className="Mypage-card-nav-userstatus-icon"
            ></img>
            {getData.getData?.completeStatus == false ? (
              <p className="Mypage-card-nav-userstatus-p-class">
                {getData.getData?.donationCount}/{getData.getData?.requestCount}
              </p>
            ) : (
              <p className="Mypage-card-nav-userstatus-p-class2">완료</p>
            )}
            {/* {console.log(getData)} */}
            {/* {getData.getData?.donationCount}/{getData.getData?.requestCount} */}
          </div>
        </div>
      </div>
      <div className="Mypage-card-content-container">
        <p className="Mypage-card-content-class">{getData.getData?.title}</p>
      </div>
      <div className="Mypage-card-footer-container">
        <div className="Mypage-card-footer-date-container">
          <div className="Mypage-card-footer-date-class">
            <p className="Mypage-card-footer-date-p-class">
              {dividedate(getData.getData?.requestDate)}
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
export default connect(mapStateToProps, mapDispatchToProps)(Mypage_card);
