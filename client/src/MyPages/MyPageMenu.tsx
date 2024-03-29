import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "./MyPageMenu.css";
import { useNavigate } from "react-router-dom";

export default function MyPageMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const navigateToSettings = () => {
    navigate("/MyPage/Settings");
    setAnchorEl(null);
  };
  const navigateToLikes = () => {
    navigate("/MyPage/Likes");
    setAnchorEl(null);
  };
  const navigateToNotifications = () => {
    navigate("/MyPage/Notifications");
    setAnchorEl(null);
  };
  // const navigateToInquiries = () => {
  //   navigate("/MyPage/Inquiries");
  //   setAnchorEl(null);
  // };
  const navigateToOrders = () => {
    navigate("/MyPage/Orders");
    setAnchorEl(null);
  };
  // const navigateToQuotes = () => {
  //   navigate("/MyPage/Quotes");
  //   setAnchorEl(null);
  // };
  // const navigateToBills = () => {
  //   navigate("/MyPage/Bills");
  //   setAnchorEl(null);
  // };
  return (
    <>
      <Button
        id="basic-button"
        className="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          width: "100px",
          height: "40px",
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          color: "black",
          fontSize: "14px",
          fontFamily:"Pretendard-Regular",
        }}
      >
        마이페이지
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={navigateToSettings}>
          <SettingsIcon />
          <div className="mypage_category_item">설정</div>
        </MenuItem>
        <MenuItem onClick={navigateToLikes}>
          <FavoriteIcon />
          <div className="mypage_category_item">관심상품</div>
        </MenuItem>
        {/* <MenuItem onClick={navigateToNotifications}>
          <NotificationsIcon />
          <div className="mypage_category_item">알림</div>
        </MenuItem> */}
        {/* <MenuItem onClick={navigateToInquiries}>
          <RoomServiceIcon />
          <div className="mypage_category_item">문의</div>
        </MenuItem> */}
        {/* <MenuItem onClick={navigateToOrders}>
          <CalendarMonthIcon />
          <div className="mypage_category_item">주문상품</div>
        </MenuItem> */}
        {/* <MenuItem onClick={navigateToQuotes}>
          <CreditCardIcon />
          <div className="mypage_category_item">상품견적</div>
        </MenuItem>
        <MenuItem onClick={navigateToBills}>
          <AssignmentIcon />
          <div className="mypage_category_item">맞춤견적</div>
        </MenuItem> */}
      </Menu>
    </>
  );
}
