import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TestService } from "../../../services/testService.js";
import { ReportService } from "../../../services/reportService.js";
import "./reportsByStudent.scss";
import { StudentService } from "../../../services/studentService.js";

export function ReportByStudent() {

    
    const params = useParams();
    const reportService = new ReportService();
    const studentService = new StudentService();
    const testService = new TestService();
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState();
    const [show, setShow] = useState();
    const [results, setResults] = useState([]);


    useEffect(() => {
        studentService.get().then(data => {
            console.log(data);
            if (data) {
                setStudents(data);
            }
        })
    }, []);

    function selectStudent(event) {
        let inputText = (event.target.value);
        let relevantStudent = students.filter((student) => student.id == inputText);
        console.log(relevantStudent);
        setStudent(relevantStudent);
        if (!show) setShow(true);
        reportService.getResultByStudentId(event.target.value).then((data) => {
        let selectedResults = data
        console.log(selectedResults);
        setResults(selectedResults);
        })

    }
    function getTestName(id) {
        console.log(id);
        let testName;
        testService.getById(id).then((data)=>{
        testName = data.name;
        console.log(testName);
        })
        return testName
    }

    function getStudentName(id){
        studentService.get().then(data=>{
        data.find((student)=> student.id ==id)
        })
        console.log(student.name);
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

