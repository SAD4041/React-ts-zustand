import React from "react";
import { Search } from "lucide-react";
import CustomInput from "@/components/Custom/CustomInput";
import UserCardListToAdd from "@/components/ChallengeManagement/create/UserCardListToAdd";
import { Field } from "formik";
import type { UserProfile } from "@/types/userTypes";
import type { FieldProps } from "formik";
import type { StepThreeProps } from "@/types/challengeCreateTypes";

const Step3Members: React.FC<StepThreeProps> = ({
  values,
  userSearch,
  setUserSearch,
  selectedUsers,
  removeUser,
  availableUsers,
  addUser,
  canAddMore,
  memberLimitError,
}) => {
  const memberCountNum = parseInt(values.memberCount) || 0;

  return (
    <div className="w-full max-w-xl space-y-8">
      {/* Member count */}
      <Field name="memberCount">
        {({ field }: FieldProps) => (
          <CustomInput
            {...field}
            label="تعداد اعضا"
            type="number"
            min={1}
            className="w-full rounded-[8px]"
          />
        )}
      </Field>

      {/* Search */}
      <div className="relative">
        <CustomInput
          name="userSearch"
          type="text"
          label="جست و جوی کاربر"
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          className="w-full pr-10 rounded-[8px]"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      </div>

      {/* Selected tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {selectedUsers.map((user) => (
          <span
            key={user.id}
            className="inline-flex items-center gap-1 bg-primary-picture-background text-primary px-3 py-1 rounded-full text-sm"
          >
            {user.username}
            <button
              type="button"
              onClick={() => removeUser(user.id)}
              className="hover:bg-orange-200 rounded-full p-0.5"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </span>
        ))}
      </div>

      {/* Limit error */}
      {memberLimitError && (
        <p className="text-red-600 text-sm text-right animate-pulse">
          نمی‌توانید بیش از {memberCountNum} نفر اضافه کنید.
        </p>
      )}

      {/* User list */}
      <UserCardListToAdd
        users={availableUsers}
        searchTerm={userSearch}
        onAddUser={addUser}
        disabled={!canAddMore}
      />
    </div>
  );
};

export default Step3Members;
