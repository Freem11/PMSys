import axios from "axios";

export const allAvailableUsers = (values) => {
  let text;
  let email;

  if (values.text === undefined){
    text = ''
  } else {
    text = values.text
  }

  if (values.email === undefined){
    email = ''
  }  else {
    email = values.email
  }

  return axios
    .post(`http://localhost:5000/admin/users`,{ text, email })
    .then((response) => {
        return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export const addUser = (info) => {

  console.log("axios", info)
  return axios
    .post(`http://localhost:5000/admin/user`, {
      name: info.name,
      email: info.email,
      password: info.password,
      admin: info.admin,
    })
    .then((response) => {
      return response.data[0];
    })
    .catch((err) => {
      return err;
    });
};

export const updateUserById = (info) => {

  return axios
    .post(`http://localhost:5000/admin/user/edit/${info.id}`,{
      id: info.id,
      name: info.name,
      email: info.email,
      password: info.password,
      admin: info.admin
    })
    .then((response) => {
      return response.data[0]
    })
    .catch((err) => {
      return err;
    });
  }

  export const deleteUser = (id) => {

    return axios
      .delete(`http://localhost:5000/admin/user/delete/${id}`, {id})
      .then((response) => {
      })
      .catch((err) => {
        return err;
      });
    }
