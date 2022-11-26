import axios from 'axios';

const serverApi = 'http://3.85.237.83:8080/api';

export const getRoomExists = async roomId => {
  const response = await axios.get(serverApi + '/room-exists/' + roomId);
  return response.data;
}

export const getTURNCredentials = async () => {
  const response = await axios.get(`${serverApi}/get-turn-credentials`);
  return response.data;
}