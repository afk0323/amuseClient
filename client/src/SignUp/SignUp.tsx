import React from "react";
// import GoogleIcon from "@mui/icons-material/Google";
import MainComponent from "../MainComponent";
import "./SignUp.css";
import GoogleIcon from "../LogIn/Icons/google_logo_2.png";
import KakaoIcon from "../LogIn/Icons/kakao_logo.png";
import NaverIcon from "../LogIn/Icons/naver_logo.png";
import AmuseIcon from "../LogIn/Icons/amuse_logo.png";

export default function SignUp() {
  const redirectU = "http://amusetravel.wheelgo.net/LoginAgree"
  return (
    <MainComponent>
      <div className="login_body">
        <h1 className="login_title">회원가입</h1>
        <div className="OAuth_2">
          {/* 어뮤즈 회원가입 */}
          <a className="signup_amuse signup_box" href="">
            어뮤즈 아이디로 회원가입
            <img src={AmuseIcon} alt="어뮤즈 로고" className="sns_logo_2" />
          </a>
          {/* 네이버 회원가입 */}
          <a
            className="signup_naver signup_box"
            href={`${process.env.REACT_APP_AMUSE_API}/oauth2/authorization/naver?redirect_uri=${redirectU}`}
          >
            네이버 아이디로 회원가입
            <img src={NaverIcon} alt="네이버 로고" className="sns_logo_2" />
          </a>
          {/* 카카오 회원가입 */}
          <a
            className="signup_kakao signup_box"
            href={`${process.env.REACT_APP_AMUSE_API}/oauth2/authorization/kakao?redirect_uri=${redirectU}`}
          >
            카카오 계정으로 회원가입
            <img src={KakaoIcon} alt="카카오 로고" className="sns_logo_2" />
          </a>
          {/* 구글 회원가입 */}
          <a
            className="signup_google signup_box"
            href={`${process.env.REACT_APP_AMUSE_API}/oauth2/authorization/google?redirect_uri=${redirectU}`}
          >
            구글 계정으로 회원가입
            <img src={GoogleIcon} alt="구글 로고" className="sns_logo_2" />
          </a>
        </div>
      </div>
    </MainComponent>
  );
}
