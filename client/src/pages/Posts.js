import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostItem from '../components/post/PostItem';
import PostForm from '../components/post/PostForm';
import Spinner from '../components/layout/Spinner';
import { getPosts } from '../store/actions/post';

const Posts = () => {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const { posts, loading } = postState;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return !loading ? (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"> Welcome to the Community</i>
      </p>
      <PostForm />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  ) : (
    <Spinner />
  );
};

export default Posts;
