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
        <div dir="rtl" className="flex items-start gap-4 py-4 border-b border-border last:border-b-0">
            <img src={image} alt={name} className="w-16 h-16 object-cover rounded-md" />
            <div className="flex-1 flex flex-col gap-1 text-right">
                <h3 className="font-medium">{name}</h3>
                <p className="text-sm text-muted-foreground">رنگ: {color} | سایز: {size}</p>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 bg-orange-100 rounded-md px-2 py-1 w-40 h-9">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                            className="text-orange-700 hover:text-orange-800"
                        >
                            <Plus className="w-4 h-4" />
                        </Button>

                        <span className="w-8 text-center text-orange-700 font-medium">
                            {translateNumber(quantity)}
                        </span>

                        {quantity > 1 && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                                className="text-orange-700 hover:text-orange-800"
                            >
                                <Minus className="w-4 h-4" />
                            </Button>
                        )}

                        {quantity == 1 && (<Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onRemove(item.id)}
                            className="text-destructive hover:text-destructive"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>)}
                    </div>

                    <div className="flex-shrink-0">
                        <p className="font-semibold text-lg">{translateNumber(price.toLocaleString())} تومان</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;