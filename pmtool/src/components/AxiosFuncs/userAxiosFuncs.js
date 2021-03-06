import axios from "axios";

export const login = ({ email, password }) => {
    return axios
      .post("/session", { email: email, pass: password })
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
      .post("/sessions", { email })
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
      .post("/register", {
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
      .get("/users")
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  export const userByName = (user) => {

    return axios
      .post("/user", { user })
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  export const createUserProject = ({ userId, projectId }) => {
    return axios
      .post("/user_project", {
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

  export const userById = (id) => {

    return axios
      .get(`/user/${id}`)
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }