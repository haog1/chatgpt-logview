import React from "react";
import {
  ButtonContainer,
  NavigationButtons,
  NavigationButton,
  PauseResumeButtons,
  Button,
} from "./ControlsStyles";
import { MockEventSource } from "./MockEventSource";

interface ControlsContainerProps {
  eventSource: MockEventSource;
}

const ControlsContainer: React.FC<ControlsContainerProps> = ({
  eventSource,
}) => {
  const handleScrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <ButtonContainer>
      <NavigationButtons>
        <NavigationButton onClick={handleScrollToBottom}>
          &darr;
        </NavigationButton>
      </NavigationButtons>
      <PauseResumeButtons>
        <Button>Pause</Button>
        <Button>Resume</Button>
      </PauseResumeButtons>
    </ButtonContainer>
  );
};

export default ControlsContainer;
