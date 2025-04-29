import { MessagesSquare, MonitorPlay } from "lucide-react";
import React from "react";

export default function ListSection() {
  return (
    <div className="bg-primary/5 w-full p-5 rounded-md">
      <h2 className="text-xl font-semibold flex items-center gap-3">
        <MonitorPlay className="text-primary" /> Attendance List
      </h2>

      <div className=" flex flex-col justify-center items-center gap-2 h-full text-muted-foreground/95 pointer-events-none">
        <MessagesSquare size={100} />
        <p className="text-xs">Face regonition is not activated yet</p>
      </div>
    </div>
  );
}
