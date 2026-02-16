import React from 'react';
import { Button } from '@/components/ui/userDashInfo/button';
import { MapPin, Trash2, Edit2 } from 'lucide-react';
import type { AddressCardProps } from '@/types/UserDashInfoTypes';

const AddressCard: React.FC<AddressCardProps> = ({ address, onEdit, onDelete }) => {
  return (
    <div dir="rtl" className="p-4 rounded-md border border-border min-w-[260px] max-w-full min-h-[180px] flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-light" />
          <span className="text-sm font-semibold">{address.title}</span>
        </div>

        {address.isDefault && (
          <span className="px-2 py-1 rounded bg-brand-light text-brand text-xs">
            پیش‌فرض
          </span>
        )}
      </div>

      <p className="text-muted-foreground mb-1 text-sm">
        {address.province}
        {address.province !== address.city && `، ${address.city}`}، {address.fullAddress}
      </p>

      <div className="flex flex-col sm:flex-row gap-2 sm:justify-end mt-auto pt-3">
        <Button variant="outline" size="sm" onClick={onEdit} className="min-w-[140px] min-h-10">
          <Edit2 className="w-3 h-3 ml-1" />
          ویرایش
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(address.id)}
          className="hover:bg-destructive hover:text-destructive-foreground min-w-[140px] min-h-10"
        >
          <Trash2 className="w-3 h-3 ml-1" />
          حذف
        </Button>
      </div>
    </div>
  );
};

export default AddressCard;
