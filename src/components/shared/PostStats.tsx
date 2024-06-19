import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { checkIsLiked } from "@/lib/utils";
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "@/lib/react-query/queries";

import { Button, Input } from "../ui";
import Comments from "./Comments";
import ShareButtonWraper from "./ShareButtonWraper";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
  showComments : boolean,
  setShowCommets : React.Dispatch<React.SetStateAction<boolean>>,
};

const PostStats = ({ post, userId,setShowCommets,showComments }: PostStatsProps) => {
  const navigate  = useNavigate();
  const location = useLocation();
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState<string[]>(likesList);

  const { mutate: likePost } = useLikePost();
 

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <>
    <div
      className={`flex justify-between items-center z-20 ${containerStyles} mt-5`}>
      <div className="flex gap-2 mr-5">
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={(e) => handleLikePost(e)}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      
      <div className="flex gap-2">
        <img
          src="/assets/icons/comment.png"
          alt="share"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShowCommets((prev : boolean) => !prev);
            console.log(showComments);
          }}
        />
      </div>
      {/* <div className="flex">
        <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="share"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={(e) => handleSavePost(e)}
        />
      </div> */}
      <ShareButtonWraper postId={post.$id}/>
    </div>
    <Comments post={post} showComments={showComments}/>
    </>
  );
};

export default PostStats;
