import { ChangeEvent, useState } from "react";
import { CommonHeader } from "../../../CommonHeader";
import styles from "./Payment.module.scss";
import kakaoImage from "../../../../Images/kakao.png";
import tossImage from "../../../../Images/toss.png";
import NpayImage from "../../../../Images/npay.png";
import { useOrderContext } from "../../../../../Contexts/OrderContext";
import { DetailSectionContainer } from "../../styles";
import { SubHeader } from "../../../../styles";

export function PaymentMethod() {
	const { orderData, setOrderData } = useOrderContext();

	const clickHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const data = { ...orderData };
		data[name] = value;
		setOrderData(data);
	};
	return (
		<DetailSectionContainer>
			<SubHeader>결제 방법</SubHeader>
			<ul className={styles.paymentContainer}>
				<li>
					<input
						id="check1"
						type="radio"
						name="pay_method"
						value={"계좌이체"}
						checked={orderData.pay_method === "계좌이체"}
						onChange={clickHandler}
					/>
					<label htmlFor="check1">
						<span>계좌이체</span>
						<span className={styles.addInfo}>
							계좌이체시 3000 포인트 추가지급
						</span>
					</label>
				</li>
				<li>
					<input
						id="check2"
						type="radio"
						name="pay_method"
						value={"신용/체크카드"}
						checked={orderData.pay_method === "신용/체크카드"}
						onChange={clickHandler}
					/>
					<label htmlFor="check2">
						<span>신용/체크카드</span>
					</label>
				</li>
				<li>
					<input
						id="check3"
						type="radio"
						name="pay_method"
						value={"토스페이"}
						checked={orderData.pay_method === "토스페이"}
						onChange={clickHandler}
					/>
					<label htmlFor="check3">
						<span>
							토스페이{" "}
							<img src={tossImage} style={{ width: "68px" }} />
						</span>
					</label>
				</li>
				<li>
					<input
						id="check4"
						type="radio"
						name="pay_method"
						value={"카카오페이"}
						checked={orderData.pay_method === "카카오페이"}
						onChange={clickHandler}
					/>
					<label htmlFor="check4">
						<span>
							카카오페이 <img src={kakaoImage} />
						</span>
					</label>
				</li>
				<li>
					<input
						id="check5"
						type="radio"
						name="pay_method"
						value={"네이버페이"}
						checked={orderData.pay_method === "네이버페이"}
						onChange={clickHandler}
					/>
					<label htmlFor="check5">
						<span>
							네이버페이 <img src={NpayImage} />
						</span>
					</label>
				</li>
			</ul>
		</DetailSectionContainer>
	);
}
