function initStorySwiper() {
    const isTablet = window.matchMedia("(min-width: 600px) and (max-width: 1024px)").matches;
    const isMobile = window.matchMedia("(max-width: 599px)").matches;

    let swiperConfig = {
        direction: 'vertical',
        spaceBetween: 20,
        draggable: false,
        clickable: true,
        loop: true,
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },
    };

    if (isTablet || isMobile) {
        swiperConfig.direction = 'horizontal';
        swiperConfig.spaceBetween = isTablet ? 30 : 10;
        swiperConfig.draggable = true;
        swiperConfig.keyboard.enabled = false;
        swiperConfig.scrollbar.el = '';

        if (isTablet) {
            swiperConfig.navigation = {
                nextEl: '.swiper-button-next-story',
                prevEl: '.swiper-button-prev-story',
            };
            swiperConfig.pagination = {
                el: '',
                type: ''
            }
        }
        if (isMobile) {
            swiperConfig.navigation = {
                nextEl: '',
                prevEl: '',
            };
            swiperConfig.pagination = {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            }
        }

    }

    const storySwiper = new Swiper('.story-swiper', swiperConfig);
}


function initProjectsSwiper() {
    const isTablet = window.matchMedia("(min-width: 600px) and (max-width: 1024px)").matches;
    const isMobile = window.matchMedia("(max-width: 599px)").matches;

    let swiperConfig = {
        direction: 'horizontal',
        slidesPerView: 2,
        spaceBetween: 20,
        draggable: false,
        loop: true,
        clickable: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 1,
                spaceBetween: 30
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 40
            }
        }
    };
    if (isTablet) {
        swiperConfig.draggable = true;
    } else if (isMobile) {
        swiperConfig.spaceBetween = 10;
    }

    const projectsSwiper = new Swiper('.projects-swiper', swiperConfig);
}

function scrollAnimation() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initStorySwiper();
    initProjectsSwiper();
    scrollAnimation();
});

(function () {
    emailjs.init({
        publicKey: "ta3yBpBL6I6Vs1Ha1",
        blockHeadless: true,
        blockList: {
            list: ['foo@emailjs.com', 'bar@emailjs.com'],
            watchVariable: 'userEmail',
        },
    });
})();

document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();

    const templateParams = {
        from_name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        to_name: "Abrar Alzubaidi"
    };
    const customAlert = document.querySelector('.custom-alert');
    const alertImage = customAlert.querySelector('img');

    const submitButton = document.querySelector('.submit');

    emailjs.send('service_oqug6ha', 'template_6s4933g', templateParams)
        .then(function (response) {
            alertImage.src = './assets/send-success.svg';
            customAlert.style.display = 'flex';

            setTimeout(() => {
                customAlert.style.display = 'none';
                submitButton.style.display = 'none'
            }, 5000);
        }, function (error) {
            alertImage.src = './assets/send-failed.svg'; 
            customAlert.style.display = 'flex';

            setTimeout(() => {
                customAlert.style.display = 'none';
                submitButton.style.display = 'none'

            }, 5000);

            console.log('Failed to send email', error);
        });

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';

});