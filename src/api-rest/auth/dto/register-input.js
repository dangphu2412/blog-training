export function registerInput(body) {
    return {
        username: body.username,
        full_name: body.fullName,
        password: body.password
    };
}
