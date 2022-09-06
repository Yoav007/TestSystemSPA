import { useEffect, useState } from "react";

import { useNavigate, Navigate, useParams } from "react-router-dom";
import { ReportService } from "../../../services/reportService.js";
import "./reportsByStudent.scss";
import { StudentService } from "../../../services/studentService.js";
import { TestService } from "../../../services/testService.js";
import { QuestionService } from "../../../services/questionService.js";

export function ReportByStudentId() {
    
    const testService = new TestService();
    const reportService = new ReportService();
    const questionService = new QuestionService();
    const navigate = useNavigate()
    const params = useParams();
    const [results, setResults] = useState([]);
    const [testName,setTname] = useState();
    const [tests, setTests] = useState();
    const [report, setReport] = useState();
    const [show, setShow] = useState();
    const [see, setSee] = useState();
    const [correct, setCorrect] = useState([]);
    const [wrong, setWrong] = useState([]);
    
    
    useEffect(() => {
        reportService.getResultByStudentId(params.id).then(data => {
            console.log(data);
            if (data) {
                setResults(data);
            } });
        testService.get().then(data=> {
            console.log(data);
            if (data) {
                setTests(data);
            } })
    }, []);

    function handleSelect(event){
        let test = event.target.value;
        let choice = results.filter((t)=> t.id == test.id);
        if (!show) setShow(true);
        setReport(choice[0]);
    }

    function showCorrect(){
    // let answers =[];
    report.correctAnswers.forEach(answer => {
    console.log(answer.questionId);
    questionService.getById(answer.questionId).then(data=>{
    if(data){
        console.log(data);
        setCorrect([...correct],data);
        console.log(correct);
    }
    })
    
    });
    if (!see) setSee(true);
    //setCorrect (answers);
    }

    function back(){
        navigate("/reports/byStudent/")  
    }
    
    if(results){
        return(
            <>
            <section>
                <h2>Student Reports for Student ID {params.id}</h2>
                    <select defaultValue={"Select Test"} onChange={(event) => handleSelect(event)}>
                <option hidden>Select Test</option>
                {results.map((result)=>
                <option key={result.testId} value = {result.testId}>{result.testName}</option>
                )}   
            </select>
            {report? <div style={{ visibility: show ? '' : 'hidden' }}>
                <h3> Report for Test {report.testName} for Student ID: {report.studentId}</h3>
               <table align="center">
                <thead align="center">
                    <tr>
                        <th>Test ID</th>
                        <th>Test Name</th>
                        <th>Student ID</th>
                        <th>Number of Answers Answered</th>
                        <th>Correct Answers</th>
                        <th>Grade</th>
                        <th>Wrong Answers</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{report.testId}</td>
                        <td>{report.testName}</td>
                        <td>{report.studentId}</td>
                        <td>{report.numOfQuestionsAnswered}</td>
                        {/* <button onClick={() => showCorrect(report)}>Show</button> */}
                        <td>{report.correctAnswers.length}
                        {/* <button onClick={()=>showCorrect()}>Show</button> */}
                         </td> 
                        <td>{report.grade}</td>
                        <td>{report.wrongAnswers.length}</td>
                        {/* <button onClick={() => showWrong()}>Show</button></td> */}
                    </tr>
                </tbody>
               </table>
            </div>: <></>} 
            </section>
            <button onClick={() => back()}>back</button>  
            </>
           
        )

    }

}