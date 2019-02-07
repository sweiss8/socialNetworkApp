import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PointItem from './PointItem';

class PointTable extends Component {
    render(){
        
        const {points, matchId} = this.props;

        return points.map(point => <PointItem key={point._id} point={point} matchId={matchId} />)
    }
}

PointTable.propTypes = {
    points: PropTypes.array.isRequired,
    matchId: PropTypes.string.isRequired
}

export default PointTable;