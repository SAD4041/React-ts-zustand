import type { CommentResponse } from "@/types/commentTypes";

export const mockComments: CommentResponse[] = [
  {
    id: 1,
    entity_type: "post",
    entity_id: 47,
    user_id: 3,
    username: "saman",
    content: "This is an awesome post!",
    parent_id: null,
    like_count: 12,
    is_liked: true,
    created_at: "2025-01-01T10:22:00Z",
    replies: [
      {
        id: 2,
        entity_type: "post",
        entity_id: 47,
        user_id: 7,
        username: "maria",
        content: "Totally agree!",
        parent_id: 1,
        like_count: 2,
        is_liked: false,
        created_at: "2025-01-01T11:00:00Z",
        replies: [
          {
            id: 5,
            entity_type: "post",
            entity_id: 47,
            user_id: 12,
            username: "leo",
            content: "Yes, really inspiring!",
            parent_id: 2,
            like_count: 1,
            is_liked: false,
            created_at: "2025-01-01T11:30:00Z",
            replies: []
          }
        ]
      },
      {
        id: 3,
        entity_type: "post",
        entity_id: 47,
        user_id: 10,
        username: "alex",
        content: "I learned a lot from this post.",
        parent_id: 1,
        like_count: 3,
        is_liked: true,
        created_at: "2025-01-01T12:00:00Z",
        replies: []
      }
    ]
  },
  {
    id: 4,
    entity_type: "post",
    entity_id: 47,
    user_id: 15,
    username: "lily",
    content: "Can someone explain the second paragraph?",
    parent_id: null,
    like_count: 4,
    is_liked: false,
    created_at: "2025-01-02T08:15:00Z",
    replies: [
      {
        id: 6,
        entity_type: "post",
        entity_id: 47,
        user_id: 18,
        username: "tom",
        content: "Sure! The author is basically saying that...",
        parent_id: 4,
        like_count: 2,
        is_liked: false,
        created_at: "2025-01-02T09:00:00Z",
        replies: []
      },
      {
        id: 7,
        entity_type: "post",
        entity_id: 47,
        user_id: 20,
        username: "emma",
        content: "I had the same question, thanks for clarifying!",
        parent_id: 4,
        like_count: 1,
        is_liked: false,
        created_at: "2025-01-02T09:30:00Z",
        replies: []
      }
    ]
  },
  {
    id: 8,
    entity_type: "post",
    entity_id: 47,
    user_id: 22,
    username: "chris",
    content: "Looking forward to more posts like this!",
    parent_id: null,
    like_count: 10,
    is_liked: true,
    created_at: "2025-01-03T14:20:00Z",
    replies: []
  },
  {
    id: 9,
    entity_type: "post",
    entity_id: 47,
    user_id: 25,
    username: "nina",
    content: "Interesting perspective, I never thought of it that way.",
    parent_id: null,
    like_count: 6,
    is_liked: false,
    created_at: "2025-01-03T15:45:00Z",
    replies: [
      {
        id: 10,
        entity_type: "post",
        entity_id: 47,
        user_id: 26,
        username: "mike",
        content: "Agreed, this really opens up discussion.",
        parent_id: 9,
        like_count: 2,
        is_liked: false,
        created_at: "2025-01-03T16:10:00Z",
        replies: []
      }
    ]
  }
];
