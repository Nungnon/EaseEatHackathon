import { checkLoginStatus } from "./auth.js";


window.onload = function () {
    const loginStatus = checkLoginStatus();

    if (!loginStatus) return; // ถ้าไม่ได้ล็อกอิน ให้หยุดการทำงาน

    const { userId } = loginStatus;

    const logoutButton = document.getElementById("logout");
    logoutButton.style.display = "block"; // ทำให้ปุ่มออกจากระบบแสดงผล

    logoutButton.addEventListener("click", function () {
        logout();  // เรียกฟังก์ชัน logout เมื่อคลิกปุ่ม
    });


    // ดึงข้อมูลผู้ใช้จาก API
    fetch(`http://localhost:8080/api/users/${userId}`)
        .then(response => response.json())
        .then(data => {
            const user = data.user;  // ข้อมูลผู้ใช้
            const strainHistory = data.strainHistory;  // ประวัติการประเมินความเครียด
            const bmrHistory = data.bmrHistory;  // ประวัติการคำนวณ BMR

            // แสดงข้อมูลในหน้า HTML
            document.getElementById("name").textContent = user.name || "ไม่มีข้อมูล";
            document.getElementById("username").textContent = user.username || "ไม่มีข้อมูล";

            // แสดงค่า BMR ล่าสุด
            const bmrContainer = document.querySelector(".bmr-history");
            if (bmrHistory && bmrHistory.length > 0) {
                const latestBmr = bmrHistory[bmrHistory.length - 1];  // ค่า BMR ล่าสุด
                bmrContainer.innerHTML = ` ${latestBmr.bmr}  แคล/วัน`;  // แสดงค่า BMR เท่านั้น
            }

            // เรียงประวัติ Strain จากใหม่ไปเก่า
            const sortedStrainHistory = strainHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

            // แสดงประวัติ Strain
            const strainContainer = document.querySelector(".assessment-history");
            strainContainer.innerHTML = "";
            sortedStrainHistory.forEach(strain => {
                const item = document.createElement("div");
                item.className = "history-item";

                const date = document.createElement("span");
                date.className = "history-date";
                date.textContent = new Date(strain.date).toLocaleString(); // วันที่
                item.appendChild(date);

                const levelContainer = document.createElement("div");
                levelContainer.className = "level-container";
                const levelCircle = document.createElement("div");
                levelCircle.className = `history-stress-level ${getStressClass(strain.levels)}`; // ใช้ฟังก์ชัน getStressClass เพื่อกำหนดสี
                levelContainer.appendChild(levelCircle);

                const levelText = document.createElement("span");
                levelText.className = `stress-level-text ${getStressClass(strain.levels)}`; // เปลี่ยนสีข้อความ
                levelText.textContent = strain.levels; // ระดับความเครียด
                levelContainer.appendChild(levelText);

                item.appendChild(levelContainer);

                strainContainer.appendChild(item);
            });
            const stressIndicator = document.getElementById("stressIndicator");
            const latestStrain = strainHistory[0];  // ใช้ข้อมูลล่าสุดจากการประเมินความเครียด
            stressIndicator.className = `stress-indicator ${getStressClass(latestStrain.levels)}`;



            // แสดงกราฟเส้น
            const ctx = document.getElementById("stressGraph").getContext("2d");
            const dates = strainHistory.sort((a, b) => new Date(a.date) - new Date(b.date)).map(strain => new Date(strain.date).toLocaleDateString());
            const levels = strainHistory.sort((a, b) => new Date(a.date) - new Date(b.date)).map(strain => getLevelValue(strain.levels));

            // สร้างกราฟ
            const stressChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'ระดับความเครียด',
                        data: levels,
                        borderColor: 'rgba(75, 192, 192, 1)', // เพิ่มการกำหนดสีตามระดับความเครียด
                        backgroundColor: 'rgba(75, 192, 192, 0.2)', // เพิ่มพื้นหลังของเส้นกราฟ
                        pointBackgroundColor: getColorByLevel(levels), // สีของจุดข้อมูล
                        pointBorderColor: 'rgba(0,0,0,0.1)',
                        fill: true,
                        pointRadius: 10,
                        pointStyle: 'circle',
                    }]
                }, options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,


                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'ระดับความเครียด',
                                font: { size: 14 }
                            },
                            min: 0, // กำหนดค่าสูงสุดต่ำสุด
                            max: 5, // กำหนดค่าสูงสุด
                        }
                    }
                }
            });

            // ฟังก์ชันเพื่อแปลงระดับความเครียดเป็นค่าตัวเลข
            function getLevelValue(level) {
                switch (level) {
                    case "ความเครียดต่ำ": return 4;
                    case "ความเครียดปานกลาง": return 3;
                    case "ความเครียดสูง": return 2;
                    case "ความเครียดสูงมาก": return 1;
                    default: return 0;
                }
            }
            function getColorByLevel(levels) {
                return levels.map(level => {
                    switch (level) {
                        case 4: return 'green'; // ความเครียดต่ำ
                        case 3: return 'yellow'; // ความเครียดปานกลาง
                        case 2: return 'orange'; // ความเครียดสูง
                        case 1: return 'red'; // ความเครียดสูงมาก
                        default: return 'gray'; // กรณีที่ไม่มีระดับ
                    }
                });
            }



            // ฟังก์ชันช่วยจัดการสีระดับความเครียด
            function getStressClass(level) {
                switch (level) {
                    case "ความเครียดต่ำ":
                        return "low";  // ค่าที่จะใช้ใน class
                    case "ความเครียดปานกลาง":
                        return "medium";
                    case "ความเครียดสูง":
                        return "high";
                    case "ความเครียดสูงมาก":
                        return "very-high";
                    default:
                        return "";
                }
            }


            // เริ่มต้นแสดงข้อมูลแบบประวัติ
            toggleView("history");
        })
        .catch(err => {
            console.error("Error fetching user profile:", err);
            alert("ไม่สามารถดึงข้อมูลได้: " + err.message);
        });

    // ฟังก์ชันสำหรับการสลับการแสดงผล
    document.getElementById("historyButton").addEventListener("click", function () {
        toggleView("history");
    });

    document.getElementById("graphButton").addEventListener("click", function () {
        toggleView("graph");
    });

    // ฟังก์ชันสำหรับสลับการแสดงข้อมูล
    function toggleView(view) {
        const historyContainer = document.querySelector("#assessmentHistory");
        const graphContainer = document.querySelector("#stressGraph");
        const historyButton = document.querySelector("#historyButton");
        const graphButton = document.querySelector("#graphButton");

        if (view === "history") {
            historyContainer.style.display = "block";
            graphContainer.style.display = "none";
            historyButton.classList.add("active");
            graphButton.classList.remove("active");
        } else {
            historyContainer.style.display = "none";
            graphContainer.style.display = "block";
            historyButton.classList.remove("active");
            graphButton.classList.add("active");
        }
    }

};