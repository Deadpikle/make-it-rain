import React from 'react';
import RainShower from './RainShower';
import SearchBar from './SearchBar';

export default class MakeItRainOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };
        this.onSearchQueryChanged = this.onSearchQueryChanged.bind(this);
    }

    onSearchQueryChanged(queryString) {
        this.setState({
            query: queryString
        });
    }

    render() {
        return (
            <>
                <SearchBar 
                    query={this.state.query}
                    onSearchQueryChanged={this.onSearchQueryChanged} />
                <RainShower query={this.state.query} />
            </>
        )
    }
}
