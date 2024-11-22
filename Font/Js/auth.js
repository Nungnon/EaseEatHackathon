window.onload = function () {
    const loginNav = document.getElementById("nav-login");
    const logoutNav = document.getElementById("logout");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    console.log("Username:", username);
    console.log("UserId:", userId);

    if (username && userId) {
        // เมื่อผู้ใช้ล็อกอินแล้ว
        loginNav.textContent = "โปรไฟล์";
        loginNav.href = "profile.html";
        logoutNav.style.display = "block"; // แสดงปุ่ม Logout
    } else {
        // เมื่อผู้ใช้ยังไม่ได้ล็อกอิน
        loginNav.textContent = "Login";
        loginNav.href = "login.html";
        logoutNav.style.display = "none"; // ซ่อนปุ่ม Logout
    }

    // การจัดการ Logout
    logoutNav.addEventListener("click", function () {
        // ลบข้อมูลใน Local Storage
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
    
        // ใช้ SweetAlert2 เพื่อแสดงการแจ้งเตือน
        Swal.fire({
            title: 'ออกจากระบบสำเร็จ!',
            text: 'คุณได้ออกจากระบบแล้ว',
            icon: 'success',  // เลือกไอคอนที่ต้องการ
            confirmButtonText: 'ตกลง',  // ข้อความปุ่ม
            confirmButtonColor: '#3085d6',  // สีปุ่ม
            background: '#f9f9f9',  // พื้นหลัง
            timer: 2000  // แจ้งเตือนจะหายไปหลังจาก 2 วินาที
        }).then(() => {
            // หลังจากที่ผู้ใช้กด "ตกลง" หรือเวลาหมดจะเปลี่ยนเส้นทางไปที่หน้า login
            window.location.href = "Home.html";
        });
    });
}    

// ตรวจสอบสถานะล็อกอิน
export function checkLoginStatus() {
    const loginNav = document.getElementById("nav-login");
    const logoutNav = document.getElementById("logout");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    if (username && userId) {
        // เมื่อผู้ใช้ล็อกอินแล้ว
        loginNav.textContent = "โปรไฟล์";
        loginNav.href = "profile.html";
        logoutNav.style.display = "block"; // แสดงปุ่ม Logout
        return { username, userId }; // ส่งคืนสถานะล็อกอิน
    } else {
        // เมื่อผู้ใช้ยังไม่ได้ล็อกอิน
        loginNav.textContent = "Login";
        loginNav.href = "login.html";
        logoutNav.style.display = "none"; // ซ่อนปุ่ม Logout
        return null; // ส่งคืนสถานะไม่ได้ล็อกอิน
    }
}
export function logout() {
    localStorage.removeItem("userId");  // ลบข้อมูล userId จาก localStorage
    window.location.href = "login.html";  // เปลี่ยนเส้นทางไปหน้า login
}
