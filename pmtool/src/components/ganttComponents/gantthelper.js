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
    var nameA = a.seq;
    var nameB = b.seq;
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

const updateParentStartDate = (
  parentData,
  maxStart,
  maxStart2,
  newValue,
  oldStart
) => {
  let finalVal = parentData;

  if (maxStart === oldStart || maxStart2 === 0 && oldStart === 0) {
    if (maxStart > newValue) {
      finalVal = { ...parentData, start: newValue };
    } else if (maxStart < newValue && newValue < maxStart2) {
      finalVal = { ...parentData, start: newValue };
    } else if (maxStart2 < newValue) {
      finalVal = { ...parentData, start: maxStart2 };
    }
    return finalVal;
  } else {
    if (maxStart > newValue) {
      finalVal = { ...parentData, start: newValue };
    }
    return finalVal;
  }
};

const updateParentEndDate = (parentData, maxEnd, maxEnd2, newValue, oldEnd) => {
  let finalVal = parentData;

  if (maxEnd === oldEnd || maxEnd2 === 0 && oldEnd === 0 ) {
    if (maxEnd < newValue) {
      finalVal = { ...parentData, end: newValue };
    } else if (maxEnd > newValue && newValue > maxEnd2) {
      finalVal = { ...parentData, end: newValue };
    } else if (maxEnd2 > newValue) {
      finalVal = { ...parentData, end: maxEnd2 };
    }
    return finalVal;
  } else {
    if (maxEnd < newValue) {
      finalVal = { ...parentData, end: newValue };
    }
    return finalVal;
  }
};

const updateParentChildArray = (parentData, newChild, exParent) => {
  console.log("values", parentData, newChild, exParent);
  let finalVal;

  if (parentData === undefined) {
    console.log("yeah?", exParent, newChild);
    finalVal = exParent.barchildren;
    let dataMinus = finalVal.filter((item) => item !== newChild);

    exParent.barchildren = dataMinus;
 
    return exParent;
  } else {
    finalVal = parentData;
    let arrayVal = parentData.barchildren;

    if (arrayVal == null) {
      finalVal.barchildren = [newChild];
    } else {
      arrayVal = [...arrayVal, newChild];

      finalVal = { ...parentData, barchildren: arrayVal };
    }
    console.log("yeah2?", finalVal, newChild);
    return finalVal;
  }
};

const manageDependencyArray = (data, newVal) => {

 
  let stringManage = newVal.split(",");
  let finalArr = []

  stringManage.forEach(dep => {
      finalArr.push(dep)  
  });

  data.dependencies = finalArr
  return data
};

const handleAvgProgress = (parent, progressList, taskName, newVal) => {

  let progressArray = [Number(newVal)]

  progressList.forEach(task => {
    if (task.name !== taskName){
      progressArray.push(task.progress)
    }
  });

  const average = Math.round(progressArray.reduce((a,b) => a+b, 0) / progressArray.length)

  parent.progress = average
  return parent

};

module.exports = {
  formatForGannt,
  sortDataGantt,
  updateParentStartDate,
  updateParentEndDate,
  updateParentChildArray,
  manageDependencyArray,
  handleAvgProgress,
};
