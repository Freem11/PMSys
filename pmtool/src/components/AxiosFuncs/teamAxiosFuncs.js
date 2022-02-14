import axios from "axios";

export const getTeamByProjectId = (projectId) => {

  return axios
    .get(`/user_project/${projectId}`)
    .then((response) => {
        return response
      })
    .catch((err) => {
      return err;
    });

  }


  export const registerUserProject = (userId, projectId) => {

  return axios
    .post("/user_project", { 
      userId: userId,
      projectId: projectId
      })
    .then((response2) => {
        return response2.data[0].id;
    })
    .catch((err) => {
      return err;
    });
   }


  export const deleteUserProject = (userId, projectId) => {

  return axios
    .post("/user_project/delete", { 
      userId: userId,
      projectId: projectId
      })
    .then((response2) => {
        return response2.data[0].id;
    })
    .catch((err) => {
      return err;
    });
    }