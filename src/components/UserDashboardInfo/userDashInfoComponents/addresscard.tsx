import React, { useState } from 'react';
import { Button } from '@/components/ui/userDashInfo/button';
import { MapPin, Trash2, Edit2 } from 'lucide-react';
import type { AddressCardProps } from '@/types/UserDashInfoTypes';

const AddressCard: React.FC<AddressCardProps> = ({ address, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => setShowConfirm(true);
  const confirmDelete = () => {
    onDelete(address.id);
    setShowConfirm(false);
  };
  const cancelDelete = () => setShowConfirm(false);

  return (
    <>
      <div className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-right">
        <div className="flex items-start justify-between mb-2 flex-row-reverse">
          <div className="flex items-center gap-2 flex-row-reverse">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">{address.title}</span>
          </div>
          {address.isDefault && (
            <span className="px-2 py-1 rounded bg-[#E3F2FD] text-[#007BFF] text-xs">
              پیش‌فرض
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-2 text-xs line-clamp-2">
          {address.fullAddress}
        </p>
        <p className="text-gray-600 mb-3 text-xs">{address.phone}</p>
        <div className="flex gap-2 flex-row-reverse">
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-[rgba(254,98,31,1)] hover:text-white"
            onClick={handleDelete}
          >
            <Trash2 className="w-3 h-3 ml-1" />
            حذف
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-accent hover:text-white"
            onClick={() => {}}
          >
            <Edit2 className="w-3 h-3 ml-1" />
            ویرایش
          </Button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-right">
            <h4 className="text-lg font-semibold mb-3">آیا مطمئن هستید؟</h4>
            <p className="mb-4 text-sm text-gray-600">این آدرس به طور دائم حذف خواهد شد.</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={cancelDelete}>
                لغو
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600"
              >
                بله
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddressCard;