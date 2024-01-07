// script.js
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

function choice(text) {
  return text[Math.floor(Math.random() * (text.length - 1))]
}

function removeDuplicate(text) {
  const letters = [];
  [...text].forEach((letter) => {
    if (!letters.includes(letter))
      letters.push(letter);
  })
  return letters.reverse().join("")
}

document.addEventListener('DOMContentLoaded', function () {
  const letterImagesContainer = document.getElementById('letter-images-container');
  const input = document.getElementById('target');
  const saveButton = document.getElementById('save');
  const speakButton = document.getElementById('speak');
  const resetButton = document.getElementById('reset'); // Nouveau bouton de réinitialisation
  let registeredStrings = [];

  async function fetchWordList() {
    const response = await fetch('data/wordlist.txt');
    const words = await response.text();
    return words.split('\n').filter(word => word.length > 2 && word.length < 8);
  }

  async function getRandomWord() {
    const wordList = await fetchWordList();
    return wordList[Math.floor(Math.random() * wordList.length)];
  }

  async function displayLetterImages(word) {
    letterImagesContainer.innerHTML = '';
    for (let i = 0; i < word.length - 1; i++) {
      const letter = word[i].toLowerCase();
      const letterFolder = `img/alpha/${letter}/`;
      const images = ['1.jpg', '2.jpg', '3.jpg'];
      const randomImage = images[Math.floor(Math.random() * images.length)];

      const imgElement = document.createElement('img');
      imgElement.src = letterFolder + randomImage;
      imgElement.alt = letter;
      imgElement.className = 'letter-image';
      letterImagesContainer.appendChild(imgElement);
    }
  }

  // Add a dragstart event listener to each button
  document.querySelectorAll('.image-button').forEach(button => {
    button.addEventListener('dragstart', function (event) {
      event.dataTransfer.setData('text/plain', event.target.id);
    });
  });

  // Prevent default behavior for dragover event
  input.addEventListener('dragover', function (event) {
    event.preventDefault();
  });

  // Handle drop event on the input field
  input.addEventListener('drop', function (event) {
    event.preventDefault();
    const buttonId = event.dataTransfer.getData('text/plain');
    const button = document.getElementById(buttonId);
    console.log("button id", buttonId, button);
    input.value += button.textContent.trim();
    registerString(input.value);
  });

  // Add click event listener to the save button
  saveButton.addEventListener('click', function () {
    compareWithHello(input.value);
  });

  // Add click event listener to the speak button
  speakButton.addEventListener('click', function () {
    const currentWord = document.getElementById('random-word').textContent;
    speakText(currentWord);
  });

  // Add click event listener to the reset button
  resetButton.addEventListener('click', function () {
    input.value = '';
    registeredStrings = [];
  });

  // Function to register the input value
  function registerString(value) {
    if (!registeredStrings.includes(value)) {
      registeredStrings.push(value);
    }
  }

  // Function to compare the input value with "hello"
  function compareWithHello(value) {
    const h2Value = document.getElementById('random-word').textContent;
    if (value !== h2Value) {
      alert(`Input value (${value}) is not equal to (${h2Value}).`);
      // Perform actions if the input value is not equal to the h2 value
    } else {
      alert(`Input value (${value}) is equal to (${h2Value}).`);
      // Perform actions if the input value is equal to the h2 value
    }
  }

  async function init() {
    const randomWord = await getRandomWord();
    document.getElementById('random-word').textContent = randomWord.trim();
    displayLetterImages(randomWord);
    const buttonContainer = document.getElementById('button-container');
    let textContent = randomWord.trim(); // Get the text content and remove leading/trailing whitespace

    textContent += choice("abcdefghijklmnopqrstuvwxyz")
    textContent += choice("abcdefghijklmnopqrstuvwxyz")
    textContent = removeDuplicate(textContent)
    // Create buttons based on the text content
    for (let i = 0; i < textContent.length; i++) {
      const character = textContent[i];
      const button = document.createElement('button');
      button.textContent = character;
      button.className = 'image-button';
      button.id = character;
      button.setAttribute('draggable', 'true');
      button.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', event.target.id);
      });
      buttonContainer.appendChild(button);
    }
  }

  init();
});