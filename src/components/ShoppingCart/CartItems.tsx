import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';
import { translateNumber } from '@/utils/translateNumber';

interface CartItemProps {
    item: {
        id: string;
        name: string;
        color: string;
        size: string;
        price: number;
        quantity: number;
        image: string;
    };
    onRemove: (id: string) => void;
    onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItems: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
    const { name, color, size, price, quantity, image } = item;

    return (
        <div dir="rtl" className="flex flex-col sm:flex-row items-start gap-4 py-4 border-b border-border last:border-b-0 min-w-70   max-w-full">
            <img src={image} alt={name} className="w-24 h-24 sm:w-16 sm:h-16 min-w-24 min-h-24 max-w-32 max-h-32 object-cover rounded-md self-center sm:self-auto" />
            <div className="flex-1 flex flex-col gap-2 text-right w-full">
                <h3 className="font-medium">{name}</h3>
                <p className="text-sm text-muted-foreground">رنگ: {color} | سایز: {size}</p>

                <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end sm:justify-between gap-3">
                    <div className="flex items-center gap-2 bg-primary rounded-md px-2 py-1 sm:w-10   h-12 sm:h-9 min-w-35 max-w-65 min-h-11 max-h-13 justify-between sm:justify-start self-end">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                            className="text-white hover:bg-gray-200/20"
                        >
                            <Plus className="w-4 h-4" />
                        </Button>

                        <span className="w-10 text-center text-white font-medium">
                            {translateNumber(quantity)}
                        </span>

                        {quantity > 1 && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                                className="text-white hover:bg-gray-200/20"
                            >
                                <Minus className="w-4 h-4" />
                            </Button>
                        )}

                        {quantity === 1 && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onRemove(item.id)}
                                className="text-white hover:bg-gray-200/20"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        )}
                    </div>

                    <div className="shrink-0 w-full sm:w-auto text-left sm:text-right min-w-35 max-w-full self-end sm:self-auto">
                        <p className="font-semibold text-lg">{translateNumber(price.toLocaleString())} تومان</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
