import Message from './Message';

export default interface Conversation {
    _id: string;
    type: 'Message';
    client?: string;
    message: Message;
    createdAt: string;
}
