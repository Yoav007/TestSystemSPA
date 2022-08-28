import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TopicService from "../../services/topicService.js";

export function ReportsMenu(){
    
    const params = useParams();
    const navigate = useNavigate();
    
    function reportByTest(){
        navigate("/reports/byTest/" + params.id)
    }

    function reportByStudent(){
        navigate("/reports/byStudent")
    }

    return (
    <div>
        <button onClick={()=> reportByTest()}>Report by test</button>
        <br/>
        <br/>
        <button onClick={()=> reportByStudent()}>Report by student</button>
    </div>
    )
}