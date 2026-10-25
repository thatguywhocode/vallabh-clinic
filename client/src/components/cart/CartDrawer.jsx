import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function CartDrawer() {
  const navigate = useNavigate();
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

  const shippingFee = totalPrice >= 499 ? 0 : 50;
  const orderTotal = totalPrice + shippingFee;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-botanical-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-warm-50 shadow-2xl flex flex-col border-l border-botanical-200">
          {/* Header */}
          <div className="p-6 bg-white border-b border-warm-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-botanical-100 flex items-center justify-center text-botanical-700">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-botanical-900 leading-tight">
                  Your Wellness Cart
                </h3>
                <span className="text-xs text-earth-500">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-earth-500 hover:text-botanical-800 hover:bg-warm-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-warm-200 flex items-center justify-center mx-auto text-earth-500">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h4 className="font-serif text-xl text-botanical-900">Your cart is empty</h4>
                <p className="text-xs text-earth-600 max-w-xs mx-auto">
                  Browse our healthcare essentials and doctor-formulated botanicals to begin your wellness routine.
                </p>
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Start Browsing
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white border border-botanical-100 shadow-soft-sm flex gap-4 items-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-botanical-50 flex items-center justify-center shrink-0 border border-botanical-100">
                      <span className="font-serif text-base font-bold text-botanical-700">
                        {item.name.charAt(0)}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-botanical-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-earth-500">{item.volume || 'Standard Pack'}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-serif font-bold text-sm text-botanical-900">
                          ₹{item.price * item.quantity}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center border border-warm-300 rounded-lg bg-warm-50 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-warm-200 text-earth-700 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-botanical-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-warm-200 text-earth-700 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-earth-400 hover:text-vermilion-500 hover:bg-vermilion-50 rounded-lg transition-colors"
                      title="Remove from cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-earth-500 hover:text-vermilion-600 underline cursor-pointer"
                  >
                    Clear All Items
                  </button>
                  <span className="text-[11px] text-botanical-700 bg-botanical-50 px-2.5 py-1 rounded-full border border-botanical-100 font-medium">
                    {totalPrice >= 499 ? '✓ Free Express Delivery Applied' : `Add ₹${499 - totalPrice} for Free Delivery`}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-warm-200 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-earth-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-botanical-900">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-earth-600">
                  <span>Standard Shipping</span>
                  <span className="font-medium text-emerald-700">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-botanical-900 pt-2 border-t border-warm-200">
                  <span className="font-serif text-base">Total Order Value</span>
                  <span className="font-serif text-lg text-botanical-800">
                    ₹{orderTotal}
                  </span>
                </div>
              </div>

              <Button
                variant="vermilion"
                size="md"
                className="w-full"
                icon={ArrowRight}
                iconPosition="right"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </Button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-earth-500">
                <ShieldCheck className="w-3.5 h-3.5 text-botanical-600" />
                <span>100% Genuine Non-Prescription Products &bull; Secure Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
