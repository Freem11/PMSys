import React from "react";
import {
  Gantt,
  GanttProps,
  Task,
  EventOption,
  StylingOption,
  ViewMode,
  DisplayOption,
} from "gantt-task-react";
import "gantt-task-react/dist/index.css";

let tasks = [
  {
    start: new Date(2022, 0, 3),
    end: new Date(2022, 0, 16),
    name: "Build",
    id: "big",
    type: "project",
    progress: 100,
    dependencies: [],
    styles: { progressColor: "blue", progressSelectedColor: "#ff9e0d" },
    barChildren: [1,2],
    hideChildren: false,
  },
  {
    start: new Date(2022, 0, 3),
    end: new Date(2022, 0, 17),
    name: "City Permit",
    id: 1,
    type: "task",
    progress: 100,
    dependencies: [],
    styles: { progressColor: "blue", progressSelectedColor: "#ff9e0d" },
    project: "big",
  },
  {
    start: new Date(2022, 0, 18),
    end: new Date(2022, 0, 24),
    name: "Civil Build",
    id: 2,
    type: "task",
    progress: 50,
    dependencies: [1],
    styles: { progressColor: "blue", progressSelectedColor: "#ff9e0d" },
    project: "big",
  },
  {
    start: new Date(2022, 1, 3),
    end: new Date(2022, 1, 16),
    name: "Plant",
    id: "big2",
    type: "project",
    progress: 100,
    dependencies: ["big"],
    styles: { progressColor: "blue", progressSelectedColor: "#ff9e0d" },
    barChildren: [1,2],
    hideChildren: false,
  },
  {
    start: new Date(2022, 1, 3),
    end: new Date(2022, 1, 17),
    name: "Fibre Build",
    id: 3,
    type: "task",
    progress: 100,
    dependencies: [],
    styles: { progressColor: "blue", progressSelectedColor: "#ff9e0d" },
    project: "big2",
  },
  {
    start: new Date(2022, 1, 18),
    end: new Date(2022, 1, 24),
    name: "Place Fibre",
    id: 4,
    type: "task",
    progress: 50,
    dependencies: [3],
    styles: { progressColor: "blue", progressSelectedColor: "#ff9e0d" },
    project: "big2",
  },

];

function SchedulePage() {
  return (
    <div style={{ width: "1000px" }}>

      <Gantt 
        tasks={tasks} 
        viewMode={"Week"} 
        barCornerRadius={15}
        arrowColor={'green'}
        barProgressColor={'blue'}
        barProgressSelectedColor={'maroon'}
        barChildrentype
        EventOption
      />
    </div>
  );
}

export default SchedulePage;
