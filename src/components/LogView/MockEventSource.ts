import { LoremIpsum } from "lorem-ipsum";

export interface EventData {
  id: number;
  log: string;
}

export class MockEventSource {
  private listeners: Map<string, ((event: MessageEvent<EventData>) => void)[]> =
    new Map();
  private eventId: number = 0;
  private mockInterval: NodeJS.Timer | null = null;
  private maxId: number = 100; // Maximum ID to stop the mock events
  private intervalSpeed: number = 200; // Interval speed in milliseconds
  private loremIpsum: LoremIpsum;

  constructor() {
    this.loremIpsum = new LoremIpsum();
  }

  addEventListener(
    eventType: string,
    listener: (event: MessageEvent<EventData>) => void
  ): void {
    const eventListeners = this.listeners.get(eventType) || [];
    this.listeners.set(eventType, [...eventListeners, listener]);
  }

  removeEventListener(
    eventType: string,
    listener: (event: MessageEvent<EventData>) => void
  ): void {
    const eventListeners = this.listeners.get(eventType) || [];
    const updatedListeners = eventListeners.filter((l) => l !== listener);
    this.listeners.set(eventType, updatedListeners);
  }

  private emit(eventType: string, eventData: EventData): void {
    const eventListeners = this.listeners.get(eventType) || [];
    const messageEvent = new MessageEvent(eventType, { data: eventData });
    eventListeners.forEach((listener) => listener(messageEvent));
  }

  private generateRandomText(wordCount: number): string {
    const words = this.loremIpsum.generateWords(wordCount);
    return words;
  }

  private sendEvent(): void {
    if (this.eventId <= this.maxId) {
      const logText = this.generateRandomText(20); // Generate 20 random words for the log text

      const eventData: EventData = {
        id: this.eventId,
        log: logText,
      };

      this.emit("myEvent", eventData);
      this.eventId++;
    } else {
      this.stopSendingEvents();
    }
  }

  startSendingEvents(): void {
    this.mockInterval = setInterval(() => {
      this.sendEvent();
    }, this.intervalSpeed);
  }

  stopSendingEvents(): void {
    if (this.mockInterval) {
      clearInterval(this.mockInterval);
      this.mockInterval = null;
    }
  }
}
