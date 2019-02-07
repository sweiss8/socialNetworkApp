import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import isEmpty from '../../validation/is-empty'
// import { deleteExperience } from '../../actions/profileActions';


class EventItem extends Component {

    // onDeleteClick(id) {
    //     this.props.deleteExperience(id);
    // }





    render() {
        const { event, auth, switchActions } = this.props;

        // console.log("eventitem", event)

        return (
            <>

            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-12">
                    <h4 className="mb-1">{event.type}</h4>
                    <hr></hr>
                    </div>
                    <div className="col-md-4 col-8 mt-3">
                        <p>
                        Date: <Moment format="MMM Do YYYY">{event.date}</Moment>
                        </p>
                        <p>
                           Team: {isEmpty(event.team) ? null : (<span> {event.team}</span>)}
                        </p>
                        <p>
                            Location: {event.locationorfield}
                        </p>
                        <p>
                            League: {event.league}
                        </p>
                    </div>
                    <div className="col-md-4">

                    </div>
                    <div className="col-md-4 d-none d-md-block  mb-5">
                        <ul className="list-group text-center">

                            <li className="list-group-item">
                                {/* <i className="fa fa-check pr-1" /> */}
                                <span><strong>NET:</strong> 1.78</span>
                            </li>
                            <li className="list-group-item">
                                {/* <i className="fa fa-check pr-1" /> */}
                                <span><strong>EPP:</strong> 2.78</span>
                            </li>
                            <li className="list-group-item">
                                {/* <i className="fa fa-check pr-1" /> */}
                                <span><strong>OPP:</strong> 1.00</span>
                            </li>
                            <li className="list-group-item">
                                {/* <i className="fa fa-check pr-1" /> */}
                                <span><strong>PP:</strong> 100</span>
                            </li>
                        </ul>

                    </div>
                    <div className="col-12"> 
                        {/* <!-- Button trigger modal -->
                        <button type="button" className="btn btn-info" data-toggle="modal" data-target="#matchModal" >

                            View/Add Matches
                         </button> */}

                         {switchActions ? (
                             <Link to={`/event/${event._id}`} className="btn btn-info mr-1 col-md-12 align-center">
                             View/Add Matches
                          </Link>
                         ) : ( 
                            <button type="button" className="btn btn-dark col-md-12 align-center" data-toggle="modal" data-target="#matchModal">
                            <i className="fas fa-calendar-check text-info mr-1"></i>
                                Add Match
                            </button>)}
                    </div>
                    
                </div>

            </div>
            </>
          


        )
    }
}

EventItem.defaultProps = {
    switchActions: true
}

EventItem.propTypes = {
    event: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
})


export default connect(mapStateToProps)(EventItem);