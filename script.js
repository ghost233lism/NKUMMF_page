// 全局变量
let currentSlide = 0;
let currentLanguage = 'zh';
let isEnglish = false;
let currentNewsIndex = 0;
let newsData = [];

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
    initializeThemeToggle();
    initializeLanguageToggle();
    initializeMobileMenu();
    initializeContactForm();
    initializeScrollAnimation();
    initializeDropdownMenu();
    initializeNewsCarousel();
    loadUserPreferences();
});

// 轮播图功能
function initializeSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (slides.length === 0) return; // 如果不在首页，直接返回
    
    // 自动轮播
    setInterval(() => {
        nextSlide();
    }, 5000);
    
    // 下一张幻灯片
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (currentSlide + 1) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // 上一张幻灯片
    function prevSlide() {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // 跳转到指定幻灯片
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // 事件监听器
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // 键盘控制
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // 触摸滑动支持
    let startX = 0;
    let endX = 0;
    
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });
        
        sliderContainer.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const threshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
    }
}

// 主题切换功能
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // 更新图标
        if (themeIcon) {
            if (newTheme === 'dark') {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
        }
        
        // 保存用户偏好
        localStorage.setItem('theme', newTheme);
        
        // 添加切换动画
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

// 语言切换功能
function initializeLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    const langText = langToggle?.querySelector('.lang-text');
    
    if (!langToggle) return;
    
    langToggle.addEventListener('click', function() {
        isEnglish = !isEnglish;
        currentLanguage = isEnglish ? 'en' : 'zh';
        
        // 更新按钮文本
        if (langText) {
            langText.textContent = isEnglish ? '中文' : 'EN';
        }
        
        // 切换页面语言
        switchLanguage();
        
        // 保存用户偏好
        localStorage.setItem('language', currentLanguage);
    });
}

// 切换页面语言
function switchLanguage() {
    const elements = document.querySelectorAll('[data-zh][data-en]');
    
    elements.forEach(element => {
        const zhText = element.getAttribute('data-zh');
        const enText = element.getAttribute('data-en');
        
        if (zhText && enText) {
            element.textContent = isEnglish ? enText : zhText;
        }
    });
    
    // 更新页面语言属性
    document.documentElement.lang = currentLanguage;
    
    // 更新表单选项
    updateFormOptions();
    
    // 更新新闻轮播
    renderNewsCarousel();
}

// 更新表单选项
function updateFormOptions() {
    const selectElements = document.querySelectorAll('select option[data-zh][data-en]');
    
    selectElements.forEach(option => {
        const zhText = option.getAttribute('data-zh');
        const enText = option.getAttribute('data-en');
        
        if (zhText && enText) {
            option.textContent = isEnglish ? enText : zhText;
        }
    });
}

// 初始化下拉菜单
function initializeDropdownMenu() {
    const dropdownToggle = document.querySelectorAll('.dropdown-toggle');
    
    // 在移动设备上处理下拉菜单点击
    dropdownToggle.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
                
                // 关闭其他打开的下拉菜单
                document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    if (dropdown !== parent) {
                        dropdown.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // 添加键盘导航支持
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        const items = menu.querySelectorAll('.dropdown-item');
        
        items.forEach((item, index) => {
            item.addEventListener('keydown', function(e) {
                // 向下箭头导航到下一项
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextItem = items[index + 1] || items[0];
                    nextItem.focus();
                }
                
                // 向上箭头导航到上一项
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevItem = items[index - 1] || items[items.length - 1];
                    prevItem.focus();
                }
                
                // Escape键关闭下拉菜单
                if (e.key === 'Escape') {
                    e.preventDefault();
                    const dropdown = menu.closest('.dropdown');
                    dropdown.classList.remove('active');
                    dropdown.querySelector('.dropdown-toggle').focus();
                }
            });
        });
    });
}

// 移动端菜单功能
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // 汉堡包菜单动画
        const spans = hamburger.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });
        
        // 当关闭主菜单时，也关闭所有打开的下拉菜单
        if (!navMenu.classList.contains('active')) {
            document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // 点击菜单项时关闭移动端菜单，但不包括下拉菜单的切换点击
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                
                // 重置汉堡包图标
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    });
}

// 联系表单功能
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // 验证表单
        if (validateForm(data)) {
            // 显示提交成功消息
            showMessage('消息发送成功！我们会尽快回复您。', 'success');
            
            // 重置表单
            contactForm.reset();
        }
    });
}

// 表单验证
function validateForm(data) {
    const requiredFields = ['name', 'email', 'subject', 'message'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showMessage(`请填写${getFieldName(field)}`, 'error');
            return false;
        }
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showMessage('请输入有效的邮箱地址', 'error');
        return false;
    }
    
    return true;
}

// 获取字段中文名称
function getFieldName(field) {
    const fieldNames = {
        'name': '姓名',
        'email': '邮箱',
        'subject': '主题',
        'message': '消息内容'
    };
    return fieldNames[field] || field;
}

// 显示消息
function showMessage(message, type) {
    // 创建消息元素
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    
    // 添加样式
    messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #4CAF50;' : 'background: #f44336;'}
    `;
    
    document.body.appendChild(messageEl);
    
    // 显示动画
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 300);
    }, 3000);
}

// 滚动动画
function initializeScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.feature-card, .news-card, .training-card, .activity-card, .achievement-card');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 加载用户偏好设置
function loadUserPreferences() {
    // 加载主题偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    // 加载语言偏好
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage === 'en') {
        isEnglish = true;
        currentLanguage = 'en';
        
        const langText = document.querySelector('#langToggle .lang-text');
        if (langText) {
            langText.textContent = '中文';
        }
        
        switchLanguage();
    }
}

// 平滑滚动
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// 页面顶部按钮
function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // 滚动时显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'translateY(20px)';
        }
    });
    
    // 点击回到顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 导航栏滚动效果
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
        }
    });
}

// 活跃导航链接高亮
function initializeActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// 图片懒加载
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 初始化所有功能
function initializeApp() {
    createBackToTopButton();
    initializeNavbarScroll();
    initializeActiveNavigation();
    initializeLazyLoading();
}

// 页面加载完成后执行
window.addEventListener('load', initializeApp);

// 窗口大小改变时的处理
window.addEventListener('resize', function() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('active');
        
        // 重置汉堡包图标
        if (hamburger) {
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    }
});

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 导出主要函数供外部使用
window.NKUMMF = {
    smoothScrollTo,
    showMessage,
    switchLanguage
};

// 新闻轮播功能
function initializeNewsCarousel() {
    // 获取新闻轮播容器
    const newsCarousel = document.getElementById('newsCarousel');
    const newsControls = document.getElementById('newsControls');
    const newsPrev = document.getElementById('newsPrev');
    const newsNext = document.getElementById('newsNext');
    
    // 如果不在首页，则直接返回
    if (!newsCarousel) return;
    
    // 模拟从服务器获取新闻数据
    fetchNewsData()
        .then(data => {
            newsData = data;
            // 初始化新闻轮播
            renderNewsCarousel();
            
            // 创建导航点
            createNewsControls();
            
            // 添加导航按钮事件监听
            newsPrev.addEventListener('click', prevNews);
            newsNext.addEventListener('click', nextNews);
            
            // 自动轮播
            setInterval(nextNews, 5000);
        })
        .catch(error => console.error('获取新闻数据失败:', error));
}

// 模拟从服务器获取新闻数据
function fetchNewsData() {
    // 首先尝试从localStorage获取数据
    const localNewsData = localStorage.getItem('nkummf_news_data');
    
    if (localNewsData) {
        return Promise.resolve(JSON.parse(localNewsData));
    }
    
    // 如果本地没有数据，则使用默认数据
    return new Promise((resolve) => {
        const news = [
            {
                id: 1,
                title: {
                    zh: "2024年数学建模竞赛准备工作启动",
                    en: "2024 Mathematical Modeling Competition Preparation Launched"
                },
                date: "2024-06-10",
                content: {
                    zh: "协会正式启动2024年数学建模竞赛的各项准备工作。本次竞赛预计将有200余名学生参与，协会将组织系列培训活动，包括基础知识讲座、编程技能培训和历年题目解析等。",
                    en: "The association has officially launched various preparations for the 2024 mathematical modeling competition. It is expected that more than 200 students will participate in this competition."
                },
                image: "images/news1.jpg"
            },
            {
                id: 2,
                title: {
                    zh: "协会举办数学建模讲座",
                    en: "Association Hosts Mathematical Modeling Lecture"
                },
                date: "2024-06-05",
                content: {
                    zh: "6月5日，协会邀请数学科学学院李教授为会员进行数学建模技能培训。讲座主题为优化算法在数学建模中的应用，全面介绍了线性规划、非线性规划和整数规划等优化方法的原理和应用。",
                    en: "On June 5, the association invited Professor Li from the School of Mathematical Sciences to provide mathematical modeling skills training for members."
                },
                image: "images/news2.jpg"
            },
            {
                id: 3,
                title: {
                    zh: "协会新一届理事会成立",
                    en: "New Board of Directors Established"
                },
                date: "2024-06-01",
                content: {
                    zh: "经过民主选举，协会新一届理事会正式成立。新一届理事会由来自不同学院的15名学生组成，将致力于推动协会的多元化发展，加强与校内外其他组织的合作，为会员提供更多学习和交流的机会。",
                    en: "After democratic elections, the new board of directors of the association was officially established. The new board consists of 15 students from different colleges."
                },
                image: "images/news3.jpg"
            },
            {
                id: 4,
                title: {
                    zh: "美国大学生数学建模竞赛结果公布",
                    en: "MCM/ICM Results Announced"
                },
                date: "2024-05-20",
                content: {
                    zh: "2024年美国大学生数学建模竞赛(MCM/ICM)成绩日前公布，我校共有3支队伍获得Outstanding Winner（特等奖）、5支队伍获得Finalist（一等奖）、10支队伍获得Meritorious Winner（二等奖）。",
                    en: "The results of the 2024 Mathematical Contest in Modeling/Interdisciplinary Contest in Modeling (MCM/ICM) have been announced. Our university has 3 teams winning Outstanding Winner."
                },
                image: "images/news4.jpg"
            },
            {
                id: 5,
                title: {
                    zh: "协会与天津大学数模协会交流活动",
                    en: "Exchange Activity with Tianjin University"
                },
                date: "2024-05-15",
                content: {
                    zh: "5月15日，我协会与天津大学数学建模协会在我校举行了交流活动。双方就协会管理经验、竞赛培训体系、学术活动开展等方面进行了深入交流。",
                    en: "On May 15, our association held an exchange activity with the Mathematical Modeling Association of Tianjin University at our school."
                },
                image: "images/news5.jpg"
            },
            {
                id: 6,
                title: {
                    zh: "协会成功举办数学建模软件培训",
                    en: "Mathematical Modeling Software Training"
                },
                date: "2024-05-10",
                content: {
                    zh: "5月10日至12日，协会成功举办了为期三天的数学建模软件培训班。培训内容包括MATLAB、Python、Lingo等常用数学建模软件的基本操作和高级应用。",
                    en: "From May 10 to 12, the association successfully held a three-day mathematical modeling software training course."
                },
                image: "images/news6.jpg"
            },
            {
                id: 7,
                title: {
                    zh: "协会获评校优秀学生社团",
                    en: "Awarded Excellent Student Association"
                },
                date: "2024-05-04",
                content: {
                    zh: "在南开大学2023-2024学年度学生社团评优中，我协会凭借丰富多彩的活动、规范的管理和突出的竞赛成绩，再次获得南开大学优秀学生社团称号。",
                    en: "In the student association evaluation of Nankai University for the 2023-2024 academic year, our association was once again awarded the title of 'Excellent Student Association of Nankai University'."
                },
                image: "images/news7.jpg"
            },
            {
                id: 8,
                title: {
                    zh: "协会成员参加全国数学建模研讨会",
                    en: "Members Attend National Modeling Seminar"
                },
                date: "2024-04-25",
                content: {
                    zh: "4月25日至27日，我协会5名学生代表参加了在北京举行的第十五届全国大学生数学建模研讨会。会上，我校代表介绍了南开大学数学建模教育和竞赛培训的经验。",
                    en: "From April 25 to 27, five student representatives from our association participated in the 15th National College Student Mathematical Modeling Seminar held in Beijing."
                },
                image: "images/news8.jpg"
            },
            {
                id: 9,
                title: {
                    zh: "协会开展数模进课堂活动",
                    en: "'Mathematical Modeling in Classroom' Activity"
                },
                date: "2024-04-18",
                content: {
                    zh: "为推广数学建模知识，普及数学建模思想，协会于4月18日启动数模进课堂系列活动。协会骨干成员将走进全校各学院，为低年级学生介绍数学建模的基本概念、应用价值和学习方法。",
                    en: "To promote mathematical modeling knowledge and popularize mathematical modeling ideas, the association launched a series of 'Mathematical Modeling in Classroom' activities on April 18."
                },
                image: "images/news9.jpg"
            },
            {
                id: 10,
                title: {
                    zh: "协会举办企业实践项目对接会",
                    en: "Enterprise Practice Project Matching Meeting"
                },
                date: "2024-04-10",
                content: {
                    zh: "4月10日，协会举办了2024年春季企业实践项目对接会。本次对接会邀请了5家企业代表介绍各自的实践项目，内容涉及数据分析、算法优化、运筹规划等数学建模的实际应用。",
                    en: "On April 10, the association held the 2024 Spring Enterprise Practice Project Matching Meeting. The meeting invited representatives from five enterprises to introduce their practical projects."
                },
                image: "images/news10.jpg"
            }
        ];
        
        // 将默认数据保存到localStorage
        localStorage.setItem('nkummf_news_data', JSON.stringify(news));
        
        resolve(news);
    });
}

// 渲染新闻轮播
function renderNewsCarousel() {
    const newsCarousel = document.getElementById('newsCarousel');
    if (!newsCarousel) return;
    
    // 清空现有内容
    newsCarousel.innerHTML = '';
    
    // 添加新闻项
    newsData.forEach((news, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === currentNewsIndex ? 'active' : ''}`;
        
        const titleText = isEnglish ? news.title.en : news.title.zh;
        const contentText = isEnglish ? news.content.en : news.content.zh;
        
        carouselItem.innerHTML = `
            <div class="carousel-image">
                <img src="${news.image}" alt="${titleText}">
            </div>
            <div class="carousel-content">
                <h3>${titleText}</h3>
                <span class="news-date">${news.date}</span>
                <p>${contentText}</p>
                <a href="news-detail.html?id=${news.id}" class="read-more" data-zh="阅读更多" data-en="Read More">${isEnglish ? 'Read More' : '阅读更多'}</a>
            </div>
        `;
        
        newsCarousel.appendChild(carouselItem);
    });
    
    // 更新轮播位置
    updateNewsCarouselPosition();
}

// 创建新闻导航点
function createNewsControls() {
    const newsControls = document.getElementById('newsControls');
    if (!newsControls) return;
    
    // 清空现有内容
    newsControls.innerHTML = '';
    
    // 添加导航点
    newsData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${index === currentNewsIndex ? 'active' : ''}`;
        dot.dataset.index = index;
        
        dot.addEventListener('click', () => {
            currentNewsIndex = index;
            updateNewsCarousel();
        });
        
        newsControls.appendChild(dot);
    });
}

// 上一条新闻
function prevNews() {
    currentNewsIndex = (currentNewsIndex - 1 + newsData.length) % newsData.length;
    updateNewsCarousel();
}

// 下一条新闻
function nextNews() {
    currentNewsIndex = (currentNewsIndex + 1) % newsData.length;
    updateNewsCarousel();
}

// 更新新闻轮播
function updateNewsCarousel() {
    updateNewsCarouselPosition();
    updateNewsControls();
}

// 更新新闻轮播位置
function updateNewsCarouselPosition() {
    const newsCarousel = document.getElementById('newsCarousel');
    if (!newsCarousel) return;
    
    // 计算偏移量并应用
    const offset = -currentNewsIndex * 100;
    newsCarousel.style.transform = `translateX(${offset}%)`;
}

// 更新新闻导航点
function updateNewsControls() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentNewsIndex);
    });
}

// 添加文本居中样式
document.head.insertAdjacentHTML('beforeend', `
<style>
.text-center {
    text-align: center;
    margin: 2rem 0;
}
</style>
`);