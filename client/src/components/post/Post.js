import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getPost } from '../../store/actions/post';

const Post = ({ match }) => {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const { post, loading } = postState;

  useEffect(() => {
    dispatch(getPost(match.params.id));
  }, [match, dispatch]);

  return !(loading || post === null) ? (
    <>
      <Link to="/posts" className="btn">
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </>
  ) : (
    <Spinner />
  );
};

export default Post;
