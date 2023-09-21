import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoimage from "../../../MainPage/MainImgs/amuse_logo.png";
import SearchIcon from "./search.png";

function Logo() {
  const movePage = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  const navigateToHome = () => {
    movePage("/");
  };

  const navigateToSearch = () => {
    const encodedKeyword = encodeURIComponent(searchKeyword);
    movePage(`/search/${encodedKeyword}`);
    setSearchKeyword("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigateToSearch();
    }
  };

  return (
    <div className="top">
      <img
        className="logo"
        src={logoimage}
        alt="Amuse Travel Logo"
        onClick={navigateToHome}
      />
      <div className="search-box">
        <input
          type="text"
          placeholder="여행 키워드를 검색해보세요!"
          value={searchKeyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button className="searchBtn" onClick={navigateToSearch}>
          <img src={SearchIcon} alt="searchIcon"></img>
        </button>
      </div>
    </div>
  );
}

export default Logo;
