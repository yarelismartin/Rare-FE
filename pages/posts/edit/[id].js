import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PostForm from '../../../components/forms/PostForm';
import { getSinglePost } from '../../../api/postData';

export default function EditPost() {
  const [post, setPost] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getPost = () => {
    getSinglePost(id).then(setPost);
  };
  useEffect(() => {
    getPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <PostForm postObj={post} />
    </>
  );
}
