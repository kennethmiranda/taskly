"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { tasks } from "@/src/lib/placeholder-data";
import "@/src/components/home/calendar.css";

export default function Calendar() {
  // map tasks to events
  const events = tasks.flatMap((task) => [
    {
      title: `${task.title}`,
      start: task.createdAt,
      allDay: true,
      backgroundColor: "#4CAF50", // green for start date
      borderColor: "#4CAF50",
      url: `/home/tasks/${task.id}`,
    },
    {
      title: `${task.title} (Due)`,
      start: task.dueDate,
      allDay: true,
      backgroundColor: "#F44336", // red for due date
      borderColor: "#F44336",
      url: `/home/tasks/${task.id}`,
    },
  ]);

  return (
    <div className="calendar-container">
      <FullCalendar
        height={"85vh"}
        themeSystem="standard"
        views={{
          dayGridMonth: {
            titleFormat: { year: "numeric", month: "long" },
            buttonText: "Month View",
          },
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "",
          center: "title",
          right: "prev,next today",
        }}
        buttonText={{
          today: "Current Date",
          month: "Month",
        }}
        initialView="dayGridMonth"
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        events={{ events }}
        initialEvents={[
          {
            title: "Today",
            allDay: true,
            start: new Date(),
            editable: false,
            textColor: "var(--foreground)",
          },
        ]}
      />
    </div>
  );
}
