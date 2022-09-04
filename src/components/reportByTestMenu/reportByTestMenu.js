import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TopicService from "../../services/topicService.js";
import { TestService } from "../../services/testService.js";

export function ReportByTestMenu() {

    const [tests, setTests] = useState([]);
    const [testId, setId] = useState();
    const testService = new TestService();
    const params = useParams();

    useEffect(() => {
        testService.get().then(data => {
            if (data) {
                let result = data.filter(x => x.topicId == params.id && x.isActive == true);
                console.log(result);
                setTests(result);
            }
        })
    }, [])

    function handleSelect(event) {
        console.log(event.target.value);
        setId(event.target.value);
    }
    if (tests) {
        return (
            <>
                <select defaultValue={"Select test"} onChange={(event) => handleSelect(event)}>
                    <option hidden>Select test</option>
                    {tests.map((test) =>
                        <option key={test.id} value={test.id} >{test.name}</option>)}
                </select>
                <br />
                <h1>some awesome component</h1>
            </>
        )
    }
    return (
        <>
            no test choose
        </>
    )
}
