import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import  TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';


class AddExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: '',
            from: '',
            to: '',
            current: false,
            errors: {},
            disabled: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);



    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onSubmit(event) {
        event.preventDefault();
        
        const expData ={
            team: this.state.team,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
        }

        this.props.addExperience(expData, this.props.history);

    }

    onChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    onCheck(event) {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }



    render() {
        const { errors } = this.state;

        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
            </Link>
                            <h1 className="display-4 text-center">Add Team</h1>
                            <p className="lead text-center">Add any current or previous teams you've played on</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Team Name"
                                    name="team"
                                    value={this.state.team}
                                    onChange={this.onChange}
                                    error={errors.team}
                                />

                                <h6>From Date</h6>
                                <TextFieldGroup
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                />
                                <h6>To Date</h6>
                                <TextFieldGroup
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                />
                                <div className="form-check mb-4">
                                    <input type="checkbox"
                                    className="form-check-input"
                                    name="current"
                                    value={this.state.current}
                                    checked={this.state.current}
                                    onChange={this.onCheck}
                                    id="current"
                                    />
                                    <label htmlFor="current" className="form-check-label"> 
                                    Current Team
                                    </label>
                                </div>

                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>

                            </form>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience));