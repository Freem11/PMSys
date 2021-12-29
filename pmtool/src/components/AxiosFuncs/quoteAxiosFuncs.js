import axios from "axios";

export const allQuote = (projId) => {
  return axios
    .get(`http://localhost:5000/quotes/${projId}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addQuote = (info) => {

  return axios
    .post(`http://localhost:5000/quote`, {
      name: info.name,
      price: info.price,
      quantity: info.quantity,
      totalcost: info.cost,
      projId: info.id,
    })
    .then((response) => {
      return response.data[0];
    })
    .catch((err) => {
      return err;
    });
};

export const updateQuote = (info) => {

  return axios
    .post(`http://localhost:5000/quote/edit`, {
      id: info.id,
      name: info.name,
      price: info.price,
      quantity: info.quantity,
      totalcost: info.cost,
      projId: info.projId,
    })
    .then((response) => {
      return response.data[0];
    })
    .catch((err) => {
      return err;
    });
};

export const deleteQuoteItem = (id) => {
  return axios
    .delete(`http://localhost:5000/quote/delete/${id}`, { id })
    .then((response) => {})
    .catch((err) => {
      return err;
    });
};
