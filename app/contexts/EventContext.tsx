"use client";

import React, {
  createContext,
  useContext,
  useState,
  FC,
  PropsWithChildren,
  useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { LoggedEvent } from "@/types";

type EventContextValue = {
  loggedEvents: LoggedEvent[];
  logClientEvent: (
    eventObj: Record<string, unknown>,
    eventNameSuffix?: string
  ) => void;
  logServerEvent: (
    eventObj: Record<string, unknown>,
    eventNameSuffix?: string
  ) => void;
  toggleExpand: (id: string) => void;
};

export const EventContext = createContext<EventContextValue>({
  loggedEvents: [],
  logClientEvent: () => {},
  logServerEvent: () => {},
  toggleExpand: () => {},
});

export const EventProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loggedEvents, setLoggedEvents] = useState<LoggedEvent[]>([]);

  const addLoggedEvent = useCallback(
    (
      direction: "client" | "server",
      eventName: string,
      eventData: Record<string, unknown>
    ) => {
      const id = eventData.event_id ? String(eventData.event_id) : uuidv4();
      setLoggedEvents((prev) => {
        if (prev.some((log) => log.id === id)) {
          return prev;
        }
        return [
          ...prev,
          {
            id,
            direction,
            eventName,
            eventData,
            timestamp: new Date().toLocaleTimeString(),
            expanded: false,
          },
        ];
      });
    },
    []
  );

  const logClientEvent: EventContextValue["logClientEvent"] = (
    eventObj: Record<string, unknown>,
    eventNameSuffix = ""
  ) => {
    const name = `${eventObj.type || ""} ${eventNameSuffix || ""}`.trim();
    addLoggedEvent("client", name, eventObj);
  };

  const logServerEvent: EventContextValue["logServerEvent"] = (
    eventObj: Record<string, unknown>,
    eventNameSuffix = ""
  ) => {
    const name = `${eventObj.type || ""} ${eventNameSuffix || ""}`.trim();
    addLoggedEvent("server", name, eventObj);
  };

  const toggleExpand: EventContextValue["toggleExpand"] = (id: string) => {
    setLoggedEvents((prev) =>
      prev.map((log) => {
        if (log.id === id) {
          return { ...log, expanded: !log.expanded };
        }
        return log;
      })
    );
  };

  return (
    <EventContext.Provider
      value={{ loggedEvents, logClientEvent, logServerEvent, toggleExpand }}
    >
      {children}
    </EventContext.Provider>
  );
};

export function useEvent() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
}
