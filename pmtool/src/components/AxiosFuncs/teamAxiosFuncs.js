import axios from "axios";

export const getTeamByProjectId = (projectId) => {

  return axios
    .get(`http://localhost:5000/user_project/${projectId}`)
    .then((response) => {
        return response
      })
    .catch((err) => {
      return err;
    });

  }


  export const registerUserProject = (userId, projectId) => {

    console.log("hmmm", userId, projectId)

  return axios
    .post("http://localhost:5000/user_project", { 
      userId: userId,
      projectId: projectId
      })
    .then((response2) => {
      console.log("returns", response2)
        return response2.data[0].id;
    })
    .catch((err) => {
      return err;
    });
   }