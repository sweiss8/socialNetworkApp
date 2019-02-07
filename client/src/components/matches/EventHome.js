import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getEvent } from '../../actions/eventActions';
import EventItem from '../events/EventItem';

import MatchForm from './MatchForm';
import MatchFeed from './MatchFeed';

class EventHome extends Component {

    componentDidMount() {
        this.props.getEvent(this.props.match.params.id);
   
        // console.log("props", this.props)

    }
    render() {

        const { event, loading } = this.props.event;

        let eventContent;


        if (event === null || loading || Object.keys(event).length === 0) {
            eventContent = <Spinner />
        } else {
            eventContent = (
                <div>
                    <EventItem event={event} switchActions={false} />
                    <MatchFeed eventId={event._id} matches={event.matches} />
                    {/* < !-- Match Modal --> */}
                    <div className="modal fade" id="matchModal" tabIndex="-1" role="dialog" aria-labelledby="matchModal" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="matchModal">Add a Match</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <MatchForm eventId={event._id} />
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            )
        }


        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/dashboard" className="btn btn-light mb-3">Back to Dashboard</Link>
                            {eventContent}
                        </div>
                    </div>

                </div>

            </div>


        )
    }
}

EventHome.propTypes = {
    getEvent: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    event: state.event,
    matches: state.event.matches
})


export default connect(mapStateToProps, {getEvent})(EventHome);