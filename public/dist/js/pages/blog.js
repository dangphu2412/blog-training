function renderTableItem(blog) {
    return `
    <tr>
        <td> ${blog.blog_id}
        <td> ${blog.title}
        <td> ${blog.category}
        <td> ${blog.status}
        <td> ${blog.tags.toString()}
    </tr>
    `;
}

$(async function() {
    try {
        const blogs = await $.ajax({
            url: 'http://localhost:3000/api/v1/blogs',
            method: 'GET'
        });
    
        blogs.forEach(user => {
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