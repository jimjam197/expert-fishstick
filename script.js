// Global Variables
const electronicsBtn = document.getElementById('electronics');
const jewelryBtn = document.getElementById('jewelry');
const mensClothingBtn = document.getElementById('mens-clothing');
const womensClothingBtn = document.getElementById('womens-clothing');
const displayDiv = document.getElementById('display');
const apiUrl = 'https://fakestoreapi.com';

// Fetch Data from API
const fakeStore = async (endpoint) => {
    try {
        const response = await fetch(`${apiUrl}${endpoint}`);
        const data = await response.json();
        displayCards(data); // Display the cards with the returned data
    } catch (error) {
        console.log('Error:', error);
    }
};

// Window Onload Event Listener
window.onload = () => {
    fakeStore('/products');
};

// Event Listeners
electronicsBtn.addEventListener('click', () => {
    fakeStore('/products/category/electronics');
});

jewelryBtn.addEventListener('click', () => {
    fakeStore('/products/category/jewelry');
});

mensClothingBtn.addEventListener('click', () => {
    fakeStore('/products/category/men%27s%20clothing');
});

womensClothingBtn.addEventListener('click', () => {
    fakeStore('/products/category/women%27s%20clothing');
});

// Card Display
const displayCards = (data) => {
    displayDiv.innerHTML = '';

    // Create rows and columns for card layout
    const row1 = document.createElement('div');
    row1.classList.add('row');
    displayDiv.appendChild(row1);

    const row2 = document.createElement('div');
    row2.classList.add('row');
    displayDiv.appendChild(row2);

    let count = 0; // Counter to keep track of the number of cards

    data.forEach((item) => {
        const card = document.createElement('div');
        card.classList.add('card', 'col-md-3', 'mb-3');

        const image = document.createElement('img');
        image.classList.add('card-img-top');
        image.src = item.image;
        card.appendChild(image);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        card.appendChild(cardBody);

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = item.title;
        cardBody.appendChild(title);

        // Create description dropdown
        const descriptionBtn = document.createElement('button');
        descriptionBtn.classList.add('btn', 'btn-link', 'dropdown-toggle');
        descriptionBtn.setAttribute('type', 'button');
        descriptionBtn.setAttribute('data-bs-toggle', 'collapse');
        descriptionBtn.setAttribute('data-bs-target', `#description-${count}`);
        descriptionBtn.setAttribute('aria-expanded', 'false');
        descriptionBtn.setAttribute('aria-controls', `description-${count}`);
        descriptionBtn.textContent = 'Description';
        cardBody.appendChild(descriptionBtn);

        const descriptionCollapse = document.createElement('div');
        descriptionCollapse.id = `description-${count}`;
        descriptionCollapse.classList.add('collapse');
        cardBody.appendChild(descriptionCollapse);

        const descriptionContent = document.createElement('div');
        descriptionContent.classList.add('card-text');
        descriptionContent.textContent = item.description;
        descriptionCollapse.appendChild(descriptionContent);

        // Create price dropdown
        const priceBtn = document.createElement('button');
        priceBtn.classList.add('btn', 'btn-link', 'dropdown-toggle');
        priceBtn.setAttribute('type', 'button');
        priceBtn.setAttribute('data-bs-toggle', 'collapse');
        priceBtn.setAttribute('data-bs-target', `#price-${count}`);
        priceBtn.setAttribute('aria-expanded', 'false');
        priceBtn.setAttribute('aria-controls', `price-${count}`);
        priceBtn.textContent = 'Price';
        cardBody.appendChild(priceBtn);

        const priceCollapse = document.createElement('div');
        priceCollapse.id = `price-${count}`;
        priceCollapse.classList.add('collapse');
        cardBody.appendChild(priceCollapse);

        const priceContent = document.createElement('div');
        priceContent.classList.add('card-text');
        priceContent.textContent = `$${item.price.toFixed(2)}`;
        priceCollapse.appendChild(priceContent);

        // Add to Cart button
        const addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add('btn', 'btn-primary');
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.addEventListener('click', () => {
            submitToCart(item);
        });
        cardBody.appendChild(addToCartBtn);

        // Append card to respective row
        if (count < 4) {
            row1.appendChild(card);
        } else {
            row2.appendChild(card);
        }

        count++;
    });
};

// Add To Cart
const submitToCart = (itemId) => {
    const cart = [];
    // Fetch the selected item details from the API based on its ID
    fakeStore(`/products/${itemId}`)
        .then((item) => {
            const { id, title, price } = item;
            const cartItem = { id, title, price, quantity: 1 };
            cart.push(cartItem);
            console.log(`Added to cart:`, cartItem);
        })
        .catch((error) => {
            console.log('Error:', error);
        });
};
