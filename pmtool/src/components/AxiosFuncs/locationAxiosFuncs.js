import axios from "axios";

 export const allLocations = () => {
    return axios
      .get("/locations")
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  export const addLocation = (info) => {

    return axios
      .post(`/admin/location`, {
        name: info.name,
      })
      .then((response) => {
        return response.data[0];
      })
      .catch((err) => {
        return err;
      });
  };

  export const deleteLocation = (id) => {

    return axios
      .delete(`/admin/location/delete/${id}`, {id})
      .then((response) => {
      })
      .catch((err) => {
        return err;
      });
    }