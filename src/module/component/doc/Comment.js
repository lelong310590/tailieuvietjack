import React, {Component, Fragment} from 'react';
import * as action from "../../action/Index";
import {connect} from 'react-redux';
import axios from "axios";
import * as api from "../../const/Api";
import _ from 'lodash';

class Comment extends Component{

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            newcomment:'',
            id:0,
            newreply:'',
            total_comment:0
        }
    }

    componentDidMount = () => {

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        if(this.props.doc_id!==nextProps.doc_id){
            this.fetchData(nextProps.doc_id);
            this.setState({id:nextProps.doc_id});
        }

        return true;
    }

    handleReply = (e, idx, value) => {
        let {comments} = this.state;
        comments[idx].reply = !value;
        this.setState({comments})
    }

    fetchData = (doc_id) => {
        axios.get(api.API_GET_COMMENT_LIST,{params:{doc_id}})
            .then(response => {
                this.setState({
                    comments: response.data,
                    total_comment: _.size(response.data)
                })
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                this.setState({pageLoadDone: true})
            })
    };

    postComment = (e)=>{
        e.preventDefault();
        if(!this.props.AuthReducer.loggedIn){
            this.props.requiredLogin();
            return;
        }
        let config = {
            headers: {'Content-Type': 'multipart/form-data' }
        };
        let {newcomment,id} = this.state;
        let formData = new FormData();
        formData.append('doc_id',id);
        formData.append('user_id',this.props.UserReducer.id);
        formData.append('content',newcomment);
        formData.append('parent','');
        axios.post(api.API_POST_COMMENT,formData,config)
            .then(response => {
                alert('Gửi bình luận thành công. Vui lòng chờ ban quản trị duyệt bình luận!');
                this.setState({newcomment:''});
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                this.setState({pageLoadDone: true})
            })
    }

    typeComment = (e) => {
        let newcomment = e.target.value;
        this.setState({newcomment})
    }

    typeReply = (e) => {
        let newreply = e.target.value;
        this.setState({newreply})
    }

    postReply = (e,parent)=>{
        e.preventDefault();
        if(!this.props.AuthReducer.loggedIn){
            this.props.requiredLogin();
            return;
        }
        let config = {
            headers: {'Content-Type': 'multipart/form-data' }
        };
        let {newreply,id} = this.state;
        let formData = new FormData();
        formData.append('doc_id',id);
        formData.append('user_id',this.props.UserReducer.id);
        formData.append('content',newreply);
        formData.append('parent',parent);
        axios.post(api.API_POST_COMMENT,formData,config)
            .then(response => {
                alert('Gửi câu trả lời thành công. Vui lòng chờ ban quản trị duyệt bình luận!');
                this.setState({newreply:''});
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                this.setState({pageLoadDone: true})
            })
    }

    clickCommentBox = (e) => {
        this.props.requiredLogin()
    }

    render(){
        let {comments,newcomment,newreply,total_comment} = this.state;

        return(
            <div className="facebook-comment">
                <h4>{total_comment} Comments</h4>
                <form onSubmit={this.postComment}>
                    <div className="form-group">
                        <textarea rows="5" value={newcomment} onClick={this.clickCommentBox} onChange={this.typeComment} placeholder="Thêm bình luận" className="form-control" />
                    </div>
                    <div className="form-group">
                        <button className="btn-submit" type="submit" className="btn vj-btn">Gửi</button>
                    </div>
                </form>
                <div className="comment-list">
                    { _.map(comments,(value,index)=>{
                        return (
                            <div className="comment-item" key={index}>
                                <div className="comment-item-parent">
                                    <div className="parent-left">
                                        {_.isEmpty(value.get_user.thumbnail) ? (
                                            <img src="/lib/images/thumbnail.jpg" alt="" className="img-responsive center-block"/>
                                        ) : (
                                            <img src={value.get_user.thumbnail} alt="" className="img-responsive center-block"/>
                                        )}
                                        <p>{value.get_user.first_name}</p>
                                    </div>
                                    <div className="parent-right">
                                        <p>{value.content}</p>
                                        <span>{value.created_at}</span>
                                        <a onClick={(e) => this.handleReply(e, index, value.reply)}>Reply</a>
                                        {value.reply === true &&
                                            <Fragment>
                                                <form onSubmit={(e)=>this.postReply(e,value.id)}>
                                                    <textarea onClick={this.clickCommentBox} value={newreply} onChange={this.typeReply} />
                                                    <button type="submit" className="btn vj-btn">Gửi</button>
                                                </form>
                                            </Fragment>
                                        }
                                    </div>
                                </div>
                                {value.children.length>0 &&
                                    <Fragment>
                                        {_.map(value.children, (c, idx) => {
                                            return (
                                                <div className="comment-item-child" key={idx}>
                                                    <div className="comment-child">
                                                        <div className="child-left">
                                                            {_.isEmpty(c.get_user.thumbnail) ? (
                                                                <img src="/lib/images/thumbnail.jpg" alt="" className="img-responsive center-block"/>
                                                            ) : (
                                                                <img src={c.get_user.thumbnail} alt="" className="img-responsive center-block"/>
                                                            )}
                                                            <p>{c.get_user.first_name}</p>
                                                        </div>
                                                        <div className="child-right">
                                                            <p>{c.content}</p>
                                                            <span>{c.created_at}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </Fragment>
                                }
                            </div>
                        )
                    })}

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCommentList: (doc_id) => {
            dispatch(action.getCommentList(doc_id));
        },

    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Comment);