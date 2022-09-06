import { Navigate, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TestService } from "../../../services/testService.js";
import { ReportService } from "../../../services/reportService.js";
import "./reportsByStudent.scss";
import { StudentService } from "../../../services/studentService.js";

export function ReportByStudent() {

    const studentService = new StudentService();
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState();
    const [show, setShow] = useState();
    const navigate = useNavigate();



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
        console.log(students);
        let relevantStudent = students.find((student) => student.id == inputText);
        console.log(relevantStudent);
        setStudent(relevantStudent);
        if (!show) setShow(true);
    }

   function goToStudentReport(){
    navigate ("/reports/byStudent/" + student.id);
   }

   function back(){
    navigate("/reports/:id")  
    }

    if (students) {
        return (
            <section>
                <h1>Report By Student</h1>
                <input type="text" placeholder="Enter student ID" onChange={(e) => selectStudent(e)} />
                <div style={{ visibility: show ? '' : 'hidden' }}>
                    <h3>Student Information</h3>
                     
                    {student? <div align="center">
                        <h4>ID: {student.id}</h4>
                        <h4>First Name: {student.firstName}</h4>
                        <h4>Last Name: {student.lastName}</h4>
                         <h4>Email: {student.email}</h4>

                         <button onClick={() => goToStudentReport()}>Go To Student Reports</button>
                    </div> :<></>}
                    <button onClick={() => back()}>back</button>  
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

