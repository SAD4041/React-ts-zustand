import React from 'react';
import CustomButton from '@/components/Custom/CustomButton';

interface DeleteConfirmationModalProps {
  username: string;
  listType: 'followers' | 'followings'; // Add the listType prop
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  username,
  listType,
  onDeleteConfirm,
  onDeleteCancel,
}) => {
  return (
    <>
      {/* Overlay with onClick to trigger cancel */}
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-50"
        onClick={onDeleteCancel} // Cancel on overlay click
      ></div>

      {/* Confirmation Modal */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-lg p-6 z-60 border-2 border-black"
        onClick={(e) => e.stopPropagation()} // Prevent the modal from closing when clicked
      >
        <div className="flex flex-col items-center text-right" dir="rtl">
          <p className="font-bold text-lg mb-4">
            آیا مطمئن هستید که می‌خواهید{' '}
            <span className="text-primary mx-2" dir="ltr">{username}</span> را از لیست{' '}
            {listType === 'followers' ? 'دنبال‌کنندگان' : 'دنبال‌شوندگان'} حذف کنید؟
          </p>
        

          <div className="flex flex-col space-y-4">
            <CustomButton
              className="bg-white text-primary w-full text-xl font-normal px-4 py-2 mb-3 rounded-lg shadow-primary border-primary hover:bg-primary-dark"
              onClick={onDeleteConfirm}
            >
              حذف
            </CustomButton>
            <CustomButton
              className="bg-white text-secondary w-full text-xl font-normal px-4 py-2 rounded-lg shadow-secondary border-secondary hover:bg-secondary-dark"
              onClick={onDeleteCancel}
            >
              انصراف
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;
