import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { StudentService } from "../../../services/studentService";

export function TakeTest() {

    const params = useParams();
    const [firstName, setFirst] = useState("");
    const [lastName, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [student, setStudent] = useState({ firstName: "", lastName: "", email: "", id: "initial" });
    const [isOk, setIsOk] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
    const service = new StudentService();

    function updateFirst(event) {
        let name = event.target.value;
        setFirst(name);
        if (firstName != "" && lastName != "" && email != "") setIsOk(true);
    }

    function updateLast(event) {
        let name = event.target.value;
        setLast(name);
        if (firstName != "" && lastName != "" && email != "") setIsOk(true);
    }

    function updateEmail(event) {
        let email = event.target.value;
        setEmail(email);
        if (firstName != "" && lastName != "" && email != "") setIsOk(true);
    }

    function stratTest() {

        if (isOk) {
            let newStudent = {
                id: crypto.randomUUID(),
                firstName,
                lastName,
                email,
                testResults: [params.id]
            };
            setStudent(newStudent);
            console.log(student);
            // service.post(student)
            //navigate("To Exam Component and beyond!")
        }
    }

    function submitMail() {
        getStudent();
        setIsSubmitted(true);
    }

    function getStudent() {
        service.get()
            .then(res => {
                let students = res.filter(s => s.email.toLowerCase() === email.toLowerCase());
                if (students.length == 1) {
                    console.log(students);
                    setStudent(students[0]);
                    setIsOk(true);
                    //navigate to actual test
                };
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h2>please complete the following form to begin:</h2>
            {student.id != "initial" || isSubmitted ? <>
                <label>
                    first name:
                    <input type={'text'} onChange={(event) => updateFirst(event)} />
                </label>
                <br />
                <label>
                    last name:
                    <input type={'text'} onChange={(event) => updateLast(event)} />
                </label>
                <br />
            </> : <></>}
            <label>
                Email:
                <input type={'email'} onChange={(event) => updateEmail(event)} />
            </label>
            <br />
            {isOk ? <button onClick={() => stratTest()}>Start Test</button> : <></>}
            {!isSubmitted ? <button onClick={() => submitMail()}>Submit mail</button> : <></>}
        </div>
    )
}