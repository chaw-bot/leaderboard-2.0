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

  const scoreArr = response.data.result;

  // arrange them in descending order
  scoreArr.sort((a, b) => b.score - a.score);

  return scoreArr;
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
    addScore(`${baseURL}games/APgDRkSbvQyfpid8MbNQ/scores`, { user: name, score }).then(() => {
      scoreTable.insertAdjacentHTML('beforebegin', '<span class="success">Thank you! Your score has been added!🤘🏾</span>');

      setTimeout(() => {
        document.querySelector('.success').remove();
      }, 3000);
    });

    inputName.value = '';
    inputScore.value = '';
  }

  e.preventDefault();
});

const refresh = document.getElementById('refresh');

refresh.addEventListener('click', () => {
  window.location.reload();
});
