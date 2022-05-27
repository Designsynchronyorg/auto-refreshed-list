
import { Component } from 'react';
import ChatListContent from './ChatListContent';
import ChatListHeader from './ChatListHeader';
import axios from 'axios';
import { MyConfig } from '../../MyConfig';
import { CallParentMethod } from 'des-utilities';

export default class ChatList extends Component {
  constructor(props) {
    super(props);

    // set states
    this.state = {
      fullScreen: false,
      hideList: false,
      chatList: {},
    };

    // get chat list
    let formUrl = MyConfig.apiUrl + 'get-users-chatted-with';
    let self = this;
    const token = sessionStorage.getItem('token');
    axios.get(formUrl, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(function (response) {
        // add that to the state
        if (response.data.data.users.length > 0) {
          self.setState({
            chatList: response.data.data
          })
        }

        // alert(response);
      })
      .catch(function (error) {
        // console.log(error);
      });

    // bind this
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.toggleListDisplay = this.toggleListDisplay.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.loadChat = this.loadChat.bind(this);

    // fetch chat list
    this.refreshList();
  }

  // set interval
  componentDidMount() {
    this.refreshListInterval = setInterval(
      () => this.refreshList(),
      5000
    );
  }

  // clear interval
  componentWillUnmount() {
    clearInterval(this.refreshListInterval);
  }

  // toggle list display
  toggleListDisplay = () => {
    this.setState(function (state, props) {
      return {
        hideList: !state.hideList
      }
    })
  }

  // load chats
  loadChat = (user) => {
    // pass user user to parent
    this.props.loadChat(user);
  }

  // toggle fullscreen
  toggleFullScreen = () => {
    // call parent
    CallParentMethod(this, 'toggleFullScreen');
  }

  // refresh chat list
  refreshList = () => {
    // get chat list
    let formUrl = MyConfig.apiUrl + 'get-users-chatted-with';
    let self = this;
    const token = sessionStorage.getItem('token');
    axios.get(formUrl, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(function (response) {
        // add that to the state if response is not empty
        if (response.data.data.users.length > 0) {
          self.setState({
            chatList: response.data.data
          })
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  render() {
    return (
      // if chat list is not hidden and user has chat list, then set the height to the screen height
      <div className={(!this.state.hideList && Object.keys(this.state.chatList).length > 0 && 'h-screen ') + "flex flex-col w-full white-gray-bg"}>
        {/* chat list header */}
        <ChatListHeader toggleFullScreen={this.toggleFullScreen} chatBoxIsHidden={this.props.chatBoxIsHidden} toggleListDisplay={this.toggleListDisplay} hideList={this.state.hideList} />

        {/* chat list content */}
        {/* check if there are messages */}
        {
          Object.keys(this.state.chatList).length < 1
            ? (
              <div className={this.state.hideList ? 'hidden' : "py-3 px-2 text-center darker-white-gray-bg gray-border"}><p>You do not have any message at the moment.</p></div>
            )
            : (
              <div className={this.state.hideList ? 'hidden' : "overflow-x-clip overflow-y-auto"}>
                <ChatListContent chatList={this.state.chatList} loadChat={this.loadChat} />
              </div>
            )
        }
      </div>
    );
  }
}
