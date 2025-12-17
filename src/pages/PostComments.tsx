import { CommentService, GetCommentsService } from "@/services/commentService";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockComments } from "@/data/mockComments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { CommentRequest, CommentResponse } from "@/types/commentTypes";
import { Form, Formik, type FormikHelpers } from "formik";
import CustomInput from "@/components/Custom/CustomInput";
import CustomButton from "@/components/Custom/CustomButton";
import { ArrowLeft, MessageCircle } from "lucide-react";
import CustomToast from "@/components/Custom/CustomToast";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp } from "lucide-react";
import TertiaryCustomButton from "@/components/Custom/TertiaryCustomButton";
import CommentCard from "@/components/Custom/CommentCard";

const PostComments = () => {
  const { id } = useParams();
  const postId = Number(id);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   setComments(mockComments);
  //   setLoading(false);
  // }, []);

  const fetchComments = async () => {
    try {
      const data = await GetCommentsService({
        entity_type: "post",
        entity_id: postId,
      });

      setComments(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchComments();
    console.log("comments:", comments);
  }, [postId]);

  if (loading) return <div>Loading comments...</div>; //need to make skeleton for this instead ------------------------------------
  if (error) return <div>{error}</div>;

  const handleSubmitComment = async (values: { commentText: string },{ resetForm }: FormikHelpers<{ commentText: string }>) => {
    console.log("Submitting comment with values:", values);
    const response: CommentResponse = await CommentService({
      entity_type: "post",
      entity_id: postId,
      content: values.commentText,
    });
    CustomToast("نظر با موفقیت ایجاد شد!", "success");
    console.log("Comment submitted:", response);
    fetchComments();
    resetForm();
  };
  return (
    <>
      <div className="px-[var(--side-page)] mt-[var(--top-page)]">
        <div className="flex items-center justify-between">
          <button
            className="p-2 border-2 border-primary rounded-xl hover:bg-primary-hover transition-colors"
            onClick={() => navigate(`/post/${postId}`)}
          >
            <ArrowLeft className="w-8 h-8 text-primary" />
          </button>

          <p className="text-center font-bold text-title text-primary">
            نظرات پست
          </p>
        </div>

        <div className="flex items-center mt-[var(--top-page)]" dir="rtl">
          <Formik
            initialValues={{ commentText: "" }}
            onSubmit={handleSubmitComment}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="w-full">
                <div className="w-full flex items-center gap-1">
                  <CustomInput width="w-full" name="commentText" label="نظر" />
                  <CustomButton
                    type="submit"
                    className="bg-secondary hover:bg-secondary-hover"
                  >
                    ارسال نظر
                  </CustomButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="flex flex-col gap-[var(--comment-gap)] my-[var(--top-page)] mx-[var(--side-page)]">
        {comments.length === 0 && (
          <p className="text-center text-primary font-medium">
            ! هنوز نظری ثبت نشده است
          </p>
        )}
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            refreshComments={fetchComments}
          />
        ))}
        {/* <CommentCard isFirstLevel={true} id={1} />
        <CommentCard isFirstLevel={false} id={2} /> */}
      </div>
    </>
  );
};

export default PostComments;
