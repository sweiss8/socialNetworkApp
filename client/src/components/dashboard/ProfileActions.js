import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
    return (

        <div className="btn-group mb-4" role="group">
            <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile
            </Link>
            <Link to="/add-experience" className="btn btn-light">
            <i className="fas fa-user-friends text-info mr-1"></i>
                Add Team
            </Link>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-light" data-toggle="modal" data-target="#eventModal">
            <i className="fas fa-calendar-check text-info mr-1"></i>
                Add Event
            </button>
        </div>

    )
}

export default ProfileActions;