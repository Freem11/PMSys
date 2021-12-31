import React from 'react';
import ReactGantt from 'gantt-for-react';

let tasks = [
  {
    start: new Date(2022, 0, 3),
    end: new Date(2022, 0, 7),
    name: "Build",
    id: "0",
    progress: 100,
    dependencies: [],
  },
  {
    start: new Date(2022, 0, 8),
    end: new Date(2022, 0, 10),
    name: "Talk",
    id: "1",
    progress: 50,
    dependencies: '0',
  },
  {
    start: new Date(2022, 0, 11),
    end: new Date(2022, 0, 16),
    name: "Flounder",
    id: "2",
    progress: 0,
    dependencies: '1',
  },
  {
    start: new Date(2022, 0, 17),
    end: new Date(2022, 0, 19),
    name: "Swim",
    id: "3",
    progress: 0,
    dependencies: '2',
  },
];

function SchedulePage2() {


  return (
    <div style={{ width: "900px" }}>

        <ReactGantt
          tasks={tasks}
          viewMode={'Day'}
          // onClick={this._func}
          // onDateChange={this._func}
          // onProgressChange={this._func}
          // onViewChange={this._func}
          customPopupHtml
        />

    </div>
  );
}

export default SchedulePage2;
