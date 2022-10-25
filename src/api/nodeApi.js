import axios from 'axios'
const ENDPOINT = "http://localhost:5000"
console.log(ENDPOINT)

export const findUser = async (email) => {
    console.log(email)
    try {
        const user = await axios.get(ENDPOINT + `/find-user/${email}`)
        return user
    } catch (err) {
        console.error(err)
    }
}