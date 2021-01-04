import React from 'react';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {query: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({query: e.target.value});
    }

    handleSubmit(e) {
        if (this.props.onSearchQueryChanged) {
            this.props.onSearchQueryChanged(this.state.query);  
        }
    }

    render() {
        return (
            <>
                <h4>Search here for your zip code or location or whatnot</h4>
                <input value={this.state.query} onChange={this.handleChange}></input>
                <button type="submit" onClick={this.handleSubmit}>Submit</button>
            </>
        );
    }
}
