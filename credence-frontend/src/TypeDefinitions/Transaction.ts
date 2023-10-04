export type TTransaction = {
    title:string,
    price:number,
    transactionId:number,
    userId:number,
    description:string,
    createdOn:string,
    addedOn:string,
    category:string,
    roomId:string|null,
    groupId:string|null
}