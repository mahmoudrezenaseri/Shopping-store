const GetToken = () => {
    const user = localStorage.getItem('token');
    if (user) {
        return user
    }
    return ''
};
export default GetToken;