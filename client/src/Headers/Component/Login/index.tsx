import { useNavigate } from "react-router-dom";
import moment from "moment";
import MyPageMenu from "../../../MyPages/MyPageMenu";
import * as S from "./style";
import * as C from "./constants";

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
    <S.Login>
      {loggedIn ? (
        <S.Button>
          {name || cookies.__usrN__} {C.LOGIN.USER}
        </S.Button>
      ) : (
        ""
      )}
      {loggedIn ? (
        <S.Button onClick={handleLogout}>{C.LOGIN.LOGOUT}</S.Button>
      ) : (
        <S.Button onClick={navigateToLogIn}>{C.LOGIN.LOGIN}</S.Button>
      )}
      {loggedIn ? (
        <MyPageMenu />
      ) : (
        <S.Button onClick={navigateToSignUP}>{C.LOGIN.JOIN}</S.Button>
      )}
    </S.Login>
  );
}

export default Login;
