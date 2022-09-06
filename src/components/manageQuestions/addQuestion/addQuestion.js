import { useState } from "react"
import { useParams } from "react-router-dom";
import { QuestionService } from "../../../services/questionService";

export function AddQuestion() {
    const params = useParams();
    const [text, setText] = useState("");//question's text
    const [numOfAnswers, setNumOfAnswers] = useState(1);//num of answers
    const [tags, setTags] = useState([]);
    const [answers, setAnswers] = useState([{ text: "", isCorrect: false }]);//question's answers
    const questionService = new QuestionService();

    function handleQuesionText(event) {
        let inputText = event.target.value;
        setText(inputText);
        console.log(answers);
    }

    function handleAnswerText(event, answer) {
        answer.text = event.target.value;
        setAnswers([...answers]);
        console.log(answers);
    }

    function handleAnswerIsCorrect(event, answer) {
        answer.isCorrect = event.target.checked;
        setAnswers([...answers]);
        console.log(answers);
    }

    function deleteAnswer(answer) {
        if (numOfAnswers > 1) {
            setNumOfAnswers(numOfAnswers - 1)
            console.log(numOfAnswers);
            // answer = { text: "", isCorrect: false }
            let updatedAnswersArry = [...answers].filter(a => a !== answer);
            setAnswers(updatedAnswersArry);
        }
    }

    function addAnswer() {
        if (numOfAnswers < 5) {
            setNumOfAnswers(numOfAnswers + 1)
            console.log(numOfAnswers);
            let updatedAnswersArry = [...answers];
            updatedAnswersArry.push({ text: "", isCorrect: false })
            setAnswers(updatedAnswersArry);
        }
    }

    function updateTags(event) {
        let res = event.target.value
            .replace(/\s+/g, '')
            .split(",");
        setTags(res);
    }

    function addQuestion() {
        let numOfInvalidAnswers = answers.filter(a => a.text === "").length;
        console.log(numOfInvalidAnswers);
        let containsCorrectAnswer = answers.filter(a => a.isCorrect == true);
        console.log(containsCorrectAnswer);
        if (text != "" && numOfInvalidAnswers == 0 && containsCorrectAnswer.length > 0) {
            let numOfCorrect = answers.filter(a => a.isCorrect == true).length;
            let newId = questionService.get()
            let newQuestion = {
                text,
                isSingle: numOfCorrect > 1 ? false : true,
                topicId: params.topicId,
                answers,
                tags,
                isActive: false,
                id: crypto.randomUUID()
            }
            console.log(newQuestion);
            questionService.post(newQuestion);
            console.log("added");
        }
    }

    return (
        <div>
            <div>
                <label>Question's Text</label>
                <input type="text" onChange={(e) => handleQuesionText(e)} />
            </div>
            {numOfAnswers < 5 ? <button onClick={() => addAnswer()}>Add Answer</button> : <></>}
            {answers.map((answer, index) => {
                return <div key={index}>
                    <label>Answer {index + 1}:</label>
                    <input type="text" value={answer.text} onChange={(e) => handleAnswerText(e, answer)} />
                    <label>Correct?</label>
                    <input type="checkbox" onChange={(e) => handleAnswerIsCorrect(e, answer)} />
                    {numOfAnswers > 1 ? <button onClick={() => deleteAnswer(answer)}>Delete Answer</button> : <></>}
                </div>
            })}
            <div>
                <label>Question's tags (seperate with ",")</label>
                <input type="text" defaultValue={tags} onChange={(e) => updateTags(e)} />
            </div>
            <button onClick={() => addQuestion()}>Add Question to main collection</button>
        </div>
    )
}