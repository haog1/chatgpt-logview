import React, { useEffect, useState } from "react";
import { FixedSizeList, FixedSizeListProps } from "react-window";
import { LogsContainer, LogItem } from "./LogStyles";
import { MockEventSource, EventData } from "./MockEventSource";

interface LogContainerProps {
  eventSource: MockEventSource;
}

const LogContainer: React.FC<LogContainerProps> = ({ eventSource }) => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const handleEvent = (event: MessageEvent<EventData>) => {
      const eventData: EventData = event.data;
      const { id, log } = eventData;

      setLogs((prevLogs) => [...prevLogs, `ID: ${id}, Log: ${log}`]);
    };

    eventSource.addEventListener("myEvent", handleEvent);

    return () => {
      eventSource.removeEventListener("myEvent", handleEvent);
    };
  }, [eventSource]);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => <LogItem style={style}>{logs[index]}</LogItem>;

  const listProps: FixedSizeListProps<any> = {
    height: 400, // Specify the height of the visible portion
    itemCount: logs.length, // Total number of items in the list
    itemSize: 30, // Height of each item in the list
    overscanCount: 10, // Number of items to preload before and after the visible range
    width: "100%", // Set the width to "100%" to expand to the container width
    children: Row, // Pass the Row component as the children prop
  };

  return (
    <LogsContainer>
      <FixedSizeList {...listProps} />
    </LogsContainer>
  );
};

export default LogContainer;
