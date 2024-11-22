let selectedCategory = ''; // ตัวแปรเก็บหมวดหมู่ที่เลือก
let selectedAnonymity = ''; // ตัวแปรเก็บความเป็นส่วนตัวที่เลือก

// สมมุติว่า userId ถูกเก็บไว้ใน sessionStorage หลังจากที่ผู้ใช้ล็อกอิน
const userId = localStorage.getItem("userId");

// ฟังก์ชันสำหรับเลือกหมวดหมู่และไปยังการเลือกความเป็นส่วนตัว
function selectCategory(category) {
    selectedCategory = category;
    document.getElementById('categoryStep').style.display = 'none'; // ซ่อนการเลือกหมวดหมู่
    document.getElementById('anonymityStep').style.display = 'block'; // แสดงการเลือกความเป็นส่วนตัว
}

// ฟังก์ชันสำหรับเลือกความเป็นส่วนตัวและไปยังขั้นตอนการกรอกเนื้อหา
function selectAnonymity(anonymity) {
    selectedAnonymity = anonymity;
    document.getElementById('anonymityStep').style.display = 'none'; // ซ่อนการเลือกความเป็นส่วนตัว
    document.getElementById('contentStep').style.display = 'block'; // แสดงการกรอกเนื้อหาโพสต์
}

// ดึงข้อมูลระดับความเครียดจาก sessionStorage (หรือจากที่อื่นที่คุณเก็บข้อมูล)
const stressLevel = localStorage.getItem("userStressLevel");  // ดึงข้อมูลระดับความเครียดที่ถูกเก็บจากที่อื่น (เช่น การประเมินความเครียด)

// ฟังก์ชันสำหรับการส่งโพสต์
document.querySelector('.submit-button').addEventListener('click', function () {
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();

    if (!userId) {
        alert('กรุณาล็อกอินก่อนที่จะโพสต์');
        return;
    }

    if (title && content && selectedCategory && selectedAnonymity) {
        // สร้าง payload สำหรับส่งไปยัง Backend
        const payload = {
            category: selectedCategory, // หมวดหมู่ที่เลือก
            anonymity: selectedAnonymity, // ความเป็นส่วนตัวที่เลือก
            title: title, // ชื่อเรื่องของโพสต์
            body: content, // เนื้อหาของโพสต์
            stress_level: stressLevel, // ส่งระดับความเครียดไปแทน created_at
            user: { id: parseInt(userId) } // ใช้ userId ที่ดึงจาก sessionStorage
        };

        fetch('http://localhost:8080/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('การส่งโพสต์ล้มเหลว');
            }
            return response.json();
        })
        .then((data) => {
            alert(`โพสต์สำเร็จ! หมายเลขโพสต์ของคุณคือ: ${data.postId}`);
            document.getElementById('post-title').value = '';
            document.getElementById('post-content').value = '';
            document.getElementById('contentStep').style.display = 'none';
            document.getElementById('categoryStep').style.display = 'block';
        })
        .catch((error) => {
            alert(`เกิดข้อผิดพลาด: ${error.message}`);
        });
    } else {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
});
