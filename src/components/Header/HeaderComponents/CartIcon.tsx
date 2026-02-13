import ShoppingBag from '@/assets/Shopping bag.png';

const CartIcon = () => (
  <button className="text-foreground hover:text-muted-foreground transition-colors">
    <img src={ShoppingBag} alt="سبد خرید" className="h-5 w-5" />
  </button>
);

export default CartIcon;