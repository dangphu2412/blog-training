console.log('Loaded register js file');

$('#register-form').on('submit', async function(e) {
    e.preventDefault();
    const fullName = $('#fullName').val();
    const username = $('#email').val();
    const password = $('#password').val();

    try {
        const response = await $.ajax({
            url: 'http://localhost:3000/api/v1/auth/register',
            data: { username, password, fullName },
            method: 'POST'
        });
    } catch (error) {
        console.log(error)
        if (error.status !== 500) {
            if (error.responseJSON.code === 'BAD_REQUEST') {
                error.responseJSON.message.details.forEach(detail => {
                    alert(detail.message)
                })
                return;
            }
            alert(error.responseJSON.message)
            return;
        }
        alert(error.responseJSON.message)
    }
})