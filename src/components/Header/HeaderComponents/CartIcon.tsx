import ShoppingBag from '@/assets/Shopping bag.png';

const CartIcon = () => (
  <button 
    className="text-gray-600 hover:text-gray-800 transition-colors" 
    aria-label="سبد خرید"
  >
    <img src={ShoppingBag} alt="سبد خرید" className="h-5 w-5" />
  </button>
);

export default CartIcon;