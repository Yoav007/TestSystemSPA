import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { QuestionService } from "../../services/questionService";
import { TestService } from "../../services/testService";
import './manageQuestions.scss';


export function ManageQuestions() {
    const params = useParams();
    const [questions, setQuestions] = useState([]);
    const questionService = new QuestionService();
    const testService = new TestService();

    useEffect(() => {
        questionService.get().then(data => {
            if (data) {
                let result = data.filter(x => x.topicId == params.id);
                console.log(result);
                setQuestions(result);
            }
        })
    }, [params.id]);


    if (questions.length == 0) return <h3>There are no questions in this topic</h3>
    return (
        <div>
            <h3>Questions:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Text</th>
                        <th>Question Type</th>
                        {/* <th>Number of Tests With This Question</th> */}
                        <th>Is Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) =>
                        <tr key={question.id}>
                            <td>{question.id}</td>
                            <td align="right">{question.text}</td>
                            <td align="right">{question.isSingle ? 'Single' : 'Multi'}</td>
                            {/* <td align="right">
                                {testService.get().then(data => data.filter(t => t.questionsIdCollection.includes(question.id))).length}
                            </td> */}
                            <td align="right">{question.isActive ? 'true' : 'false'}</td>
                            <td align="right">Some Actions</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}