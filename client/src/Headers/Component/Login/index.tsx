import { useNavigate } from "react-router-dom";
import moment from "moment";
import MyPageMenu from "../../../MyPages/MyPageMenu";

interface LoginProps {
  name: string | undefined;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  cookies: any;
  setCookie: (
    name: "__jwtk__" | "__igjwtk__" | "__jwtkid__" | "__usrN__",
    value: any,
    options?: object | undefined
  ) => void;
  removeCookie: (
    name: "__jwtk__" | "__igjwtk__" | "__jwtkid__" | "__usrN__",
    options?: object | undefined
  ) => void;
}

function Login({
  name,
  loggedIn,
  setLoggedIn,
  cookies,
  setCookie,
  removeCookie,
}: LoginProps) {
  const movePage = useNavigate();

  const navigateToHome = () => {
    movePage("/");
  };

  const navigateToLogIn = () => {
    movePage("/LogIn");
  };

  const navigateToSignUP = () => {
    movePage("/SignUP");
  };

  const handleLogout = () => {
    let token = cookies.__jwtkid__;
    setLoggedIn(false);
    const expires = moment().add("1", "m").toDate();
    setCookie("__igjwtk__", token, { expires });
    removeCookie("__jwtkid__", { path: "/", maxAge: 0 });
    removeCookie("__usrN__", { path: "/", maxAge: 0 });
    navigateToHome();
  };

  return (
    <div className="btnBox">
      {loggedIn ? (
        <div className="userName">{name || cookies.__usrN__} 님 😊</div>
      ) : (
        ""
      )}
      {loggedIn ? (
        <button className="loginBtn" onClick={handleLogout}>
          로그아웃
        </button>
      ) : (
        <button className="loginBtn" onClick={navigateToLogIn}>
          로그인
        </button>
      )}
      {loggedIn ? (
        <div>
          <MyPageMenu />
        </div>
      ) : (
        <button className="signInBtn" onClick={navigateToSignUP}>
          회원가입
        </button>
      )}
    </div>
  );
}

export default Login;
