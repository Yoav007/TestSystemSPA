import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionService } from "../../services/questionService";
import TopicService from "../../services/topicService";
import './showQuestion.scss'

export function ShowQuestion() {
    const params = useParams();
    const [question, setQuestion] = useState("");
    const [topic, setTopic] = useState("");
    const questionService = new QuestionService();
    const topicService = new TopicService();

    useEffect(() => {
        questionService.getById(params.id)
            .then(q => {
                if (q) {
                    console.log(q);
                    setQuestion(q);
                    topicService.getById(q.topicId)
                        .then(res => {
                            console.log(res);
                            setTopic(res)
                        });
                }
            });
    }, [])

    if (question) return (
        <div>
            <h2>Topic: {topic.name}</h2>
            <h2>{question.text}</h2>
            <h2>Answers:</h2>
            {question.answers.map((answer, index) =>
                <p key={index}>({index + 1}) <span className={answer.isCorrect ? 'isCorrect' : ''}>{answer.text}</span></p>)}
            <h2>Type: {question.isSingle ? 'Single' : 'Multi'}</h2>
            {/* {question.tags.forEach(tag => {
                console.log(tag);
                <p>{tag}</p>
            })} */}
            <h2>Tags:</h2>
            {question.tags.map((tag, index) => {
                console.log(tag);
                <p key={index}>{tag}</p>
            })}
        </div>
    )
    return (
        <h2>couldn't find question</h2>
    )
}