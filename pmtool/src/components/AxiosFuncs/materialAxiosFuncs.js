import axios from "axios";

export const allMaterials = (location) => {

  return axios
    .get(`/materials/${location}`)
    .then((response) => {
        return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export const materialtypes = (location) => {

  return axios
    .get(`/materials/types/${location}`)
    .then((response) => {
        return response.data;
    })
    .catch((err) => {
      return err;
    });
}

