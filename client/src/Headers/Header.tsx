import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./Header.css";
import axios from "axios";
import moment from "moment";
import SearchIcon from "./search.png";
import logoimage from "../MainPage/MainImgs/amuse_logo.png";
import Style from "../App.module.css";
import { isLoggedIn } from "../atoms";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useInfoContext } from "../DetailPage/Contexts/InfoContext";
import { useCategoryContext } from "./Contexts/CategoryContext";
import { CategoryNameMenuProps } from "../Interfaces/PropsInterfaces";

import Login from "../Headers/Component/Login";
import Logo from "../Headers/Component/Logo";

// mobileHeader === 1 모바일
// mobileHeader === 0 pc

interface MoreDropdownProps {
  // handleClick: () => void;
  // count: number;
}

function Header() {
  const movePage = useNavigate();
  const { name, setName } = useInfoContext();
  const { setCategoriesInfo } = useCategoryContext();
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  const [cookies, setCookie, removeCookie] = useCookies([
    "__jwtk__",
    "__igjwtk__",
    "__jwtkid__",
    "__usrN__",
  ]);

  const navigateToHome = () => {
    movePage("/");
  };

  const navigateToSubPageComp = (apiKey: number, cName: string) => {
    const apiKeyString: string = apiKey.toString();
    console.log(apiKey, "apiKey");
    if (cName === "home" || cName === "Home") {
      movePage("/");
    } else movePage(`/category/${apiKeyString}`);
  };

  const navigateToSearch = () => {
    const encodedKeyword = encodeURIComponent(searchKeyword);
    movePage(`/search/${encodedKeyword}`);
    setSearchKeyword("");
  };

  const CategoryMenu: React.FC<CategoryNameMenuProps> = ({
    categoryName: categoryName,
    handleClick,
  }) => (
    <div
      className={mobileHeader === 0 ? "menu-item" : "menu-item_mobile"}
      onClick={handleClick}
    >
      {categoryName}
    </div>
  );

  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  const MoreDropdown: React.FC<MoreDropdownProps> = () => (
    <div className="dropdown">
      {mobileHeader === 0 ? (
        categories.slice(4).map((categoryName: string, index: number) => (
          <div
            className="dropdown-item"
            key={index}
            onClick={() =>
              navigateToSubPageComp(categoryIds[index + 4], categoryName)
            }
          >
            {categoryName}
          </div>
        ))
      ) : (
        <>
          {categories.slice(2).map((categoryName: string, index: number) => (
            <div
              className="dropdown-item"
              key={index}
              onClick={() =>
                navigateToSubPageComp(categoryIds[index + 2], categoryName)
              }
            >
              {categoryName}
            </div>
          ))}
        </>
      )}
    </div>
  );

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/main/category`)
      .then((response) => {
        const categoryAll = response.data.data.categories;
        const categorySort: any | [] = _.sortBy(categoryAll, "sequence");
        const categoryNames = categorySort.map((id: any) => id.categoryName);
        setCategoriesInfo(categorySort);
        setCategories(categoryNames);
        const categoryId = categoryAll.map((id: any) => id.categoryId);
        setCategoryIds(categoryId);
      })
      .catch((error) => {
        console.log("해시태그 연결 실패");
      });
  }, []);

  const [searchKeyword, setSearchKeyword] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigateToSearch();
    }
  };

  const [mobileHeader, setMobileHeader] = useState(0);
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 700) {
      setMobileHeader(0);
    } else {
      setMobileHeader(1);
    }
  };
  useEffect(() => {
    handleResize(); // Call initially
    window.addEventListener("resize", handleResize); // Add event listener for window resize
    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener on component unmount
    };
  }, []);

  useEffect(() => {
    let getToken: string | null = cookies.__jwtkid__;
    console.log("getToken ", getToken);
    if (
      cookies.__usrN__ &&
      (!cookies.__jwtkid__ || cookies.__jwtkid__ === "undefined")
    ) {
      removeCookie("__usrN__");
    }
    if (cookies.__jwtkid__) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    if (
      !cookies.__usrN__ ||
      cookies.__usrN__ === "undefined" ||
      !cookies.__jwtkid__ ||
      cookies.__jwtkid__ === "undefined"
    ) {
      setLoggedIn(false);
    }
  }, [cookies]);

  useEffect(() => {
    let locationString = window.location.toString();
    if (locationString.includes("http://localhost:3000/?access-token")) {
      let token: string | null = new URL(window.location.href).searchParams.get(
        "access-token"
      );
      if (token === null) {
        return;
      } else {
        const expires = moment().add("8", "h").toDate();
        setCookie("__jwtkid__", token, { expires });
        setLoggedIn(true);
        getUserInfoAsToken(token);
        movePage("/");
      }
    } else if (locationString.includes("amusetravel.wheelgo.net/")) {
      let token: string | null = cookies.__jwtk__;
      let igToken: string | null = cookies.__igjwtk__;
      if (!token && token !== "undefined") {
        return;
      } else if (igToken && igToken?.length > 0 && token === igToken) {
        return;
      } else {
        // localStorage.setItem("loginToken", token);
        const expires = moment().add("8", "h").toDate();
        setCookie("__jwtkid__", token, { expires });
        setLoggedIn(true);
        getUserInfoAsToken(token);
      }
    }
  }, []);

  const getUserInfoAsToken = async (token: string) => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/login/info`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        // setUserData(response.data.data);
        let userData = response.data.data;
        setName(response.data.data?.name);
        const expires = moment().add("8", "h").toDate();
        setCookie("__usrN__", response.data.data?.name, { expires });
        if (!userData?.advertisementTrue) {
          setLoggedIn(false);
          // setManager(false);
          movePage("/LoginAgree");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className={Style["App"]}>
        {/* 모바일 버전 */}
        <div className={`${mobileHeader === 1 ? "mobile-header" : ""}`}>
          {mobileHeader === 1 && (
            <div style={{ paddingTop: "5px", paddingBottom: "10px" }}>
              <Login
                name={name}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                cookies={cookies}
                setCookie={setCookie}
                removeCookie={removeCookie}
              />
              <Logo />
              <div className="menu">
                {categories.length <= 2 ? (
                  categories.map((categoryName: string, index: number) => (
                    <CategoryMenu
                      key={index}
                      categoryName={categoryName}
                      handleClick={() =>
                        navigateToSubPageComp(categoryIds[index], categoryName)
                      }
                    />
                  ))
                ) : (
                  <>
                    {categories
                      .slice(0, 2)
                      .map((categoryName: string, index: number) => (
                        <CategoryMenu
                          key={index}
                          categoryName={categoryName}
                          handleClick={() =>
                            navigateToSubPageComp(
                              categoryIds[index],
                              categoryName
                            )
                          }
                        />
                      ))}
                    <div className="menu-item_mobile more-dropdown">
                      더보기 ▼
                      <MoreDropdown />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* pc 버전 */}
          {mobileHeader === 0 && (
            <div>
              <Login
                name={name}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                cookies={cookies}
                setCookie={setCookie}
                removeCookie={removeCookie}
              />
              <Logo />
              <div className="menu">
                {categories.length <= 5 ? (
                  categories.map((categoryName: string, index: number) => (
                    <CategoryMenu
                      key={index}
                      categoryName={categoryName}
                      handleClick={() =>
                        navigateToSubPageComp(categoryIds[index], categoryName)
                      }
                    />
                  ))
                ) : (
                  <>
                    {categories
                      .slice(0, 5)
                      .map((categoryName: string, index: number) => (
                        <CategoryMenu
                          key={index}
                          categoryName={categoryName}
                          handleClick={() =>
                            navigateToSubPageComp(
                              categoryIds[index],
                              categoryName
                            )
                          }
                        />
                      ))}
                    <div className="menu-item more-dropdown">
                      더보기 ▼
                      <MoreDropdown />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={Style["liner"]}></div>
    </div>
  );
}

export default Header;
