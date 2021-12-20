import axios from "axios";

export const registerProject = (values) => {
  return axios
    .post("http://localhost:5000/project", {
      name: values.title,
      status: values.status,
      userId: values.user_id,
    })
    .then((response) => {

       let projectId = response.data[0].id

      values.team.forEach((user) => {

        return axios
          .post("http://localhost:5000/user", { user })
          .then((response1) => {
        
            let userId = response1.data[0].id;
    
            return axios
              .post("http://localhost:5000/user_project", { 
                userId: userId,
                projectId: projectId
               })
              .then((response2) => {
                console.log("userproject info", response2)
                 return response2.data[0].id;
              })
              .catch((err) => {
                return err;
              });
          })
          .catch((err) => {
            return err;
          });
      });
    })
    .catch((err) => {
      return err;
    });
};


export const getProjectById = (projectId) => {
  return axios
    .post(`http://localhost:5000/project/${projectId}`, { projectId })
    .then((response) => {
      return response.data[0]
    })
    .catch((err) => {
      return err;
    });
  }

  export const updateProjectById = (info) => {

    return axios
      .post(`http://localhost:5000/project/edit/${info.project_id}`,{
        name: info.title,
        userId: info.user_id,
        projectId: info.project_id 
      })
      .then((response) => {
        return response.data[0]
      })
      .catch((err) => {
        return err;
      });
    }