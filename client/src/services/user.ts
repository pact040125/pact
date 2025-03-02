const userString = localStorage.getItem("user");

export const _user = userString ? JSON.parse(userString) : null;

export const _admin = _user ? _user.email === "shankar@gmail.com" : false;

export const _userId = _user ? _user.userId : null;

export const _email = _user ? _user.email : null;