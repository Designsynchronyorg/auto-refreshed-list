
import { Component } from 'react';
import ChatPreview from './ChatPreview';
import {DuplicateItems} from 'des-utilities';

export default class ChatListContent extends Component {
    constructor(props) {
        super(props);

        // bind this
        this.loadChat = this.loadChat.bind(this);
    }

    // load chats
    loadChat = (user) => {
        // pass user details to parent
        this.props.loadChat(user);
    }

    render() {
        return (
            <>
                <DuplicateItems items={this.props.chatList.users} structure={ChatPreview} structureProps={{ user: 1 }} functionProps={{ loadChat: this.loadChat }} />
            </>
        );
    }
}
