import axios from 'axios';


const BASE_URL = "http://localhost:8080/"

const fetchGetData = (uri) => {
  const url = `${BASE_URL}${uri}`;
  return axios.get(url)
    .catch(error => {
      console.error('Error fetching data for URL:', url, 'Error', error.message);
     throw error;
    });
};



const fetchPostData = (uri, payload) => {
  const url = `${"http://localhost:8080/"}${uri}`;
  return axios.post(url, payload)
    .catch(error => {
      // Handle exceptions/errors
      console.error('Error fetching data for URL:', url, 'Error', error.message);
      // You can throw the error again if you want to handle it elsewhere
      throw error;
    });
};

const fetchPostDataWithAuth = (uri, payload) => {
  const token = sessionStorage.getItem('token');
  const url = `${BASE_URL}${uri}`;
  return axios.post(url, payload, {
    headers: {
      "Content-Type": "application/json",    // Ensures data is sent in JSON format
      "Authorization": `Bearer ${token}`,    // Sends the token in the Authorization header
    },
    withCredentials: true  // Ensures credentials (like cookies or tokens) are sent in CORS requests
  })
  .then(response => {
    return response.data;  // Return the response data if the request is successful
  })
  .catch(error => {
    console.error('Error fetching data for URL:', url, 'Error:', error.message);
    // Handle error, you can also rethrow it if needed
    throw error;
  });
};








export const fetchGetDataWithAuth = async (uri) => {
  const token = sessionStorage.getItem('token');
  const url = `${BASE_URL}${uri}`;

  if (!token) {
    console.error('No token found in sessionStorage');
    return null; // Exit if token is missing
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    console.log('Response from API:', response.data);
    return response.data; // Return actual data
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // Handle error gracefully
  }
};




export default fetchGetData;
export { fetchPostData  ,fetchPostDataWithAuth  , fetchGetData };