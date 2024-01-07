import React, { useState } from 'react';
import '../css/ImageButtons.css';

function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

const ImageButtons = () => {
  const [inputValue, setInputValue] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleDragStart = (event, letter) => {
    event.dataTransfer.setData('text/plain', letter);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const letter = event.dataTransfer.getData('text/plain');
    setInputValue(prev => prev + letter);
  };

  const handleSave = () => {
    // Here you would normally save the data to a database or state management
    console.log('Saved:', inputValue);
  };

  const handleReset = () => {
    setInputValue('');
  };

  const handleSpeak = () => {
    speakText(inputValue);
    setIsSpeaking(true);
    // Replace this timeout with actual speech synthesis logic
    setTimeout(() => setIsSpeaking(false), 2000);
    console.log('Speaking:', inputValue);
  };

  return (
    <div className="magic-page">
      <button disabled={isSpeaking} onClick={handleSpeak}>Speak</button>
      <div className="letter-container">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
          <button
            key={letter}
            className="image-button"
            draggable="true"
            onDragStart={(event) => handleDragStart(event, letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Drop your alphabets here"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onDrop={handleDrop}
        onDragOver={event => event.preventDefault()}
        readOnly
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default ImageButtons;
