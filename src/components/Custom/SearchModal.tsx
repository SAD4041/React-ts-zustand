import { useState } from "react";

function SearchModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">نتایج جستجو</h2>
          <button onClick={onClose} className="text-gray-500 text-xl">
            ×
          </button>
        </div>

        <div className="mt-4">
          <div className="flex gap-4">
            <div className="w-1/3 p-4 bg-orange-500">چالش تست 1</div>
            <div className="w-1/3 p-4 bg-blue-500">چالش تست 2</div>
            <div className="w-1/3 p-4 bg-gray-500">چالش تست 3</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
