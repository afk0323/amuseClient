import { useEffect, useState } from "react";
import Style from "../../App.module.css";
import Footer from "../../Footers/Footer";

import styles from "./OrderPage.module.scss";

import { OrderForm } from "./Components/OrderForm";
import { useOrderContext } from "../Contexts/OrderContext";
import { useNavigate } from "react-router-dom";
import MainComponent from "../../MainComponent";
import { OrderInfoContainer, OrderPageContainer, PageName } from "./styles";

export const OrderPage = () => {
	// const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
	// console.log({ loggedIn });
	const [isShow, setIsShow] = useState(false);
	const [isUseEffectOnFirst, setIsUseEffectOnFirst] = useState(false);

	const { orderData, orderTicketData, orderRange } = useOrderContext();
	const navigate = useNavigate();

	const checkOrderData = () => {
		let count = 0;
		for (let i = 0; i < orderTicketData.length; i++) {
			if (orderTicketData[i].count) {
				count += 1;
			}
		}
		if (count < 1) {
			navigate(-1);
		} else {
			setIsShow(true);
		}
	};
	useEffect(() => {
		checkOrderData();
		setIsUseEffectOnFirst(true);
	}, [orderTicketData]);

	useEffect(() => {
		if (isUseEffectOnFirst) {
			if (!isShow) {
				navigate("/");
			}
		}
	}, [isUseEffectOnFirst]);

	return (
		<MainComponent>
			{isShow && (
				<OrderPageContainer>
					<PageName>결제하기</PageName>
					<OrderInfoContainer>
						<OrderForm />
					</OrderInfoContainer>
				</OrderPageContainer>
			)}
		</MainComponent>
	);
};
