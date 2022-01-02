
const formatForGannt = (data) => {
  let arr = [];

  data.forEach((tsk) => {
    let Sd = tsk.start.substring(0, 10);
    let Ed = tsk.end.substring(0, 10);
    let nm = tsk.name;
    let rId = tsk.id;
    let Std = Sd.split("-");
    let Ent = Ed.split("-");
    let hide = tsk.hidechildren;

    let StMod = new Date(Std[0] + ", " + Std[1] + ", " + Std[2]);
    let EnMod = new Date(Ent[0] + ", " + Ent[1] + ", " + Ent[2]);

    arr.push({
      ...tsk,
      trueId: rId,
      id: nm,
      start: StMod,
      end: EnMod,
      hideChildren: hide,
    });
  });

  return arr;
};

const sortDataGantt = (data) => {
  let sorted = data.sort(function (a, b) {
    var nameA = a.trueId;
    var nameB = b.trueId;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  return sorted;
};

const sortDataTable = (data) => {
  let sorted = data.sort(function (a, b) {
    var nameA = a.id;
    var nameB = b.id;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
 
  return sorted;
};

module.exports = { formatForGannt, sortDataGantt, sortDataTable };
