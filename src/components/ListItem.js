
import { Component } from 'react';
import Avatar from '../features/Avatar';

export default class ListItem extends Component {
    constructor(props) {
        super(props);

        // bind this
        this.loadList = this.loadList.bind(this);
        
        BindThis(this, ['loadList']);
    }

    loadList = () => {
        // pass user id to parent
        
        CallParentMethod(this, 'toggleFullScreen', [this.props.list]);
        // this.props.loadList(this.props.user);
    }

    render() {
        return (
            <>
                <div onClick={this.loadList} className={(
                    // if chat has not been read
                    this.props.user.message.is_read === '0'
                        &&
                        // and current user is the receiver
                        (this.props.user.message.receiver.id === JSON.parse(sessionStorage.getItem('user')).id)
                        ? 'bg-gray-300 dark:bg-gray-900 hover:gray-text white-gray-bg-hover light-gray-border'
                        : 'white-gray-bg hover:gray-text white-gray-bg-hover light-gray-border'
                ) + " cursor-pointer  p-2 2xs:p-4  shadow-md "
                }>
                    <Avatar pic={this.props.user.image} contClass="flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center" name={this.props.user.name} />
                    <div className="w-[80px] 3xs:w-[150px] 2xs:w-[250px] xs:w-[350px] sm:w-[520px]">
                        <p className="my-4 md:mt-8 truncate font-normal text-gray-700 dark:text-gray-400">{this.props.user.message.message}</p>
                    </div>
                </div>
            </>
        );
    }
}
