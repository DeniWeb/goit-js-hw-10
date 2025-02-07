import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let intervalId = null;
let initTime = null;

disableButton(refs.startBtn);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    enableSeconds: true,
    locale: {
        firstDayOfWeek: 1,
    },
    onClose(selectedDates) {
        initTime = selectedDates[0];

        if (initTime < Date.now()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topRight',
            });
            disableButton(refs.startBtn);
        } else {
            clearInterval(intervalId);
            enableButton(refs.startBtn);
        }
    },
};

flatpickr(refs.input, options);

refs.startBtn.addEventListener('click', () => {
    disableButton(refs.startBtn);
    refs.input.disabled = true;

    clearInterval(intervalId);

    intervalId = setInterval(() => {
        const currentTime = Date.now();
        const timeDifference = initTime - currentTime;

        if (timeDifference <= 0) {
            clearInterval(intervalId);
            updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            refs.input.disabled = false;

            iziToast.success({
                title: 'Time is up!',
                message: 'Good luck!',
                position: 'topRight',
            });
            return;
        }

        const time = convertMs(timeDifference);
        updateTimerDisplay(time);
    }, 1000);
});

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function disableButton(button) {
    button.disabled = true;
    button.classList.add('disabled');
    button.classList.remove('active');
}

function enableButton(button) {
    button.disabled = false;
    button.classList.add('active');
    button.classList.remove('disabled');
}
