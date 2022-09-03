import axios from "axios";

export class ReportService {
    get() {
        return axios.get("http://localhost:4040/reports")
            .then(function (response){
                return response.data})
            .catch(this.failure)
    }

    getById(id) {
        return axios.get("http://localhost:4040/reports/" + id)
            .then(function (response){
                return response.data})
            .catch(this.failure)
    }

    getByTopicId(id) {
        return axios.get()
        .then(function (response){
            if ((data) => data.topicId == id)
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