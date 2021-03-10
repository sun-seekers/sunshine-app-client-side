import request from 'superagent';
const URL = 'https://blooming-scrubland-63495.herokuapp.com'

export async function signUpUser(name, email, password) {
    const response = await request.post(`${URL}/auth/signup`)
        .send({ name, email, password })

    return response.body;
}
export async function logInUser(email, password) {
    const response = await request.post(`${URL}/auth/signin`)
        .send({ email, password })

    return response.body.token;
}
export async function getWeatherRadius(zipcode, distance, token) {
    const weatherReport = await request.get(`${URL}/api/sunshine?zip_code=${zipcode}&distance=${distance}`).set('Authorization', token);
    return weatherReport.body;
}
export async function getOneTrip(city, token) {
    const response = await request.get(`${URL}/api/trip/:${city}`).set('Authorization', token);
    return response.body;
}
export async function addATrip(trip, token) {
    const response = await request.post(`${URL}/api/trips`).set('Authorization', token).send({ trip });
    return response.body;
}

export async function haveVisited(city, token) {
    const response = await request.put(`${URL}/api/trips/:${city}`).set('Authorization', token);
    return response.body;
}

export async function deleteTrip(city, token) {
    const response = await request.delete(`${URL}/api/trips/:${city}`).set('Authorization', token);
    return response.body;
}