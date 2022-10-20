import React, {useEffect, useState} from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import {useParams} from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {

const [data, setData] = useState()
const [loading, setLoading] = useState(true)
    const {id} = useParams()

    useEffect(() => {
        axios.get(`/posts/${id}`).then(r => {
            setData(r.data)
            setLoading(false)
        }).catch(error => alert(error))
    }, [])

    if (loading) {
       return <Post isLoading={true} />
    }

    console.log(data)

  return (
    <>
      <Post
          id={data._id}
          title={data.title}
          imageUrl={data.imageUrl ? `https://blog-fox.herokuapp.com${data.imageUrl}` : ''}
          user={data.user}
          createdAt={data.createdAt}
          viewsCount={data.viewsCount}
          commentsCount={3}
          tags={data.tags}
          isFullPost
      >
       <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
