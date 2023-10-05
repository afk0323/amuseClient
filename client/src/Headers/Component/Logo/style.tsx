import styled from "styled-components";

export const Logo = styled.div`
  @media (min-width: 768px) {
    /* Desktop & Tablet styles */
    display: flex;
    align-items: center;
    gap: 35px;
  }

  @media (max-width: 768px) {
    /* Mobile styles */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Image = styled.img`
  width: 158px;
  height: 59px;
`;

export const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 22px;
  padding-right: 10px;
  border-radius: 50px;
  border: 1px solid var(--2, #ccc);

  @media (min-width: 768px) {
    /* Desktop & Tablet styles */
    width: 400px;
    height: 42px;
  }

  @media (max-width: 768px) {
    /* Mobile styles */
    width: 400px;
    height: 42px;
    margin-top: 5px;
  }
`;

export const Input = styled.input`
  width: 135px;
  color: #909090;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;
