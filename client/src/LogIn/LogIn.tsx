import React, { useEffect, useState } from "react";
import "./LogIn.css";
import Header from "../Headers/Header";
import { Link, redirect, useSearchParams } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";
// import GoogleIcon from "@mui/icons-material/Google";
import { useRecoilState } from "recoil";
import { isLoggedIn } from "../atoms";
import { useNavigate } from "react-router-dom";
import AppStyle from "../App.module.css";
import axios from "axios";
import MainComponent from "../MainComponent";
import GoogleIcon from "./Icons/google_logo.png";
import KakaoIcon from "./Icons/kakao_logo.png";
import NaverIcon from "./Icons/naver_logo.png";
import SignUpIcon from "./Icons/signup_icon.png";

const Login: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loggedIn, setLoggedIn] = useRecoilState<boolean>(isLoggedIn);
	const navigate = useNavigate();

	let redirectUri = "http://localhost:3000/";
	if (process.env.REACT_APP_AMUSE_API === "https://amuseapi.wheelgo.net") {
		redirectUri = "http://localhost:3000/";
	}
	const axiosInstance = axios.create({
		withCredentials: true,
	});

	const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		console.log(e.target.value);
	};

	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		console.log(e.target.value);
	};

	useEffect(() => {
		if (loggedIn) {
			alert("이미 로그인 하였습니다.");
			navigate("/");
		}
	}, []);

	return (
		<MainComponent>
			<div className="login_body">
				<form className="login" action="/loginURL" method="post">
					<h1 className="login_title">로그인</h1>
					<div className="input">
						<div className="email">
							<EmailInput email={email} handleChangeEmail={handleChangeEmail} />
						</div>
						<div className="password">
							<PasswordInput password={password} handleChangePassword={handleChangePassword} />
						</div>
					</div>
					<div className="keep_id">
						<input type="checkbox" id="keep" className="keep_id_check" />
						<label htmlFor="keep" className="keep_id_text">아이디 저장</label>
					</div>
					<div className="login_btn_box">
						<button className="login_btn">
							<i className="fa-solid fa-door-open"></i>로그인
						</button>
					</div>
				</form>
				<div className="login_function_box">
					<div className="find_btn">
						<Link to="/LogIn/FindId" className="no_decoration">
							<span className="find_id">아이디 찾기</span>
						</Link>
						<Link to="/LogIn/FindPw" className="no_decoration">
							<span className="find_pw separator">비밀번호 찾기</span>
						</Link>
					</div>
					<div className="signup_btn_box">
						<Link to="/SignUp" className="no_decoration">
							<img src={SignUpIcon} className="signup_icon" />
							<span className="signup_link">회원가입</span>
						</Link>
					</div>
				</div>
				<div className="v_box">
					<div>간편 로그인</div>
					<div className="OAuth">
						<a
							className="login_google"
							href={`${process.env.REACT_APP_AMUSE_API}/oauth2/authorization/google?redirect_uri=${redirectUri}`}
						>
							<img src={GoogleIcon} alt="구글 로고" className="sns_logo" />
						</a>

						<a
							className="login_naver"
							href={`${process.env.REACT_APP_AMUSE_API}/oauth2/authorization/naver?redirect_uri=${redirectUri}`}
						>
							<img src={NaverIcon} alt="네이버 로고" className="sns_logo" />
						</a>
						<a
							className="login_kakao"
							href={`${process.env.REACT_APP_AMUSE_API}/oauth2/authorization/kakao?redirect_uri=${redirectUri}`}
						>
							<img src={KakaoIcon} alt="카카오 로고" className="sns_logo" />
						</a>
					</div>
				</div>
			</div>
		</MainComponent>
	);
}

export default Login;