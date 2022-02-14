import axios from "axios";

export const allAvailableMaterials = (values) => {
  let text;
  let location;

  if (values.text === undefined){
    text = ''
  } else {
    text = values.text
  }

  if (values.location === undefined){
    location = ''
  }  else {
    location = values.location
  }

  return axios
    .post(`/admin/materials`,{ text, location })
    .then((response) => {
        return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export const addMaterial = (info) => {

  // console.log("axios", info)
  return axios
    .post(`/admin/material`, {
      name: info.name,
      type: info.type,
      location: info.location,
      price: info.price,
    })
    .then((response) => {
      return response.data[0];
    })
    .catch((err) => {
      return err;
    });
};

export const updateMaterialById = (info) => {

  return axios
    .post(`/material/edit/${info.id}`,{
      id: info.id,
      name: info.name,
      type: info.type,
      location: info.location,
      price: info.price
    })
    .then((response) => {
      return response.data[0]
    })
    .catch((err) => {
      return err;
    });
  }

  export const deleteMaterial = (id) => {

    return axios
      .delete(`/material/delete/${id}`, {id})
      .then((response) => {
      })
      .catch((err) => {
        return err;
      });
    }
