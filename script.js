const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navibar');

if (bar) {
    bar.addEventListener('click',()=>{
        nav.classList.toggle('active');
    });
}

if (close) {
    close.addEventListener('click',()=>{
        nav.classList.toggle('active');
    });
}