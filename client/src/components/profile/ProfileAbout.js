import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';



class ProfileAbout extends Component {
    render(){
        const { profile } = this.props;

        // Skill list
        const skills = profile.skills.map((skill, index) => (
            <div key={index} className="p-3">
                <i className="fa fa-check"></i>{skill}
            </div>
        ));

        return(
            <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-light mb-3">
                <h3 className="text-center text-info">{profile.user.firstName}'s Bio</h3>
                <p className="lead">
                  {isEmpty(profile.bio) ? (
                    <span>{profile.user.firstName} does not have a bio</span>
                  ) : (
                    <span>{profile.bio}</span>
                  )}
                </p>
                <hr />
                <h3 className="text-center text-info">Skill Set</h3>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {skills}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default ProfileAbout;