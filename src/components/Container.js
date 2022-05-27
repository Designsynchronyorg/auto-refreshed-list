
import { Component } from 'react';
import List from './List';
import Header from './Header';
import axios from 'axios';
import { CallParentMethod, BindThis } from 'des-utilities';
import { HttpRequest } from 'des-http-processor';

export default class Container extends Component {
  constructor(props) {
    super(props);

    // set states
    this.state = {
      fullScreen: false,
      hideList: false,
      list: {},
    };

    // get list
    let formUrl = this.props.url;
    let self = this;
    const token = sessionStorage.getItem('token');
    HttpRequest()
    // axios.get(formUrl, {
    //   headers: { "Authorization": `Bearer ${token}` }
    // })

      .then(function (response) {
        // add that to the state
        if (response.data.data.users.length > 0) {
          self.setState({
            list: response.data.data
          })
        }

        // alert(response);
      })
      .catch(function (error) {
        // console.log(error);
      });

    // bind this
    BindThis(this, ['toggleFullScreen','toggleListDisplay','refreshList','loadList']);

    // fetch list
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

  // load list
  loadList = (user) => {
    // pass user user to parent
    this.props.loadList(user);
  }

  // toggle fullscreen
  toggleFullScreen = () => {
    // call parent
    CallParentMethod(this, 'toggleFullScreen');
  }

  // refresh list
  refreshList = () => {
    // get list
    let formUrl = this.props.url;
    let self = this;
    const token = sessionStorage.getItem('token');
    axios.get(formUrl, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(function (response) {
        // add that to the state if response is not empty
        if (response.data.data.users.length > 0) {
          self.setState({
            list: response.data.data
          })
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  render() {
    const emptyMessage 
    return (
      // if list is not hidden and user has list, then set the height to the screen height
      <div className={(!this.state.hideList && Object.keys(this.state.list).length > 0 && 'h-screen ') + "flex flex-col w-full white-gray-bg"}>
        {/* list header */}
        <Header toggleFullScreen={this.toggleFullScreen} listIsHidden={this.props.listBoxIsHidden} toggleListDisplay={this.toggleListDisplay} hideList={this.state.hideList} />

        {/* list content */}
        {/* check if there are messages */}
        {
          Object.keys(this.state.list).length < 1
            ? (
              <div className={this.state.hideList ? 'hidden' : "py-3 px-2 text-center darker-white-gray-bg gray-border"}><p></p></div>
            )
            : (
              <div className={this.state.hideList ? 'hidden' : "overflow-x-clip overflow-y-auto"}>
                <List list={this.state.list} loadList={this.loadList} />
              </div>
            )
        }
      </div>
    );
  }
}
