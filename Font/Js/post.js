document.addEventListener('DOMContentLoaded', () => {
    const title = localStorage.getItem('postTitle');
    const content = localStorage.getItem('postContent');
    const stressLevel = localStorage.getItem('postStress');
    const category = localStorage.getItem('postCategory');

    document.getElementById('postTitleContent').textContent = title || 'ไม่มีข้อมูล';
    document.getElementById('postFullContent').textContent = content || 'ไม่มีข้อมูล';
    document.getElementById('postCategory').textContent = category || 'ไม่ระบุ';

    const stressIndicator = document.getElementById('postStressIndicator');
    stressIndicator.classList.add(`stress-${stressLevel}`);
    stressIndicator.innerHTML = `<span class="status-dot ${stressLevel}"></span>`;

    // เรียกใช้ฟังก์ชันโหลดความคิดเห็น
    loadComments();
});

function loadComments() {
    const postId = new URLSearchParams(window.location.search).get('id');

    // ตรวจสอบว่ามี postId หรือไม่
    if (!postId) {
        console.error('Post ID is missing or invalid.');
        return;  // หยุดการทำงานหากไม่มี postId
    }

    const api = `http://localhost:8080/api/comment/all/${postId}`;

    fetch(api)
        .then(response => response.json())
        .then(comments => {
            if (Array.isArray(comments)) {
                const commentsList = document.getElementById("commentsList");
                commentsList.innerHTML = "";  // ล้างความคิดเห็นที่มีอยู่แล้ว
                comments.forEach(comment => {
                    const commentItem = document.createElement("div");
                    commentItem.className = "comment-item";

                    // ดึงวันที่จากข้อมูลที่ได้รับมา
                    const commentDate = comment.date || comment.createdAt || 'ไม่ระบุวันที่';  // ใช้วันที่จาก API หรือค่า default

                    // แสดงความคิดเห็นและวันที่
                    commentItem.innerHTML = `
                        <p>${comment.body}</p>
                        <small>วันที่: ${new Date(commentDate).toLocaleString()}</small>  <!-- แสดงวันที่ -->
                    `;

                    commentsList.appendChild(commentItem);  // เพิ่มความคิดเห็นใหม่ในหน้าเว็บ
                });
            } else {
                console.error('Comments is not an array', comments);
            }
        })
        .catch(error => console.error('Error fetching comments:', error));
}


function addComment() {
    const commentText = document.getElementById('commentInput').value.trim();
    const postId = new URLSearchParams(window.location.search).get('id');  // ดึง postId จาก URL

    if (!postId) {
        console.error('Post ID is missing or invalid.');
        alert('ไม่พบโพสต์ที่ต้องการแสดงความคิดเห็น');
        return;
    }

    if (commentText) {
        const payload = {
            body: commentText,
            post: { id: postId },
            date: new Date().toISOString()  // เพิ่มวันที่ในรูปแบบ ISO 8601
        };

        fetch('http://localhost:8080/api/comment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            loadComments();  // ดึงข้อมูลความคิดเห็นใหม่ทั้งหมด
            document.getElementById('commentInput').value = '';  // เคลียร์ช่องกรอกข้อความ
        })
        .catch(error => console.error('Error adding comment:', error));
    } else {
        alert('กรุณากรอกข้อความความคิดเห็น');
    }
}
