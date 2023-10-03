import React, { ChangeEvent } from "react";
import { useOrderContext } from "../../../../../Contexts/OrderContext";
import { CommonHeader } from "../../../CommonHeader";
import styles from "./Point.module.scss";
import { DetailSectionContainer } from "../../styles";
import { SubHeader } from "../../../../styles";

export function Point() {
	const { orderData, setOrderData } = useOrderContext();

	const pointHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const data = { ...orderData };
		data[name] = value;
		setOrderData(data);
	};

	return (
		<DetailSectionContainer>
			<SubHeader>포인트 사용</SubHeader>
			<>
				<div>내 포인트 0원</div>
				<input
					placeholder="0 원"
					className={styles.point}
					name="point"
					value={orderData.point}
					onChange={pointHandler}
				></input>
				<button className={styles.pointButton}>모두사용</button>
			</>
		</DetailSectionContainer>
	);
}
