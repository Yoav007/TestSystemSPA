import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TestService } from "../../../services/testService.js";
import { ReportService } from "../../../services/reportService.js";
import "./reportsByStudent.scss";

export function ReportByStudent() {

    
    const params = useParams();
    const reportService = new ReportService();
    const testService = new TestService();
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState();
    const [show, setShow] = useState();
    const [results, setResults] = useState([]);


    useEffect(() => {
        reportService.getStudents().then(data => {
            console.log(data);
            if (data) {
                setStudents(data);
            }
        })
    }, []);

    function selectStudent(event) {
        let inputText = (event.target.value);
        let relevantStudent = students.filter((student) => student.id == inputText);
        setStudent(relevantStudent);
        if (!show) setShow(true);
        reportService.getResultByStudentId(event.target.value).then((data) => {
        let selectedStudent = data
        console.log(selectedStudent);
        setResults(selectedStudent);
        })

    }
    function getTestName(id) {
        let testName;
        testService.getById(id).then((data)=>{
        testName = data.name;
        console.log(testName);
        })
        return testName
    }

    function getStudentName(id){
        if(student.id ==id)
        return student.name
    }

    if (students) {
        return (
            <section>
                <h1>Report By Student</h1>
                <input type="text" placeholder="Enter student ID" onChange={(e) => selectStudent(e)} />
                <button onClick={(e) => selectStudent(e)}>Enter</button>
                <div style={{ visibility: show ? '' : 'hidden' }}>
                    <h3>Select a test:</h3>
                    <table align="center">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>Test ID</th>
                                <th>Test Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result, index) =>
                                <tr key={index}>
                                    <td align="center">{result.studentId}</td>
                                    <td align="center">{getTestName(result.testId)}</td>
                                    <td align="center">{result.testId}</td>
                                    <td align="center">{getStudentName(result.studentId)}</td>
                                    
                                </tr>

                            )}
                        </tbody>
                    </table>

                </div>
            </section>
        )
    }
    return (
        <div>
            <h1>No Students Found</h1>
        </div>
    )

}

