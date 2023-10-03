import React, { useState, useEffect } from "react";
import { CommonHeader } from "../../../CommonHeader";
import styles from "./ProductInfo.module.scss";
import { useOrderContext } from "../../../../../Contexts/OrderContext";
import getSelectedPriceIndex from "./getSelectedPriceIndex";
import { TicketData } from "../../../../../../Interfaces/DataInterfaces";
import { SubHeader } from "../../../../styles";
import { DetailSectionContainer } from "../../styles";

export function ProductInfo() {
	const {
		orderData,
		setOrderData,
		orderTicketData,
		setOrderTicketData,
		orderRange,
		setOrderRange,
	} = useOrderContext();
	const [ticketData, setTicketData] = useState<TicketData[]>([]);
	useEffect(() => {
		setTicketData(orderTicketData);
	}, [orderTicketData]);

	useEffect(() => {
		const data = { ...orderData };
		data["productPrice"] = totalAmount;
		setOrderData(data);
	}, [ticketData]);

	const totalAmount = ticketData.reduce((sum, ticket) => {
		const selectedPriceIndex = getSelectedPriceIndex(ticket, orderRange);
		const price =
			selectedPriceIndex !== -1
				? ticket.priceList[selectedPriceIndex].price
				: 0;
		return sum + ticket.count * price;
	}, 0);
	return (
		<DetailSectionContainer>
			<SubHeader>상품정보</SubHeader>
			<ul className={styles.itemList}>
				{ticketData
					.filter((ticket) => ticket.count > 0)
					.map((ticket, index) => {
						const selectedPriceIndex = getSelectedPriceIndex(
							ticket,
							orderRange
						);
						const price =
							selectedPriceIndex !== -1
								? ticket.priceList[selectedPriceIndex].price
								: 0;
						return (
							<div key={index} className={styles.item}>
								<div
									className="selected-ticket-title"
									style={{ width: 280 }}
								>
									{ticket.title}
								</div>
								<div className="selected-ticket-count">
									{ticket.count} X{" "}
									{price.toLocaleString("en")}원
								</div>
								{/* <div className="selected-ticket-price">{(ticket.count * price).toLocaleString("en")}원</div> */}
							</div>
						);
					})}

				{/* total amount */}
				{ticketData.some((ticket) => ticket.count > 0) && (
					<div className={styles.totalSection}>
						<span className="total-title">총 여행 금액</span>
						<span className={styles.totalAvg}>
							{totalAmount.toLocaleString("en")}원
						</span>
					</div>
				)}
			</ul>
			{/* <div className={styles.couponSection}>
        <h4>쿠폰할인</h4>
        <select>
          <option value="" disabled selected>
            사용 가능 쿠폰 0개 /보유 0개
          </option>
        </select>
      </div> */}
		</DetailSectionContainer>
	);
}
