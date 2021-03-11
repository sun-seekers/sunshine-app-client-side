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

export async function getWeatherRadius(zipcode, distance, token, sortBy, order, day) {
    const weatherReport = await request.get(`${URL}/api/sunshine?zip_code=${zipcode}&distance=${distance}&sort_by${sortBy}&sort_order=${order}&day=${day}`).set('Authorization', token);
    return weatherReport.body;
}
<<<<<<< HEAD
export async function getFaveTrips(token) {
    const response = await request.get(`${URL}/api/trips`).set('Authorization', token);
    return response.body;
}


export async function getOneTrip(zip, token) {
    const response = await request.get(`${URL}/api/trips/${zip}`).set('Authorization', token);
=======

export async function getOneTrip(zip, token) {
    const response = await request.get(`${URL}/api/trip/${zip}`).set('Authorization', token);
>>>>>>> be9e40ee9663a1da89b9e1d8e4f6f4638f41664e
    return response.body;
}

export async function addATrip(trip, token) {
    const response = await request.post(`${URL}/api/trips`).set('Authorization', token).send({ trip });
    return response.body;
}

export async function haveVisited(zip, token) {
    const response = await request.put(`${URL}/api/trips/${zip}`).set('Authorization', token);
    return response.body;
}

export async function deleteTrip(zip, token) {
    const response = await request.delete(`${URL}/api/trips/${zip}`).set('Authorization', token);
    return response.body;
}
