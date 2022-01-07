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

const updateParentStartDate = (parentData, maxStart, maxStart2, newValue, oldStart, oldEnd, currentTask, del) => {
      
      let finalVal;
      let start = new Date(oldStart)
      let end = new Date(oldEnd)
      let taskLength = Math.floor(end - start) / (1000*60*60*24)
      let newEnd = new Date(newValue)
      newEnd.setDate(newEnd.getDate()+taskLength+1)

      if(del){
        if(maxStart === null){
          finalVal = new Date()
        } else{
          finalVal = maxStart
        }
        return finalVal;
      }

      if (parentData.barchildren.length === 0) {
        finalVal = newValue
        return finalVal;
      }

      // if(newValue >= oldEnd){
      //   console.log("check 2", newValue, oldEnd)
      //   let startVal = newValue
      //   let  endVal = newEnd
      //   return [startVal, endVal];
      // }

  if (maxStart === oldStart || maxStart2 === 0 && oldStart === 0) {
    console.log("check 3", newValue, maxStart, maxStart2, oldStart)
    if (maxStart >= newValue) {
      finalVal = newValue
    } else if (maxStart < newValue && newValue < maxStart2) {
      finalVal = newValue
    } else if (maxStart < newValue) {
      finalVal = maxStart
    } else if (maxStart2 < newValue) {
      finalVal = maxStart2
    }
 
    return finalVal;
  } else {
    console.log("check 4", newValue, maxStart, maxStart2, oldStart)
    if (maxStart >= newValue) {
      finalVal = newValue
    } else {
      finalVal = maxStart
    }
    return finalVal;
  }
};

const updateParentEndDate = (parentData, maxEnd, maxEnd2, newValue, oldEnd, del) => {
  let finalVal;

  if(del){
    if(maxEnd === null){
      finalVal = new Date()+1
    } else{
      finalVal = maxEnd
    }
    return finalVal
  }

  if (parentData.barchildren.length === 0) {
    finalVal = newValue
    return finalVal;
  }

  if (maxEnd === oldEnd || maxEnd2 === 0 && oldEnd === 0 ) {
 
    if(newValue === maxEnd){
      finalVal = newValue
    } else if (maxEnd < newValue) {
      finalVal = newValue
    } else if (maxEnd > newValue && newValue > maxEnd2) {
      finalVal = newValue
    } else if (maxEnd2 > newValue) {
      finalVal = maxEnd2
    } else if (maxEnd > newValue) {
      finalVal = maxEnd
    }

  } else {
    if (maxEnd < newValue) {
      finalVal = newValue
    } else {
      finalVal = maxEnd
    }
  }
  return finalVal;
};

const updateParentChildArray = (parentData, newChild, exParent) => {
  let finalVal; 
  console.log("thisstuff", parentData, newChild, exParent)

  if (parentData === undefined) {
    let dataMinus = exParent.barchildren;
    finalVal = dataMinus.filter((item) => item !== newChild);

  } else {
    let tempVal = parentData.barchildren;

    if (finalVal == null) {
      finalVal = [newChild];
    } else {
      finalVal = [...tempVal, newChild];
    }
  }

  return finalVal
};

const manageDependencyArray = (data, newVal) => {

  let finalArr = []

  newVal.forEach(dep => {
      finalArr.push(dep)  
  });

  return finalArr
};

const handleAvgProgress = (parent, progressList, taskName, newVal) => {

  let progressArray = [Number(newVal)]

  progressList.forEach(task => {
    if (task.name !== taskName){
      progressArray.push(task.progress)
    }
  });

  const average = Math.round(progressArray.reduce((a,b) => a+b, 0) / progressArray.length)
  console.log("progress", average)
  return average

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
