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

const formatForTable = (data) => {
  let arr = [];

  data.forEach((tsk) => {

    let rId = tsk.id;
    let hide = tsk.hidechildren;

    arr.push({
      ...tsk,
      id: rId,
      trueId: rId,
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
   
      if (parentData.barchildren === null || parentData.barchildren.length === 0 ) {
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

  if (parentData.barchildren === null || parentData.barchildren.length === 0) {
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

const updateParentChildArray = (parentData, newChild, exParent, del) => {
  let finalVal = []; 

  if(del){
    parentData.barchildren.forEach(task => {
      console.log(task, newChild)
      if (task !== newChild){
        finalVal.push(task)
      }
  })
  return finalVal
  }

  if (parentData === undefined) {
    let dataMinus = exParent.barchildren;
    finalVal = dataMinus
    
  } else {
    let tempVal = parentData.barchildren;
    if (!tempVal && newChild !== undefined) {
      finalVal = [newChild];
    } else {
      if (!tempVal.includes(newChild) && newChild !== undefined){
        finalVal = [...tempVal, newChild];
      } else {
        finalVal = tempVal
      }
    }
  }

  return finalVal
};

const manageDependencyArray = (data, newVal) => {

  let finalArr = newVal

      data.dependencies.forEach(dep => {
        if(!data.dependencies.includes(dep)){
          finalArr.push(dep) 
        }
       
  });

  return finalArr
};

const handleAvgProgress = (parent, progressList, taskName, newVal, del) => {
  let progressArray =[];

  if(del){
    progressList.forEach(task => {
      if (task.name !== newVal.val){
        progressArray.push(task.progress)
      }
  })
  const averagez = Math.round(progressArray.reduce((a,b) => a+b, 0) / progressArray.length)
  return averagez
  }

  if (newVal.yes === false) {
 
  progressList.forEach(task => {
      progressArray.push(task.progress)
    
  });
  const averagei = Math.round(progressArray.reduce((a,b) => a+b, 0) / progressArray.length)
  return averagei
  } 

  progressArray = [Number(newVal.val)]

  progressList.forEach(task => {
    if (task.name !== taskName){
      progressArray.push(task.progress)
    }
  });
  
  const average = Math.round(progressArray.reduce((a,b) => a+b, 0) / progressArray.length)
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
  formatForTable,
};
