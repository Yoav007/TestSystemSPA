class TopicService {
    get() {
        return fetch("http://localhost:3030/Topics")
            .then(this.success)
            .catch(this.failure)
    }

    getById(id) {
        return fetch("http://localhost:3030/Topics/" + id)
            .then(this.success)
            .catch(this.failure)
    }

    post(item) {
        return fetch("http://localhost:3030/Topics", {
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
        return fetch("http://localhost:3030/Topics/" + id, {
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
        return fetch("http://localhost:3030/Topics/" + id, {
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

export default TopicService;