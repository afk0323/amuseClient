import React, { useState } from "react";
import MainComponent from "../MainComponent";
import { useNavigate } from "react-router-dom";
import "./FindAcc.scss";
import FindForm from "./FindForm";

interface FindPwProps {}

const FindPw: React.FC<FindPwProps> = () => {
    const movePage = useNavigate();
    const [selectedTab, setSelectedTab] = useState<string>("findPw");
    const [showResetForm, setShowResetForm] = useState<boolean>(false);

    const navigateToFindId = () => {
        movePage("/LogIn/FindId");
        setSelectedTab("findId");
    };

    const navigateToFindPw = () => {
        movePage("/LogIn/FindPw");
        setSelectedTab("findPw");
    };

    return (
        <MainComponent>
            <div className="find_account">
                {/* 비밀번호 찾기 탭 */}
                {showResetForm === false && (
                    <div>
                        <nav className="find_account_tab">
                            <ul>
                                <li className={selectedTab === "findId" ? "selected" : ""} onClick={navigateToFindId}>아이디 찾기</li>
                                <li className={selectedTab === "findPw" ? "selected" : ""} onClick={navigateToFindPw}>비밀번호 찾기</li>
                            </ul>
                        </nav>
                        <div>
                            <FindForm showPwForm={selectedTab === "findPw"} onFindPasswordClick={() => setShowResetForm(true)} />
                        </div>
                    </div>
                )}
                {/* 비밀번호 재설정 폼 */}
                {showResetForm && (
                    <div className="reset_pw_body">
                        <div className="reset_pw">
                            <h1 className="reset_title">비밀번호 재설정</h1>
                            <div className="reset_pw_box">
                                <span className="input_pw_title">새 비밀번호</span>
                                <input type="password" className="input_pw" placeholder="새 비밀번호" />
                                <span className="input_pw_title">새 비밀번호 확인</span>
                                <input type="password" className="input_pw" placeholder="새 비밀번호 확인" />
                                <div className="note_box">
                                    <p className="note_title">ℹ️ 유의사항</p>
                                    <p className="note_content">• 비밀번호 설정 시 총 8자~20자로 설정해주세요.</p>
                                    <p className="note_content">• 영문 대/소문자, 숫자, 특수문자 등 두 종류 이상의 문자를 조합해 구성되어야 합니다.</p>
                                </div>
                            </div>
                            <div className="login_btn_box">
                                <button className="login_btn" >
                                    <i className="fa-solid fa-door-open"></i>변경하기
                                </button>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </MainComponent>
    );
}

export default FindPw;