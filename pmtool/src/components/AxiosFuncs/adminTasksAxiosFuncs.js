import axios from "axios";

export const allAvailableTasks = (values) => {
  let text;
  let type;

  if (values.text === undefined || values.text === null){
    text = ''
  } else {
    text = values.text
  }

  if (values.type === undefined || values.type === null){
    type = ''
  }  else {
    type = values.type
  }
  // console.log("axios", text,type)
  return axios
    .post(`/admin/tasks`,{ text, type })
    .then((response) => {
        return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export const addTask = (info) => {

  // console.log("axios", info)
  return axios
    .post(`/admin/task`, {
      name: info.name,
      type: info.type,
    })
    .then((response) => {
      return response.data[0];
    })
    .catch((err) => {
      return err;
    });
};

export const updateTaskById = (info) => {

  return axios
    .post(`/admin/task/edit/${info.id}`,{
      id: info.id,
      name: info.name,
      type: info.type,
    })
    .then((response) => {
      return response.data[0]
    })
    .catch((err) => {
      return err;
    });
  }

  export const deleteTask = (id) => {

    return axios
      .delete(`/admin/task/delete/${id}`, {id})
      .then((response) => {
      })
      .catch((err) => {
        return err;
      });
    }


    export const getTaskCats = () => {

      return axios
        .get(`/admin/taskcats`)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          return err;
        });
    };

    export const getTaskCategories = () => {

      return axios
        .get(`/admin/categories`)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          return err;
        });
    };

    export const addTaskCat = (info) => {

      return axios
        .post(`/admin/taskcat`, {
          name: info.name,
        })
        .then((response) => {
          return response.data[0];
        })
        .catch((err) => {
          return err;
        });
    };

    export const deleteTaskCat = (id) => {

      return axios
        .delete(`/admin/taskcat/delete/${id}`, {id})
        .then((response) => {
        })
        .catch((err) => {
          return err;
        });
      }