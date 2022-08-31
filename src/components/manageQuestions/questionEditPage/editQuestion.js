import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionService } from "../../../services/questionService";

export function EditQuestion() {
    const params = useParams();
    const [question, setQuestion] = useState("");
    const questionService = new QuestionService();

    let text = useRef("");
    let answersText = useRef([]);
    let answersCorrect = useRef([]);
    let tags = useRef("");

    useEffect(() => {
        questionService.getById(params.id)
            .then(q => {
                console.log(q);
                setQuestion(q);
            });
    }, [])

    function editQuestion() {
        let textArr = [];
        console.log("blah" + textArr.at(2));
        console.log(answersText.current.values);
        for (let index = 0; index < question.answers.length; index++) {
            const ans = {
                text: answersText.current.at(index),
                isCorrect: answersCorrect.current.values()[index]
            }
            textArr.push(ans);
        }
        let myTags = tags.current.value.split(" ");

        let editedQuestions = {
            id: question.id,
            text: text.current.value,
            isSingle: question.isSingle,
            topicId: question.topicId,
            answers: textArr,
            tags: myTags,
            isActive: question.isActive
        }
        console.log(editedQuestions);
    }

    if (!question) return (
        <p>Couldn't find question</p>
    )
    return (
        <div>
            <div>
                <label>Question's text</label>
                <input type="text" ref={text} />
            </div>
            <div>
                <label>Question's answers</label>
                {question.answers.map((answer, index) => {
                    return <div key={index}>
                        <label>Answer {index + 1}:</label>
                        <input type="text" ref={answersText[index]} />
                    </div>
                })}
            </div>
            <div>
                <label>Question's tags (seperate with spaces)</label>
                <input type="text" ref={tags} />
            </div>
            <button onClick={() => editQuestion()}>Confirm</button>
        </div>
    )

}