import { useRef, useState } from "react"
import { useParams } from "react-router-dom";

export function AddQuestion() {

    const params = useParams();
    const [numOfAnswers, setNumOfAnswers] = useState(4);
    let text = useRef();
    let number = useRef(4);
    let answersText = useRef([]);
    let answersCorrect = useRef([]);
    let tags = useRef([]);

    function addQuestion() {
        let qTags = tags.current.values.split(" ");
        let question = {
            topicId: params.topicId,
            tags: qTags,
        }
    }

    return (
        <div>
            <div>
                <label>Question's text</label>
                <input type="text" ref={text} />
            </div>
            <div>
                <label>Num Of Answers</label>
                <input type="number" ref={number} defaultValue={4} onChange={() => {
                    console.log(numOfAnswers.current.value);
                    setNumOfAnswers(numOfAnswers.current.value)
                }} />
            </div>
            {
                new Array(number).map        
            }
            <div>{
            }
            </div>
            <div>
                <label>Question's tags (seperate with spaces)</label>
                <input type="text" ref={tags} />
            </div>
        </div>
    )
}