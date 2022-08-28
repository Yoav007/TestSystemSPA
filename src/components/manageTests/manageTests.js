import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { QuestionService } from "../../services/questionService";
import { TestService } from "../../services/testService";
import './manageTests.scss'


export function ManageTests() {
    const params = useParams();
    const [tests, setQuestions] = useState([]);
    const questionService = new QuestionService();
    const testService = new TestService();

    // new comment
    useEffect(() => {
        testService.get().then(data => {
            if (data) {
                let result = data.filter(x => x.topicId == params.id);
                console.log(result);
                setQuestions(result);
            }
        })
    }, [params.id]);


    if (tests.length == 0) return <h3>There are no tests in this topic</h3>
    return (
        <div className="testsList">
            <h3>Tests:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Test name</th>
                        <th>number of question</th>
                        <th>Type</th>
                        <th>Version</th>
                        <th>Actions</th>
                        <th>last update</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map((test) =>
                        <tr key={test.id}>
                            <td>{test.id}</td>
                            <td align="center">{test.name}</td>
                            <td align="center">{test.questionsIdCollection.length}</td>
                            {/*type of test*/}     <td align="center">{test.topicId}</td>
                            <td align="center">{test.version}</td>
                            <td align="center"><button>Edit</button>  {test.isActive ? 'true' : 'false'}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}