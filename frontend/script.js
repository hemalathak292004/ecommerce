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


/*form*/

document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.querySelector('#signup-form input[name="email"]').value;
    const password = document.querySelector('#signup-form input[name="psw"]').value;
    const passwordRepeat = document.querySelector('#signup-form input[name="psw-repeat"]').value;

    if (password !== passwordRepeat) {
        alert('Passwords do not match');
        return;
    }

    try {
        const response = await fetch('http://localhost:3002/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }) // Corrected body to use email and password
        });

        if (!response.ok) {
            throw new Error('Signup failed');
        }

        const message = await response.json();
        
        alert(message); // Display the response message
    } catch (error) {
        console.error('Error:', error.message);
        alert('Error: ' + error.message);
    }
});
