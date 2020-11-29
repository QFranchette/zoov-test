const axios = require("axios");

const instance = axios.create({
  baseURL: "https://jsonbox.io/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  },
  validateStatus: function(status) {
    return status >= 200 ;
  }
});

const boxid = "22222222222222222223";

const APIWrapper = {
  fetchBikes() {
    return new Promise((resolve, reject) => {      
      instance
        .get(boxid, {}) 
        .then((result) => {
          resolve(result.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateBike(oldBike, newBike) {
    return new Promise((resolve, reject) => {      
      instance
        .put(boxid + "/" + oldBike._id, newBike) 
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteBike(bike) {
    return new Promise((resolve, reject) => {      
      instance
        .delete(boxid + "/" + bike._id) 
        .then((result) => {
          resolve(result.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addBike(bike) {
    return new Promise((resolve, reject) => {      
      instance
        .post(boxid, bike) 
        .then((result) => {
          resolve(result.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

export default APIWrapper;
