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
const addBill = '/bills/';
const getPersonalTransactions = "/transactions/personaltransactions";
const getRecentBills = "/bills/recentBills/";
const getGroups = "/groups/";
const createSplit = "/groups/"
const getGroupTransactions = "/transactions/groups/"
const addGroupTransaction = "/transactions/groups/"
const addUserToGroup = "/groups/user"
const removeUserFromGroup = "/groups/"
const getGroupIndTransactions = "/transactions/groups/";
const getUserDetails = '/users/userDetails';

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
    addBill,
    getPersonalTransactions,
    getRecentBills,
    getGroups,
    createSplit,
    getGroupTransactions,
    addGroupTransaction,
    addUserToGroup,
    removeUserFromGroup,
    getGroupIndTransactions,
    getUserDetails
}