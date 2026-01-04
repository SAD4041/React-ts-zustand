import { useState } from "react";
import CartIcon from "./CartIcon";
import CartModal from "@/components/ShoppingCart/CartModal";
import type { CartItemData } from "@/components/ShoppingCart/CartModal";

interface CartContainerProps {
    items: CartItemData[];
    onRemove: (id: string) => void;
    onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartContainer: React.FC<CartContainerProps> = ({
    items,
    onRemove,
    onUpdateQuantity,
}) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <CartIcon onClick={() => setOpen(true)} />

            <CartModal
                open={open}
                onOpenChange={setOpen}
                items={items}
                onRemove={onRemove}
                onUpdateQuantity={onUpdateQuantity}
            />
        </>
    );
};

export default CartContainer;
