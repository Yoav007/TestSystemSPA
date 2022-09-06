import { useState } from "react"
import { StudentService } from "../../../services/studentService";

export function TakeTest() {

    const [firstName, setFirst] = useState("");
    const [lastName, setLast] = useState("");
    const [email, setEmail] = useState("");
    const service = new StudentService();

    function updateFirst(event) {
        let name = event.target.value;
        setFirst(name);
    }

    function updateLast(event) {
        let name = event.target.value;
        setLast(name);
    }

    function updateEmail(event) {
        let email = event.target.value;
        setEmail(email);
    }

    function stratTest() {
        if (firstName != "" && lastName != "" && email != "") {
            let student;
            service.get()
                .then(res => res.filter(s => s.email.toLowerCase() === email.toLowerCase()))
                .catch(error=>console.log(error));
            }
            console.log(student);
    }


    return (
        <div>
            <h2>plead complite the following form to begin:</h2>
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
            <label>
                Email:
                <input type={'email'} onChange={(event) => updateEmail(event)} />
            </label>
            <button onClick={() => stratTest()}>Start Test</button>
        </div>
    )
}