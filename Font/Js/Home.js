document.addEventListener("DOMContentLoaded", function() {
    // เลือกคลิกที่รายการอาหาร
    const homeItems = document.querySelectorAll('.home-item');
    const homeDescription = document.getElementById('home-description'); 

    let activeHomeItem = null; 

    homeItems.forEach(item => {
        item.addEventListener('click', function() {
            // ดึงข้อมูลคำอธิบายและแหล่งที่มาของภาพ
            const description = item.getAttribute('data-description');
            const imageSrc = item.getAttribute('data-image');

            // ถ้ามีรายการอาหารที่แสดงอยู่แล้วให้ซ่อนคำอธิบายก่อน
            if (activeHomeItem) {
                activeHomeItem.classList.remove('show'); 
            }

            // สร้างเนื้อหาของคำอธิบายที่ต้องการแสดง
            homeDescription.innerHTML = `
                <img src="${imageSrc}" alt="Home Image" style="max-width: 100px; margin-right: 15px;">
                <p>${description}</p>
            `;

            // แสดงคำอธิบาย
            homeDescription.classList.add('show');

            // ตั้งค่า activeHomeItem ให้เป็นรายการที่เพิ่งคลิก
            activeHomeItem = item;
        });
    });
});



document.addEventListener("DOMContentLoaded", function() {
    // เลือกคลิกที่รายการบำบัด
    const hometreat = document.querySelectorAll('.home-treat-item');
    const hometreatDescription = document.getElementById('home-treat');

    let activeHomeItem = null; // เก็บรายการที่กำลังแสดงคำอธิบายอยู่

    // เมื่อคลิกที่รายการบำบัด
    hometreat.forEach(item => {
        item.addEventListener('click', function() {
            // ดึงข้อมูลคำอธิบายและแหล่งที่มาของภาพ
            const description = item.getAttribute('data-description');
            const imageSrc = item.getAttribute('data-image');

            // ถ้ามีรายการที่แสดงคำอธิบายอยู่แล้วให้ซ่อนคำอธิบายก่อน
            if (activeHomeItem) {
                activeHomeItem.classList.remove('show'); // ซ่อนคำอธิบายของรายการก่อนหน้า
            }

            // สร้างเนื้อหาของคำอธิบายที่ต้องการแสดง
            hometreatDescription.innerHTML = `
                <img src="${imageSrc}" alt="Home Image" style="max-width: 100px; margin-right: 15px;">
                <p>${description}</p>
            `;

            // แสดงคำอธิบาย
            hometreatDescription.classList.add('show');

            // ตั้งค่า activeHomeItem ให้เป็นรายการที่เพิ่งคลิก
            activeHomeItem = item;
        });
    });
});


let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');

function moveSlide(step) {
    slideIndex += step;

    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    showSlide(slideIndex);
}


function showSlide(index) {
    const offset = -index * 100; 
    slider.style.transform = `translateX(${offset}%)`;
}


showSlide(slideIndex);


setInterval(() => {
    moveSlide(1); // เลื่อนไปสไลด์ถัดไป
}, 6000); 



