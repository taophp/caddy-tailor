document.addEventListener("DOMContentLoaded", function () {
    const categories = document.querySelectorAll('.category');
    let startX, startY, distX, distY, threshold = 5,
        allowedTime = 30000,
        elapsedTime, startTime;

    categories.forEach(category => {
        const pages = category.querySelectorAll('.page');
        const controls = category.querySelectorAll('.control');
        const pageWidth = category.offsetWidth;
        let currentPageIndex = 0;

        pages[0].classList.add('active');
        updateControls(category);

        controls.forEach(control => {
            control.addEventListener('click', function () {
                const direction = this.classList.contains('control-left') ? -1 : 1;
                const pageCount = pages.length;

                if (currentPageIndex + direction >= 0 && currentPageIndex + direction < pageCount) {
                    currentPageIndex += direction;
                    pages.forEach(page => {
                        page.style.transform = `translateX(${-currentPageIndex * pageWidth}px)`;
                    });

                    // Supprime la classe "active" de l'élément précédemment actif
                    const activePage = category.querySelector('.active');
                    if (activePage) {
                        activePage.classList.remove('active');
                    }

                    // Ajoute la classe "active" à la nouvelle page active
                    pages[currentPageIndex].classList.add('active');
                }
                updateControls(category);
            });
        });

        category.addEventListener('touchstart', function (e) {
            var touchobj = e.changedTouches[0];
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime();
            distX = 0;
            distY = 0;
            e.preventDefault();
        }, false);

        category.addEventListener('touchmove', function (e) {
            var touchobj = e.changedTouches[0];
            distX = touchobj.pageX - startX;
            distY = touchobj.pageY - startY;
            e.preventDefault();
        }, false);

        category.addEventListener('touchend', function (e) {
            elapsedTime = new Date().getTime() - startTime;
            if (elapsedTime <= allowedTime) {
                if (Math.abs(distX) > Math.abs(distY)) {
                    if (Math.abs(distX) >= threshold) {
                        const control = distX < 0 ? category.querySelector('.control-right') : category.querySelector('.control-left');
                        if (control && !control.classList.contains('disabled')) {
                            control.click();
                        }
                    }
                } else {
                    if (Math.abs(distY) >= threshold) {
                        if (distY < 0) {
                            const nextCategory = category.nextElementSibling;
                            if (nextCategory) {
                                location.hash = nextCategory.id;
                            }
                        } else if (distY > 0) {
                            const prevCategory = category.previousElementSibling;
                            console.log(prevCategory);
                            if (prevCategory) {
                                location.hash = prevCategory.id;
                            }
                        }
                    }
                }
            }
        }, false);
    });
});

function updateControls(category) {
    const pages = category.querySelectorAll('.page');
    const controlLeft = category.querySelector('.control-left');
    const controlRight = category.querySelector('.control-right');

    if (pages.length <= 1) {
        controlLeft.classList.add('disabled');
        controlRight.classList.add('disabled');
    } else {
        if (pages[0].classList.contains('active')) {
            controlLeft.classList.add('disabled');
            controlRight.classList.remove('disabled');
        } else if (pages[pages.length - 1].classList.contains('active')) {
            controlLeft.classList.remove('disabled');
            controlRight.classList.add('disabled');
        } else {
            controlLeft.classList.remove('disabled');
            controlRight.classList.remove('disabled');
        }
    }
}

document.addEventListener("DOMContentLoaded",function(){var links=document.querySelectorAll("a[href^='http://'], a[href^='https://']");links.forEach(function(link){link.addEventListener("click",function(event){window.open(this.href);event.preventDefault();});});});