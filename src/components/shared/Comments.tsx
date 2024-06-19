import  { useState, useEffect } from "react";
import { Button, Input } from "../ui";
import { useCreateComments, useGetComments, useLikeComment } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentValidation } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "@/components/ui/form";

const Comments = ({ post , showComments } : {post : any,showComments : boolean}) => {
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      comment: '',
    },
  });

  const { user } = useUserContext();
  const { data: commentsList = [], isLoading, isFetched } = useGetComments(post?.$id);
  const [likes, setLikes] = useState([]);

  const { mutateAsync: likeComment } = useLikeComment();
  const { mutateAsync: createComment, isLoading: isCreatingComment } = useCreateComments();

  useEffect(() => {
    if (isFetched) {
      const initialLikes = commentsList?.map(comment => comment.likesComment || []);
      setLikes(initialLikes);
    }
  }, [isFetched, commentsList]);

  const handleLike = async (comment) => {
    const updatedLikes = likes.map((likeArray, index) => {
      if (commentsList[index].$id === comment.$id) {
        if (likeArray.includes(user.id)) {
          return likeArray.filter(id => id !== user.id);
        } else {
          return [...likeArray, user.id];
        }
      }
      return likeArray;
    });
    setLikes(updatedLikes);

    await likeComment({
      commentId: comment.$id,
      userId: user.id,
      commentLikeArray: updatedLikes.find(likeArray => commentsList[commentsList.indexOf(comment)].$id === comment.$id)
    });
  };

  const handleCreate = async (data) => {
    try {
      await createComment({
        postId: post.$id,
        comment: data.comment,
        userId: user.id,
      });
      form.reset(); // Reset the form after successful submission
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <>
      {showComments && (
        <>
          {/* <div className=""> */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreate)} className="flex w-full items-center justify-center gap-3 my-5">
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      {/* <FormControl> */}
                        <Input
                          type="text"
                          className="shad-input bg-dark-4 border-none w-full"
                          {...field}
                        />
                      {/* </FormControl> */}
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="shad-button_primary"
                  disabled={isCreatingComment}
                >
                  {isCreatingComment ? "Loading..." : "Comment"}
                </Button>
              </form>
            </Form>
          {/* </div> */}
          <div key={post?.$id} className="bg-dark-3 flex flex-col overflow-scroll custom-scrollbar min-h-[10px] max-h-[300px] mt-3 gap-3 justify-start xl:max-h-[200px]">
            {isLoading ? (
              <img src="/assets/icons/loader.svg" alt="Loading" width={25} height={25} />
            ) : commentsList.length === 0 ? (
              <h3 className="md:h3-bold text-center">No Comments</h3>
            ) : (
              commentsList.map((comment, index) => (
                <div key={comment.$id} className="flex py-2 px-4 flex-1 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Link to={`/profile/${comment?.user?.$id}`} className="flex gap-2">
                      <img
                        src={comment?.user?.imageUrl || user.imageUrl || "/assets/images/profile.png"}
                        alt=""
                        height={24}
                        width={24}
                        className="rounded-full"
                      />
                      <span className="small-medium lg:base-medium">
                        {comment?.user?.name || user.name}
                      </span>
                    </Link>
                    <span className="tiny-medium text-light-3 sm:small-medium">
                      {comment?.comment}
                    </span>
                  </div>
                  <div>
                    {likes[index]?.includes(user.id) ? (
                      <div className="flex gap-1">
                        <img src="/assets/icons/liked.svg" onClick={() => handleLike(comment)} alt="Liked" />
                        <span>{likes[index]?.length}</span>
                      </div>
                    ) : (
                      <div className="flex gap-1">
                        <img src="/assets/icons/like.svg" onClick={() => handleLike(comment)} alt="Like" />
                        <span>{likes[index]?.length}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Comments;
