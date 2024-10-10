"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

export default function Calendar() {
  return (
    <div className="calendar-container">
      <FullCalendar
        height={"85vh"}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "title",
          center: "",
          right: "prev,next today    dayGridMonth,timeGridWeek",
        }}
        buttonText={{
          today: "Current Date",
          month: "Month View",
          week: "Week View",
        }}
        initialView="dayGridMonth"
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        customButtons={{
          test: {
            text: "Test",
            click: function () {
              alert("test");
            },
          },
        }}
        initialEvents={[
          { title: "Test Task", start: new Date(), resourceId: "1" },
        ]}
      />
    </div>
  );
}
