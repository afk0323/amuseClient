import React, { useEffect, useState } from "react";
import "./Header.css";
import axios from "axios";
import moment from "moment";
import Style from "../App.module.css";
import { isLoggedIn } from "../atoms";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useInfoContext } from "../DetailPage/Contexts/InfoContext";
import Login from "../Headers/Component/Login";
import Logo from "../Headers/Component/Logo";
import Menu from "../Headers/Component/Menu";

// mobileHeader === 1 모바일
// mobileHeader === 0 pc

function Header() {
  const movePage = useNavigate();
  const { name, setName } = useInfoContext();

  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  const [cookies, setCookie, removeCookie] = useCookies([
    "__jwtk__",
    "__igjwtk__",
    "__jwtkid__",
    "__usrN__",
  ]);
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
        let userData = response.data.data;
        setName(response.data.data?.name);
        const expires = moment().add("8", "h").toDate();
        setCookie("__usrN__", response.data.data?.name, { expires });
        if (!userData?.advertisementTrue) {
          setLoggedIn(false);
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
        <div>
          {mobileHeader === 1 && (
            <div style={{ paddingTop: "5px", paddingBottom: "10px" }}>
              {/* <Login
                name={name}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                cookies={cookies}
                setCookie={setCookie}
                removeCookie={removeCookie}
              /> */}
              <Logo />
              {/* <Menu /> */}
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
              <Menu />
            </div>
          )}
        </div>
      </div>
      <div className={Style["liner"]}></div>
    </div>
  );
}

export default Header;
