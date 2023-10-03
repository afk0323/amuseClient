import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import styles from "./OrderDetail.module.scss";

import { ProductInfo } from "./Sections/ProductInfo";
import { Point } from "./Sections/Point";
import { ReservationInfo } from "./Sections/ReservationInfo";
import { AdditionalInfo } from "./Sections/AdditionalInfo";
import { PaymentMethod } from "./Sections/PaymentMethod";
import { PurchaseInfoItems } from "../PurchaseInfoItems";
import { OrderDetailContainer } from "./styles";

type Props = {
	isLoading: boolean;
};

export const OrderDetail = ({ isLoading }: Props) => {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<OrderDetailContainer ref={ref}>
			<ProductInfo />
			<Point />
			<ReservationInfo />
			<AdditionalInfo />
			<PaymentMethod />
			<div className={styles.purchaseInfo}>
				<PurchaseInfoItems isLoading={isLoading} />
			</div>
		</OrderDetailContainer>
	);
};
