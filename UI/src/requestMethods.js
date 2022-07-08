import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2JlYzUwZjY4ODk4YjViZGU2YWQ1NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NDgxNDE5MCwiZXhwIjoxNjgwNzM0MTkwfQ.dhsugmlvOKIFaXPutVJ8JgYO2Mpz_eO_oHzs-H-RVFY"


export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{ token:`Bearer ${TOKEN}`}
})