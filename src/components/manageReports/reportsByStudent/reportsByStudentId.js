import { useEffect, useState } from "react";

import { useNavigate, Navigate, useParams } from "react-router-dom";
import { ReportService } from "../../../services/reportService.js";
import "./reportsByStudent.scss";
import { StudentService } from "../../../services/studentService.js";
import { TestService } from "../../../services/testService.js";

export function ReportByStudentId() {
    
    const testService = new TestService();
    const reportService = new ReportService();
    const params = useParams();
    const [results, setResults] = useState([]);
    const [testName,setTname] = useState();
    const [tests, setTests] = useState();
    const [report, setReport] = useState();
    const [show, setShow] = useState();
    
    
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
    
    if(results){
        return(
            <section>
                <h2>Student Reports for Student ID {params.id}</h2>
                    <select defaultValue={"Select Test"} onChange={(event) => handleSelect(event)}>
                <option hidden>Select Test</option>
                {results.map((result)=>
                <option key={result.testId} value = {result.testId}>{result.testName}</option>
                )}
               
            </select>
            <div style={{ visibility: show ? '' : 'hidden' }}>

            </div>


            </section>
           
        )

    }

}