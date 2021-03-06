import React, { useState, useEffect, useCallback } from "react";
import Header_nav from "../Common/Header/Header_nav";
import Main_rank from "./Main_rank";
import UseLocalHook from "../Common/Function/UseLocalHook";
import Main_title from "./Main_title_text";
import Main_Button from "../Common/Button/Main_Button";
import ReactModal from "react-modal";
import Board_main from "../Board/Board_main";
import Directed_main from "../Directed/Directed_main";
import Join_main from "../Join/Join_main";
import Login_main from "../Login/Login_main";
import Notice_main from "../Notice/Notice_main";
import Rank_main from "../Rank/Rank_main";
import Bloodhouse_main from "../Bloodhouse/Bloodhouse_main";
import Header_nav_login from "../Common/Header/Header_nav_login";
import Directed_write from "../Directed/Directed_write";
import Board_write from "../Board/Board_write";
import Notice_write from "../Notice/Notice_write";
import "./Main_base.css";
import Mypage_main from "../Mypage/Mypage_main";
import Directed_inquire from "../Directed/Directed_inquire";
import { connect } from "react-redux";
import { addPage } from "../../component/Modalmove/subscribers/action";
import Board_inquire from "../Board/Board_inquire";
import Notice_inquire from "../Notice/Notice_inquire";
import Bloodpocket_card from "../Mypage/Bloodpocket_card";
import Bloodpocket_main from "../Mypage/Bloodpocket";
import Point_main from "../Mypage/Point_main";
import Change_info from "../Mypage/Change_info";
import Directed_rewrite from "../Directed/Directed_rewrite";
import Board_rewrite from "../Board/Board_rewrite";
import Notice_rewrite from "../Notice/Notice_rewrite";
import Login_find from "../Login/Login_find";
import Mypage_myboard from "../Mypage/Mypage_myboard_main";
import Message from "../Message/Message";
import Message_read from "../Message/Message_read";

var text = "";
var sendid;

function Main_base(props) {
  const modal_style = {
    overlay: {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0, 0, 0,0 )",
    },
    content: {
      left: 350,
      right: 350,
      top: 100,
      bottom: 100,
      zIndex: 0,
      padding: 10,
    },
  };

  //?????????????????? ???????????? ??????????????? ?????? ??????
  const [modalIsOpen, setModalIsOpen] = UseLocalHook("true", false);
  //?????????????????? ??????????????? ????????? ??????????????? ???????????? ?????? ??????
  const [modal, setmodal] = useState(
    () => JSON.parse(window.localStorage.getItem("modal")) || 0
  );

  useEffect(() => {
    window.localStorage.setItem("modal", JSON.stringify(modal));
  }, [modal]);
  const [testvalue, settestvalue] = useState(true);
  const getsetValue = (text) => {
    props.addPage(text);
    setModalIsOpen(true);
  };

  const getsetValue2 = (getData) => {
    sendid = getData;
    setmodal("??????????????????");
  };
  const getsetValue3 = () => {
    setmodal("????????????");
  };



  const logoutsuccess = () => {
    //??????????????? ??????????????? ????????? ?????? ?????????????????????????????????
 
    if((sessionStorage.getItem("last")=='"?????????_??????"')||(sessionStorage.getItem("last")=='"?????????????????????"')||(sessionStorage.getItem("last")=='"????????????"')||
    (sessionStorage.getItem("last")=='"??????????????????"')||(sessionStorage.getItem("last")=='"????????????"')||(sessionStorage.getItem("last")=='"??????????????????"')||
    (sessionStorage.getItem("last")=='"??????????????????"')||(sessionStorage.getItem("last")=='"??????"')){

    }
    else
    {
    movepage("?????????")
      
    }

    settestvalue(!testvalue);
    console.log("logout");
  };
  const loginsuccess = (text) => {
    console.log(text);
    setModalIsOpen(false);
  };

  function movepage(text) {
    props.addPage(text);
    setModalIsOpen(true);
  }

  return (
    
    <div className="Main-base-class">
      <div className="Main-base-Header-container-class">
        <div className="Main-base-Header-class">
          {sessionStorage.getItem("userId") === null ? (
            <Header_nav value={text} getsetValue={getsetValue}></Header_nav>
          ) : (
            <Header_nav_login
              logoutsuccess={logoutsuccess}
              getsetValue={getsetValue}
            ></Header_nav_login>
          )}
          {/*<div className="test1" onClick={() => onChageClick2(getValue)}> emry</div>
                    {console.log("test:"+text+"get:"+getValue)}*/}
        </div>
      </div>
      <div className="Main-base-title-container-class">
        <div className="Main-base-title-class">
          <Main_title></Main_title>
        </div>
      </div>
      <div className="Main-base-rank-container-class">
        {/* <Main_rank value={text} getsetValue={getsetValue}>000000000</Main_rank> */}
        {/* <div className="Main-base-rank-class" onClick={(e)=>{onChageClick("??????",e)}}> */}
        <div className="Main-base-rank-class">
          <Main_rank getsetValue={getsetValue}></Main_rank>
        </div>
      </div>
      <div className="Main-base-list-container-class">
        <div className="Main-base-list-class">
          {/*<Main_list></Main_list>*/}
          <div
            className="Main-base-list-button"
            onClick={() => movepage("?????????_??????")}
          >
            <Main_Button name={"????????? ??????"}></Main_Button>
          </div>
          <div
            className="Main-base-list-button"
            onClick={() => movepage("????????????")}
          >
            <Main_Button name={"????????????"}></Main_Button>
          </div>
          <div
            className="Main-base-list-button"
            onClick={() => movepage("?????????_???_??????")}
          >
            <Main_Button name={"????????? ??? ??????"}></Main_Button>
          </div>

          <div
            className="Main-base-list-button"
            onClick={() => movepage("????????????")}
          >
            <Main_Button name={"????????????"}></Main_Button>
          </div>
        </div>
      </div>

      <ReactModal
        style={modal_style}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        {
          {
            ?????????_??????: <Board_main getsetValue2={getsetValue2}></Board_main>,
            ?????????????????????: <Board_inquire />,
            ?????????_?????????: <Board_write></Board_write>,
            ?????????_??????: <Board_rewrite />,
            ???????????????: <Mypage_myboard />,
            ????????????: (
              <Directed_main getsetValue2={getsetValue2}></Directed_main>
            ),
            ??????????????????: (
              <Directed_inquire
                getsetValue3={getsetValue3}
                id={sendid}
              ></Directed_inquire>
            ),
            ????????????_?????????: <Directed_write></Directed_write>,
            ????????????_??????: <Directed_rewrite />,

            ?????????_???_??????: <Bloodhouse_main></Bloodhouse_main>,
            ???????????????: <Mypage_main></Mypage_main>,

            ????????????: <Notice_main></Notice_main>,
            ??????????????????: <Notice_inquire></Notice_inquire>,
            ????????????_?????????: <Notice_write></Notice_write>,
            ???_??????_????????????: <Bloodpocket_card />,
            ????????????_??????: <Notice_rewrite />,
            ???_??????: <Bloodpocket_main />,
            ?????????: <Point_main />,
            ???????????????: <Change_info />,
            ?????????: <Login_main loginsuccess={loginsuccess}></Login_main>, //.....
            ?????????: <Message />,
            ?????????????????????: <Message_read />,
            ???????????????????????????: <Login_find />,
            ????????????: <Join_main></Join_main>,

            ??????: <Rank_main></Rank_main>,
          }[JSON.parse(window.sessionStorage.getItem("last"))]
        }
      </ReactModal>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    page: state.page,
    index: state.index,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addPage: (text) => dispatch(addPage(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main_base);
