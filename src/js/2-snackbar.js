import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
    form: document.querySelector('.form'),
    delay: document.querySelector('.delay'),
    state: document.querySelector('.state'),
    button: document.querySelector('button'),
};

refs.form.addEventListener('submit', e => {
    e.preventDefault();
});
