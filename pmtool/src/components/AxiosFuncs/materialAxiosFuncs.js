import axios from "axios";

export const allMaterials = (location) => {

  return axios
    .get(`http://localhost:5000/materials/${location}`)
    .then((response) => {
        return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export const materialtypes = (location) => {

  return axios
    .get(`http://localhost:5000/materials/types/${location}`)
    .then((response) => {
        return response.data;
    })
    .catch((err) => {
      return err;
    });
}

 export const allCivil = (location) => {

    return axios
      .get(`http://localhost:5000/materials/civil/${location}`)
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  export const allFibre = (location) => {

    return axios
      .get(`http://localhost:5000/materials/fibre/${location}`)
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  export const allCoax = (location) => {

    return axios
      .get(`http://localhost:5000/materials/coax/${location}`)
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

