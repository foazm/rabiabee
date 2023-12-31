let currentIndex = 0;

function showProduct(index) {
    const slider = document.querySelector('.product-items');
    const totalProducts = document.querySelectorAll('.product-item').length;
    const productWidth = document.querySelector('.product-item').offsetWidth;

    currentIndex = (index + totalProducts) % totalProducts;

    slider.style.transform = `translateX(-${currentIndex * productWidth}px)`;
}

function nextProduct() {
    showProduct(currentIndex + 1);
}

function prevProduct() {
    showProduct(currentIndex - 1);
}