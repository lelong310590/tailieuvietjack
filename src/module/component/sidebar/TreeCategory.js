import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as action from './../../action/Index';
import {Link} from 'react-router-dom';
import _ from 'lodash';

class TreeCategory extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tree: [],
		}
	};

	componentDidMount = () => {
		this.props.getTree(this.props.currentCat);
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.TreeReducer.tree !==  nextProps.TreeReducer.tree) {
			this.setState({
				tree: nextProps.TreeReducer.tree
			})
		}

		if (this.props.SubjectReducer.subjectInClass !== nextProps.SubjectReducer.subjectInClass) {
			this.props.getTree(nextProps.SubjectReducer.subjectInClass.id);
		}

		return true;
	};

	toogleExpanse = (item , parent = null) => {
		let {tree} = this.state;
		let index = _.findIndex(tree, function (i) {
			return i.link === item.link
		});

		if (index >= 0) {
			tree[index].expanse = !tree[index].expanse;
			this.setState({tree});
		}
		
		if (parent !== null) {
			let parentIdx = _.findIndex(tree, function (idx) {
				return idx.link === parent.link
			});

			if (parentIdx >= 0) {
				let childrenList = tree[parentIdx].children;

				let childrenIdx = _.findIndex(childrenList, function (c) {
					return c.link === item.link;
				});

				if (childrenIdx >= 0) {
					tree[parentIdx].children[childrenIdx].expanse = !tree[parentIdx].children[childrenIdx].expanse;
					this.setState({tree});
				}
			}
		}
	};

	render() {

		let {tree} = this.state;

		return (
			<div className="widget filter-box-wrapper">
				<div className="widget-title"><h4 className="text-center">Danh mục</h4></div>
				<div className="widget-content">
					<div className="tree-widget-wrapper">
						<div className="tree-folder">
							{_.map(tree, (t, idx) => {
								return (
									<Fragment key={idx}>
										<div className="tree-folder-item">
											<div className="tree-folder-item-expand-button" onClick={() => this.toogleExpanse(t)}>
												{!_.isEmpty(t.children) &&
													<Fragment>
														{!t.expanse ? (
															<i className="fas fa-plus"></i>
														) : (
															<i className="fas fa-minus"></i>
														)}
													</Fragment>
												}
											</div>
											<Link to={'/cat/' + t.slug} className="tree-folder-item-content">
												<div className="tree-folder-item-icon">
													<i className="fas fa-graduation-cap"></i>
												</div>
												<div className="tree-folder-item-name">
													{t.text}
												</div>
											</Link>
										</div>

										{t.expanse &&
											<Fragment>
												{_.map(t.children, (tr, index) => {
													return (
														<div className="tree-folder" key={index}>
															<div className="tree-folder-item">
																<div className="tree-folder-item-expand-button" onClick={() => this.toogleExpanse(tr, t)}>
																	{!_.isEmpty(tr.children) &&
																		<Fragment>
																			{!tr.expanse ? (
																				<i className="fas fa-plus"></i>
																			) : (
																				<i className="fas fa-minus"></i>
																			)}
																		</Fragment>
																	}
																</div>
																<Link to={'/cat/' + t.slug + '/' + tr.slug} className="tree-folder-item-content">
																	<div className="tree-folder-item-icon">
																		<i className="far fa-folder"></i>
																	</div>
																	<div className="tree-folder-item-name">
																		{tr.text}
																	</div>
																</Link>
															</div>

															{tr.expanse &&
																<Fragment>
																	{_.map(tr.children, (child, i) => {
																		return (
																			<div className="tree-folder" key={i}>
																				<div className="tree-folder-item">
																					<div className="tree-folder-item-expand-button">
																					</div>
																					<Link to={'/'} className="tree-folder-item-content">
																						<div className="tree-folder-item-icon">
																							<i className="far fa-file-alt"></i>
																						</div>
																						<div className="tree-folder-item-name">
																							{child.text}
																						</div>
																					</Link>
																				</div>
																			</div>
																		)
																	})}
																</Fragment>
															}
														</div>
													)
												})}
											</Fragment>
										}
									</Fragment>
								)
							})}

						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		getTree: (cat = null, subject = null) => {
			dispatch(action.getTree(cat, subject));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (TreeCategory);