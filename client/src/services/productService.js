const baseUrl = 'http://localhost:5000';

export async function getAll(category, id) {
    if (id !== 'undefined') return (await fetch(`${baseUrl}/products/${category}/${id}`)).json();
    return (await fetch(`${baseUrl}/products/${category}`)).json();

    // return (await fetch(`${baseUrl}/products/${category}`)).json();
}

export async function getSpecific(category, id) {
    return (await fetch(`${baseUrl}/products/${category}/${id}`)).json();
}

export async function createProduct(product) {
    return (await fetch(`${baseUrl}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    })).json();
}

