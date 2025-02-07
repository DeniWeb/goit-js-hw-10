import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
    form: document.querySelector('.form'),
};

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}

refs.form.addEventListener('submit', e => {
    e.preventDefault();

    const delay = Number(e.target.elements.delay.value);
    const state = e.target.elements.state.value;

    if (delay <= 0) {
        iziToast.warning({
            message: 'Delay must be greater than 0',
            position: 'topRight',
            iconUrl: 'https://img.icons8.com/office/40/medium-risk.png',
        });
        return;
    }

    createPromise(delay, state)
        .then(delay => {
            iziToast.success({
                iconUrl:
                    'https://img.icons8.com/emoji/48/check-mark-button-emoji.png',
                message: `Fulfilled promise in ${delay}ms`,
                position: 'topRight',
            });
        })
        .catch(delay => {
            iziToast.error({
                iconUrl: 'https://img.icons8.com/emoji/48/cross-mark-emoji.png',
                message: `Rejected promise in ${delay}ms`,
                position: 'topRight',
            });
        });
});
