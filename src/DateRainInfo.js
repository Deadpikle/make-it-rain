import React from 'react';

export default class DateRainInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <li>{this.props.date.toLocaleString()}: [Rain: {this.props.rains ? 'YES' : 'NO'}] [Snow: {this.props.snows ? 'YES' : 'NO'}]</li>
    }
}
