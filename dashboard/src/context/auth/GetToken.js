const GetToken = () => {
    const user = localStorage.getItem('token');
    if (user) {
        return user
    }
    return 'sdfsf'
};
export default GetToken;