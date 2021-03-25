const baseUrl = 'http://localhost:5000';

export async function createProduct(product) {
    return (await fetch(`${baseUrl}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    })).json();
}

