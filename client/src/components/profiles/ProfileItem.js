import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
    render() {
        const { profile } = this.props;
        return (
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-2">
                        <img src={profile.user.avatar} alt="" className="rounded-circle" />
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3>{profile.user.firstName} {profile.user.lastName} </h3>
                        <p>
                            {profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}
                        </p>
                        <p>
                            {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
                        </p>
                        <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                            View Profile
                        </Link>
                    </div>
                    <div className="col-md-4 d-none d-md-block">
                        <h4>Stats:</h4>
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
                </div>

            </div>

        )
    }
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem;