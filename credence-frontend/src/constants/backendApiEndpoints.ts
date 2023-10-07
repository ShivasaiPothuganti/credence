const authorization = '/authenticate';
const login = authorization+'/login';
const register = authorization+'/register';
const getListOfUsersTransactions = '/transactions/users';
const addTransaction = '/transactions/';
const deleteTransactions = '/transactions/';

export const backendApiUrls = {
    authorization,
    login,
    register,
    getListOfUsersTransactions,
    addTransaction,
    deleteTransactions
}