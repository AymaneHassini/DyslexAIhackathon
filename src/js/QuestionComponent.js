// QuestionComponent.jsx
import React from 'react';
import "../css/QuestionComponent.css";

function QuestionComponent({ data, onSelectChoice }) {
  return (
    <div className='Question'>
      <h3>{data.question}</h3>
      {data.choices.map(choice => (
        <label key={choice}>
          <input 
            type="radio" 
            name={`question-${data.id}`}  // Ensuring each question has its unique radio group
            onChange={() => onSelectChoice(data.id, choice)} 
          />
          {choice}
        </label>
      ))}
    </div>
  );
}

export default QuestionComponent;
