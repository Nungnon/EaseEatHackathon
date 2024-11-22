// ฟังก์ชันนี้จะกรองโพสต์ตามหมวดหมู่และแสดงผล
function filterPosts() {
    const stressFilter = document.getElementById('stressFilter').value;  // ดึงค่าจากฟิลเตอร์ความเครียด
    const categoryFilter = document.getElementById('categoryFilter').value;  // ดึงค่าจากฟิลเตอร์หมวดหมู่

    // ดึงโพสต์ทั้งหมด
    const posts = document.querySelectorAll('.post-card');

    // กรองโพสต์ตามหมวดหมู่และความเครียด
    posts.forEach(post => {
        const postStress = post.getAttribute('data-stress');
        const postCategory = post.getAttribute('data-category');

        // ตรวจสอบว่าโพสต์ตรงกับฟิลเตอร์ที่เลือกหรือไม่
        const stressMatch = stressFilter === 'all' || postStress === stressFilter;
        const categoryMatch = categoryFilter === 'all' || postCategory === categoryFilter;

        // แสดงหรือซ่อนโพสต์ตามการตรงกับฟิลเตอร์
        if (stressMatch && categoryMatch) {
            post.style.display = 'block';  // แสดงโพสต์
        } else {
            post.style.display = 'none';  // ซ่อนโพสต์
        }
    });
}


document.querySelectorAll('.post-card').forEach(postCard => {
    postCard.addEventListener('click', () => {
        const title = postCard.querySelector('.post-title').innerText;
        const content = postCard.querySelector('.post-content').innerText;
        const stressLevel = postCard.getAttribute('data-stress');
        const category = postCard.getAttribute('data-category');

        localStorage.setItem('postTitle', title);
        localStorage.setItem('postContent', content);
        localStorage.setItem('postStress', stressLevel);
        localStorage.setItem('postCategory', category);

        window.location.href = 'post.html';
    });
});
const userId = localStorage.getItem('userId');

// ดึงข้อมูลระดับความเครียดจาก API ตาม user_id
fetch(`http://localhost:8080/api/user_stress/${userId}`)
    .then(response => response.json())
    .then(stressData => {
        // จากนั้นใช้ข้อมูลที่ดึงมา
        const stressLevel = stressData.levels;
        console.log(stressLevel);  // เพื่อตรวจสอบข้อมูลที่ดึงมา
        // ฟังก์ชันที่จะใช้ข้อมูลที่ดึงมา
        updatePostStressLevel(stressLevel);
    })
    .catch(error => {
        console.error('Error fetching stress level:', error);
    });

// ฟังก์ชันช่วยสำหรับการกำหนดคลาสของสถานะตามระดับความเครียด
function getStatusClass(stressLevel) {
    switch (stressLevel) {
        case 'ความเครียดต่ำ':
            return 'green';  // คลาสสีเขียวสำหรับความเครียดต่ำ
        case 'ความเครียดปานกลาง':
            return 'yellow'; // คลาสสีเหลืองสำหรับความเครียดปานกลาง
        case 'ความเครียดสูง':
            return 'orange'; // คลาสสีส้มสำหรับความเครียดสูง
        case 'ความเครียดสูงมาก':
            return 'red';    // คลาสสีแดงสำหรับความเครียดสูงมาก
        default:
            return 'orange';   // คลาสสีเทาหากไม่มีข้อมูลความเครียด
    }
}

// ฟังก์ชันนี้จะดึงโพสต์ทั้งหมดจาก Backend และแสดงผล
function fetchPosts() {
    fetch('http://localhost:8080/api/posts') // URL ของ API
        .then(response => response.json()) // แปลงข้อมูลที่ได้รับเป็น JSON
        .then(posts => {
            const postsContainer = document.querySelector('.posts-container');
            postsContainer.innerHTML = ''; // ลบโพสต์เก่าก่อน

            // การเรียงโพสต์จาก id ใหม่ที่สุด (จากมากไปน้อย)
            posts.sort((a, b) => b.id - a.id);  // เรียงจาก id มากไปหาน้อย

            posts.forEach(post => {
                const postStress = post.stressLevel || 'N/A';  // ใช้ 'N/A' ถ้าไม่มีข้อมูล
                const postCategory = post.category || 'N/A';  // ใช้ 'N/A' ถ้าไม่มีข้อมูล
                const postTitle = post.title || 'ไม่มีชื่อโพสต์';  // ใช้ค่า default หากไม่มีชื่อโพสต์
                const postBody = post.body || 'ไม่มีเนื้อหา';  // ใช้ค่า default หากไม่มีเนื้อหา

                // สร้างการ์ดโพสต์สำหรับแต่ละโพสต์
                const postCard = document.createElement('div');
                postCard.classList.add('post-card');
                postCard.setAttribute('data-stress', post.stressLevel);  // เก็บค่า stressLevel ใน data-attribute
                postCard.setAttribute('data-category', post.category); // เก็บค่า category ใน data-attribute

                postCard.innerHTML = `
                    <div class="post-header">
                        <span class="status-dot ${getStatusClass(post.stressLevel)}"></span>
                        <span class="post-type">${post.category}</span>
                    </div>
                    <div class="post-title">${post.title}</div>
                    <div class="post-content" style="display: none;">${post.body}</div>
                `;

                // เพิ่ม data-id ใน postCard เพื่อส่ง postId ไปที่ URL
                postCard.setAttribute('data-id', post.id);  // เพิ่ม data-id สำหรับการดึง postId

                postsContainer.appendChild(postCard); // เพิ่มการ์ดโพสต์เข้าไปใน container
            });

            // เพิ่ม event listeners สำหรับการคลิกที่การ์ดโพสต์
            document.querySelectorAll('.post-card').forEach(postCard => {
                postCard.addEventListener('click', () => {
                    const postId = postCard.getAttribute('data-id');  // ดึงข้อมูล postId ที่ถูกเก็บไว้ใน data-id
                    
                    if (!postId) {
                        console.error('Post ID is missing or invalid.');
                        return;  // หากไม่มี postId จะหยุดการทำงาน
                    }
            
                    const title = postCard.querySelector('.post-title').innerText;
                    const content = postCard.querySelector('.post-content').innerText;
                    const stressLevel = postCard.getAttribute('data-stress');
                    const category = postCard.getAttribute('data-category');
            
                    // เก็บข้อมูลโพสต์ใน localStorage
                    localStorage.setItem('postTitle', title);
                    localStorage.setItem('postContent', content);
                    localStorage.setItem('postStress', stressLevel);
                    localStorage.setItem('postCategory', category);
            
                    // ส่ง postId ไปที่ URL
                    window.location.href = `post.html?id=${postId}`;  // ส่ง postId ไปที่ URL
                });
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
}

// เรียกใช้งานฟังก์ชัน fetchPosts เมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', fetchPosts);