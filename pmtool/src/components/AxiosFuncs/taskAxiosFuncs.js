import axios from "axios";

export const allTasks = (projId) => {

  //  console.log("axios", projId)
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
      seq: info.seq,
      name: info.name,
      start: info.start,
      end: info.end,
      type: info.type,
      progress: info.progress,
      dependencies: info.dependencies,
      barChildren: info.barChildren,
      hideChildren: info.hideChildren,
      project: info.project,
      projId: info.project_id,
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
console.log("axios", info)
  let id = info.id

  return axios
    .post(`http://localhost:5000/task/edit/${id}`, {
      seq: info.seq,
      name: info.name,
      type: info.type,
      start: info.start,
      end: info.end,
      progress: info.progress,
      dependencies: info.dependencies,
      barChildren: info.barchildren,
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

export const getprTskPr = (projId) => {

  return axios
    .get(`http://localhost:5000/tasks/project/${projId}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAvgProgress = (info) => {

 console.log("axios", info)

return axios
.post(`http://localhost:5000/tasks/avgprogress`, {
  id: info.id,
  project: info.project,
})
.then((response) => {
  return response.data;
})
.catch((err) => {
  return err;
});
};

export const getTaskTypes = () => {

  return axios
    .get(`http://localhost:5000/task/types`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getTaskNames = () => {

  return axios
    .get(`http://localhost:5000/task/names`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteParent = (info) => {
  console.log("axios", info)
  
    return axios
      .post(`http://localhost:5000/tasks/delProject`, {
        projId: info.projId,
        project: info.name,
      })
      .then((response) => {
        return response.data[0];
      })
      .catch((err) => {
        return err;
      });
  };

  export const cleanUpDeps = (info) => {
   
    
      return axios
        .post(`http://localhost:5000/tasks/depenencies`, {
          projId: info.projId,
          text: info.text,
        })
        .then((response) => {
          return response.data[0];
        })
        .catch((err) => {
          return err;
        });
    };

export const deleteTask = (id) => {

  console.log("axios", id)
  return axios
    .delete(`http://localhost:5000/task/delete/${id}`, { id })
    .then((response) => {})
    .catch((err) => {
      return err;
    });
};
