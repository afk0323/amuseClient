import React, {useState} from "react";
import MainComponent from "../MainComponent";
import { useNavigate } from "react-router-dom";
import "./FindAcc.scss";
import FindForm from "./FindForm";

interface FindIdProps {}

const FindId: React.FC<FindIdProps> = () => {
    const movePage = useNavigate();
    const [selectedTab, setSelectedTab] = useState<string>("findId");

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
                <nav className="find_account_tab">
                    <ul>
                        <li className={selectedTab === "findId" ? "selected" : ""} onClick={navigateToFindId}>아이디 찾기</li>
                        <li className={selectedTab === "findPw" ? "selected" : ""} onClick={navigateToFindPw}>비밀번호 찾기</li>
                    </ul>
                </nav>
                <div>
                    <FindForm onFindPasswordClick={function (): void {
                        throw new Error("Function not implemented.");
                    } } showPwForm={false} />
                </div>
            </div>
        </MainComponent>
    );
}

export default FindId;