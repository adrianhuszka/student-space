"use client";

import { DayComponent, Schedulely } from "schedulely";
import "schedulely/dist/index.css";

export default function Calendar() {
  return (
    <div className="w-100 h-7">
      <Schedulely
        events={[
          {
            color: "#4b578a",
            end: "2024-04-07T10:00:00.000Z",
            id: "1",
            start: "2024-04-08T12:00:00.000Z",
            summary: "Craig Bishop",
          },
        ]}
        dark={true}
        schedulelyComponents={{
          dayComponent: DefaultDay,
        }}
      />
    </div>
  );
}

const DefaultDay: DayComponent = ({
  isCurrentMonth,
  isToday,
  events,
  isOverflowed,
  onMoreEventsClick,
  onDayClick,
  date,
}) => {
  const dayHeader = isToday ? (
    <div className="default-day-header--indicator">
      <span className="default-day-header--text">{date.getDate()}</span>
    </div>
  ) : (
    <span className="default-day-header--text">{date.getDate()}</span>
  );

  const hiddenEventTooltip =
    events.length > 1 ? `(${events.length}) hidden events` : "(1) hidden event";

  return (
    <div
      role={"cell"}
      className={`h-2 default-day ${
        isCurrentMonth ? "default-day-current" : "default-day-sibling"
      }`}
      onClick={() => onDayClick(date)}
    >
      <div role={"heading"} aria-level={2} className="default-day-header">
        {dayHeader}
      </div>
      {isOverflowed && (
        <div
          role={"note"}
          className="additional-events-indicator"
          title={hiddenEventTooltip}
          onClick={() => onMoreEventsClick(events)}
        >
          ...
        </div>
      )}
    </div>
  );
};
