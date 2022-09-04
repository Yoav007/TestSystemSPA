import axios from "axios";
import { TestService } from "./testService";

export class ReportService {
    
    get() {
        return axios.get("http://localhost:4040/reports")
            .then(function (response){
                return response.data})
            .catch(this.failure)
    }

    getResultByTestId(id) {
        return axios.get("http://localhost:4040/reports/bytest/" + id)
            .then(function (response){
                return response.data})
            .catch(this.failure)
    }

    // getResultByTopicId(id) {
    //     return axios.get("http://localhost:4040/reports/bytest")
    //     .then(function (response){
    //         if ((data) => data.topicId == id && data.isActive == true);  
    //         return response.data})
    //         .catch(this.failure)
    // }
    getStudents(){
        return axios.get("http://localhost:4040/reports/byStudent/")
        .then(function (response){
            return response.data})
        .catch(this.failure)
    }
    

    success(response) {
        if (response.status < 350) {
            return response.json()
        }
        else {
            throw new Error(response.statusText)
        }

    }

    failure(error) {
        console.log(error);
    }

}