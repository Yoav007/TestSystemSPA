import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { QuestionService } from "../../services/questionService";
import { TestService } from "../../services/testService";

export function ManageTests() {

    let params = useParams();
    const [tests, setTests] = useState([]);
    const testService = new TestService();
    // const questionsService = new QuestionService();

    // new comment
    useEffect(() => {
        testService.get()
        .then(data => {
            if(data) {
                let res = data.filter(d => d.topicId == params.id)
                setTests(res);
                console.log(res);
            }  
        })

    }, [])
    if (tests.length == 0) return <h1>no tests</h1>
    return (
        <div>
            יש טסטים
        </div>
    )
}