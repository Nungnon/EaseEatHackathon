let currentQuestionIndex = 0;
const questions = document.querySelectorAll('.question-group');
const submitButton = document.getElementById('submitButton');
const nextButton = document.getElementById('nextButton');
let answers = {}; // เก็บคำตอบของแต่ละคำถาม

window.onload = () => {
    if (questions.length > 0) {
        showQuestion(currentQuestionIndex); // แสดงคำถามแรก
    } else {
        console.error("ไม่มีคำถามที่จะแสดง กรุณาตรวจสอบ HTML");
    }
};

// ฟังก์ชันแสดงคำถาม
function showQuestion(index) {
    questions.forEach((q, i) => {
        q.style.display = i === index ? 'block' : 'none';
    });

    // จัดการการแสดงผลของปุ่ม
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'block';
    } else {
        nextButton.style.display = 'block';
        submitButton.style.display = 'none';
    }
}

function selectAnswer(questionIndex, value, button) {
    answers[questionIndex] = parseInt(value); // เก็บค่าที่ถูกเลือกในรูปแบบตัวเลข

    // นำคลาส selected ออกจากปุ่มทั้งหมดในคำถามนี้
    const buttons = questions[questionIndex].querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('selected'));

    // เพิ่มคลาส selected ให้กับปุ่มที่ถูกเลือก
    button.classList.add('selected');
    console.log(`คำถามที่ ${questionIndex + 1} เลือกคำตอบ: ${value}`);
}




// ฟังก์ชันในการไปยังคำถามถัดไป
function nextQuestion() {
    if (answers[currentQuestionIndex] === undefined) {
        Swal.fire({
            title: 'คำเตือน!',
            text: 'กรุณาตอบคำถามก่อนดำเนินการต่อ',
            icon: 'warning',
            confirmButtonText: 'ตกลง'
        });
        return;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
}

function calculateDASS() {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + parseInt(value), 0);
    const currentDate = new Date().toISOString().slice(0, -1);
    const stressData = getStressLevel(totalScore);
    const stressDescription = getStressDescription(totalScore);
    const userId = localStorage.getItem("userId"); // ดึง userId จาก Local Storage

    localStorage.setItem('totalScore', totalScore);
    localStorage.setItem('resultText', stressData.level);
    localStorage.setItem('resuInfor', stressDescription);
    localStorage.setItem('resultColor', stressData.color);

    if (!userId || isNaN(parseInt(userId))) {
        alert("User ID ไม่ถูกต้อง กรุณาล็อกอินใหม่");
        return;
    }

    fetch("http://localhost:8080/api/strain/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            levels: stressData.level,
            date: currentDate,
            user: { id: parseInt(userId) } // ใช้ userId ที่ล็อกอินอยู่
        }),
    })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    title: 'บันทึกผลสำเร็จ!',
                    text: 'ผลลัพธ์ของคุณถูกบันทึกเรียบร้อยแล้ว',
                    icon: 'success',
                    confirmButtonText: 'ตกลง'
                }).then(() => {
                    window.location.href = "Formresult.html";
                });
            } else {
                return response.text().then(text => {
                    Swal.fire({
                        title: 'เกิดข้อผิดพลาด',
                        text: `Error: ${text}`,
                        icon: 'error',
                        confirmButtonText: 'ตกลง'
                    });
                    throw new Error(`Error: ${text}`);
                });
            }
        })
        .catch(error => {
            console.error("Error:", error);
            Swal.fire({
                title: 'เกิดข้อผิดพลาด',
                text: `ไม่สามารถบันทึกผลได้: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'ตกลง'
            });
        });

}





function getStressLevel(score) {
    if (score <= 46) {
        return { level: "ความเครียดต่ำ", color: "#4caf50" }; // สีเขียว
    } else if (score <= 56) {
        return { level: "ความเครียดปานกลาง", color: "#ffc107" }; // สีเหลือง
    } else if (score <= 59) {
        return { level: "ความเครียดสูง", color: "#ff9800" }; // สีส้ม
    } else {
        return { level: "ความเครียดสูงมาก", color: "#f44336" }; // สีแดง
    }
}

function getStressDescription(score) {
    if (score <= 21) {
        return "ระดับความเครียดต่ำอาจไม่ส่งผลกระทบมากนักต่อสุขภาพจิตและการกิน แต่อย่างไรก็ตาม ควรดูแลความเครียดอย่างต่อเนื่องโดยการทำกิจกรรมที่ชื่นชอบ เช่น การออกกำลังกายเบา ๆ การทำสมาธิ หรือการเดินเล่น เพื่อรักษาความสมดุลทางอารมณ์และลดความเสี่ยงต่อการสะสมความเครียดในอนาคต";
    } else if (score <= 42) {
        return "ระดับความเครียดปานกลางสามารถส่งผลกระทบต่ออารมณ์และการจัดการการกิน ควรเริ่มหาวิธีคลายเครียด เช่น การฝึกโยคะ การเขียนบันทึกเพื่อสะท้อนความรู้สึก หรือการปรึกษาผู้เชี่ยวชาญเพื่อพูดคุยถึงความเครียด ควรระวังไม่ให้ความเครียดนำไปสู่การควบคุมการกินที่มากเกินไป และพยายามดูแลโภชนาการให้ครบถ้วนในแต่ละวัน";
    } else if (score <= 63) {
        return "ความเครียดสูงอาจเริ่มส่งผลกระทบอย่างมีนัยสำคัญต่อสุขภาพจิต ควรพิจารณาการเข้ารับการบำบัดจากผู้เชี่ยวชาญด้านสุขภาพจิต เช่น การบำบัดความคิดและพฤติกรรม (CBT) เพื่อปรับทัศนคติและความเชื่อที่มีต่อน้ำหนักและการกิน รวมถึงการรับคำปรึกษาจากนักโภชนาการในการปรับแผนอาหารเพื่อสุขภาพ นอกจากนี้ ควรฝึกฝนทักษะการผ่อนคลายและจัดการกับความเครียดในชีวิตประจำวันอย่างจริงจัง";
    } else {
        return "ความเครียดในระดับสูงมากอาจเป็นอันตรายต่อสุขภาพกายและจิตใจ อาจจำเป็นต้องเข้ารับการดูแลอย่างเข้มข้นจากทีมแพทย์ในโรงพยาบาลหรือคลินิกเฉพาะทาง ซึ่งอาจรวมถึงการบำบัดโดยแพทย์ นักจิตวิทยา และนักโภชนาการ เพื่อช่วยให้ผู้ป่วยรับรู้ถึงคุณค่าของการดูแลตนเอง การฟื้นฟูสุขภาพกายและใจ ควบคู่ไปกับการสร้างกลไกในการจัดการกับความเครียด";
    }
}


