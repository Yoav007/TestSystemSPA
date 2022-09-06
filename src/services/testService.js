
import axios from "axios";

export class TestService {
    get() {
        return axios.get("http://localhost:4040/tests")
            .then(function (response) {
                return response.data
            })
            .catch(this.failure);
    }

    getById(id) {
        return axios.get("http://localhost:4040/tests/" + id)
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

    getResultByTopicId(id) {
        return axios.get("http://localhost:4040/tests/testsByTopic/" + id)
            .then(function (response) {
                return response.data
            })
            .catch(this.failure)
    }

    post(item) {
        return axios.post("http://localhost:4040/tests/", item)
            .then(function (response) {
                return response.item
            })
            .catch(this.failure)
    }

    put(id, item) {
        return axios.put("http://localhost:4040/tests/" + id, item)
            .then(function (response) {
                return response.data
            })
            .catch(this.failure)
    }

    delete(id) {
        return axios.delete("http://localhost:4040/tests/" + id, {
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
