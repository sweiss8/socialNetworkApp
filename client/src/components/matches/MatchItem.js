import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PointForm from '../points/PointForm';
import PointTable from '../points/PointTable';
// import {deleteMatch} from '../../actions/profileActions';


class MatchItem extends Component {

    constructor(props) {
        super(props);
        this.state = {isToggle: false};
        this.handleClick = this.handleClick.bind(this);
      }
    
      handleClick(e) {
        this.setState({isToggle: !this.state.isToggle});
      }

    // onDeleteClick(eventId, matchId){
    //    this.props.deleteMatch(eventId, matchId);
    // }

    // onUnlikeClick(id){
    //     showPoint.setState({true})
    // }


    render() {
        const { match, eventId, auth, switchActions } = this.props;
        const { _id } = this.props.match;
        console.log("propsItem", this.props.match._id);
        console.log(_id)


    const showPoint = false;





        return (
            <div className="card card-body mb-3">
                        <p className="lead">Opponent: {match.opponent}</p>
                        {/* <div className="row"> */}

                            <div className="d-flex flex-wrap justify-content-space-between align-items-center">
                                {/* {skills} */}
                                <div className="p-3">
                                    <span><strong>Net Rating:</strong> 1.78</span>
                                </div>

                                <div className="p-3">
                                    <span><strong>EPP:</strong> 2.78</span>
                                </div>

                                <div className="p-3">
                                    <span><strong>OPP:</strong> 1.00</span>
                                </div>

                                <div className="p-3">
                                    <span><strong>TOTE:</strong> 278</span>
                                </div>

                                <div className="p-3">
                                    <span><strong>TOTH:</strong> 100</span>
                                </div>

                                <div className="p-3">
                                    <span><strong>PP:</strong> 100</span>
                                </div>

                                {/* <PointTable matchId={_id} points={match.points}/> */}

                                {/* Launch Add Point Modal  */}
                                <div className="float-right">
                                <button type="button" className="btn btn-dark m-5" data-toggle="modal" data-target={`#a${_id}`}>
                                <i class="fas fa-plus text-info mr-1"></i>


                                    Add Point
                            </button>
                            <button type="button" className="btn btn-dark" onClick={this.handleClick}  >
                                    <i class="fas fa-eye text-info mr-1"></i>
                                    View Points
                            </button>
                            {this.state.isToggle ? 
                                (
 
                                 <div classname="table-responsive">

                                
                                <table className="table table-striped mt-4 table-responsive">

                                    <thead>
                                        <tr>
                                            <th scope="col">Point</th>
                                            <th scope="col">Result</th>
                                            <th scope="col">NET</th>
                                            <th scope="col">TOTE</th>
                                            <th scope="col">e1</th>
                                            <th scope="col">e2</th>
                                            <th scope="col">e3</th>
                                            <th scope="col">e4</th>
                                            <th scope="col">e5</th>
                                            <th scope="col">eob</th>
                                            <th scope="col">eib</th>
                                            <th scope="col">eom</th>
                                            <th scope="col">ebkr</th>
                                            <th scope="col">TOTH</th>
                                            <th scope="col">h1</th>
                                            <th scope="col">h2</th>
                                            <th scope="col">h3</th>
                                            <th scope="col">h4</th>
                                            <th scope="col">h5</th>
                                            <th scope="col">hob</th>
                                            <th scope="col">hib</th>
                                            <th scope="col">hom</th>
                                            <th scope="col">hbkr</th>
                                        </tr>
                                    </thead>
                                    <PointTable matchId={_id} points={match.points} />
                                </table>
                                </div>

                                
                                )
                             : null}
                             </div>
                             </div>
                    
                        {/* < !-- Point Modal --> */}
                        <div className="modal fade" id={`a${_id}`} tabIndex="-1" role="dialog" aria-labelledby="pointModal" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id={_id}>Add Point</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <PointForm matchId={_id} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

        )
    }
}




MatchItem.propTypes = {
    // deleteMatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    eventId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(MatchItem);