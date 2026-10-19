function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart,item,quantity) {
  if (quantity <= 0) throw new RangeError('Количество должно быть больше 0');
  if (quantity > item.stock) throw new RangeError('На складе меньше чем в корзине');

  const copyCart = cart.map((p) => ({...p}));
  const found = copyCart.find((p) => p.id === item.id);
  const alreadyInCart = found ? found.quantity : 0;
  if (alreadyInCart + quantity > item.stock) throw new RangeError('превышен остаток на складе');
  if(found){
    found.quantity += quantity;
  }else{
    copyCart.push({...item,quantity});
  }
  return copyCart;
}
function changeQuantity(cart, productId, quantity) {
  const copyCart = cart.map((p) => ({ ...p }));
  const found = copyCart.find((p) => p.id === productId);

  if (!found) return copyCart;

  if (quantity <= 0) throw new RangeError('количество должно быть положительным');
  if (quantity > found.stock) throw new RangeError('нельзя указать больше остатка');

  found.quantity = quantity;
  return copyCart;
}
function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
