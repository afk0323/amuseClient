import styled from "@emotion/styled";
import { Common, Pretendard } from "../../styles";

export const OrderPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100%;
	box-sizing: border-box;
	gap: 2rem;
	padding: 4.6875rem 10% 7.5rem 10%;
	border: 1px solid blue;
	::-webkit-scrollbar {
		display: none;
	}
`;

export const OrderInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100%;
	gap: 0.9375rem;
	box-sizing: border-box;
	border: 1px solid red;
`;

export const PageName = styled.span`
	${Pretendard({
		size: 35,
		weight: Common.bold.bold,
		color: Common.colors.black,
	})}
`;

export const SubHeader = styled.span`
	${Pretendard({
		size: 27,
		weight: Common.bold.bold,
		color: Common.colors.black,
	})}
`;
