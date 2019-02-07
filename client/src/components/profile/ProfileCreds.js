import React, {Component} from 'react';
import Moment from 'react-moment';
import Experience from '../dashboard/Experience';



class ProfileCreds extends Component {
    render(){

        const {experience, education} = this.props;

        const expItems = experience.map(exp =>(
            <li key={exp._id} className="list-group-item">
                <h4>{exp.team}</h4>
                <p>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to === null ? (' Present') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
                </p>
                <p>
                    <strong>Team:</strong>
                    {exp.title}
                </p>
                <p>
                    {exp.location === '' ? null : (<span><strong>Location/Home Field: </strong>{exp.location}</span>)}
                </p>

             </li>
        ));

        return(

            <div className="row">
            <div className="col-md-6">
                <h3 className="text-center text-info">Teams</h3>
                {expItems.length > 0 ? (
                    <ul className="list-group">{expItems}</ul>
                ) : (
                    <p className="text-center">No Teams Listed</p>
                )}
            </div>
            </div>
        )
    }
}

export default ProfileCreds;