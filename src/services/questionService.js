
import axios from "axios";

export class QuestionService {
    get() {
        return axios.get("http://localhost:4040/questions")
            .then(function (response) {
                return response.data
            })
            .catch(this.failure);
    }


    getById(id) {
        return axios.get("http://localhost:4040/questions/" + id)
            .then(function (response) {
                return response.data
            })
            .catch(this.failure)
    }

    getByTopicId(id) {

        return axios.get()
            .then(function (response) {
                if ((data) => data.topicId == id)
                    return response.data
            })
            .catch(this.failure)
    }

    post(item) {
        return axios.post("http://localhost:4040/questions", item)
            .then(function (response) {
                return response.item
            })
            .catch(this.failure)
    }

    put(id, item) {
        return axios.put("http://localhost:4040/questions/" + id, item)
            .then(function (response) {
                return response.data
            })

            .catch(this.failure)
    }

    delete(id) {
        return axios.delete("http://localhost:4040/questions/" + id, {
            method: "DELETE"
        })
            .then(function (response) {
                return response.data
            })
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
