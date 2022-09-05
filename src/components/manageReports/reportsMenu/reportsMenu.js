import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TopicService from "../../../services/topicService.js";

export function ReportsMenu(){
    
    const params = useParams();
    const navigate = useNavigate();
    
    function reportByTest(){
        console.log(params.id);
        navigate("/reports/testsByTopic/" + params.id);
    }

    function reportByStudent(){
        navigate("/reports/byStudent/" );
    }

    return (
    <div>
        <h1>Reports</h1>
        <button onClick={()=> reportByTest()}>Report by Test</button>
        <br/>
        <br/>
        <button onClick={()=> reportByStudent()}>Report by Student</button>
    </div>
    )
}