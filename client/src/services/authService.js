const baseUrl = 'http://localhost:5000';

export async function registerUser(userData) {
    return (await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })).json();
}

export async function loginUser(userData) {
    return (await fetch(`/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })).json();
}