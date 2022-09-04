export class QuestionService {
    get() {
        return fetch("http://localhost:3030/Questions")
            .then(this.success)
            .catch(this.failure)
    }
    getNumOfQuestions() {
        return fetch("http://localhost:3030/Questions")
            .then(data => data.length)
            .then(this.success)
            .catch(this.failure)
    }

    getById(id) {
        return fetch("http://localhost:3030/Questions/" + id)
            .then(this.success)
            .catch(this.failure)
    }

    getByTopicId(id) {
        return this.get()
            .then((data) => {
                if (data)
                    data.filter(q => q.topicId == id)
            })
            .then(this.success)
            .catch(this.failure)
    }

    post(item) {
        return fetch("http://localhost:3030/Questions", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(this.success)
            .catch(this.failure)
    }

    put(id, item) {
        return fetch("http://localhost:3030/Questions/" + id, {
            method: "PUT",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(this.success)
            .catch(this.failure)
    }

    delete(id) {
        return fetch("http://localhost:3030/Questions/" + id, {
            method: "DELETE"
        })
            .then(this.success)
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
