import axios from "axios";

export const allTasksByCategory = (category) => {

  // console.log("axios", category)

  return axios
    .get(`http://localhost:5000/taskNames/${category}`)
    .then((response) => {
        return response.data;
    })
    .catch((err) => {
      return err;
    });
}


