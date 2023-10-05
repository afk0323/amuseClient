import styled from "styled-components";

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  margin-bottom: 16px;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: #464646;

  @media (max-width: 768px) {
    /* Mobile styles */
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    /* Tablet styles */
    width: 792px;
  }

  @media (min-width: 1024px) {
    /* Desktop styles */
    width: 1060px;
  }
`;
