import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";


function Ccc() {
  return (
    <div className="w-full h-full overflow-y-scroll text-neutral p-5">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        slotLabelInterval="01:00:00"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={[
          { title: "Meeting", start: "2025-03-27T10:00:00",end:"2025-03-27T12:00:00"},
          { title: "Lunch Break", start: "2025-03-27T13:00:00",end:"2025-03-27T15:00:00"},
        ]}
        eventContent={(eventInfo) => {
          const { tag } = eventInfo.event.extendedProps;

          return(
          <div className="bg-blue-500 text-white p-1 rounded-md">
            <div>{tag}</div>
            <div>{eventInfo.event.title}</div>
            <div>{eventInfo.timeText}</div>
          </div>)
        }}
      />
    </div>
  );
}

export default Ccc;
