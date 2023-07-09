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
        console.log(data);
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
    fakeStore('/products/category/jewelery');
});

mensClothingBtn.addEventListener('click', () => {
    fakeStore('/products/category/men%27s%20clothing');
});

womensClothingBtn.addEventListener('click', () => {
    fakeStore('/products/category/women%27s%20clothing');
});