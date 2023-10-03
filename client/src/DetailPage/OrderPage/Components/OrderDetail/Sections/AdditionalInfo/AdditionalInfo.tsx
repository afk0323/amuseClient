import React, { ChangeEvent } from "react";
import { useOrderContext } from "../../../../../Contexts/OrderContext";
import { CommonHeader } from "../../../CommonHeader";
import styles from "./AdditionalInfo.module.scss";
import { DetailSectionContainer } from "../../styles";
import { SubHeader } from "../../../../styles";

export function AdditionalInfo() {
	const { orderData, setOrderData } = useOrderContext();

	const additionalInfoHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		const data = { ...orderData };
		data[name] = value;
		console.log(data);
		setOrderData(data);
	};
	return (
		<DetailSectionContainer>
			<SubHeader>추가 요청사항</SubHeader>
			<div className={styles.additionalInfoContainer}>
				<textarea
					className={styles.text}
					placeholder="답변을 입력해주세요."
					name="additionalInfo"
					value={orderData.additionalInfo}
					onChange={additionalInfoHandler}
				></textarea>
				<div>
					고객님의 요청사항이 전달되나, 간혹 현장 사정에 따라 반영되지
					않을 수 있습니다.
				</div>
			</div>
		</DetailSectionContainer>
	);
}
