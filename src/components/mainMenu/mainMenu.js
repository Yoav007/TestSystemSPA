import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopicService from "../../services/topicService";
import './mainMenu.scss'

export function MainMenu() {

    const service = new TopicService();
    const [topics, setTopics] = useState([]);
    const [currentTopic, setCurrentTopic] = useState();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(crypto.randomUUID());
        service.get().then(data => {
            if (data) {
                setTopics(data);
            }
        })
    }, []);

    function handleSelect(event) {
        let id = event.target.value;
        let choice = topics.filter(t => t.id == id);
        if (!show) setShow(true);
        setCurrentTopic(choice[0]);
    };

    function goToQuestions() {
        navigate("/manageQuestions/" + currentTopic.id);
    }
    function goToTests() {
        navigate("/manageTests/" + currentTopic.id);
    }
    function goToReports() {
        navigate("/reports/" + currentTopic.id);
    }

    return (
        <section className="menu">
            <h2>Main Menu</h2>
            <select defaultValue={"Select Topic"} onChange={(event) => handleSelect(event)}>
                <option hidden>Select topic</option>
                {topics.map((topic) =>
                    <option key={topic.id} value={topic.id}>{topic.name}</option>)}
            </select>
            <div style={{ visibility: show ? '' : 'hidden' }}>
                <p onClick={() => goToQuestions()}>Manage Questions</p>
                <p onClick={() => goToTests()}>Manage Tests</p>
                <p onClick={() => goToReports()}>Reports</p>
            </div>
        </section>
    )
}