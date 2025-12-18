import PropTypes from 'prop-types';
import Button from '../common/Button';
import './CartItem.css';

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { _id, id, name, price, image, quantity, stock } = item;
  const itemId = _id || id; // Support both MongoDB _id and legacy id
  const totalPrice = price * quantity;
  const maxStock = stock || 999; // Default to 999 if stock not provided
  const isAtMaxStock = quantity >= maxStock;

  const handleIncrease = () => {
    if (quantity < maxStock) {
      onUpdateQuantity(itemId, quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(itemId, quantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0 && newQuantity <= maxStock) {
      onUpdateQuantity(itemId, newQuantity);
    } else if (e.target.value === '') {
      // Allow empty field while typing
      return;
    }
  };

  const handleQuantityBlur = (e) => {
    // If field is empty or invalid on blur, reset to 1
    const newQuantity = parseInt(e.target.value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) {
      onUpdateQuantity(itemId, 1);
    } else if (newQuantity > maxStock) {
      onUpdateQuantity(itemId, maxStock);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={image} alt={name} />
      </div>
      <div className="cart-item-details">
        <h3 className="cart-item-name">{name}</h3>
        <p className="cart-item-price">₹{price.toFixed(2)}</p>
        {stock && stock < 10 && (
          <p className="text-xs text-orange-600 mt-1">
            Only {stock} left in stock
          </p>
        )}
      </div>
      <div className="cart-item-quantity">
        <button
          onClick={handleDecrease}
          className="quantity-btn"
          disabled={quantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          className="quantity-input"
          value={quantity}
          onChange={handleQuantityChange}
          onBlur={handleQuantityBlur}
          min="1"
          max={maxStock}
        />
        <button
          onClick={handleIncrease}
          className="quantity-btn"
          disabled={isAtMaxStock}
          title={isAtMaxStock ? `Maximum stock: ${maxStock}` : ''}
        >
          +
        </button>
      </div>
      <div className="cart-item-total">
        <p className="total-price">₹{totalPrice.toFixed(2)}</p>
        <Button onClick={() => onRemove(itemId)} variant="danger" size="small">
          Remove
        </Button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;
