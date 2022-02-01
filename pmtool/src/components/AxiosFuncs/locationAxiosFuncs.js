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

  export const addLocation = (info) => {

    return axios
      .post(`http://localhost:5000/admin/location`, {
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
      .delete(`http://localhost:5000/admin/location/delete/${id}`, {id})
      .then((response) => {
      })
      .catch((err) => {
        return err;
      });
    }