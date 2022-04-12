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
                          <td id="userName">${score.user}</td>
                          <td id="userScore">${score.score}</td>
                        </tr>`;

      scoreTable.insertAdjacentHTML('beforeend', htmlText);
    });
  });
};

displayScores();

const addScore = async (url = '', info = {}) => {
  const response = await axios.post(url, info);
  return response.data;
};

const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', (e) => {
  const inputName = document.getElementById('name');
  const inputScore = document.getElementById('score');

  const name = inputName.value;
  const score = inputScore.value;

  if (name === '' || score === '') {
    scoreTable.insertAdjacentHTML('beforebegin', '<span class="error">Please make sure both fields are filled😋</span>');
    setTimeout(() => {
      document.querySelector('.error').remove();
    }, 3000);
  } else {
    scoreTable.insertAdjacentHTML('beforebegin', '<span class="success">Thank you! Your score has been added!🤘🏾</span>');
    addScore(`${baseURL}games/APgDRkSbvQyfpid8MbNQ/scores`, { user: name, score });
    setTimeout(() => {
      document.querySelector('.success').remove();
    }, 3000);
  }

  e.preventDefault();
});

