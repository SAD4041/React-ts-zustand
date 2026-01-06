export type CardStatus =
	| "canceled"
	| "rejected"
	| "done"
	| "accepted"
	| "pending";
export type CommentStatus = 0 | 1 | 2 | 3 | 4 | 5 | undefined;
export type Side = "petowner" | "petsitter";

export interface BookingCardProps {
	cardStatus?: CardStatus;
	commentStatus?: CommentStatus;
	side: Side;
	title: string;
	services: string;
	cost: number;
	location: string;
	date: string;
	time: string;
}

export interface Reserve {
	UserID: number;
}

export const ReserveStatus = {
	Pending: 1,
	Accepted: 2,
	Paid: 3,
	Finished: 4,
	Canceled: 5,
	Dismissed: 6,
	Conflict: 7,
};
