import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import {deleteMatch} from '../../actions/profileActions';


class PointItem extends Component {



    // onDeleteClick(eventId, matchId){
    //    this.props.deleteMatch(eventId, matchId);
    // }



    render() {
        const { point, matchId, auth } = this.props;
        return (

                <tbody >
                    <tr>
                        <th scope="row">1</th>
                        <td>{point.result}</td>
                        <td>{point.netrtg}</td>
                        <td>{point.tote}</td>
                        <td>{point.e1}</td>
                        <td>{point.e2}</td>
                        <td>{point.e3}</td>
                        <td>{point.e4}</td>
                        <td>{point.e5}</td>
                        <td>{point.eob}</td>
                        <td>{point.eib}</td>
                        <td>{point.eom}</td>
                        <td>{point.ebkr}</td>
                        <td>{point.toth}</td>
                        <td>{point.h1}</td>
                        <td>{point.h2}</td>
                        <td>{point.h3}</td>
                        <td>{point.h4}</td>
                        <td>{point.h5}</td>
                        <td>{point.hob}</td>
                        <td>{point.hib}</td>
                        <td>{point.hom}</td>
                        <td>{point.hbkr}</td>

                    </tr>

                </tbody>


        )
    }
}

PointItem.propTypes = {
    // deleteMatch: PropTypes.func.isRequired,
    point: PropTypes.object.isRequired,
    matchId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PointItem);