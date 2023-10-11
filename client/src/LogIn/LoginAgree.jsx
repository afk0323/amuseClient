import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import axios from "axios";
import _ from "lodash";
import logoimage from "../MainPage/MainImgs/logo.png";
import { useRecoilState } from "recoil";
import { isLoggedIn } from "../atoms";
import { useCookies } from "react-cookie";
import moment from "moment";
import { useNavigate } from "react-router";

const LoginAgree = () => {
    const movePage = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["__jwtkid__"]);
    const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
    const [privacy, setPrivacy] = useState(false)
    const [marketingAgree, setMarketingAgree] = useState(false)
    const [isShow, setIsShow] = useState(false)

    const getUserInfoAsToken = async () => {

        axios
            .get(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/login/info`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${cookies.__jwtkid__}`,
                },
            })
            .then((response) => {
                let userData = response.data.data
                console.log(userData)
                if (userData?.advertisementTrue === true) {
                    movePage("/")
                } else {
                    setIsShow(true)
                }

            })
            .catch((err) => {
                console.log(err);
            });
    };


    const submitAgree = async () => {
        const token = cookies["__jwtkid__"]
        const requestBody = {
            advertisement_true: marketingAgree,
            "phone_number": "",
            "over_14_age_true": false
        };
        console.log(requestBody, {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
        })
        axios.post(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/login/info`, requestBody, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            },
        }).then((response) => {
            // console.log(response)
            movePage("/")
        }).catch((err) => {

        })
    }
    const handleLogout = () => {
        setLoggedIn(false)
        let token = cookies.__jwtkid__
        const expires = moment().add("1", "m").toDate();
        setCookie("__igjwtk__", token, { expires });
        removeCookie("__jwtkid__", { path: "/", maxAge: 0 });
        movePage("/");
    };

    useEffect(() => {
        getUserInfoAsToken()
    }, [])

    if (!isShow) {
        return (<></>)
    } else {
        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <CancelBtn onClick={() => { handleLogout() }}>취소</CancelBtn>
                <div style={{
                    width: "90%", maxWidth: "348px", height: "auto", display: "flex", flexDirection: "column", justifyContent: "center",
                    alignItems: "center", textAlign: "center", fontSize: "18px", fontFamily: "yg-jalnan"
                }}>
                    <img className="logo_mobile" style={{ marginTop: "28px" }} src={logoimage} alt="Amuse Travel Logo" />
                    <div style={{ marginTop: "20px" }}>{"모두를 위한 여행,"}</div>
                    <div>{"어뮤즈 트래블에 오신것을 "}</div>
                    <div>{"환영합니다"}</div>
                </div>
                <div style={{ width: "90%", maxWidth: "348px", height: "120px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                    <div>
                        {"당사의 서비스를 이용하시기 위해서는"}
                        <br />
                        {"아래 약관에 대한 동의가 필요합니다."}
                    </div>
                </div>
                <div style={{ border: "2px solid #828282", borderBottom: "0px", width: "90%", maxWidth: "360px", minHeight: "180px" }}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "28px", marginTop: "28px" }}>
                        <input type="checkbox" style={{ margin: "0px", marginLeft: 24 }} value={marketingAgree} onChange={() => { setPrivacy(!privacy) }} />
                        <div style={{ marginLeft: 24, width: "calc(100% - 100px)" }}>{"개인정보 활용동의 (필수)"}</div>
                        <ReadText>보기</ReadText>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "28px", marginTop: "28px" }}>
                        <input type="checkbox" style={{ margin: "0px", marginLeft: 24 }} value={marketingAgree} onChange={() => { setMarketingAgree(!marketingAgree) }} />
                        <div style={{ marginLeft: 24, width: "calc(100% - 100px)" }}>{"마케팅정보 활용동의 (선택)"}</div>
                        <ReadText>보기</ReadText>
                    </div>
                </div>
                <AgreeButton onClick={() => { submitAgree() }}>
                    {"확인"}
                </AgreeButton>
            </div>

        )
    }
}
export default LoginAgree

const AgreeButton = styled.div`
    width:90%;
    max-width: 360px;
    height: 56px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#e6003d;
    color:#fff;
    font-size:20px;
    border:2px solid #828282;
    border-top:0px;
    cursor:pointer;

    &:hover{
        background-color:#828282;
    }
`;
const ReadText = styled.div`
    display:flex;
    align-items:center;
    width:32;
    height:24;
    font-size:12px;
    cursor:pointer;
    color:rgb(120,120,120);

    &:hover{
        color:#e6003d;
    }
`;
const CancelBtn = styled.div`
    width: 100%;
    max-width: 348px;
    display: flex;
    flex-direction: row-reverse;
    margin-top: 20px;
    margin-right: 12px;

    &:hover{
        color :#e6003d;
    }
`;