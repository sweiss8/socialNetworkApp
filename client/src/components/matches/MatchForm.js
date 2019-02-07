import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextAreaFieldGroup';
import { addMatch } from '../../actions/eventActions';

class MatchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            opponent: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors })
        }
    }

    onSubmit(event) {
        event.preventDefault();

        //need user so we know who submitted the post
        const { user } = this.props.auth;
        const { eventId } = this.props;

        const matchData = {
            date: this.state.date,
            opponent: this.state.opponent
        };

        this.props.addMatch(eventId, matchData);

    }

    onChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }



    render() {

        const { errors } = this.state;

        return (

                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextFieldGroup
                                    placeholder="* Date"
                                    name="date"
                                    type="date"
                                    value={this.state.date}
                                    onChange={this.onChange}
                                    error={errors.date}
                                />
                                <TextFieldGroup
                                    placeholder="Opponent"
                                    name="opponent"
                                    value={this.state.opponent}
                                    onChange={this.onChange}
                                    error={errors.opponent}
                                />


                            </div>
                            <input type="submit" 
                            value="Submit"
                            className="btn btn-dark"/>
                        </form>

        )
    }
}

MatchForm.propTypes = {
    addMatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    eventId: PropTypes.string.isRequired
    // errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { addMatch })(MatchForm);