function renderTableItem(user) {
    return `
    <tr>
        <td> ${user.user_id}
        <td> ${user.username}
        <td> ${user.fullName}
        <td> ${user.status}
        <td> ${user.roles.toString()}
    </tr>
    `;
}

$(async function() {
    try {
        const users = await $.ajax({
            url: 'http://localhost:3000/api/v1/users',
            method: 'GET'
        });
    
        users.forEach(user => {
            $('#user-table').append(renderTableItem(user));
        })
    } catch (error) {
        console.log(error)
        if (error.status !== 500) {
            if (error.responseJSON.code === 'TOKEN_INVALID') {
                localStorage.removeItem('user');
                return;
            }
            alert(error.responseJSON.message)
            return;
        }
        alert(error.responseJSON.message)
    }
});