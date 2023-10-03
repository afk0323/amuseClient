import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoimage from "../../../MainPage/MainImgs/amuse_logo.png";
import SearchIcon from "./search.svg";
import * as S from "./style";
import * as C from "./constants";

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
    <S.Logo>
      <S.Image
        src={logoimage}
        alt="Amuse Travel Logo"
        onClick={navigateToHome}
      />
      <S.Search>
        <S.Input
          type="text"
          placeholder={C.LOGO.SEARCH}
          value={searchKeyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <S.Button onClick={navigateToSearch}>
          <img src={SearchIcon} alt="Search Icon"></img>
        </S.Button>
      </S.Search>
    </S.Logo>
  );
}

export default Logo;
