// components/Custom/SelectedCategoryTag.tsx
import React from "react";
import type { SelectedCategoryTagProps } from "@/types/challengeCreateTypes";
import CategoryRemoveButton from "../ChallengeManagement/create/categoryRemoveButton";

const AllSelectedCategoryTag: React.FC<SelectedCategoryTagProps> = ({
  category,
  onRemove,
}) => {
  return (
    <span className="inline-flex items-center gap-1 bg-primary-picture-background text-primary px-3 py-1 rounded-full text-sm">
      {category}
      <button
        type="button"
        onClick={() => onRemove(category)}
        className="hover:bg-primary-hover rounded-primary-radius p-0.5 transition-colors"
        aria-label={`حذف ${category}`}
      >
        <CategoryRemoveButton />
      </button>
    </span>
  );
};

export default AllSelectedCategoryTag;
