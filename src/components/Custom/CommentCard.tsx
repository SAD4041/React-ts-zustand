import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, ThumbsUp } from "lucide-react";
import type { CommentResponse } from "@/types/commentTypes";
import convertToPersianDigits from "@/utils/convertToPersianDigits";
import { timeAgo } from "@/utils/timeAgoDiff";
import formatFollowBarNumber from "@/utils/formatFollowBarNumber";
import { LikeService, UnlikeService } from "@/services/postService";
import { Form, Formik } from "formik";
import CustomInput from "./CustomInput";
import { CommentService } from "@/services/commentService";
import CustomToast from "./CustomToast";
import { useNavigate, useParams } from "react-router-dom";
import { SendHorizontal } from "lucide-react";
import type { CommentCardProps } from "@/types/commentCardProps";

const CommentCard = ({
  comment,
  refreshComments,
  depth = 0,
  parentUsername,
  parentUserId,
}: CommentCardProps) => {
  const { id } = useParams();
  const postId = Number(id);
  const [openReplySection, setOpenReplySection] = useState(false);
  const replyColor = openReplySection ? "text-neutral-gray" : "text-primary";
  const pasokhColor = openReplySection ? "text-neutral-gray" : "text-black";
  const [isLiked, setIsLiked] = useState(comment.is_liked);
  const [likeCount, setLikeCount] = useState(comment.like_count);
  const isFirstLevel = comment.parent_id ? false : true;
  const thumsupColor = isLiked ? "text-secondary" : "text-neutral-gray";
  const [showAllReplies, setShowAllReplies] = useState(false);
  const cardIndent = depth === 0 ? "px-4" : depth === 1 ? "pr-12 pl-0" : "px-0";
  const navigate = useNavigate();
  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        // Unlike
        await UnlikeService({ entity_type: "comment", entity_id: comment.id });
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        // Like
        await LikeService({ entity_type: "comment", entity_id: comment.id });
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };
  const handleSubmitReply = async (values: { commentText: string }) => {
    console.log("Submitting comment with values:", values);
    const response: CommentResponse = await CommentService({
      entity_type: "post",
      entity_id: postId,
      content: values.commentText,
      parent_id: comment.id,
    });
    setOpenReplySection(false);
    CustomToast("نظر با موفقیت ایجاد شد!", "success");
    console.log("Comment submitted:", response);
    refreshComments();
  };
  let border = "shadow-none border-none";
  if (isFirstLevel) {
    border = "border-2 border-black shadow-shadow-medium"; //ask khuban shadow-shadow-strong ------------------------------------------------------------------------------
  }
  return (
    // this got added for the line
    <Card className={`w-full rounded-xl ${border}`}>
      <CardContent className={`pt-2 ${cardIndent} pb-2 relative`} dir="rtl">
        {/* Vertical line for top-level comments */}
        {depth === 0 &&
          showAllReplies &&
          comment.replies &&
          comment.replies.length > 0 && (
            <span
              className="
      absolute
      top-[calc(var(--profpic)+8px)]
      bottom-[146px]
      right-[39px]
      w-[3px]
      bg-primary
    "
            />
          )}
        {depth === 1 && (
          <span
            className="
      absolute
      top-[calc(var(--profpic)-35px)]   /* align with avatar center */
      right-[23px]                    /* horizontal distance to vertical line */
      w-[28px]                        /* width of the horizontal line */
      h-[20px]                        /* height of the vertical line */
      border-r-3 border-b-3           /* right + bottom borders only */
      border-primary                  /* color */
      rounded-br-lg                   /* curve at bottom-right corner */
    "
          />
        )}

        {/* Top Row: Avatar + Username + Timestamp */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <Avatar className="w-[var(--profpic)] h-[var(--profpic)] bg-primary">
            <AvatarImage src={undefined} /> {/* Replace with actual avatar */}
            <AvatarFallback className="bg-primary/20 text-primary font-bold flex items-center justify-center">
              S
            </AvatarFallback>
          </Avatar>

          {/* Username and Time stacked vertically */}
          <div className="flex gap-[10px] items-center">
            <p className="font-semibold text-sm" onClick={() => navigate(`/dashboard/${comment.user_id}`)}>
              {/* {username} */}
              {comment.username}
            </p>
            <p className="text-xs text-neutral-gray-bold font-medium">
              {convertToPersianDigits(timeAgo(comment.created_at))}
            </p>
          </div>
        </div>

        {/* Comment Text: aligned with username */}
        <div className={`mr-[calc(var(--profpic)+12px)]`}>
          {depth > 1 && parentUsername && (
            <p className="text-neutral-gray text-xs mb-1">
              در پاسخ به{" "}
              <span
                className="font-semibold"
                onClick={() => navigate(`/dashboard/${parentUserId}`)}
              >
                @{parentUsername}
              </span>
            </p>
          )}

          <p className="text-gray-text font-medium text-sm">
            {comment.content}
          </p>

          <div className="flex items-center gap-4 mt-3" dir="rtl">
            <div className="gap-1 flex items-center" dir="rtl">
              <ThumbsUp
                className={`w-5 h-5 ${thumsupColor} scale-x-[-1]`}
                onClick={handleLikeToggle}
              />
              <p className="text-black font-semibold text-xs">
                {convertToPersianDigits(formatFollowBarNumber(likeCount))}
              </p>
            </div>
            <div
              className="gap-1 flex items-center"
              dir="rtl"
              onClick={() => setOpenReplySection(!openReplySection)}
            >
              <MessageCircle
                className={`w-5 h-5 ${replyColor} scale-x-[-1] transition-all duration-50`}
              />
              <p className={`${pasokhColor} font-semibold text-xs`}>پاسخ</p>
            </div>
          </div>
          {openReplySection && (
            <div className="mt-3">
              <Formik
                initialValues={{ commentText: "" }}
                onSubmit={handleSubmitReply}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit} className="w-full">
                    <div className="w-full flex items-center gap-1">
                      <CustomInput
                        width="w-full"
                        name="commentText"
                        label="پاسخ به نظر"
                        icon={
                          <button
                            type="submit"
                            className="flex items-center cursor-pointer"
                          >
                            <SendHorizontal className="w-[20px] h-[20px] text-secondary scale-x-[-1]" />
                          </button>
                        }
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
        {comment.replies &&
          showAllReplies === false &&
          comment.replies.length > 0 && (
            <p
              className="mt-4 text-sm text-neutral-gray font-medium mr-[calc(var(--profpic)+12px)]"
              onClick={() => setShowAllReplies(true)}
            >
              <span className="inline-block w-[30px] border-b border-neutral-gray-bold align-middle"></span>
              <span className="mr-[7px]">
                مشاهده پاسخ‌ها (
                {convertToPersianDigits(comment.replies.length.toString())})
              </span>
            </p>
          )}
        {comment.replies && showAllReplies && comment.replies.length > 0 && (
          <div className="mt-4 flex flex-col">
            {comment.replies.map((reply) => (
              <CommentCard
                key={reply.id}
                comment={reply}
                refreshComments={refreshComments}
                depth={depth + 1}
                parentUsername={comment.username}
                parentUserId={comment.user_id}
              />
            ))}
          </div>
        )}
        {comment.replies && showAllReplies === true && (
          <p
            className="mt-4 text-sm text-neutral-gray font-medium mr-[calc(var(--profpic)+12px)]"
            onClick={() => setShowAllReplies(false)}
          >
            <span className="inline-block w-[30px] border-b border-neutral-gray-bold align-middle"></span>
            <span className="mr-[7px]">مخفی کردن پاسخ‌ها</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentCard;
