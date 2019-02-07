import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteExperience} from '../../actions/profileActions';


class Experience extends Component {

onDeleteClick(id) {
    this.props.deleteExperience(id);
}


    render() {
        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.team}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to === null ? ('Present') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>) }
                </td>
                <td><button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn btn-danger">Delete</button></td>
                
            </tr>
        ))
        return (
            <div >
                <h4 className="mb-2">Teams</h4>
                <table className="table">
                <tbody>
                    <tr>
                        <th>Team</th>
                        <th>Dates</th>
                        <th></th>
                    </tr>
                    
                        {experience}
                    </tbody>
                </table>
            </div>

            
        )
    }
}

Experience.propTypes ={
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, {deleteExperience})(Experience);