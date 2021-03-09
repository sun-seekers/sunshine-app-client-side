import request from 'superagent';
const URL = ''

export async function signUpUser(name, email, password) {
    const response = await request.post(`${URL}/auth/signup`)
        .send({ name, email, password })

    return response.body.token;
}
export async function logInUser(email, password) {
    const response = await request.post(`${URL}/auth/signin`)
        .send({ email, password })

    return response.body.token;
}