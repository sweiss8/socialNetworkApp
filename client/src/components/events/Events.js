import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EventFeed from './EventFeed';
import Spinner from '../common/Spinner';
import {getEvents} from '../../actions/eventActions';

class Events extends Component {

componentDidMount(){
    this.props.getEvents();
}


    render() {

        const { events, loading} = this.props.event;

        let eventContent;

        if(events === null || loading) {
            eventContent = <Spinner/>
        } else {
            eventContent = <EventFeed events={events}/>
        }
        return (
            <div className="feed">
               

                        <h4 className="mb-2">Events</h4>
                            <hr/>
                        {eventContent}
 


    

            </div>
        )
    }
}

Events.propTypes = {
    getEvents: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    event: state.event
})

export default connect(mapStateToProps, {getEvents})(Events);