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
