const baseUrl = 'http://localhost:5000';

export async function getAll(category) {
    if (category && category !== 'all') {
        return (await fetch(`${baseUrl}/products/${category}`)).json();
    } else {
        return (await fetch(`${baseUrl}/products`)).json();
    }
}

export async function getSpecific(id) {
    return (await fetch(`${baseUrl}/products/specific/${id}`)).json();
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

export async function editProduct(id) {
    
}


