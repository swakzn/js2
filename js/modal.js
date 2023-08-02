//* MODAL
const modal = document.querySelector('.modal');
const modalTrigger = document.querySelector('#btn-get');
const closeModalButton = document.querySelector('.modal_close');

const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// setInterval(openModal, 10000)

const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

modalTrigger.onclick = () => openModal();

closeModalButton.onclick = () => closeModal();

modal.onclick = (event) => event.target === modal  && closeModal()

function scrollFn() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        openModal()
        removeEventListener('scroll', scrollFn)
    }
  }

window.addEventListener('scroll', scrollFn);

const form = document.querySelector('form')

const postData = (url, data) => {
    const response = fetch(url, {
        method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body: data
    })
    return response
}

const bindPostData = () => {
    form.onsubmit = (event) => {
        event.preventDefault()
        const formData = new FormData (form)
        const obj = {}
        formData.forEach((item, i) =>{
            const json = JSON.stringify(obj)
            if (window.location.pathname === '/project-js/index.html'){
                postData('server.php', json)
            }else{
                postData('../server.php', json)
            }
        })
    }
}

bindPostData(form)