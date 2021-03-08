const USER = 'USER';


export function getUserFromStorage() {
    const user = localStorage.getItem(USER);

    if (user) return JSON.parse(user);

    localStorage.setItem(USER, {
        name: '',
        token: '',
        zip: 0
    })
    return '';
}

export function setToLocalStorage(user) {
    localStorage.setItem(USER, JSON.stringify(user))
}
