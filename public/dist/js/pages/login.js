console.log('Loaded login js file');

$('#login-form').on('submit', async function(e) {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();

    const response = await $.ajax({
        url: 'http://localhost:3000/api/auth/login',
        data: { email, password }
    });
})