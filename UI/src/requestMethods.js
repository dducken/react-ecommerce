import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNThhOWViNWEzODE4YzBkNmI1MTBiNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTU5MjgzNCwiZXhwIjoxNjUxNjc5MjM0fQ._kgajFn6AxO9XYrKIYQNoBnUZpA_RJYCkIBCVkCSqg8"


export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const USERRequest = axios.create({
    baseURL: BASE_URL,
    header:{token:`Bearer ${TOKEN}`}
})