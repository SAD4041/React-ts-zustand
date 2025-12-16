import React from 'react';
import { Button } from '@/components/ui/userDashInfo/button';
import { MapPin, Trash2, Edit2 } from 'lucide-react';
import type { AddressCardProps } from '@/types/UserDashInfoTypes';

const AddressCard: React.FC<AddressCardProps> = ({ address, onEdit, onDelete }) => {
  return (
    <div dir="rtl" className="p-4 rounded-md border border-border">
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

      <p className="text-muted-foreground mb-3 text-xs">
        {address.phone}
      </p>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit2 className="w-3 h-3 ml-1" />
          ویرایش
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(address.id)}
          className="hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 className="w-3 h-3 ml-1" />
          حذف
        </Button>
      </div>
    </div>
  );
};

export default AddressCard;
