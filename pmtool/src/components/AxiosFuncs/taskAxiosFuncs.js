import axios from "axios";

export const allTasks = (projId) => {
  return axios
    .get(`http://localhost:5000/tasks/${projId}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addTask = (info) => {

  return axios
    .post(`http://localhost:5000/task`, {
      name: info.name,
      start: info.start,
      end: info.end,
      type: info.type,
      progress: info.progress,
      dependencies: info.dependencies,
      barChildren: info.barchildren,
      hideChildren: info.hidechildren,
      projId: info.id,
    })
    .then((response) => {
      return response.data[0];
    })
    .catch((err) => {
      return err;
    });
};

export const updateHiddenTasks = (info) => {

  let id = info.id

  return axios
    .post(`http://localhost:5000/task/edit/hide/${id}`, {
      id: info.id,
      swtch: info.holder,
    })
    .then((response) => {
      return response.data[0];
    })
    .catch((err) => {
      return err;
    });
};

export const updateRestTasks = (info) => {

  let id = info.id

  return axios
    .post(`http://localhost:5000/task/edit/${id}`, {
      name: info.name,
      type: info.type,
      start: info.start,
      end: info.end,
      progress: info.progress,
      dependencies: info.dependencies,
      barChildren: info.barChildren,
      project: info.project,
      id: info.id,
    })
    .then((response) => {
      return response.data[0];
    })
    .catch((err) => {
      return err;
    });
};

export const getTaskByName = (info) => {

  let id = info.id
  // console.log("axios", info)
return axios
.post(`http://localhost:5000/task/${id}`, {
  id: info.id,
  name: info.name,
})
.then((response) => {
  return response.data[0];
})
.catch((err) => {
  return err;
});
};

export const getTaskStartMin = (info) => {

return axios
.post(`http://localhost:5000/tasks/min`, {
  project: info.project,
})
.then((response) => {
  return response.data[0];
})
.catch((err) => {
  return err;
});
};

export const getTaskStart2Min = (info) => {

  return axios
  .post(`http://localhost:5000/tasks/min2`, {
    project: info.project,
  })
  .then((response) => {
    return response.data[0];
  })
  .catch((err) => {
    return err;
  });
  };

export const getTaskEndMax = (info) => {

  // console.log("axios", info)
return axios
.post(`http://localhost:5000/tasks/max`, {
  project: info.project,
})
.then((response) => {
  return response.data[0];
})
.catch((err) => {
  return err;
});
};

export const getTaskEnd2Max = (info) => {

  // console.log("axios", info)
return axios
.post(`http://localhost:5000/tasks/max2`, {
  project: info.project,
})
.then((response) => {
  return response.data[0];
})
.catch((err) => {
  return err;
});
};



// export const deleteQuoteItem = (id) => {
//   return axios
//     .delete(`http://localhost:5000/quote/delete/${id}`, { id })
//     .then((response) => {})
//     .catch((err) => {
//       return err;
//     });
// };

