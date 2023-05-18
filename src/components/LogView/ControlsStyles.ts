import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px; /* Add top spacing */
`;

export const NavigationButtons = styled.div`
  display: flex;
  align-items: center;
`;

export const NavigationButton = styled.button`
  margin-right: 12px;
  font-size: 20px;
`;

export const PauseResumeButtons = styled.div`
  display: flex;
`;

export const Button = styled.button`
  margin-right: 8px;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: none;
  cursor: pointer;
`;
