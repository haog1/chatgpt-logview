import React, { useEffect, useMemo } from "react";
import LogContainer from "./LogContainer";
import ControlsContainer from "./ControlsContainer";
import { MockEventSource } from "./MockEventSource";

const LogView: React.FC = () => {
  const eventSource = useMemo(() => new MockEventSource(), []);

  useEffect(() => {
    eventSource.startSendingEvents(); // Start sending events automatically
  }, [eventSource]);

  return (
    <div>
      <LogContainer eventSource={eventSource} />
      <ControlsContainer eventSource={eventSource} />
    </div>
  );
};

export default LogView;
