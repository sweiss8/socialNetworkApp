
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { addEvent } from '../../actions/eventActions';
import SelectListGroup from '../common/SelectListGroup';


class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            team: '',
            type: '',
            locationorfield: '',
            format: '',
            division: '',
            league: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);



    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onSubmit(event) {
        event.preventDefault();

        const eventData = {
            date: this.state.date,
            team: this.state.team,
            type: this.state.type,
            locationorfield: this.state.locationorfield,
            format: this.state.format,
            division: this.state.division,
            league: this.state.league
        }

        this.props.addEvent(eventData, this.props.history);

    }

    onChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }




    render() {
        const { errors } = this.state;

        const typeOptions = [
            { label: '* Select type', value: 0 },
            { label: 'Tournament', value: 'Tournament' },
            { label: 'Practice', value: 'Practice' },
            { label: 'Other', value: 'Other' }
        ];

        const divOptions = [
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
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Date"
                                    name="date"
                                    type="date"
                                    value={this.state.date}
                                    onChange={this.onChange}
                                    error={errors.date}
                                />
                                 <SelectListGroup
                                    name="type"
                                    value={this.state.type}
                                    onChange={this.onChange}
                                    options={typeOptions}
                                    error={errors.type}
                                    // info="Give us an idea of where you are at in your career"
                                />
                                                                 <SelectListGroup
                                    // placeholder="Status"
                                    name="division"
                                    value={this.state.division}
                                    onChange={this.onChange}
                                    options={divOptions}
                                    error={errors.division}
                                    info="What is the average division of your opponents today?"
                                />
                                <TextFieldGroup
                                    placeholder="Team"
                                    name="team"
                                    value={this.state.team}
                                    onChange={this.onChange}
                                    error={errors.team}
                                />


                                <TextFieldGroup placeholder="* Location or Field"
                                    name="locationorfield"
                                    value={this.state.locationorfield}
                                    onChange={this.onChange}
                                    error={errors.locationorfield}
                                />
                                <TextFieldGroup
                                    placeholder="Format"
                                    name="format"
                                    value={this.state.format}
                                    onChange={this.onChange}
                                    error={errors.format}
                                />


                                <TextFieldGroup
                                    placeholder="League"
                                    name="league"
                                    value={this.state.league}
                                    onChange={this.onChange}
                                    error={errors.league}
                                />
                                
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>


                            </form>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

AddEvent.propTypes = {
    addEvent: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, {addEvent})(withRouter(AddEvent));