import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionService } from "../../services/questionService";
import TopicService from "../../services/topicService";

const params = useParams();
const [question, setQuestion] = useState();
const [topic, setTopic] = useState();
const questionService = new QuestionService();
const topicService = new TopicService();

useEffect(() => {
    questionService.getById(params.id)
        .then(q => {
            if (q) {
                console.log(q);
                setQuestion(q);
            }
        });
        topicService.get().then(data => {
            if (data) {
                let result = data.filter(t => t.topicId == params.id);
                console.log(result);
                setTests(result);
            }
        });
}, [])

if (question) return (
    <div>
        <h3>{question.text}</h3>
    </div>
)
return (
    <h2>couldn't find question</h2>
)