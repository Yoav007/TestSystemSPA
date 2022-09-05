import axios from "axios";

class TopicService {
    get() {
        return axios.get("http://localhost:4040/topics")
            .then(function (response) {
                return response.data
            })
            .catch(this.failure)
    }

    getById(id) {
        return axios.get("http://localhost:4040/topics/" + id)
            .then(function (response) {
                return response.data
            })
            .catch(this.failure)
    }

    post(item) {
        return axios.post("http://localhost:4040/topics", item)
            .then(function (response) {
                return response.item
            })
            .catch(this.failure)
    }

    put(id, item) {
        return axios.put("http://localhost:4040/topics/" + id, item)
            .then(function (response) {
                return response.data
            })
            .catch(this.failure)
    }

    delete(id) {
        return axios.delete("http://localhost:4040/topics/" + id, {
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

export default TopicService;