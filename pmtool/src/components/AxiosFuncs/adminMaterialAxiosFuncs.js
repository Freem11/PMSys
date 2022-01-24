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


