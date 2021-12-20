import axios from "axios";

export const login = ({ email, password }) => {
    return axios
      .post("http://localhost:5000/session", { email: email, pass: password })
      .then((response) => {
        if (response.data[0]) {
          return response.data[0];
        }
      })
      .catch((err) => {
        return err;
      });
  }

export const checkEmail = ({ email }) => {
    return axios
      .post("http://localhost:5000/sessions", { email })
      .then((response) => {
        if (response.data[0]) {
          return response.data[0];
        }
      })
      .catch((err) => {
        return err;
      });
  }

export const register = ({ regName, regEmail, regPassword }) => {
    return axios
      .post("http://localhost:5000/register", {
        name: regName,
        email: regEmail,
        pass: regPassword,
      })
      .then((response) => {
        if (response.data[0]) {
          return response.data[0];
        }
      })
      .catch((err) => {
        return err;
      });
  }

  export const allUsers = () => {
    return axios
      .get("http://localhost:5000/users")
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  export const userByName = ({ name }) => {
    return axios
      .get("http://localhost:5000/user", { name })
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  export const createUserProject = ({ userId, projectId }) => {
    return axios
      .post("http://localhost:5000/user_project", {
        user_id: userId,
        project_id: projectId,
      })
      .then((response) => {
        if (response.data[0]) {
          return response.data[0];
        }
      })
      .catch((err) => {
        return err;
      });
  }