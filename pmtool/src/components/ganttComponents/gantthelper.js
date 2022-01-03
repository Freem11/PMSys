
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
  console.log("working",sorted)
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
  console.log("busted",sorted)
  return sorted;
};

const updateParentStartDate = (parentData, maxStart, maxStart2, newValue, oldStart) => {

    let finalVal = parentData

    if (maxStart === oldStart) {
      if (maxStart > newValue) {
        finalVal = {...parentData, start: newValue}

      } else if ( maxStart < newValue && newValue < maxStart2){
        finalVal = {...parentData, start: newValue}

      } else if ( maxStart2 < newValue){
        finalVal = {...parentData, start: maxStart2}
      } 
        return finalVal
    } else {

      if (maxStart > newValue) {
        finalVal = {...parentData, start: newValue}
      }
      return finalVal
    }
  }

const updateParentEndDate = (parentData, maxEnd, maxEnd2, newValue, oldEnd) => {

  let finalVal = parentData

  if (maxEnd === oldEnd) {
    if (maxEnd < newValue) {
        finalVal = {...parentData, end: newValue}

    } else if (maxEnd > newValue && newValue > maxEnd2) {
        finalVal = {...parentData, end: newValue}

    }else if (maxEnd2 > newValue) {
      finalVal = {...parentData, end: maxEnd2}
  }
      return finalVal

  } else {

    if (maxEnd < newValue) {
      finalVal = {...parentData, end: newValue}
    }
    return finalVal
  }
  }

  const updateParentChildArray = (parentData, newChild, exParent) => {
    
    console.log("values", parentData, newChild, exParent)
    let finalVal

    if (parentData === undefined){

      console.log("yeah?", exParent, newChild)
      finalVal = exParent.barchildren
      let dataMinus =  finalVal.filter(item => item !== newChild)
      console.log("yeah1?",dataMinus, newChild)

      exParent.barchildren = dataMinus
      console.log("yip", exParent)
      return exParent

    } else {

      finalVal = parentData
      let arrayVal = parentData.barchildren

    if (arrayVal == null){
      finalVal.barchildren = [newChild]
    } else {
    arrayVal = [...arrayVal, newChild]

    finalVal = {...parentData, barchildren: arrayVal}
    }
    console.log("yeah2?",finalVal, newChild)
    return finalVal
    }
  }


module.exports = { formatForGannt, sortDataGantt, sortDataTable, updateParentStartDate, updateParentEndDate, updateParentChildArray };