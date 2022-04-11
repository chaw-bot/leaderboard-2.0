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

const getScores = async () => {
  const response = await axios.get(`${baseURL}games/APgDRkSbvQyfpid8MbNQ/scores`);
  return response.data.result;
};

const scoreTable = document.getElementById('recent-score-list');

const displayScores = () => {
  getScores().then((scores) => {
    scores.forEach((score) => {
      const htmlText = `<tr class="scores">
                          <td>${score.user}kjjnlk</td>
                          <td>${score.score}</td>
                        </tr>`;

      scoreTable.insertAdjacentHTML = ('beforeend', htmlText);
    });
  });
};

displayScores();
