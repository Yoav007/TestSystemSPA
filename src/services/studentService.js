import axios from "axios";

export class StudentService {
    get() {
        return axios.get("http://localhost:4040/Students")
            .then(function (response) {
                return response.data
            })
            .catch(this.failure);
    }


    getById(id) {
        return axios.get("http://localhost:4040/Students/" + id)
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

    getStudentsByTestId(id){
        return axios.get("http://localhost:4040/Students/ByTestId")
        .then(function (response) {
            return response.data
        })
        .catch(this.failure)
    }

    post(item) {
        return axios.post("http://localhost:4040/Students", item)
            .then(function (response) {
                return response.item
            })
            .catch(this.failure)
    }

    put(id, item) {
        return axios.put("http://localhost:4040/Students/" + id, item)
            .then(function (response) {
                return response.data
            })

            .catch(this.failure)
    }

    delete(id) {
        return axios.delete("http://localhost:4040/Students/" + id, {
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
