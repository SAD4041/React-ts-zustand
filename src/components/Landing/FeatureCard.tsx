export default function FeatureCard({
	Icon,
	text,
	title,
  }: {
	Icon: React.ComponentType<{ size?: string; className?: string }>;
	title: string;
	text: string;
  }) {
	return (
	  <div className="w-60 md:w-75 xl:w-80 rounded-4xl md:rounded-xl border border-black/8 bg-secondary-200 flex flex-col px-4 py-3 md:px-5 md:py-5">
		<div className="flex w-full items-center gap-3">
		  <div className="shrink-0">
			<div className="w-12 h-12 bg-secondary-900 flex items-center justify-center rounded-full md:rounded-md">
			  <Icon className="text-white w-6 h-6" />
			</div>
		  </div>
  
		  <div className="flex-1">
			<p className="font-bold text-md md:text-xl">{title}</p>
		  </div>
		</div>
  
		<div className="mt-2 md:mt-3 pr-1">
		  <p className="text-sm md:text-md">{text}</p>
		</div>
	  </div>
	);
  }
  