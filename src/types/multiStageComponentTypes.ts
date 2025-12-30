export type MultiStageContextType = {
	currentStage: number;
	animationDir: number;
	setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
	setAnimationDir: React.Dispatch<React.SetStateAction<number>>;
};
