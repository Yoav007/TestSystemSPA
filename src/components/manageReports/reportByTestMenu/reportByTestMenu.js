import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TopicService from "../../../services/topicService.js";
import { TestService } from "../../../services/testService.js";
import { ReportService } from "../../../services/reportService.js";
import { StudentService } from "../../../services/studentService.js";



export function ReportByTestMenu() {

    const [tests, setTests] = useState([]);
    const [testResults, setResults] = useState([]);
    const [testId, setId] = useState();
    const testService = new TestService();
    const reportService = new ReportService();
    const studentService = new StudentService();
    const [show, setShow] = useState();
    const params = useParams();
    const [test, setTest] = useState({ name: '', passingGrade: '', questionsIdCollection: [] });
    const [students, setStudents] = useState();

    useEffect(() => {

        testService.getResultByTopicId(params.id).then(data => {
            console.log(data);
            setTests(data);
        });

    }, [])

    function handleSelect(event) {
        console.log(event.target.value);
        setId(event.target.value);
        if (!show) setShow(true);
        testService.getById(event.target.value).then(data => {
            console.log(data);
            setTest(data);
        });
        reportService.getResultByTestId(event.target.value).then(data => {
            console.log(data);
            setResults(data);
        });
        studentService.getStudentsByTestId(event.target.value).then(data => {
            console.log(data);
            setStudents(data);
        })
    }

    function getAverage() {
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
                <h1>Report By Test</h1>
                <select defaultValue={"Select test"} onChange={(event) => handleSelect(event)}>
                    <option hidden>Select test</option>
                    {tests.map((test) =>
                        <option key={test.id} value={test.id} >{test.name}</option>)}
                </select>
                <br />
                <div style={{ visibility: show ? '' : 'hidden' }}>
                    <h3>Summery</h3>
                    <h5>Test Name: {test.name}</h5>
                    <h5>Test ID: {test.id}</h5>
                    <h5>Passing Greade: {test.passingGrade}</h5>
                    <h5>Number of Questions: {test.questionsIdCollection.length}</h5>
                    <h5>Number of Submitions: {testResults.length}</h5>
                    <h5>Average Grade: {getAverage()}</h5>
               
                <h3>Respondent Grade and Answers</h3>
                <table align="center">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Number of Questions Answered</th>
                            <th>Number of Correct Answers</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {students.map((student, index) =>
                            <tr key={index}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        )} */}
                    </tbody>
                </table>

                </div>
            </>
        )
    }
    return (
        <>
            No tests were found
        </>
    )
}

