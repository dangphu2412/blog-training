const sorts = {};

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
    console.log(query);
    try {
        console.log((JSON.parse(localStorage.getItem('user'))).accessToken);
        const response = await $.ajax({
            url: '/api/v1/users?' + query,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + (JSON.parse(localStorage.getItem('user'))).accessToken
            }
        });

        $('#user-table').empty()

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
    await callApiGetUser(`s=${searchValue}`);
})

$('#page-link').on('click', function(e) {
    // await callApiGetUser(`s=${searchValue}`);
});

$('.fas.fa-sort-up').on('click', async function(e) {
    e.preventDefault();
    const sortField = this.getAttribute('sort-prop');
    sorts[sortField] = '';
    let sortQuery = 'sort=';
    Object.keys(sorts).forEach(field => {
        sortQuery += field;
        sortQuery += ','
    })
    sortQuery = sortQuery.substring(0, sortQuery.length - 1);
    await callApiGetUser(sortQuery)
})

$('.fas.fa-sort-down').on('click', async function(e) {
    e.preventDefault();
    const sortField = this.getAttribute('sort-prop');
    const sortColumn = sortField.slice(1);
    sorts[sortColumn] = '-';
    let sortQuery = 'sort=';
    Object.keys(sorts).forEach(field => {
        sortQuery += sorts[field] + field;
        sortQuery += ','
    })
    sortQuery = sortQuery.substring(0, sortQuery.length - 1);
    await callApiGetUser(sortQuery)
})