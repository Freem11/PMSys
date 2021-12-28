import axios from "axios";

 export const allCivil = () => {
    return axios
      .get("http://localhost:5000/materials/civil")
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  export const allFibre = () => {
    return axios
      .get("http://localhost:5000/materials/fibre")
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  export const allCoax = () => {
    return axios
      .get("http://localhost:5000/materials/coax")
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }