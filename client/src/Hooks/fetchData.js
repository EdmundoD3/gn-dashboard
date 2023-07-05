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

export function fetchData(URL) {
  return {
    get: ({ url = '', params = {} }) => {
      const promise = axios
        .get(url = URL + url, { params, data: params })
        .then((response) => response.data)
        .then((json) => json);
      return getSuspender(promise);
    },
    post: ({ url = '', params = {} }) => {
      const promise = axios
        .post(url = URL + url, { params, data: params })
        .then((response) => response.data)
        .then((json) => json);
      return getSuspender(promise);
    },
    put: ({ url = '', params = {} }) => {
      const promise = axios
        .put(url = URL + url, { params, data: params })
        .then((response) => response.data)
        .then((json) => json);
      return getSuspender(promise);
    },
    delete: ({ url = '', params = {} }) => {
      const promise = axios
        .delete(url = URL + url, { params, data: params })
        .then((response) => response.data)
        .then((json) => json);
      return getSuspender(promise);
    },
  }

}


// function getDataFromServer() {
//   axios
//     .get(urlWithProxy)
//     .then((res) => setData(res.data))
//     .catch((err) => {
//       console.error(err);
//     });
// }