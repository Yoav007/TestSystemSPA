import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import { TestService } from "../../services/testService";
import './manageTests.scss'


export function ManageTests() {
    const params = useParams();
    const [tests, setTests] = useState([]);
    const testService = new TestService();
    let navigate = useNavigate();

    useEffect(() => {
        testService.get().then(data => {
            if (data) {
                let result = data.filter(x => x.topicId == params.id);
                console.log(result);
                setTests(result);
            }
        })
    }, [params.id]);

    function deleteTest(id) {
        let newCollection = tests.filter(q => q.id != id);
        testService.delete(id);
        setTests(newCollection);
    }

    function createTest() {
        navigate("/createTest/" + params.id)
    }

    function back() {
        navigate("/");
    }

    function edit(id) {
        navigate(`/manageTest/editTest/${id}/${params.id}`);
    }

    if (tests.length == 0) return <h3>There are no tests in this topic</h3>
    return (
        <div>
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
                                {/*type of test*/}      <td align="center">{test.topicId}</td>
                                <td align="center">{test.version}</td>
                                <td align="center">{test.isActive ? "" : <button onClick={() => edit(test.id)}>Edit</button>}
                                    {test.isActive ? "" : <button onClick={() => deleteTest(test.id)}>delete</button>}
                                    {test.isActive ? 'active' : 'deactive'}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={() => back()}>back</button>
                <button onClick={() => createTest()}>create a tets</button>
            </div>
        </div>

    )
}