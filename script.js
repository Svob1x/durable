window.addEventListener('DOMContentLoaded', () => {
    const openingHoursElement = document.getElementById('opening-hours');
    const currentDay = (new Date().getDay() + 6) % 7;
    const currentHour = new Date().getHours();
    const openingHours = [
        { open: 8, close: 18 },
        { open: 8, close: 18 },
        { open: 8, close: 18 },
        { open: 8, close: 18 },
        { open: 8, close: 18 },
        { open: 9, close: 15 },
        { open: 0, close: 0 }
    ];

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];

    let html = '';
    for (let i = 0; i < days.length; i++) {
        const isOpen = currentHour >= openingHours[i].open && currentHour < openingHours[i].close;

        if (days[i] === "Sunday" && i === currentDay) {
            html += `<div class="current-day"><div class="day"><div class="dayinweek">${days[i]}</div><div class="time">Closed</div></div>  <div class="status">${isOpen ? 'Currently Open' : 'Currently Closed'}</div></div>`;
        }
        else if (openingHours[i].close === 0){
            html += `<div class="day"><div class="dayinweek">${days[i]}</div><div class="time">Closed</div></div>`;
        }
        else {
            if (i === currentDay) {
                html += `<div class="current-day"><div class="day"><div class="dayinweek">${days[i]}</div><div class="time">${openingHours[i].open}:00 - ${openingHours[i].close}:00</div></div>  <div class="status">${isOpen ? 'Currently Open' : 'Currently Closed'}</div></div>`;
            }
            else {
            html += `<div class="day"> <div class="dayinweek">${days[i]}</div><div class="time">${openingHours[i].open}:00 - ${openingHours[i].close}:00</div></div>`;
            }
        }
    }

    openingHoursElement.innerHTML = html;
});


document.addEventListener("DOMContentLoaded", function() {
    const galleryContainer = document.querySelector(".gallery-container");
    const galleryControlsContainer = document.querySelector('.gallery-controls');
    const galleryControls = ['previous', 'next'];
    const galleryItems = document.querySelectorAll('.gallery-item');

    class Carousel {
        constructor(container, items, controls) {
            this.carouselArray = container;
            this.carouselControls = controls;
            this.carouselArray = [...items];
        }

        updateGallery() {
            this.carouselArray.forEach(el => {
                el.classList.remove('gallery-item-1');
                el.classList.remove('gallery-item-2');
                el.classList.remove('gallery-item-3');
                el.classList.remove('gallery-item-4');
                el.classList.remove('gallery-item-5');
            });

            this.carouselArray.slice(0, 5).forEach((el, i) => {
                el.classList.add(`gallery-item-${i+1}`);
            });
        }

        setCurrentState(direction) {
            if (direction.className === 'gallery-controls-previous') {
                this.carouselArray.unshift(this.carouselArray.pop());
            } else {
                this.carouselArray.push(this.carouselArray.shift());
            }
            this.updateGallery();
        }

        setControls() {
            console.log("galleryControls:", this.carouselControls);
            galleryControlsContainer.innerHTML = ""; // Odstranění všech stávajících prvků uvnitř galleryControlsContainer
            this.carouselControls.forEach(control => {
                if (control === 'previous' || control === 'next') {
                    const button = document.createElement("button");
                    button.className = `gallery-controls-${control}`;
                    button.innerText = control;
                    galleryControlsContainer.appendChild(button);
                }
            });
            console.log("Buttons created:", galleryControlsContainer.innerHTML);
        }

        useControls() {
            const triggers = [...galleryControlsContainer.childNodes];
            console.log("Triggers:", triggers);
            triggers.forEach(control => {
                control.addEventListener("click", e => {
                    e.preventDefault();
                    this.setCurrentState(control);
                });
            });
        }
    }

    const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

    exampleCarousel.setControls();
    exampleCarousel.useControls();
});








