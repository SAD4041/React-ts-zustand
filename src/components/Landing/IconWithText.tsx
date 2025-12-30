export default function IconWithText({
	Icon,
	text,
}: {
	Icon: React.ComponentType<{ size?: string }>;
	text: string;
}) {
	return (
		<div className="w-30 sm:w-40 md:w-50 lg:w-full flex flex-col items-center justify-center gap-3">
			<div className="size-15 md:size-20 bg-secondary-300 rounded-md flex items-center justify-center p-4">
				<Icon size={"auto"} />
			</div>
			<div className="text-center h-10 text-lg md:text-xl font-bold">
				{text}
			</div>
		</div>
	);
}
