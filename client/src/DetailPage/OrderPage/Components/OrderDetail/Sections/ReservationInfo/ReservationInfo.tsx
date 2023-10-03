import { CheckBox } from "@mui/icons-material";
import React, { useState } from "react";
import { useInfoContext } from "../../../../../Contexts/InfoContext";
import { CommonHeader } from "../../../CommonHeader";
import { InfoModal } from "../../../Modal/InfoModal";
import styles from "./Reservation.module.scss";
import { DetailSectionContainer } from "../../styles";
import { SubHeader } from "../../../../styles";

export function ReservationInfo() {
	const [showInfoModal, setInfoModal] = useState(false);
	const { name, email, phone } = useInfoContext(); // 이게 글로벌된 유저 정보라고 가정
	const [reservationPhoneNumber, setReservationPhoneNumber] = useState(phone);

	const clickHandler = (e: any) => {
		setInfoModal(true);
		document.body.style.overflow = "hidden";
	};

	// const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
	//   setUserInfo(!useUserInfo);
	// };
	const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let target = e.target.value;
		setReservationPhoneNumber(target.replace(/[^0-9]/g, ""));
	};
	return (
		<DetailSectionContainer>
			<SubHeader>예약자 정보</SubHeader>
			<div className={styles.infoContainer}>
				<ul className={styles.info}>
					{/* <li>
            <input
              type="checkbox"
              checked={useUserInfo}
              disabled={email === ""}
              onChange={changeHandler}
            />
            <label
              style={email === "" ? { color: "grey" } : { color: "black" }}
            >
              로그인 정보로 예약하기
            </label>
          </li> */}
					<li>
						<span>예약자 이름</span>
						<span>{name}</span>
					</li>
					<li>
						<span>이메일 주소</span>
						<span>{email}</span>
					</li>
					<li>
						<span>휴대폰 번호</span>
						<span>{phone}</span>
						<input
							type="phone"
							style={{
								padding: "0.5rem",
								width: "300px",
								border: "1px solid #efefef",
								backgroundColor: "#efefef",
								borderRadius: "3px",
							}}
							value={reservationPhoneNumber}
							onChange={(e) => {
								phoneNumberHandler(e);
							}}
						/>
					</li>

					<li>예약 안내 정보가 입력하신 이메일로 발송됩니다.</li>
				</ul>
				{/* <button
          type="button"
          className={styles.infoButton}
          onClick={clickHandler}
        >
          정보변경
        </button> */}
			</div>
			{showInfoModal && <InfoModal setInfoModal={setInfoModal} />}
		</DetailSectionContainer>
	);
}
