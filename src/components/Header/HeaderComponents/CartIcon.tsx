import ShoppingBag from "@/assets/Shopping bag.png";
interface CartIconProps {
  onClick?: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-foreground hover:text-muted-foreground transition-colors"
  >
    <img src={ShoppingBag} alt="سبد خرید" className="h-5 w-5" />
  </button>
);

export default CartIcon;
