import styled from "styled-components";

const StyledH1 = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.02rem;
  color: #414141;
  position: relative;
  margin: 0.2rem 0;
  :after {
    content: "";
    position: absolute;
    left: 15%;
    bottom: 0;
    width: 70%;
    border-bottom: 0.1rem dashed #40a9ff;
  }
`;

const StyledLetterW = styled.span`
  color: #40a9ff;
`;

export function Logo() {
  return (
    <StyledH1>
      Free <StyledLetterW>W</StyledLetterW>allet
    </StyledH1>
  );
}
