export interface UserCardListProps {
    users: Array<{
      id: string;
      username: string;
      imagePath: string;
      bio: string;
    }>;
    onDelete: (id: string, username: string) => void;
    isOwner: boolean;
  }