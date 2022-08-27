
function authHeader() {
    const token = localStorage.getItem("token");

    if (token) {
        return {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
        };
    } else {
        return {};
    }
}

export default authHeader;
