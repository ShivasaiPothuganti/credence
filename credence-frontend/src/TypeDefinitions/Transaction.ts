export type TTransaction = {
    title:string,
    price:number,
    transactionId:number,
    userId:number,
    description:string,
    createdOn:string,
    dateOfTransaction:string,
    category:string,
    roomId:string|null,
    groupId:string|null,
    username?:string
}