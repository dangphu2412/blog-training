export function profileResponse(profile, accessToken) {
    delete profile.password;
    return {
        accessToken,
        ...profile
    };
}
