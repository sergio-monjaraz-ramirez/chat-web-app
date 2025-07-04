export default interface Message {
    _id: string;
    type: 'text' | 'video' | 'document' | 'image';
    text: string;
    typeUser: 'User' | 'Client' | 'UserSystem';
    user: string;
    errorCode?: null | string;
    remoteId?: null | string;
    createdAt: string | Date;
    updatedAt: string | Date;
    deliveredAt: string | Date;
    readAt: string;
}
