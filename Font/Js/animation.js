
document.addEventListener("DOMContentLoaded", function () {
    const fadeInElements = document.querySelectorAll('.fade-in');

    const options = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const onScrollAppear = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);  // หยุดตรวจสอบเมื่อแสดงผลแล้ว
            }
        });
    }, options);

    fadeInElements.forEach(element => {
        onScrollAppear.observe(element);
    });
});
