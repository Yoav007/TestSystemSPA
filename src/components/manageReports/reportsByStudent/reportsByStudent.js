import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TestService } from "../../../services/testService.js";
import { ReportService } from "../../../services/reportService.js";

export function ReportByStudent(){
    
    const params = useParams();
    const reportService = new ReportService();
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState();
    const [show, setShow] = useState();

    useEffect(()=>{
        reportService.getStudents().then(data=>{
            if (data){
             setStudents(data);
            }
        })
    }, []);

    function selectStudent(event) {
        let inputText = event.target.value;
       let relevantStudent =  students.filter((student)=> student.id.toString() == inputText);
        console.log(relevantStudent);
        setStudent(inputText);
        // reportService.getResultByTestId(event.target.value).then(data=>{
        // console.log(data);
        // setResults(data);
        // });
    }

    if(students){
        return (
        <section>
        <h1>Report By Student</h1>
        <input type="text" defaultValue="Enter student ID" onChange={(e) => selectStudent(e)} />
        </section>
        )
    }
    return(
        <div>
            <h1>No Students Found</h1>
        </div>
    )

}

