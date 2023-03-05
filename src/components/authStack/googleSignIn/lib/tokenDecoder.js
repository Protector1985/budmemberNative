import jwt_decode from "jwt-decode";

export default function tokenDecoder(url) {
    try {
        const access_token = url?.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
        const decoded = jwt_decode(access_token)
        return decoded
    }catch(err) {
        console.log(err)
    }
}