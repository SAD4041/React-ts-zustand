import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import AddressCard from '@/components/Payment/paymentComponents/addressCard';
import AddressFormModal from '@/components/Payment/paymentComponents/AddressFormModal';

interface Address {
    id: string;
    title: string;
    province: string;
    city: string;
    postalCode: string;
    fullAddress: string;
    isDefault: boolean;
}

interface AddressSectionProps {
    addresses: Address[];
    onAddAddress: (address: Omit<Address, 'id'>) => void;
    onUpdateAddress: (id: string, address: Omit<Address, 'id'>) => void;
    onDeleteAddress: (id: string) => void;
    selectedAddressId: string | null;
    onSelectAddress: (id: string) => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
    addresses,
    onAddAddress,
    onUpdateAddress,
    onDeleteAddress,
    selectedAddressId,
    onSelectAddress,
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

    const handleAddClick = () => setIsAdding(true);
    const handleEditClick = (address: Address) => setEditingAddress(address);

    const handleModalSubmit = (data: Omit<Address, 'id'>) => {
        if (editingAddress) {
            onUpdateAddress(editingAddress.id, data);
        } else {
            onAddAddress(data);
        }
        setIsAdding(false);
        setEditingAddress(null);
    };

    return (
        <Card dir="rtl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 px-6">
                <CardTitle className="text-right">آدرس‌ها</CardTitle>
                <Button size="sm" onClick={handleAddClick}>
                    <Plus className="w-4 h-4 ml-2" />
                    آدرس جدید
                </Button>
            </CardHeader>
            <Separator className="my-0" />
            <CardContent className="px-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                        <AddressCard
                            key={address.id}
                            address={address}
                            isSelected={address.id === selectedAddressId}
                            onEdit={() => handleEditClick(address)}
                            onDelete={() => handleDelete(address.id)}
                            onSelect={() => onSelectAddress(address.id)}
                        />
                    ))}
                </div>

                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-background p-6 rounded-lg shadow-lg max-w-sm w-full text-right border">
                            <h4 className="font-semibold mb-3">آیا مطمئن هستید؟</h4>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(null)}>
                                    لغو
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => confirmDelete(showDeleteConfirm)}>
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
            </CardContent>
        </Card>
    );
};

export default AddressSection;