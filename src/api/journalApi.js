import axios from 'axios';

const journalApi = axios.create({
  baseURL: 'https://vue-demos-da527-default-rtdb.firebaseio.com'
});

export default journalApi;