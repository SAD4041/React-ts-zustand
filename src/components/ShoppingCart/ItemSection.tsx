// src/components/Cart/CartItemsSection.tsx
import React from 'react';
import CartItems from './CartItems';

interface CartItemsSectionProps {
    items: any[];
    onRemove: (id: string) => void;
    onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItemsSection: React.FC<CartItemsSectionProps> = ({ items, onRemove, onUpdateQuantity }) => {
    return (
        <div className="space-y-4">
            {items.map(item => (
                <CartItems
                    key={item.id}
                    item={item}
                    onRemove={onRemove}
                    onUpdateQuantity={onUpdateQuantity}
                />
            ))}
        </div>
    );
};

export default CartItemsSection;