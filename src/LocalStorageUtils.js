const USER = 'USER';


export function getUserFromStorage() {
    if (localStorage.getItem(USER)) return JSON.parse(localStorage.getItem(USER));
    const newUser = {
        name: '',
        token: '',
        zip: 0
    }
    setToLocalStorage(newUser)
    // localStorage.setItem(USER, )
    return newUser;
}

export function setToLocalStorage(user) {
    localStorage.setItem(USER, JSON.stringify(user))
}
