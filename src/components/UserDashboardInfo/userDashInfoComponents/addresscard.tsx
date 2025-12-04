import React from 'react';
import { Button } from '@/components/ui/userDashInfo/button';
import { MapPin, Trash2, Edit2 } from 'lucide-react';
import type { AddressCardProps } from '@/types/UserDashInfoTypes';

const AddressCard: React.FC<AddressCardProps> = ({ address, onEdit, onDelete }) => {
  return (
    <div dir='rtl' className="p-4 rounded-sm border border-[#C0C0C0]">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#007BFF]" />
          <span className="text-sm font-semibold">{address.title}</span>
        </div>
        {address.isDefault && (
          <span className="px-2 py-1 rounded bg-[#E3F2FD] text-[#007BFF] text-xs">
            پیش‌فرض
          </span>
        )}
      </div>

      <p className="text-gray-600 mb-1 text-sm">
        <span className="font-medium"></span> {address.province} 
        {address.province !== address.city && (
          <>
            <span className="font-medium">،</span> {address.city}
          </>
        )}
        <span className="font-medium">،</span> {address.fullAddress}
      </p>
      <p className="text-gray-600 mb-3 text-xs">
        <span className="font-medium"></span> {address.phone}
      </p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-[rgba(254,98,31,1)] hover:text-white"
          onClick={() => onEdit?.()}
        >
          <Edit2 className="w-3 h-3 ml-1" />
          ویرایش
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-[rgba(254,98,31,1)] hover:text-white"
          onClick={() => onDelete(address.id)}
        >
          <Trash2 className="w-3 h-3 ml-1" />
          حذف
        </Button>
      </div>
    </div>
  );
};

export default AddressCard;