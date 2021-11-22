import React, { useState, useEffect } from "react";
import Menu_left_nav from "../Common/Header/Menu_left_nav";
import "./Notice_main.css";
import Notice_nav from "./Notice_nav";
import Notice_card from "./Notice_card";
import { connect } from "react-redux";
import { addPage } from "../../component/Modalmove/subscribers/action";
import axios from "axios";
import CARDDONATION from "../../Img/CARDDONATION.png";
import WRITEICON from "../../Img/WRITE.png";

const Notice_main = (props) => {
  const [getData, setGetdata] = useState([]);

  const getsetValue2 = (getData) => {
    props.getsetValue2(getData);
  };

  useEffect(() => {
    axios
      .get(
        "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/notice"
        // "http://localhost:8005"
      )
      // "id": 1,
      // "writerUserId": "admin",
      // "writerNickname": "관리자",
      // "writerLevel": 0,
      // "title": "이번달 프로모션입니당",
      // "contents": "ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
      // "image": "https://bloodrecovery.s3.us-east-2.amazonaws.com/direct/97883a2f-dafa-4dc5-9875-1a4a450cd45b.jpg",
      // "imageUrl": null,
      // "date": "2021-11-11T15:27:41.1945959"
      .then(function (response) {
        setGetdata(response.data);
        newdata();
        // console.log("response", response);
      });
  }, []);

  const newdata = () => {
    for (var i = 0; i < getData.length; i++) {
      for (var key in getData[i].length) {
        getData[i][i] = 0;
      }
    }
  };

  // const movepage = (text) => {};

  return (
    <div className="Notice-main-container">
      <div className="Notice-main-nav-container">
        <div className="Notice-main-nav-class">
          <Menu_left_nav
            name={"공지사항"}
            imgname={CARDDONATION}
          ></Menu_left_nav>
        </div>
        <div className="Notice-main-nav-write-class">
          {sessionStorage.getItem("userId") === "admin" ? (
            <img
              src={WRITEICON}
              onClick={() => props.addPage("공지사항_글쓰기")}
              className="Notice-main-nav-writeicon-class"
            ></img>
          ) : null}
        </div>
      </div>
      <div className="Notice-main-cardmain-container">
        {getData.map((menu, index) => (
          <Notice_card
            getData={getData[index]}
            key={index}
            getsetValue3={getsetValue2}
          >
            {/* {console.log("index", index)} */}
          </Notice_card>
        ))}
        {/* {console.log(getData)} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Notice_main);
