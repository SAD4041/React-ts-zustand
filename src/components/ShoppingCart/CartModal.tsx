// src/components/Cart/CartModal.tsx
import React from 'react';
import ShoppingCartPage from './shoppingCart';
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';
import { X } from "lucide-react";

export interface CartItemData {
    id: string;
    name: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    items: CartItemData[];
    onRemove: (id: string) => void;
    onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({
    open,
    onOpenChange,
}) => {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                variant="default"
                className="w-full max-w-5xl h-[70vh] p-0 flex flex-col overflow-y-auto"
                hideCloseButton={true}
                disableOverlayClose={false}
            >
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute left-6 top-6 rounded-full text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 cursor-pointer"
                >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close</span>
                </button>

                <ShoppingCartPage />
            </DialogContent>
        </Dialog>
    );
};

export default CartModal;