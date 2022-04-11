import './style.css';
import axios from 'axios';

const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

// create a new game board and generate a game ID

const createGame = async () => {
  const response = await axios.post(`${baseURL}games/`, {
    name: 'Anime Ranking',
  });

  return response.data;
};

createGame().then((id) => {
  localStorage.setItem('Game ID:', JSON.stringify(id));
});


