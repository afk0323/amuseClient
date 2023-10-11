import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindAcc.scss";

interface VerificationFormProps {
    option: string;
    selectedOption: string;
    showPwForm: boolean;
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

function VerificationForm(props: VerificationFormProps) {
    const { option, selectedOption, showPwForm, setSelectedOption  } = props;
    // const { showPwForm } = props;
    return (
        <div className={`inn_box ${option}_box_sub ${selectedOption === option ? "show" : "hide"}`}>
            {showPwForm && (
                <input type="text" className="input_text" placeholder="아이디(이메일계정)" />
            )}
            <div className="flex_box_sub">
                <input type="text" className="input_text input_name" placeholder="이름" />
                <div className="input_gender">
                    <input type="radio" name="gender" id="male" />
                    <label htmlFor="male" className="first_label">남</label>
                    <input type="radio" name="gender" id="female" />
                    <label htmlFor="female" className="last_label">여</label>
                </div>
            </div>
            <div className="birth_box">
                <input type="text" className="input_text" placeholder="생년월일" maxLength={6} />
                <button className="inn_btn name_request_btn">실명인증 요청</button>
            </div>
            <div className={`${option}_box`}>
                <input type="text" className="input_text" placeholder={option === "email" ? "이메일" : "전화번호"} />
                <button className="inn_btn auth_request_btn">인증번호 요청</button>
            </div>
            <div className="auth_box">
                <input type="text" className="input_text" placeholder="인증번호" maxLength={6} />
                <button className="inn_btn auth_btn">인증하기</button>
            </div>
        </div>
    );
}

interface FindFormProps {
    onFindPasswordClick: () => void;
    showPwForm: boolean;
}

const FindForm: React.FC<FindFormProps> = (props) => {
    const movePage = useNavigate();
    const [selectedOption, setSelectedOption] = useState("sms");
    const { showPwForm } = props;

    return (
        <div className="find_body">
            <form action="" method="post" className="find_form">
                <fieldset>
                    {/* 문자 인증 */}
                    <div className="sms_box">
                        <div className="find_title_box">
                            <input type="radio" id="sms_box_btn" checked={selectedOption === "sms"} onChange={() => setSelectedOption("sms")} />
                            <label htmlFor="sms_box_btn" className="find_title">문자로 찾기</label>
                        </div>
                        <VerificationForm option="sms" selectedOption={selectedOption} setSelectedOption={setSelectedOption} showPwForm={false} />
                    </div>
                    {/* 이메일 인증 */}
                    <div className="email_box">
                        <div className="find_title_box">
                            <input type="radio" id="email_box_btn" checked={selectedOption === "email"} onChange={() => setSelectedOption("email")} />
                            <label htmlFor="email_box_btn" className="find_title">이메일로 찾기</label>
                        </div>
                        <VerificationForm option="email" selectedOption={selectedOption} setSelectedOption={setSelectedOption} showPwForm={false} />
                    </div>
                    {/* 휴대폰 인증 */}
                    <div className="phone_box">
                        <div className="find_title_box">
                            <input type="radio" id="phone_box_btn" checked={selectedOption === "phone"} onChange={() => setSelectedOption("phone")} />
                            <label htmlFor="phone_box_btn" className="find_title">휴대폰 본인인증으로 찾기</label>
                        </div>
                        <div className={`phone_box_sub ${selectedOption === "phone" ? "show" : "hide"}`}>
                            <div>안내사항</div>
                            <div>본인 명의 휴대폰 본인인증 시 제공되는 정보는 본인인증기관에서 직접 수집하며, 인증 이외의 용도로 이용하거나 저장하지 않습니다.</div>
                        </div>
                    </div>
                    {/* 찾기 버튼 */}
                    <div className="login_btn_box">
                        <button className="login_btn" onClick={(event) => {
                            event.preventDefault();
                            props.onFindPasswordClick();
                        }}>
                            <i className="fa-solid fa-door-open"></i>
                            {showPwForm ? '비밀번호 찾기' : '아이디 찾기'}
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default FindForm;