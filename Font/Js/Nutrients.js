document.addEventListener("DOMContentLoaded", function() {
    // หาคลิกที่รายการอาหาร
    const foodItems = document.querySelectorAll('.food-item');
    const foodDescription = document.getElementById('food-description'); // ดึงกล่องคำอธิบาย

    let activeFoodItem = null; // เก็บรายการที่กำลังแสดงคำอธิบายอยู่

    // เมื่อคลิกที่รายการอาหาร
    foodItems.forEach(item => {
        item.addEventListener('click', function() {
            // ดึงข้อมูลคำอธิบายและแหล่งที่มาของภาพ
            const description = item.getAttribute('data-description');
            const imageSrc = item.getAttribute('data-image');

            // ถ้ามีรายการอาหารที่แสดงอยู่แล้วให้ซ่อนคำอธิบายก่อน
            if (activeFoodItem) {
                activeFoodItem.classList.remove('show'); // ซ่อนคำอธิบายของรายการก่อนหน้า
            }

            // สร้างเนื้อหาของคำอธิบายที่ต้องการแสดง
            foodDescription.innerHTML = ` 
                <img src="${imageSrc}" alt="Food Image" style="max-width: 100px; margin-right: 15px;">
                <p>${description}</p>
            `;

            // เพิ่มหรือลบคลาส show เพื่อแสดง/ซ่อนคำอธิบาย
            foodDescription.classList.add('show');

            // ตั้งค่า activeFoodItem ให้เป็นรายการที่เพิ่งคลิก
            activeFoodItem = item;
        });
    });
});
