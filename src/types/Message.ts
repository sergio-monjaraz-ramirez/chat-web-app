export default interface Message {
    _id: string;
    type: 'text';
    text: string;
    typeUser: 'User' | 'Client' | 'UserSystem';
    user: string;
    errorCode?: null | string;
    remoteId?: null | string;
    createdAt: string;
    updatedAt: string;
    deliveredAt: string;
    readAt: string;
}
