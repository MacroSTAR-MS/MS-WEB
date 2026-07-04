// 平滑滚动（已在 CSS 中开启 scroll-behavior: smooth）
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('main section[id]');

    // 导航栏滚动高亮当前栏目
    function updateActiveNav() {
        const scrollPos = window.scrollY + window.innerHeight * 0.4;
        let currentId = '';
        sections.forEach(function (sec) {
            const top = sec.offsetTop;
            const bottom = top + sec.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) {
                currentId = sec.id;
            }
        });
        navLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + currentId) {
                link.style.opacity = '1';
            } else {
                link.style.opacity = '0.8';
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // 滚动动画：元素进入视口时渐入
    const animatedElements = document.querySelectorAll(
        '.tile-head, .tile-visual, .card-head, .card-visual'
    );
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        animatedElements.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    }
});