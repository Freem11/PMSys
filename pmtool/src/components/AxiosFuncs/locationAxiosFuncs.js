import axios from "axios";

 export const allLocations = () => {
    return axios
      .get("http://localhost:5000/locations")
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }