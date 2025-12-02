import React, { useState } from 'react';
import { Card } from '@/components/ui/userDashInfo/card';
import { Button } from '@/components/ui/userDashInfo/button';
import { Plus } from 'lucide-react';
import AddressCard from './addresscard';
import type { Address } from '@/types/UserDashInfoTypes';
import { Addresses } from '@/data/userDashInfoData';

const AddressesSection: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>(Addresses);

  const handleDelete = (id: string) => {
    const isDeletingDefault = addresses.find(a => a.id === id)?.isDefault;
    const updated = addresses.filter(a => a.id !== id);

    if (isDeletingDefault && updated.length > 0) {
      updated[0] = { ...updated[0], isDefault: true };
    }

    setAddresses(updated);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4 flex-row-reverse">
        <h3 className="text-right text-lg font-semibold">آدرس‌ها</h3>
        <Button size="sm" className="bg-[#007BFF] hover:bg-[#0069d9]">
          <Plus className="w-4 h-4 ml-2" />
          آدرس جدید
        </Button>
      </div>

      <div className="space-y-4">
        {addresses.map((address) => (
          <AddressCard key={address.id} address={address} onDelete={handleDelete} />
        ))}
      </div>
    </Card>
  );
};

export default AddressesSection;