const authorization = '/authenticate';
const login = authorization+'/login';
const register = authorization+'/register';
const getListOfUsersTransactions = '/transactions/users';
const addTransaction = '/transactions/';
const deleteTransactions = '/transactions/';
const getRoomsOfUser = '/users/rooms'
const addRoom = '/rooms/';
const getCategories = '/category/';
const updateCategories = "/category/";
const deleteCategories = "/category/";
const getBills = '/bills/';
const deleteBill = '/bills/';
const toggleBill = '/bills/';
const addBill = '/bills/'

export const backendApiUrls = {
    authorization,
    login,
    register,
    getListOfUsersTransactions,
    addTransaction,
    deleteTransactions,
    getRoomsOfUser,
    addRoom,
    deleteCategories,
    updateCategories,
    getCategories,
    getBills,
    deleteBill,
    toggleBill,
    addBill
}