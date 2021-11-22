import "./S3fileUpload.css";
import { useState } from "react";
import AWS from "aws-sdk";
import { Row, Col, Button, Input, Alert } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import * as successAlert from "../MakeAlert/successAlert.js"
import * as S3secret from "./S3SecretKey.js"

const CryptoJS = require("crypto-js");
const gmbien = CryptoJS.AES.decrypt(S3secret.geinbge, "longhair").toString(
  CryptoJS.enc.Utf8
);
const nsigh = CryptoJS.AES.decrypt(S3secret.lysein, "longhair").toString(
  CryptoJS.enc.Utf8
);
const qwren = CryptoJS.AES.decrypt(S3secret.fsesgs, "longhair").toString(
  CryptoJS.enc.Utf8
);
const ihtnw = CryptoJS.AES.decrypt(S3secret.gnkesg, "longhair").toString(
  CryptoJS.enc.Utf8
);

AWS.config.update({
  accessKeyId: gmbien,
  secretAccessKey: nsigh,
});

const myBucket = new AWS.S3({
  params: { Bucket: ihtnw },
  region: qwren,
});

function S3Upload(props) {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [end, setend] = useState(false);
  const [filebuffer, setFilebuffer] = useState("");

  const uploadFile = (file) => {
    const profile_params = {
      ACL: "public-read",
      Body: file,
      Bucket: ihtnw,
      Key: "profile/" + uuidv4() + "." + filebuffer,
    };

    //  myBucket.putObject(params)
    //   .on('httpUploadProgress', (evt) => {
    //     setProgress(Math.round((evt.loaded / evt.total) * 100))
    //     setShowAlert(true);
    //     setTimeout(() => {
    //       setShowAlert(false);
    //       setSelectedFile(null);
    //     }, 3000)
    //   })
    //   .send((err) => {
    //     if (err) {console.log(err)
    //     alert("파일 업로드가 실패되었습니다.")}
    //     else console.log(params.Key) //props.getfilename(params.Key)
    //   })

    myBucket.putObject(profile_params, (err, data) => {
      successAlert.successAlert("이미지 업로드가 완료되었습니다.");
      props.getfilename(
        "https://bloodrecovery.s3.us-east-2.amazonaws.com/" + profile_params.Key
      );
      console.log(profile_params.Key);
      console.log(err);
      console.log(data);
    });

    setend(true);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
   
    const fileExt = file?.name.split(".").pop();
    setFilebuffer(fileExt);
    if (
      fileExt.toLowerCase() === "png" ||
      fileExt.toLowerCase() === "jpeg" ||
      fileExt.toLowerCase()=== "jpg"
    ) {
      setProgress(0);
      console.log("wowwer", file);
      setSelectedFile(e.target.files[0]);
    } else {
      successAlert.errorAlert("png, jpeg, jpg 파일만 업로드 가능합니다.");
    }
  };
  return (
    <div className="S3fileUpload-container">
      <div className="S3fileUpload-body">
        <Row>
          <Col>
            {showAlert ? (
              <Alert color="primary">업로드 진행률 : {progress}%</Alert>
            ) : end === false ? (
              <Alert color="primary">파일을 선택해 주세요.</Alert>
            ) : (
              <Alert color="primary">업로드 완료창을 확인해주세요.</Alert>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Input color="primary" type="file" onChange={handleFileInput} />
            {selectedFile ? (
              <Button color="primary" onClick={() => uploadFile(selectedFile)}>
                {" "}
                파일 업로드
              </Button>
            ) : null}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default S3Upload;
