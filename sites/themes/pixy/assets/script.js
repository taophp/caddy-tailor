document.addEventListener('DOMContentLoaded', function () {
    function updateMenuStyle() {
        var scrollPosition = window.scrollY || document.documentElement.scrollTop;

        document.querySelectorAll('section').forEach(function (section) {
            var sectionTop = section.offsetTop - document.querySelector('nav').offsetHeight;
            var sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                var sectionId = section.id;
                document.querySelectorAll('nav li').forEach(function (li) {
                    li.classList.remove('bg-white');
                    li.classList.remove('text-main');
                });

                document.querySelector('nav li a[href="#' + sectionId + '"]').parentNode.classList.add('bg-white');
                document.querySelector('nav li a[href="#' + sectionId + '"]').parentNode.classList.add('text-main');

            }
        });
    }

    window.addEventListener('scroll', updateMenuStyle);

    updateMenuStyle();
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll('section');
    let startX, startY, distX, distY, threshold = 5, allowedTime = 30000, elapsedTime, startTime;

    sections.forEach(section => {
        const rubrics = section.querySelectorAll('.rubric');
        const controls = section.querySelectorAll('.control');

        rubrics[0].classList.add('active');
        updateControls(section);

        controls.forEach(control => {
            control.addEventListener('click', function () {
                console.log(section);
                const direction = this.classList.contains('control-left') ? -1 : 1;
                const currentRubricIndex = Array.from(section.querySelectorAll('.rubric')).findIndex(rubric => rubric.classList.contains('active'));
                navigate2rubric(section, currentRubricIndex + direction);
            });
        });

        section.addEventListener('touchstart', function (e) {
            var touchobj = e.changedTouches[0];
            startX = touchobj.rubricX;
            startY = touchobj.rubricY;
            startTime = new Date().getTime();
            distX = 0;
            distY = 0;
            e.preventDefault();
        }, false);

        section.addEventListener('touchmove', function (e) {
            var touchobj = e.changedTouches[0];
            distX = touchobj.rubricX - startX;
            distY = touchobj.rubricY - startY;
            e.preventDefault();
        }, false);

        section.addEventListener('touchend', function (e) {
            elapsedTime = new Date().getTime() - startTime;
            if (elapsedTime <= allowedTime) {
                if (Math.abs(distX) > Math.abs(distY)) {
                    if (Math.abs(distX) >= threshold) {
                        const control = distX < 0 ? section.querySelector('.control-right') : section.querySelector('.control-left');
                        if (control && !control.classList.contains('disabled')) {
                            control.click();
                        }
                    }
                } else {
                    if (Math.abs(distY) >= threshold) {
                        if (distY < 0) {
                            navigateToNextSection(section);
                        } else if (distY > 0) {
                            navigateToPrevSection(section);
                        }
                    }
                }
            }
        }, false);

        section.addEventListener('click', function (e) {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
                const targetRubricId = e.target.hash.substring(1);
                const targetRubricIndex = Array.from(rubrics).findIndex(rubric => rubric.id === targetRubricId);

                if (targetRubricIndex !== -1) {
                    navigate2rubric(section, targetRubricIndex);
                } else {
                    const targetSection = Array.from(sections).find(section => {
                        const rubricIndexInSection = Array.from(section.querySelectorAll('.rubric')).findIndex(rubric => rubric.id === targetRubricId);
                        return rubricIndexInSection !== -1;
                    });

                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                        const targetRubricIndexInSection = Array.from(targetSection.querySelectorAll('.rubric')).findIndex(rubric => rubric.id === targetRubricId);
                        navigate2rubric(targetSection, targetRubricIndexInSection);
                    }
                }

                e.preventDefault();
            }
        });

        function navigate2rubric(section, targetRubricIndex) {
            const rubrics = section.querySelectorAll('.rubric');
            if (targetRubricIndex >= 0 && targetRubricIndex < rubrics.length) {
                const rubricWidth = section.offsetWidth;
                currentRubricIndex = targetRubricIndex;
                rubrics.forEach(rubric => {
                    rubric.style.transform = `translateX(${-currentRubricIndex * rubricWidth}px)`;
                });

                const activerubric = section.querySelector('.active');
                if (activerubric) {
                    activerubric.classList.remove('active');
                }

                rubrics[currentRubricIndex].classList.add('active');
            }
            updateControls(section);
        }
    });
});

function updateControls(section) {
    const rubrics = section.querySelectorAll('.rubric');
    const controlLeft = section.querySelector('.control-left');
    const controlRight = section.querySelector('.control-right');

    if (rubrics.length <= 1) {
        controlLeft.classList.add('disabled');
        controlRight.classList.add('disabled');
    } else {
        if (rubrics[0].classList.contains('active')) {
            controlLeft.classList.add('disabled');
            controlRight.classList.remove('disabled');
        } else if (rubrics[rubrics.length - 1].classList.contains('active')) {
            controlLeft.classList.remove('disabled');
            controlRight.classList.add('disabled');
        } else {
            controlLeft.classList.remove('disabled');
            controlRight.classList.remove('disabled');
        }
    }
}

