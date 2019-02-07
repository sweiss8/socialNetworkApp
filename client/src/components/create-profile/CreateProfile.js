import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile } from '../../actions/profileActions';


class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            team: '',
            website: '',
            location: '',
            division: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            // Get errors from redux state and put them into the component state
            errors: {}

        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    onSubmit = event => {
        event.preventDefault();
        const profileData = {
            handle: this.state.handle,
            team: this.state.team,
            website: this.state.website,
            location: this.state.location,
            division: this.state.division,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram

        }
        // Whenever we call a redux action it is in the props
        //this.props.history redirects if it is used with the router from react-router-dom. component exported at bottom is wrapped in withRouter function
        this.props.createProfile(profileData, this.props.history)
    }



    render() {
        const { errors, displaySocialInputs } = this.state;

        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}

                    />
                    <InputGroup
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}

                    />
                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}

                    />
                    <InputGroup
                        placeholder="Instagram Profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}

                    />
                    <InputGroup
                        placeholder="YouTube Profile URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}

                    />

                </div>
            )
        }


        // Select options for "Status" field
        const options = [
            { label: '* Divison', value: 0 },
            { label: 'Pro', value: 'Pro' },
            { label: 'Divison 1', value: 'Divison 1' },
            { label: 'Division 2', value: 'Division 2' },
            { label: 'Division 3 ', value: 'Division3' },
            { label: 'Division 4', value: 'Division 4' },
            { label: 'Division 5', value: 'Division 5' },
            { label: 'Beginner', value: 'Beginner' },

        ];
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center text-muted">Let's get some information to make your profile stand out</p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. For example, your full name, company name, nickname, etc. "
                                />

                                <TextFieldGroup
                                    placeholder="Team"
                                    name="team"
                                    value={this.state.team}
                                    onChange={this.onChange}
                                    error={errors.team}
                                    info="Your current team (if any)"
                                />

                                <SelectListGroup
                                    name="division"
                                    value={this.state.division}
                                    onChange={this.onChange}
                                    options={options}
                                    error={errors.division}
                                // info="Give us an idea of where you are at in your career"
                                />
                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Your own company or current employer "
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="City or city & state suggested (e.g. Denver, CO)"
                                />


                                <TextAreaFieldGroup
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
                                />

                                <div className="mb-3">
                                    <button
                                        type="button"
                                        className="btn btn-light" onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }))
                                        }}>
                                        Add Social Network Links
                                </button>

                                    <span className="text-muted"> Optional</span>

                                </div>
                                {socialInputs}

                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />



                            </form>

                        </div>
                    </div>
                </div>
            </div>

        )


    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));