let selectedGender = '';
let selectedActivityMultiplier = 0;
let bmr = 0;

// Function to select gender
function selectGender(gender) {
    selectedGender = gender;
    document.querySelectorAll('.gender-button').forEach(button => {
        if (button.textContent === gender) {
            button.style.backgroundColor = '#AAB396';
            button.style.color = '#fff';
        } else {
            button.style.backgroundColor = '#fff';
            button.style.color = '#000';
        }
    });
}
function displayError(message) {
    alert(message); // หรือใช้ console.log() หากต้องการแสดงใน console
}
// Function to calculate BMR
// ฟังก์ชันคำนวณ BMR
function calculateBMR() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value, 10);

    if (!selectedGender || isNaN(weight) || isNaN(height) || isNaN(age) || weight <= 0 || height <= 0 || age <= 0) {
        displayError('กรุณากรอกน้ำหนัก ส่วนสูง และอายุให้ถูกต้อง');
        return -1; // Return -1 to indicate error
    }

    if (selectedGender === 'ชาย') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (selectedGender === 'หญิง') {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    console.log('BMR Calculated:', bmr);
    return bmr; // Return calculated BMR
}




// Function to select activity multiplier
function selectActivity(multiplier, button) {
    selectedActivityMultiplier = multiplier;

    // Reset styles for all buttons
    document.querySelectorAll('.Tdee-button').forEach(btn => {
        btn.style.backgroundColor = '#fff';
        btn.style.color = '#000';
    });

    // Highlight selected button
    button.style.backgroundColor = '#AAB396';
    button.style.color = '#fff';

    console.log('Selected Activity Multiplier:', selectedActivityMultiplier);
}

// ฟังก์ชันคำนวณ TDEE
// ฟังก์ชันคำนวณ TDEE
function calculateTDEE() {
    calculateBMR(); // เรียกฟังก์ชันคำนวณค่า BMR

    if (bmr <= 0) {
        displayError('กรุณากรอกข้อมูลให้ครบถ้วน!');
        return;
    }

    if (selectedActivityMultiplier === 0) {
        displayError('กรุณาเลือกระดับกิจกรรม!');
        return;
    }

    // คำนวณค่า TDEE
    let tdee = bmr * selectedActivityMultiplier;

    console.log('BMR:', bmr);
    console.log('Selected Activity Multiplier:', selectedActivityMultiplier);
    console.log('TDEE:', tdee);

    // คำนวณแคลอรี่ที่ต้องการ
    let calorieForMaintenance = tdee.toFixed(2);
    let calorieForWeightGain = (tdee * 1.2).toFixed(2);

    // บันทึกค่าลง LocalStorage
    localStorage.setItem('bmr', bmr.toFixed(2));
    localStorage.setItem('tdee', tdee.toFixed(2));
    localStorage.setItem('calorieForMaintenance', calorieForMaintenance);
    localStorage.setItem('calorieForWeightGain', calorieForWeightGain);

    // ดึงค่า userId จาก localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
        displayError('เกิดข้อผิดพลาด: ไม่พบข้อมูลผู้ใช้ กรุณาล็อกอินใหม่');
        return;
    }

    // ส่งข้อมูลไปยัง API
    fetch("http://localhost:8080/api/bmr/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            bmr: tdee.toFixed(2),
            count: 1,
            date: new Date().toISOString(),
            user: { id: parseInt(userId) }  // ใช้ userId ที่ดึงมาจาก localStorage
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
            }
            return response.json();
        })
        .then((data) => {
            console.log("บันทึกข้อมูลสำเร็จ:", data);
            Swal.fire({
                title: "บันทึกสำเร็จ!",
                text: "ข้อมูลของคุณถูกบันทึกเรียบร้อย",
                icon: "success",
                confirmButtonText: "ตกลง",
                background: '#F0F8FF', // เปลี่ยนสีพื้นหลัง
                color: '#004080', // เปลี่ยนสีข้อความ
                padding: '20px',
                showConfirmButton: true,
            });
        })
        .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: error.message,
                icon: "error",
                confirmButtonText: "ตกลง",
                background: '#f8d7da', // สีพื้นหลังสำหรับข้อผิดพลาด
                color: '#721c24', // สีข้อความสำหรับข้อผิดพลาด
                padding: '20px',
                showConfirmButton: true,
            });
        });

    Swal.fire({
        title: 'คำนวณสำเร็จ!',
        text: 'คลิก "ตกลง" เพื่อดูผลลัพธ์',
        icon: 'success',
        confirmButtonText: 'ตกลง',
        background: '#D4EDDA', // สีพื้นหลัง
        color: '#155724', // สีข้อความ
        padding: '20px',
        showConfirmButton: true,
    }).then(() => {
        window.location.href = 'resultBMR.html'; // ไปยังหน้าผลลัพธ์
    });
}






