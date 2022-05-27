
import { Component } from 'react';
import ListItem from './ListItem';
import {DuplicateItems, CallParentMethod} from 'des-utilities';

export default class List extends Component {
    constructor(props) {
        super(props);

        // bind this
        this.loadList = this.loadList.bind(this);
    }

    // load lists
    loadList = (list) => {
        // pass list details to parent
       CallParentMethod(this, 'loadList');
        // this.props.loadList(list);
    }

    render() {
        return (
            <>
                <DuplicateItems items={this.props.list} structure={ListItem} structureProps={this.props.structureProps} functionProps={this.props.functionProps} />
            </>
        );
    }
}
