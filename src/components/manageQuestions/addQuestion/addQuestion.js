import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import { QuestionService } from "../../../services/questionService";

export function AddQuestion() {
    const params = useParams();
    const [text, setText] = useState("");
    const [answers, setAnswers] = useState([]);
    const [numOfAnswers, setNumOfAnswers] = useState(4);
    const questionService = new QuestionService();

    function handleNumber(event) {
        setNumOfAnswers(event.target.value);
        console.log(event.target.value);
    }

    function handleAnswerText(e, index) {
        answers[index].text = e.target.value;
        setAnswers([...answers]);
        console.log(answers);
    }

    function handleAnswerIsCorrect(e, index) {
        answers[index].isCorrect = e.target.checked;
        setAnswers([...answers]);
        console.log(answers);
    }

    return (
        <div>
            <div>
                <label>Number of answers (1 to 5)</label>
                <input type="number" defaultValue={4} min="1" max="5" onChange={(e) => handleNumber(e)} />
            </div>
            {new Array(numOfAnswers).map((_, index) => {
                return <div key={index}>
                    <label>Answer {index + 1}:</label>
                    <input type="text" onChange={(e, index) => handleAnswerText(e, index)} />
                    <label>Correct?</label>
                    <input type="checkbox" onChange={(e, index) => handleAnswerIsCorrect(e, index)} />
                </div>
            })}
        </div>
    )
}