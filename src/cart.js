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
function removeFromCart(cart,id) {
  return cart.filter((p) => p.id !== id);
}
function calculateCartSubtotal(cart) {
  return cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
}
function calculateOrderTotal(cart,code) {
  const subtotal  = calculateCartSubtotal(cart);
  let discount =0;
  let delivery = 30000;
  if(code === 'SAVE10' && subtotal>=20000) discount = subtotal / 10;
  const sum = subtotal - discount;
  if(sum >= 50000) delivery =0;
  return { subtotal, discount, delivery, total: sum + delivery };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
