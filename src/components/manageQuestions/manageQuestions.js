import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { QuestionService } from "../../services/questionService";
import { TestService } from "../../services/testService";
import './manageQuestions.scss';


export function ManageQuestions() {
    const params = useParams();
    const [questions, setQuestions] = useState([]);
    const [tests, setTests] = useState([]);
    const questionService = new QuestionService();
    const testService = new TestService();
    const navigate = useNavigate();

    useEffect(() => {
        
        questionService.get().then(data => {
            if (data) {
                let result = data.filter(q => q.topicId == params.id);
                setQuestions(result);
            }
        });
        testService.get().then(data => {
            if (data) {
                let result = data.filter(t => t.topicId == params.id);
                console.log(result);
                setTests(result);
            }
        })
    }, []);

    function deleteQuestion(id) {
        let newCollection = questions.filter(q => q.id != id);
        questionService.delete(id);
        setQuestions(newCollection);
    }
    function showQuestion(id) {
        console.log("redirect to show question");
        navigate("/manageQuestions/show/" + id)
    }
    function editQuestion(id) {
        console.log("redirect to edit question");
        navigate("/manageQuestions/edit/" + id)
    }

    if (questions.length == 0) return <h3>There are no questions in this topic</h3>
    return (
        <div>
            <h3>Questions:</h3>
            <table align="center">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Text</th>
                        <th>Question Type</th>
                        <th>Number of Tests With This Question</th>
                        <th>Is Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) =>
                        <tr key={question.id}>
                            <td>{question.id}</td>
                            <td>{question.text}</td>
                            <td>{question.isSingle ? 'Single' : 'Multi'}</td>
                            <td>{tests.filter(t => t.questionsIdCollection.includes(question.id)).length}</td>
                            <td>{question.isActive ? 'true' : 'false'}</td>
                            <td>
                                <button onClick={() => showQuestion(question.id)}>Show</button>
                                <button onClick={() => editQuestion(question.id)}>Edit</button>
                                {question.isActive ? <></> : <button onClick={() => deleteQuestion(question.id)}>Delete</button>}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={() => navigate("/")}>Go Back</button>
            <button onClick={() => navigate("/manageQuestions/add/" + params.id)}>Add Question</button>
        </div>
    )
}