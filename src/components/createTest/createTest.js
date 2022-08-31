import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QuestionService } from "../../services/questionService";
import { TestService } from "../../services/testService";
import {TopicService} from '../../services/topicService';
import './createTest.scss';

export function CreateTest() {
    const testService = new TestService();
    const questionsService = new QuestionService();
    //const topicService = new TopicService();
    const params = useParams();
    const [allQuestions, setAllQuestions] = useState([]);
    //const [topics, setTopics] = useState([]);
    const navigate = useNavigate();
    let testName = useRef("");
    let introText = useRef("");
    let passingGrade = useRef(0);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        questionsService.get().then(data => {
            if (data) {
                let result = data.filter(q => q.topicId == params.id);
                console.log(result);
                setAllQuestions(result);
            }
        });

        // topicService.get().then(data => {
        //     if (data) {
        //         let result = data.filter(t=> t.topicId == params.id);
        //         setTopics(result);
        //     }
        // });
    }, [params.id]);

    function addToTest(id){
        let coppy = questions;
        let selected = coppy.find(q  => q.id == id); 
        console.log(selected);
        if (!questions.includes(selected)){
            coppy.push(selected);
        }
        else{
            coppy = coppy.filter(q=> q.id !== id);
        }
        // console.log(coppy);
        // setQuestions(coppy);
        // console.log(questions);
    }

    function addTest() {
        const test = {
            name: testName.current.value,
            intro: introText.current.value,
            passGrade: passingGrade.current.value,
            version: 1,
            isActive: false,
            questionsIdCollection: questions.current.value,
            topicId: params.id
        }
        testService.post(test);
        navigate("/manageTests/" + params.id)
    }

    return (
        <div className='createTest'>
            <h2>Create new test</h2>
            <div>
                <label>
                    Name:
                    <input type="text" ref={testName} />
                </label>
            </div>
            <br />
            <div>
                <label>
                    Introdaction to the test:
                    <input textarea="true" ref={introText} />
                </label>
            </div>
            <br />
            <div>
                <label>
                    Passing grade:
                    <input type="number" placeholder='numbers only' ref={passingGrade} />
                </label>
            </div>
            <br />
            <div>
                <h2>qustions (click to add the question to the test)</h2>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>question</th>
                        </tr>
                    </thead>
                    <tbody>
                    {allQuestions.map((question) =>
                                <tr key={question.id} onClick={()=> addToTest(question.id)}>                                   
                                   <td>{question.text}</td>
                                </tr>)}
                    </tbody>
                </table>

            </div>
            <button onClick={addTest}>add Test</button>
        </div>
    )
}