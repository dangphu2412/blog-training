function TableItem(user) {
    return `
    <tr>
        <td> ${user.user_id}
        <td> ${user.username}
        <td> ${user.full_name}
        <td> ${user.status}
        <td> ${user.roles.toString()}
    </tr>
    `;
}

function PageItem(value) {
    return `
        <li class="page-item">
            <a class="page-link" href='#'> ${value}</a>
        </li>
    `
}

async function callApiGetUser(query = "") {
    try {
        const response = await $.ajax({
            url: '/api/v1/users?' + query,
            method: 'GET'
        });
    
        response.data.forEach(user => {
            $('#user-table').append(TableItem(user));
        })

        $('#pagination').empty();

        $('#pagination').append(PageItem('&laquo'));

        for (let index = 1; index < response.totalPage + 1; index++) {
            $('#pagination').append(PageItem(index));
        }


        $('#pagination').append(PageItem('&raquo'));

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
}

$(async function() {
    await callApiGetUser();
});

$('#search').on('change', async function(e) {
    const searchValue = $('#search').val();
    $('#user-table').empty()
    await callApiGetUser(`s=${searchValue}`);
})

$('#page-link').on('click', function(e) {
    // await callApiGetUser(`s=${searchValue}`);
});
