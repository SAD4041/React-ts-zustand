import React, { useState } from 'react';
import { Card } from '@/components/ui/userDashInfo/card';
import { Button } from '@/components/ui/userDashInfo/button';
import { Plus } from 'lucide-react';
import AddressCard from './addresscard';
import type { Address } from '@/types/UserDashInfoTypes';
import Separator from '@/components/ui/userDashInfo/separator';
import AddressFormModal from './addressFormModal'; 

interface AddressSectionProps {
  addresses: Address[];
  onAddAddress: (newAddress: Omit<Address, 'id'>) => void;
  onUpdateAddress: (id: string, updatedAddress: Omit<Address, 'id'>) => void;
  onDeleteAddress: (id: string) => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  addresses,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleDelete = (id: string) => {
    setShowDeleteConfirm(id);
  };

  const confirmDelete = (id: string) => {
    onDeleteAddress(id);
    setShowDeleteConfirm(null);
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleEditClick = (address: Address) => {
    setEditingAddress(address);
  };

  const handleModalSubmit = (data: Omit<Address, 'id'> & { id?: string }) => {
    if (data.id) {
      onUpdateAddress(data.id, data);
    } else {
      onAddAddress(data);
    }
    if (data.isDefault) {
      addresses.forEach(addr => {
        if (addr.id !== data.id && addr.isDefault) {
          onUpdateAddress(addr.id, { ...addr, isDefault: false });
        }
      });
    }

    setIsAdding(false);
    setEditingAddress(null);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4 px-10">
        <Button
          size="sm"
          className="bg-[#00A6D4] hover:bg-[#00A6D4]/60 text-white"
          onClick={handleAddClick}
        >
          <Plus className="w-4 h-4 ml-2" />
          آدرس جدید
        </Button>
        <h3 className="text-right text-lg font-semibold">آدرس‌ها</h3>
      </div>
      <Separator className="mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-10 px-6">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onEdit={() => handleEditClick(address)}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-sm shadow-lg max-w-sm w-full text-right">
            <h4 className="text-lg font-semibold mb-3">آیا مطمئن هستید؟</h4>
            <p className="mb-4 text-sm text-gray-600">این آدرس به طور دائم حذف خواهد شد.</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(null)}>
                لغو
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => confirmDelete(showDeleteConfirm)}
                className="bg-red-500 hover:bg-red-600"
              >
                بله
              </Button>
            </div>
          </div>
        </div>
      )}

      <AddressFormModal
        isOpen={isAdding || !!editingAddress}
        onClose={() => {
          setIsAdding(false);
          setEditingAddress(null);
        }}
        onSubmit={handleModalSubmit}
        initialData={editingAddress}
      />
    </Card>
  );
};

export default AddressSection;