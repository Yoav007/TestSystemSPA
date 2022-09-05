import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QuestionService } from '../../../services/questionService';
import { TestService } from '../../../services/testService';
import './createTest.scss';

export function CreateTest() {
    const testService = new TestService();
    const questionsService = new QuestionService();
    const params = useParams();
    const navigate = useNavigate();
    const [allQuestions, setAllQuestions] = useState([]);
    const [testQuestions, setQuestions] = useState([]);
    const [testName, setName] = useState("");
    const [introText, setIntro] = useState("");
    const [authorEmail, setEmail] = useState("");
    const [passingGrade, setGrade] = useState(0);
    const [successText, setSuccess] = useState("");
    const [failureText, setFailure]= useState("");

    useEffect(() => {
        questionsService.get().then(data => {            
            if (data) {   
                let result = data.filter(q => q.topicId == params.id);
                console.log(result);
                setAllQuestions(result);
            }
        });
    }, [params.id]);

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

    function back() {
        navigate("/manageTests/" + params.id)
    }

    function addTestToDb() {
        let test = {
            id: crypto.randomUUID(),
            name: testName,
            intro: introText,
            topicId: params.id,
            authorEmail: authorEmail,
            passingGrade: passingGrade,
            version: 1,
            isActive: false,
            questionsIdCollection: testQuestions,
            successText: successText,
            failureText: failureText,
            lastUpdate: getDate()
        }
        testService.post(test)
        .then(navigate("/manageTests/" + params.id));        
    }

    function getDate(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let houre = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        return `${day}.${month}.${year}, ${houre}:${minute}:${second}`
    }

    return (
        <div className='createTest'>
            <h2>Create new test</h2>
            <div>
                <label>
                    Name:
                    <input type="text" onChange={(event)=>updateName(event)} />
                </label>
            </div>
            <br />
            <div>
                <label>
                    Introdaction to the test:
                    <input textarea="true" onChange={(event)=>updateIntro(event)} />
                </label>
            </div>
            <br />
            <div>
                <label>
                    author email:
                    <input textarea="true" onChange={(event)=>updateEmail(event)} />
                </label>
            </div>
            <br />
            <div>
                <label>
                    Passing grade:
                    <input type="number" placeholder='numbers only' onChange={(event)=>updateGrade(event)} />
                </label>
            </div>
            <br />
            <div>
                <h2>qustions (click to add the question to the test)</h2>
                <table className='table' align='center'>
                    <thead>
                        <tr>
                            <th>question</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allQuestions.map((question) =>
                            <tr key={question.id} onClick={() => addToTest(question.id)}
                            style={{background: testQuestions.includes(question)? 'yellow' : 'white'}}>
                                <td>{question.text}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
            <div>
                <label>
                    success mesaage text:
                    <input type="text" onChange={(event)=>updateSuccess(event)} />
                </label>
            </div>
            <div>
                <label>
                    failure mesaage text:
                    <input type="text" onChange={(event)=>updateFailure(event)} />
                </label>
            </div>
            <div>
                <button onClick={()=>addTestToDb()}>add Test</button>
                <button onClick={() => back()}>back</button>
            </div>
        </div>
    )
}