const authorization = '/authenticate';
const login = authorization+'/login';
const register = authorization+'/register';
const getListOfUsersTransactions = '/transactions/users';
const getRoomsOfUser = '/users/rooms'
const addRoom = '/rooms/'

export const backendApiUrls = {
    authorization,
    login,
    register,
    getListOfUsersTransactions,
    getRoomsOfUser,
    addRoom
}