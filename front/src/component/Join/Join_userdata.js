import react, { useCallback, useState } from "react";
import "./Join_userdata.css";
import Common_Button from "../Common/Button/Common_Button";
import axios from "axios";
import { connect } from "react-redux";
import { addPage } from "../../component/Modalmove/subscribers/action";
import * as successAlert from "../Common/MakeAlert/successAlert.js";

const Join_userdata = (props) => {
  const [btnnickname, setBtnNickname] = useState(false);
  const [btnid, setBtnid] = useState(false);
  const [btnRegister, setBtnRegister] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const [idCheck, setIdCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [passwordconfirmCheck, setPasswordconfirmCheck] = useState(false);
  const [nameCheck, setNameCheck] = useState(false);
  const [resister1Check, setResister1Check] = useState(false);
  const [resister2Check, setResister2Check] = useState(false);
  const [inputs, setInputs] = useState({
    join_nickname: "",
    join_id: "",
    join_password: "",
    join_passwordconfirm: "",
    join_name: "",
    join_register1: "",
    join_register2: "",
  });
  var nicknameEXP = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9_-]{2,20}$/;
  var idEXP = /^[a-zA-Z0-9_]{5,20}$/;
  var passwordEXP = /^[a-zA-Z0-9~!@#$%^&*()_]{8,16}$/;
  var nameEXP = /^[ㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;
  var register1EXP = /^[0-9]{6}$/;
  var register2EXP = /^[0-9]{7}$/;
  var encPassword = "";
  var encRegister = "";

  const {
    join_nickname,
    join_id,
    join_password,
    join_passwordconfirm,
    join_name,
    join_register1,
    join_register2,
  } = inputs;
  const join_agreement = false;
  const onChange1 = (e) => {
    setAgreement(!agreement);
  };
  const onChange = (e) => {
    const { name, value } = e.target;

    const nextInputs = {
      ...inputs,
      [name]: value,
    };
    //만든 변수를 seInput으로 변경해준다.
    setInputs(nextInputs);

    setInputs({
      //스프레드 문법으로 기존의 객체를 복사한다.
      ...inputs,
      [name]: value,
    });

    if (name === "join_nickname") {
      setNicknameCheck(nicknameEXP.test(e.target.value));
    } else if (name === "join_id") {
      setIdCheck(idEXP.test(e.target.value));
    } else if (name === "join_password") {
      setPasswordCheck(passwordEXP.test(e.target.value));
    } else if (name === "join_passwordconfirm") {
      //RegExp라는 형식이 따로있다.

      // const passwordconfirmEXP =new RegExp(join_password)
      setPasswordconfirmCheck(join_password === e.target.value);
    } else if (name === "join_name") {
      setNameCheck(nameEXP.test(e.target.value));
    } else if (name === "join_register1") {
      setResister1Check(register1EXP.test(e.target.value));
    } else if (name === "join_register2") {
      setResister2Check(register2EXP.test(e.target.value));
    }
  };
  const idoverlap = () => {
    if (idEXP.test(join_id) === false) {
      successAlert.errorAlert("아이디 양식에 맞춰 입력해주세요.");
    } else if (idEXP.test(join_id) === true) {
      axios
        .get(
          "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/idCheck/" +
            join_id
        )
        .then(function (res) {
          //false면 가입불가능 true면 가입가능
          if (res.data.result === true) {
            successAlert.successAlert("사용가능한 아이디입니다.");

            setBtnid(idEXP.test(join_id));
          } else {
            successAlert.errorAlert("중복된 아이디입니다.");
          }
        });
    }
  };

  const nicknameoverlap = () => {
    if (nicknameEXP.test(join_nickname) === false) {
      successAlert.errorAlert("닉네임 양식에 맞춰 입력해주세요.");
    } else if (nicknameEXP.test(join_nickname) === true) {
      axios
        .get(
          "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/nicknameCheck/" +
            inputs.join_nickname
        )
        .then(function (res) {
          //false면 가입불가능 true면 가입가능
          if (res.data.result === true) {
            successAlert.successAlert("사용가능한 아이디입니다.");
            setBtnNickname(nicknameEXP.test(join_nickname));
          } else {
            successAlert.errorAlert("중복된 닉네임입니다.");
          }
        });
    }
  };

  const registeroverlap = () => {
    if (resister1Check === false || resister2Check === false) {
      successAlert.errorAlert("주민등록번호를 입력해주세요.");
    } else if (resister1Check === true && resister2Check === true) {
      axios
        .post(
          "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/verify",
          {
            name: inputs.join_name,
            personalNumber: join_register1 + join_register2,
          }
        )
        .then(function (res) {
          if (res.data.result === true) {
            successAlert.successAlert("실명인증이 완료되었습니다.");
            setBtnRegister(true);
          }
        });
    }
  };

  const encryption = () => {
    const CryptoJS = require("crypto-js");
    encPassword = CryptoJS.AES.encrypt(join_password, "longhair").toString();
    encRegister = CryptoJS.AES.encrypt(
      join_register1 + join_register2,
      "longhair"
    ).toString();
  };

  const valueCheck = () => {
    // 1은 동의체크
    // 2는 빈칸/유효성 체크
    // 3은 닉네임 중복확인체크
    // 4는 아이디 중복확인체크
    // 5는 비밀번호 확인 체크
    // 6은 성명과 주민등록번호 인증 체크
    if (!agreement) {
      //동의
    } else if (!nicknameCheck) {
      successAlert.errorAlert("닉네임을 확인해주세요.");
    } else if (!idCheck) {
      successAlert.errorAlert("아이디를 확인해주세요.");
    } else if (!passwordCheck) {
      successAlert.errorAlert("비밀번호를 확인해주세요.");
    } else if (!passwordconfirmCheck) {
      successAlert.errorAlert("비밀번호 확인을 확인해주세요.");
    } else if (!nameCheck) {
      successAlert.errorAlert("성명을 확인해주세요");
    } else if (!resister1Check || !resister2Check) {
      successAlert.errorAlert("주민등록번호를 확인해주세요.");
    } else if (!btnnickname) {
      successAlert.errorAlert("닉네임을 중복확인해주세요.");
    } else if (!btnid) {
      successAlert.errorAlert("아이디를 중복확인해주세요.");
    } else if (!btnRegister) {
      successAlert.errorAlert("실명 인증을 해주세요.");
    } else {
      encryption();

      axios
        .post(
          "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/register",
          {
            userId: join_id,
            password: encPassword,
            name: join_name,
            nickname: join_nickname,
            personalNumber: encRegister,
          }
        )
        .then((res) => successAlert.successAlert("회원가입이 완료되었습니다."));
      props.addPage("로그인");
    }
  };

  return (
    <div className="Join-userdata-class">
      <div className="Join-checkbox-class">
        <input
          type="checkbox"
          name="join_agreement"
          onChange={onChange1}
          value={join_agreement}
          className="Join-checkbox-input-class"
          id="Join-checkbox-checkbox-id"
        />
        <label
          className="Join-checkbox-text-class"
          htmlFor="Join-checkbox-checkbox-id"
        >
          동의합니다
        </label>
      </div>
      <div className="Join-usesrdata-nickname">
        <div className="Join-userdata-nickname-text-class">
          <div className="Textbox">
            <span className="Textbox-name-class" htmlFor="Textbox-class">
              닉네임
            </span>
            <input
              type="text1"
              name="join_nickname"
              value={join_nickname}
              onChange={onChange}
              className="Textbox-class"
            />
          </div>
          <div
            className="Join-userdata-button-class1"
            onClick={nicknameoverlap}
          >
            <Common_Button name="중복확인"></Common_Button>
          </div>
        </div>

        <div
          className="Join-userdata-notice-class"
          style={nicknameCheck === true ? { color: "green" } : { color: "red" }}
        >
          <p>영문, 한글, 숫자 '-' 포함 2~20자 이내</p>
        </div>
      </div>

      <div className="Join-usesrdata-id-class">
        <div className="Join-userdata-nickname-text-class">
          <div className="Textbox">
            <span className="Textbox-name-class" htmlFor="Textbox-class">
              아이디
            </span>
            <input
              type="text1"
              name="join_id"
              value={join_id}
              onChange={onChange}
              className="Textbox-class"
            ></input>
          </div>
        </div>
        <div className="Join-userdata-button-class" onClick={idoverlap}>
          <Common_Button name={"중복확인"}></Common_Button>
        </div>
        <div
          className="Join-userdata-notice2-class"
          style={idCheck === true ? { color: "green" } : { color: "red" }}
        >
          <p>영문, 숫자 '-' 포함 5~20자 이내</p>
        </div>
      </div>
      <div className="Join-userdata-nickname-text-class">
        <div className="Textbox">
          <span className="Textbox-name-class" htmlFor="Textbox-class">
            비밀번호
          </span>
          <input
            type="text1"
            name="join_password"
            value={join_password}
            onChange={onChange}
            className="Textbox-class"
          />
        </div>
      </div>
      <div
        className="Join-userdata-notice3-class"
        style={passwordCheck ? { color: "green" } : { color: "red" }}
      >
        <p>영문, 숫자 '~!@#$%^&*()_' 포함 8~16자 이내</p>
      </div>
      <div className="Join-userdata-nickname-text-class">
        <div className="Textbox">
          <span className="Textbox-name-class" htmlFor="Textbox-class">
            비밀번호 확인
          </span>
          <input
            type="text1"
            name="join_passwordconfirm"
            value={join_passwordconfirm}
            onChange={onChange}
            className="Textbox-class"
          ></input>
        </div>
      </div>
      <div
        className="Join-userdata-notice4-class"
        style={passwordconfirmCheck ? { color: "green" } : { color: "red" }}
      >
        {passwordconfirmCheck ? (
          <p>비밀번호가 일치합니다.</p>
        ) : (
          <p>비밀번호가 일치하지않습니다.</p>
        )}
      </div>
      <div className="Join-userdata-nickname-text-class">
        <div className="Textbox">
          <span className="Textbox-name-class" htmlFor="Textbox-class">
            성명
          </span>
          <input
            type="text1"
            name="join_name"
            value={join_name}
            onChange={onChange}
            className="Textbox-class"
          ></input>
        </div>
      </div>
      <div
        className="Join-userdata-notice5-class"
        style={nameCheck ? { color: "green" } : { color: "red" }}
      >
        <p>한글 포함 2~20자 이내</p>
      </div>
      <div className="Join-userdata-nickname-text-class">
        <div className="Textbox">
          <span className="Textbox-name-class" htmlFor="Textbox-class">
            주민등록번호
          </span>
          <input
            type="text1"
            maxLength="6"
            name="join_register1"
            value={join_register1}
            onChange={onChange}
            className="Textbox1-class"
          ></input>
          <p className="Join-userdata-register-p-class">-</p>
          <input
            type="text1"
            maxLength="7"
            name="join_register2"
            value={join_register2}
            onChange={onChange}
            className="Textbox1-class"
          ></input>
        </div>
      </div>
      <div className="Join-userdata-button-class" onClick={registeroverlap}>
        <Common_Button name="인증"></Common_Button>
      </div>
      <div className="Join-userdata-complete-btn-container-class">
        <div className="Join-userdata-complete-btn-class" onClick={valueCheck}>
          <Common_Button name="가입완료"></Common_Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Join_userdata);
