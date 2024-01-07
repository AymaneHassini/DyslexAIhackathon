import React, { useState } from 'react';
import QuestionComponent from './QuestionComponent';
import "../css/SurveyComponent.css";
import { useNavigate } from 'react-router-dom';

const questionsData = [
    { id: 1, question: "What subjects or topics do you enjoy learning about in school or at home?", choices: ["A. Animals and Nature", "Superheroes and Adventures", "Art and Creativity"] },
    { id: 2, question: "Do you have any favorite hobbies or activities that you love to do in your free time?", choices: ["Playing with Toys", "Drawing and Coloring", "Playing Outside"] },
    { id: 3, question: "Can you tell us about the types of books or stories you like to read?", choices: ["Fairy Tales and Fantasy", "Animal Stories and Adventures", "Funny and Silly Stories"] },
    { id: 4, question: "Are there any specific words or phrases that you find intriguing or exciting?", choices: ["Magic Words and Spells", "Animal Sounds and Names", " Funny and Rhyming Words"] },
    { id: 5, question: "Do you have any role models or famous people you look up to?", choices: ["Superheroes and Cartoon Characters", " Famous Athletes and Explorers", "Artists and Inventors"] },
    { id: 6, question: "Are there any particular places or environments that you find captivating or interesting?", choices: ["Under the Sea and Ocean Adventures", "Enchanted Forests and Hidden Caves", "Outer Space and Planets"] },
    { id: 7, question: "What are your favorite TV shows, movies, or cartoons?", choices: ["Magical and Fantasy Cartoons", "Animal Adventures and Wildlife Shows", "Comedy and Funny Cartoons"] },
    { id: 8, question: "Are there any animals or creatures that you're curious about or interested in?", choices: ["Dinosaurs and Prehistoric Creatures", "Mythical Creatures like Dragons and Unicorns", "Cute and Fluffy Animals"] },
    { id: 9, question: "Do you enjoy solving puzzles, riddles, or brain teasers?", choices: ["Riddles and Funny Jokes", "Mystery and Detective Puzzles", "Coloring and Drawing Challenges"] },
    { id: 10, question: "Are there any historical events or periods that fascinate you?", choices: ["Ancient Egypt and Pyramids", "Pirate Adventures and Treasure Hunts", "Explorers and Discoveries"] },
];

function SurveyComponent() {
    const [answers, setAnswers] = useState(Array(questionsData.length).fill(null));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const navigate = useNavigate()

    const handleChoiceSelect = (questionId, choice) => {
        setAnswers((oldAnswers) => {
            const newAnswers = [...oldAnswers]; // Create a new array for immutability
            const questionIndex = questionId - 1;
            newAnswers[questionIndex] = choice;
            return newAnswers;
        });
    };
    

    const handleNext = () => {
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };


    const handleSubmit = async () => {
        console.log('Submitted Answers:', answers);
        // Perform any backend operations needed here
        // navigate('/game/html.html'); // Redirect to the ImageButtons page
        window.location.replace('/game/html.html')
    };
    
      

    console.log('Current Index:', currentQuestionIndex);
    console.log('Current Question Data:', questionsData[currentQuestionIndex]);

    // Check if the current question data is undefined
    if (!questionsData[currentQuestionIndex]) {
        console.error('The current question data is undefined. This should not happen.');
        // Handle the error accordingly
        return <div>Error: Question data not found.</div>;
    }

    return (
        <div className='question-card'>
            <QuestionComponent 
                data={questionsData[currentQuestionIndex]} 
                onSelectChoice={handleChoiceSelect} 
            />
            <div className='navigation-buttons'>
                {currentQuestionIndex >= questionsData.length - 1 ? (
                    <button className="submit-button" onClick={handleSubmit}>submit</button>
                ) : (
                    <button onClick={handleNext}>next</button>
                )}
            </div>
        </div>
    );
}


export default SurveyComponent;
