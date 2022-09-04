import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionService } from "../../../services/questionService";

export function EditQuestion() {
    const params = useParams();
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([]);
    const [tags, setTags] = useState([]);
    const questionService = new QuestionService();
    const navigate = useNavigate();

    useEffect(() => {
        questionService.getById(params.id)
            .then(q => {
                console.log(q);
                setQuestion(q);
                setAnswers(q.answers);
                setTags(q.tags);
            });
    }, [])

    function updateQuestionText(event) {
        let questionCopy = question;
        let inputText = event.target.value;
        questionCopy.text = inputText;
        setQuestion(questionCopy);
    }

    function updateAnswerText(event, answer) {
        answer.text = event.target.value;
        setAnswers([...answers]);
    }

    function updateAnswerIsCorrect(answer) {
        answer.isCorrect = !answer.isCorrect;
        console.log(answer.isCorrect);
        setAnswers([...answers]);
    }

    function updateTags(event) {
        let res = event.target.value
            .replace(/\s+/g, '')
            .split(",");
        setTags(res);
    }

    function editQuestion() {
        let numOfCorrectAnswers = answers.filter(ans => ans.isCorrect === true).length;
        if (numOfCorrectAnswers >= 1) {
            let type = numOfCorrectAnswers == 1 ? true : false;

            let editedQuestions = {
                id: question.id,
                text: question.text,
                isSingle: type,
                topicId: question.topicId,
                answers: answers,
                tags: tags,
                isActive: question.isActive
            }
            questionService.put(editedQuestions.id, editedQuestions)
            .then(navigate("/manageQuestions/show/" + editedQuestions.id.toString()));
            
        }
        else {
            alert("must choose answer");
        }
    }

    if (!question) return (
        <p>Couldn't find question</p>
    )
    return (
        <div>
            <div>
                <label>Question's text</label>
                <input type="text" defaultValue={question.text} onChange={(e) => updateQuestionText(e)} />
            </div>
            <div>
                <label>Question's answers</label>
                {answers.map((answer, index) => {
                    return <div key={index}>
                        <label>Answer {index + 1}:</label>
                        <input type="text" onChange={(e) => updateAnswerText(e, answer)} value={answer.text} />
                        <label>Correct?</label>
                        <input type="checkbox" defaultChecked={answer.isCorrect} onChange={() => updateAnswerIsCorrect(answer)} />
                    </div>
                })}
            </div>
            <div>
                <label>Question's tags (seperate with ',')</label>
                <input type="text" defaultValue={tags} onChange={(e) => updateTags(e)} />
            </div>
            <button onClick={() => editQuestion()}>Confirm</button>
        </div>
    )

}