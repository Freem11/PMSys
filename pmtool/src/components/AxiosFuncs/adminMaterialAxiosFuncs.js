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
    .post(`http://localhost:5000/admin/materials`,{ text, location })
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
    .post(`http://localhost:5000/admin/material`, {
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


