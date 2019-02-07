import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';
// import EventItem from '../events/EventItem';
// import AddExperience from '../add-credentials/AddExperience';
import AddEvent from '../add-credentials/AddEvent';
// import EventFeed from '../events/EventFeed';
import Events from '../events/Events';


class Dashboard extends Component {

    componentDidMount() {
        // Adds profile to state when dashboard loads
        this.props.getCurrentProfile();
    }

    onDeleteClick(event) {
        this.props.deleteAccount();

    }

    render() {

        const { user } = this.props.auth;
        // Taking those values when GET_PROFILE is called, which gets called when we enter the dashboard. 
        const { profile, loading } = this.props.profile;

        // const {events} = this.props.profile.profile


        let dashboardContent;

        // profile and loadng coming from profile prop which is coming from profile state in redux. 

        if (profile === null || loading) {

            dashboardContent = <Spinner />

        } else {
            // Check if logged in user has profile datas
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome, <Link to={`/profile/${profile.handle}`}>{user.firstName}</Link>!</p>
                        <ProfileActions />
                        <Experience experience={profile.experience} />
                        {/* <Education education={profile.education} /> */}
                        {/* <EventFeed events={profile.events} /> */}
                        <Events/>



                        <div style={{ marginBottom: '60px' }} />
                        <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this)}> Delete My Account</button>

                    </div>
                )
            } else {
                // User is logged in but has no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome, {user.firstName}!</p>
                        <p className="font-italic">You have not yet set up a profile. </p>
                        <p>Please create a profile to begin.</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">
                            Create Profile
                        </Link>
                    </div>

                );
            }
        }

        return (
            <>
                <div className="dashboard">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="display-4">Dashboard</h1>
                                {dashboardContent}
                            </div>
                        </div>
                    </div>

                    {/* < !-- Event Modal --> */}
                    <div className="modal fade" id="eventModal" tabIndex="-1" role="dialog" aria-labelledby="eventModal" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="eventModal">Add Event</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <AddEvent />

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}



Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    events: state.profile

});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);