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
