import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { QuestionService } from "../../../services/questionService";
import { TestService } from "../../../services/testService";

export function EditTest() {

    const params = useParams();
    const testService = new TestService();
    const questionService = new QuestionService();
    const navigate = useNavigate();
    const [test, setTest] = useState("");
    const [allQuestions, setAllQuestions] = useState([]);
    const [testQuestions, setQuestions] = useState([]);
    const [active, setActive] = useState(true);
    //let testName = useRef("");
    const [testName, setName] = useState("");
    let introText = useRef("");
    let passingGrade = useRef(0);
    let activetest = useRef(true);

    useEffect(() => {
        testService.getById(params.id)
            .then(t => {
                console.log(t);
                setTest(t);
            });
    }, []);
    
    useEffect(()=> {
        questionService.get().then(data => {
            if (data) {
                let result = data.filter(q => q.topicId == params.id);
                setAllQuestions(result);
            }
        })
    }, [params.id]);

    function addToTest(id) {
        let coppy = testQuestions;
        let selected = allQuestions.find(q => q.id == id);

        if (!testQuestions.includes(selected)) {
            coppy.push(selected);
        }
        else {
            coppy = coppy.filter(q => q.id != id);
        }

        console.log(coppy);
        setQuestions([...coppy]);
    }

    
       
    function editTest() {
        let test = {
            name: testName.current.valueOf(), //testName?
            intro: introText.current.valueOf(),
            passGrade: passingGrade.current.valueOf(),
            version: test.version + 1,
            isActive: active.current.valueOf(),
            questionsIdCollection: testQuestions.current.valueOf()
        }
    }

    function back() {
        navigate("/manageTests/" + params.id)
    }

    if (!test) return <h3>can't find the test</h3>
    return (
        <div>
            <h2>edit test page</h2>
            <div>
                <label>
                    Name:
                    <input type="text" ref={testName} /*onChange={()}*//>
                </label>
            </div>
            <br/>
            <div>
                <label>
                    Test Introdaction:
                    <input type="textarea" ref={introText}/>
                </label>
            </div>
            <br/>
            <div>
                <label>
                    Passing grade:
                    <input type="number" placeholder='numbers only' ref={passingGrade} />
                </label>
            </div>
            <br />
            <div>
                <label>
                isActive?
                <input type="checkbox" selected={active} onChange={()=>setActive(!activetest)}/>
                </label>
            </div>
            <div> 
                <h4>questions (click to add</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>questions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allQuestions.map((question)=>
                        <tr key={question.id} onClick={()=>addToTest(question.id)}>
                            <td>{question.text}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <button onClick={() => editTest()}>Edit</button>
            <button onClick={() => back()}>back</button>
        </div>
    )
}