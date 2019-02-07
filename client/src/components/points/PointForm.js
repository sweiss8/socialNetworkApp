import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextAreaFieldGroup';
import { addPoint } from '../../actions/eventActions';

class PointForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: "",
            e1: "",
            e2: "",
            e3: "",
            e4: "",
            e5: "",
            eob: "",
            eib: "",
            eom: "",
            ebkr: "",
            h1: "",
            h2: "",
            h3: "",
            h4: "",
            h5: "",
            hob: "",
            hib: "",
            hom: "",
            hbkr: "",
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
        const { matchId } = this.props;

        const pointData = {
            result: this.state.result,
            e1: this.state.e1,
            e2: this.state.e2,
            e3: this.state.e3,
            e4: this.state.e4,
            e5: this.state.e5,
            eob: this.state.eob,
            eib: this.state.eib,
            eom: this.state.eom,
            ebkr: this.state.ebkr,
            h1: this.state.h1,
            h2: this.state.h2,
            h3: this.state.h3,
            h4: this.state.h4,
            h5: this.state.h5,
            hob: this.state.hob,
            hib: this.state.hib,
            hom: this.state.hom,
            hbkr: this.state.hbkr,
            errors: {}
        };

        this.props.addPoint(matchId, pointData);

    }

    onChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }



    render() {

        const { errors } = this.state;

        return (

            <form onSubmit={this.onSubmit}>

                {/* Result */}

                <TextFieldGroup
                    placeholder="Result"
                    name="result"
                    value={this.state.result}
                    onChange={this.onChange}
                    error={errors.result}
                />

                {/* Eliminations */}
                <TextFieldGroup
                    placeholder="E1"
                    name="e1"
                    value={this.state.e1}
                    onChange={this.onChange}
                    error={errors.e1}
                />
                <TextFieldGroup
                    placeholder="e2"
                    name="e2"
                    value={this.state.e2}
                    onChange={this.onChange}
                    error={errors.e2}
                />
                <TextFieldGroup
                    placeholder="e3"
                    name="e3"
                    value={this.state.e3}
                    onChange={this.onChange}
                    error={errors.e3}
                />
                <TextFieldGroup
                    placeholder="e4"
                    name="e4"
                    value={this.state.e4}
                    onChange={this.onChange}
                    error={errors.e4}
                />
                <TextFieldGroup
                    placeholder="e5"
                    name="e5"
                    value={this.state.e5}
                    onChange={this.onChange}
                    error={errors.e5}
                />
                <TextFieldGroup
                    placeholder="eob"
                    name="eob"
                    value={this.state.eob}
                    onChange={this.onChange}
                    error={errors.eob}
                />
                <TextFieldGroup
                    placeholder="eib"
                    name="eib"
                    value={this.state.eib}
                    onChange={this.onChange}
                    error={errors.eib}
                />
                <TextFieldGroup
                    placeholder="eom"
                    name="eom"
                    value={this.state.eom}
                    onChange={this.onChange}
                    error={errors.eom}
                />
                <TextFieldGroup
                    placeholder="ebkr"
                    name="ebkr"
                    value={this.state.ebkr}
                    onChange={this.onChange}
                    error={errors.ebkr}
                />

                {/* Hit */}

                <TextFieldGroup
                    placeholder="h1"
                    name="h1"
                    value={this.state.h1}
                    onChange={this.onChange}
                    error={errors.h1}
                />
                <TextFieldGroup
                    placeholder="h2"
                    name="h2"
                    value={this.state.h2}
                    onChange={this.onChange}
                    error={errors.h2}
                />
                <TextFieldGroup
                    placeholder="h3"
                    name="h3"
                    value={this.state.h3}
                    onChange={this.onChange}
                    error={errors.h3}
                />
                <TextFieldGroup
                    placeholder="h4"
                    name="h4"
                    value={this.state.h4}
                    onChange={this.onChange}
                    error={errors.h4}
                />
                <TextFieldGroup
                    placeholder="h5"
                    name="h5"
                    value={this.state.h5}
                    onChange={this.onChange}
                    error={errors.h5}
                />
                <TextFieldGroup
                    placeholder="hob"
                    name="hob"
                    value={this.state.hob}
                    onChange={this.onChange}
                    error={errors.hob}
                />
                <TextFieldGroup
                    placeholder="hib"
                    name="hib"
                    value={this.state.hib}
                    onChange={this.onChange}
                    error={errors.hib}
                />
                <TextFieldGroup
                    placeholder="hom"
                    name="hom"
                    value={this.state.hom}
                    onChange={this.onChange}
                    error={errors.hom}
                />
                <TextFieldGroup
                    placeholder="hbkr"
                    name="hbkr"
                    value={this.state.hbkr}
                    onChange={this.onChange}
                    error={errors.hbkr}
                />

                <input type="submit"
                    value="Submit"
                    className="btn btn-dark" />



            </form>



        )
    }
}

PointForm.propTypes = {
    addPoint: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    matchId: PropTypes.string.isRequired
    // errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { addPoint })(PointForm);