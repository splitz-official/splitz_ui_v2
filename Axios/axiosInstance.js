import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: "http://3.14.255.133",
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosInstanceMultipart = axios.create({
  baseURL: "http://3.14.255.133",
})


axiosInstance.setAuthToken = axiosInstanceMultipart.setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axiosInstanceMultipart.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
    delete axiosInstanceMultipart.defaults.headers.common['Authorization'];
  }
};

export {axiosInstance, axiosInstanceMultipart};
