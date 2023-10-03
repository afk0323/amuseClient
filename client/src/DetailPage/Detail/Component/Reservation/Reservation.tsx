import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Reservation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope as solidFaEnelope } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope as regularFaEnelope } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useOrderContext } from "../../../Contexts/OrderContext";
import { GuideData } from "../../../../Interfaces/DataInterfaces";
import { useCookies } from "react-cookie";

interface ReservationProps {
	itemId: number | null;
	productCode: number;
	// startPrice: number;
	likeNum: number;
}

function Reservation({ itemId, productCode, likeNum }: ReservationProps) {
	const [cookies, setCookie, removeCookie] = useCookies(["__jwtkid__"]);
	const movePage = useNavigate();
	const { orderData, setOrderData, orderTicketData } = useOrderContext();

	/**
	 * startPrice API
	 */
	const [startPrice, setStartPrice] = useState(0);
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/title`)
			.then((response) => {
				setStartPrice(response.data.data.startPrice);
				console.log(response.data.data);
			})
			.catch((error) => {
				console.log("연결 실패");
			});
	}, [itemId]);

	/**
	 * Manager Data
	 */
	const [guideData, setGuideData] = useState<GuideData>();
	const [isHovered, setIsHovered] = useState(false);

	/**
	 * Manager API
	 */
	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/guide-info`
			)
			.then((response) => {
				setGuideData(response.data.data);

				console.log(response.data.data);
			})
			.catch((error) => {
				console.log("연결 실패");
			});
	}, [itemId]);

	/**
	 * Email Connect
	 */
	const handleInquiryClick = () => {
		if (guideData && guideData.email) {
			const subject = encodeURIComponent(`[어뮤즈트래블 상품 문의하기]`);
			const body = encodeURIComponent(
				"안녕하세요, AmuseTravel 입니다 :-)\n\n아래에 문의 내용을 입력해주세요.\n\n감사합니다.\n\n---------------------\n\n"
			);
			window.location.href = `mailto:${guideData.email}?subject=${subject}&body=${body}`;
		}
	};

	// Share btn
	const [showTooltip, setShowTooltip] = useState(false);
	const handleTooltipToggle = () => {
		setShowTooltip(!showTooltip);
	};

	// const handleCopyLink = async (
	//   // successAction?: () => void,
	//   // failAction?: () => void,
	// ): Promise<void> => {
	//   console.log(window.location.href);
	//   try {
	//     await navigator.clipboard.writeText(window.location.href);
	//     // successAction && successAction();
	//   } catch (error) {
	//     // failAction && failAction();
	//   }
	//   // if (navigator.clipboard && navigator.clipboard.writeText) {
	//   //   await navigator.clipboard.writeText(window.location.href);
	//   //   console.log('Link copied to clipboard!');
	//   // } else {
	//   //   console.log('Copying to clipboard is not supported in this browser.');
	//   // }
	// };

	/**
	 * Ticket Button
	 */
	const handleButtonClick = () => {
		handleBuyTicket();
		// Swal.fire({
		//   icon: "success",
		//   title: "티켓 구입 문의",
		//   confirmButtonText: "확인",
		//   confirmButtonColor: "#F184A1",
		//   html: "📞 02-719-6811<br>✉️ info@amusetravel.com<br>",
		// });
	};

	const handleBuyTicket = () => {
		if (cookies.__jwtkid__) {
			let count = 0;
			for (let i = 0; i < orderTicketData.length; i++) {
				if (orderTicketData[i].count) {
					count += 1;
				}
			}

			if (count > 0) {
				movePage("/order");
			} else {
				alert("티켓을 선택해 주세요");
			}
		} else {
			alert("로그인이 필요합니다.");
		}
	};

	return (
		<div className="reservation">
			{/* 가격, 티켓선택, 위시 div */}
			<div className="reservation-main">
				{/* 가격, 링크 */}
				<div className="reservation-top">
					<div className="reservation-price">
						{startPrice ? (
							<div>
								<p>시작가</p>
								<p className="price">
									{startPrice.toLocaleString("en")}
								</p>
								<p>부터</p>
							</div>
						) : (
							<div>{"상품 준비중"}</div>
						)}
					</div>
					<div className="reservation-link">
						<button
							className="share-btn"
							onClick={handleTooltipToggle}
						>
							<FontAwesomeIcon
								icon={faShareNodes}
								className="share-icon"
							/>
						</button>

						{showTooltip && (
							<div className="tooltip">
								<span className="link">
									{window.location.href}
								</span>
								<CopyToClipboard
									text="링크"
									onCopy={() => alert("복사완료")}
								>
									<button className="copy-btn">
										링크 복사
									</button>
								</CopyToClipboard>
							</div>
						)}
					</div>
				</div>
				{/* 티켓 선택 btn */}
				<div className="selectticket-btn-div">
					<button
						className="selectticket-btn"
						onClick={handleButtonClick}
					>
						구입 문의
					</button>
				</div>
				{/* 위시리스트 담기 btn */}
				<div className="wishlist-btn-div">
					<button className="wishlist-btn">
						<FontAwesomeIcon
							icon={faHeart}
							className="heart-icon"
						/>
						위시리스트 담기
					</button>
				</div>
				{/* 위시리스트에 담은 사람 수 div */}
				<div className="wish-people">
					<p>{likeNum}명이 이 상품을 위시리스트에 담았습니다</p>
				</div>
			</div>
			{/* 담당자, 문의하기 div */}
			<div className="manager" style={{ marginTop: 32 }}>
				<div className="manager-profile">
					<img
						className="manager-image"
						src={guideData?.profileImageUrl ?? "img"}
						alt="manager"
					/>
					<p className="manager-name">
						{guideData?.userName ?? "name"}
					</p>
				</div>
				<div
					className="manager-inquiry"
					onClick={handleInquiryClick}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<FontAwesomeIcon
						className="icon"
						icon={isHovered ? regularFaEnelope : solidFaEnelope}
					/>
					<p className="inquiry">문의하기</p>
				</div>
			</div>
			{/* 상품코드 div */}
			<div className="product-code">
				<span>상품코드 : &nbsp;</span>
				<span>{productCode}</span>
			</div>
		</div>
	);
}

export default Reservation;
