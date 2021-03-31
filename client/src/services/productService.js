const baseUrl = 'http://localhost:5000';

export async function getAll(category) {
    if (category && category !== 'all') {
        return (await fetch(`${baseUrl}/products/${category}`, {credentials: 'include'})).json();
    } else {
        return (await fetch(`${baseUrl}/products`, {credentials: 'include'})).json();
    }
}

export async function getSpecific(id) {
    return (await fetch(`${baseUrl}/products/specific/${id}`, {credentials: 'include'})).json();
}

export async function createProduct(product) {
    return (await fetch(`${baseUrl}/products/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(product)
    })).json();
}

export async function editProduct(id, product) {
    return (await fetch(`${baseUrl}/products/edit/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(product)
    })).json();
}

export async function getUserSells() {
    return (await fetch(`/products/sells/getSells`)).json();
}

export async function activateSell(id) {
    return (await fetch(`/products/enable/${id}`)).json()
}



