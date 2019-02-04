import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import profileReducer from '../../reducers/profileReducer';
import {deleteComment} from '../../actions/postActions';


class CommentItem extends Component {

   

    onDeleteClick(postId, commentId){
       this.props.deleteComment(postId, commentId);
    }

    onLikeClick(id){
        this.props.addLike(id);
    }

    onUnlikeClick(id){
        this.props.removeLike(id);
    }

    findUserLike(likes) {
        const {auth} = this.props;
        if(likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { comment, postId, auth } = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img className="rounded-circle d-none d-md-block" src={comment.avatar}
                                alt="" />
                        </a>
                        <br />
                        <p className="text-center">{comment.firstName}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{comment.text}</p>       
                         {comment.user === auth.user.id ? (
                            <button 
                                onClick={this.onDeleteClick.bind(this, postId, comment._id)} className="btn btn-danger mr-1" type="button">
                            <i className="fas fa-times"/>
                         </button>) : null}

                    </div>
                </div>
            </div>
        )
    }
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteComment})(CommentItem);