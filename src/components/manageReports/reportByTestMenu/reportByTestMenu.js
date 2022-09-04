import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TopicService from "../../../services/topicService.js";
import { TestService } from "../../../services/testService.js";
import { ReportService } from "../../../services/reportService.js";



export function ReportByTestMenu() {

    const [tests, setTests] = useState([]);
    const [testResults, setResults] = useState([]);
    const [testId, setId] = useState();
    const testService = new TestService();
    const reportService = new ReportService();
    const [show, setShow] = useState();
    const params = useParams();
    const [test, setTest] = useState({name:'', passingGrade:'', questionsIdCollection:[]});
    const [avrageGrade, setAvrage] = useState();
   
    useEffect(() => {

        testService.getResultByTopicId(params.id).then(data=>{
            console.log(data);
                setTests(data);
            });
         
     },[])
    
    function handleSelect(event) {
        console.log(event.target.value);
        setId(event.target.value);
        if (!show) setShow(true);
        testService.getById(event.target.value).then(data=>{
            console.log(data);
            setTest(data);
        });
        reportService.getResultByTestId(event.target.value).then(data=>{
            console.log(data);
            setResults(data);
            });
    }

    function getAverage(){
        let sum = 0;
        testResults.forEach(result => {
          sum = sum + result.grade;  
        });
        let res = sum / testResults.length
        return res;
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
               <div style={{ visibility: show ? '' : 'hidden' }}>
                <h1>Summery</h1>
                <h2>Test Name: {test.name}</h2>
                <h2>Test ID: {test.id}</h2>
                <h2>Passing Greade: {test.passingGrade}</h2>
                <h2>Number of Questions: {test.questionsIdCollection.length}</h2>
                <h2>Number of Submitions: {testResults.length}</h2>
                <h2>Average Grade: {getAverage()}</h2>
                </div>
            </>
        )
    }
    return (
        <>
            no tests
        </>
    )  
}

