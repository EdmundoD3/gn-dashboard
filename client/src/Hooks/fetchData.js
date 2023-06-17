import axios from "axios";

const getSuspender = (promise) => {
  let status = "pending";
  let response;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
};

export function fetchData({ url, params = {} }) {
  const promise = axios
    .get(url, { params, data: params })
    .then((response) => response.data)
    .then((json) => json);

  return getSuspender(promise);
}

// function getDataFromServer() {
//   axios
//     .get(urlWithProxy)
//     .then((res) => setData(res.data))
//     .catch((err) => {
//       console.error(err);
//     });
// }