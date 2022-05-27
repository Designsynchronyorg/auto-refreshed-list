import { Component } from 'react';
import { UpDownToggle } from './UpDownToggle';
import SvgIcon from 'des-svg-icons';
import { BindThis } from 'des-utilities';
import { CallParentMethod } from 'des-utilities';

export default class Header extends Component {
    constructor(props) {
        super(props);

        // bind this
        BindThis(this, ['toggleFullScreen', 'toggleListDisplay']);
    }

    // toggle fullscreen
    toggleFullScreen = () => {
        // call parent
        CallParentMethod(this, 'toggleFullScreen');
    }

    // toggle list display
    toggleListDisplay = () => {
        CallParentMethod(this, 'toggleListDisplay');
    }

    render() {
        return (
            <>
                <div className="py-6 px-5 bg-gray-100 border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col 2xs:flex-row items-center space-x-3 space-y-4 2xs:space-y-0 justify-center xs:justify-between flex-wrap">
                    <div className="flex items-center space-x-2 space-y-3 2xs:space-y-0 flex-wrap justify-center">
                        <h3 className="text-xl gray-text">Conversation</h3>
                        {/* <UnreadMessagesCount /> */}
                    </div>
                    <div className="flex space-y-0 flex-row items-center space-x-6 xs:space-x-3 flex-wrap justify-center">
                        <div className="cursor-pointer">
                            <svg className="h-5 text-gray-400 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                        {
                            this.props.shouldDisplay &&
                            <div className="cursor-pointer" onClick={this.toggleListDisplay}>
                                <UpDownToggle showUp={this.props.hideList} />
                            </div>
                        }

                        <div className="w-5 cursor-pointer light-text" onClick={this.toggleFullScreen}>
                            {
                                this.props.fullScreen ? <SvgIcon type="shrink" /> : <SvgIcon type="expand" />
                            }
                        </div>
                    </div>
                </div>

            </>
        );
    }
}
