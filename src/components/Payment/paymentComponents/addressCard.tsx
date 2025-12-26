import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Trash2, Edit2, CheckCircle } from 'lucide-react';

interface AddressCardProps {
    address: {
        id: string;
        title: string;
        province: string;
        city: string;
        fullAddress: string;
        isDefault: boolean;
    };
    isSelected: boolean;
    onEdit: () => void;
    onDelete: () => void;
    onSelect: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
    address,
    isSelected,
    onEdit,
    onDelete,
    onSelect,
}) => {
    return (
        <div
            dir="rtl"
            className={`p-4 rounded-md border cursor-pointer transition-all shadow-sm ${isSelected ? 'border-orange-500 bg-orange-50' : 'border-border hover:border-gray-400'
                }`}
            onClick={onSelect}
        >
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-semibold">{address.title}</span>
                </div>

                <div className="flex items-center gap-2">
                    {address.isDefault && (
                        <span className="px-2 py-1 rounded bg-orange-100 text-orange-600 text-xs">
                            پیش‌فرض
                        </span>
                    )}
                    {isSelected && <CheckCircle className="w-5 h-5 text-orange-500" />}
                </div>
            </div>





            <p className="text-muted-foreground mb-2 text-sm">
                {address.province}
                {address.province !== address.city && `، ${address.city}`}، {address.fullAddress}
            </p>

            <div className="flex gap-2 mt-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); onEdit(); }}
                >
                    <Edit2 className="w-3 h-3 mr-1" />
                    ویرایش
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                    <Trash2 className="w-3 h-3 mr-1" />
                    حذف
                </Button>
            </div>
        </div>
    );
};

export default AddressCard;