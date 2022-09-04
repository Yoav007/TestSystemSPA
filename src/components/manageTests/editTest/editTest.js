import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { QuestionService } from "../../../services/questionService";
import { TestService } from "../../../services/testService";

export function EditTest() {

    const params = useParams();
    const testService = new TestService();
    const questionService = new QuestionService();
    const navigate = useNavigate();
    const [test, setTest] = useState(null);
    const [allQuestions, setAllQuestions] = useState([]);
    const [testQuestions, setQuestions] = useState([]);
    const [active, setActive] = useState(true);
    const [testName, setName] = useState("");
    const [introText, setIntro] = useState("");
    const [authorEmail, setEmail] = useState("");
    const [passingGrade, setGrade] = useState(0);
    const [successText, setSuccess] = useState("");
    const [failureText, setFailure]= useState("");
        
    useEffect(() => {
        testService.getById(params.id)
            .then(t => {
                console.log(t);
                setTest(t);
            });
    }, []);
    
    useEffect(()=> {
        console.log(params);
        questionService.get().then(data => {
            if (data) {
                let result = data.filter(q => q.topicId === parseInt(params.topicId));
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
        console.log(allQuestions);
    }
    
    function updateFailure(event){
        let failure = event.target.value;
        setFailure(failure);
    }

    function updateSuccess(event){
        let success = event.target.value;
        setSuccess(success);
    }

    function updateEmail(event){
        let Email = event.target.value;
        setEmail(Email);
    }

    function updateName(event){        
        let name = event.target.value;
        setName(name);
    }

    function updateIntro(event){
        let intro = event.target.value;
        setIntro(intro);
    }

    function updateGrade(event){
        let grade = event.target.value;
        setGrade(grade);
    }

    function updateActive(event){
        let active = event.target.value;
        setActive(!active);
    }
       
    function editTest() {
        let test = {
            name: testName,
            intro: introText,
            authorEmail: authorEmail,
            passGrade: passingGrade,
            version: test.version + 1,
            isActive: active,
            questionsIdCollection: testQuestions,
            successText: successText,
            failureText: failureText
        }
        navigate("/manageTest/" + params.id);
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
                    <input type="text" onChange={(event)=>updateName(event)}/>
                </label>
            </div>
            <br/>
            <div>
                <label>
                    Test Introdaction:
                    <input type="textarea" onChange={(event)=>updateIntro(event)}/>                    
                </label>
            </div>
            <br/>
            <div>
            <div>
                <label>
                    author Email:
                    <input type={"email"} onChange={(event)=>updateEmail(event)}/>                    
                </label>
            </div>
            <br/>
                <label>
                    Passing grade:
                    <input type="number" placeholder='numbers only' onChange={(event)=>updateGrade(event)} />
                </label>
            </div>
            <br />
            <div>
                <label>
                isActive?
                <input type="checkbox" selected={active} onChange={(event)=>updateActive(event)}/>
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
            <div>
                <label>
                    success text message:
                    <input type="text" onChange={(event)=>updateSuccess(event)}/>
                </label>
            </div>
            <br/>
            <div>
                <label>
                    success text message:
                    <input type="text" onChange={(event)=>updateFailure(event)}/>
                </label>
            </div>
            <br/>
            <button onClick={() => editTest()}>Edit</button>
            <button onClick={() => back()}>back</button>
        </div>
    )
}