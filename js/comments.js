// 测试browserify是否生效
var generator=require('./generator');
generator.generate();

var CommentBox=React.createClass({

	handleCommentSubmit: function(comment) {


		var comments = this.state.data;
		var newComments = comments.concat([comment]);
		this.setState({data: newComments});
		return false;

	},
	getInitialState: function() {
		return {data:[
			{
				title:'不错，超级满意',
				content:'样子漂亮，买之前还在担心有什么问题，是我多想了，很实用，很好'
			},
			{
				title:'还不错',
				content:'送人的礼物，很满意的购物'
			}
		]};
	},

	render:function(){
		return (
			<div className="commentBox">
				<CommentForm onCommentSubmit={this.handleCommentSubmit}/>
				<h1>iPad mini 3的评论</h1>
				<CommentList data={this.state.data}/>

			</div>
		);
	}
});

var CommentList=React.createClass({
	render:function(){


		var commentNodes=this.props.data.map(
			function(comment){

				return (
					<div>
						<h3>{comment.title}</h3>
						<div>{comment.content}</div>
					</div>
				);
			}
		);

		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

var CommentForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var title = this.refs.title.getDOMNode().value.trim();
		var content = this.refs.content.getDOMNode().value.trim();
		if (!title || !content) {
			return;
		}
		this.props.onCommentSubmit({title: title, content: content});
		this.refs.title.getDOMNode().value = '';
		this.refs.content.getDOMNode().value = '';
		return;
	},
	render: function() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="title" ref="title" /><br/>
				<input type="text" placeholder="content..." ref="content" /><br/>
				<input type="submit" value="提交" />
			</form>
		);
	}
});

React.render(
	<CommentBox />,
	document.getElementById('content')
);