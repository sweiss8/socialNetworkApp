import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MatchItem from './MatchItem';

class MatchFeed extends Component {
    render(){
        const {matches, eventId} = this.props;
        
        return matches.map(match => <MatchItem key={match._id} match={match} eventId={eventId}/> )

    }
}

MatchFeed.propTypes = {
    matches: PropTypes.array.isRequired,
    eventId: PropTypes.string.isRequired
}

export default MatchFeed;