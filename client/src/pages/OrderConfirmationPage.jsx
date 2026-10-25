import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  MapPin, 
  ArrowRight, 
  ShoppingBag, 
  Clock, 
  Calendar, 
  User, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useDemoData } from '../context/DemoDataContext';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const { orders } = useDemoData();

  // Find order in shared demo store
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="py-20 bg-[#F7F5EF] min-h-[75vh] flex items-center justify-center font-sans">
        <Container size="narrow">
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-warm-300 text-center space-y-4 shadow-soft-sm">
            <div className="w-16 h-16 rounded-full bg-warm-200 text-earth-500 flex items-center justify-center mx-auto">
              <Package className="w-8 h-8 opacity-60" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#1C251E]">
              Order #{orderId} Not Found
            </h2>
            <p className="text-xs sm:text-sm text-earth-600 max-w-sm mx-auto">
              The requested order reference could not be located in current demonstration data. It may have been cleared or the ID is mistyped.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link to="/products">
                <Button variant="primary">
                  Explore Healthcare Shop
                </Button>
              </Link>
              <Link to="/patient/dashboard">
                <Button variant="outline">
                  Go to Patient Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-16 bg-[#F7F5EF] min-h-screen font-sans">
      <Container size="narrow">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Top Success Banner */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-soft-sm text-center space-y-4 relative overflow-hidden">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Simulated Order Placed Successfully
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C251E] pt-2">
                Thank You for Your Order!
              </h1>
              <p className="text-xs text-earth-600 max-w-md mx-auto">
                We have registered your simulated dispatch request. Your products have been reserved and inventory deducted from the central pharmacy.
              </p>
            </div>

            {/* Order Reference Pill */}
            <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-[#F4F6F4] px-4 py-2.5 rounded-2xl border border-botanical-200 text-xs">
              <div>
                <span className="text-earth-500 block text-[10px] uppercase font-bold">Order Reference</span>
                <span className="font-mono font-bold text-[#1C251E]">{order.id}</span>
              </div>
              <div className="h-6 w-px bg-warm-300 hidden sm:block" />
              <div>
                <span className="text-earth-500 block text-[10px] uppercase font-bold">Order Placed Date</span>
                <span className="font-medium text-[#1C251E]">{order.date}</span>
              </div>
              <div className="h-6 w-px bg-warm-300 hidden sm:block" />
              <div>
                <span className="text-earth-500 block text-[10px] uppercase font-bold">Current Status</span>
                <span className="font-bold text-emerald-700">{order.status}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Fulfillment Timeline */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CBD5CD] shadow-soft-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-warm-200">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#49614D]" />
                <h3 className="font-serif text-xl font-bold text-[#1C251E]">
                  Fulfillment & Dispatch Progress
                </h3>
              </div>
              <span className="text-[11px] font-mono font-semibold text-[#49614D]">
                Tracking: {order.trackingNumber || `VC-EXP-${order.id.slice(-6)}`}
              </span>
            </div>

            {/* Timeline Stepper */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(order.timeline || [
                { step: 'Order Placed', time: 'Just now', done: true },
                { step: 'Verified by Pharmacy', time: 'Estimated 2 hours', done: true },
                { step: 'Dispatched', time: 'Pending', done: false },
                { step: 'Delivered', time: 'Pending (2-3 days)', done: false },
              ]).map((step, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border text-xs ${
                    step.done
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 font-semibold'
                      : 'bg-warm-50 border-warm-200 text-earth-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {step.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 text-earth-400 shrink-0" />
                    )}
                    <span className="truncate">{step.step}</span>
                  </div>
                  <span className="text-[10px] text-earth-500 font-normal block truncate">
                    {step.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Shipping Address Summary */}
            <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-warm-200 text-xs space-y-1.5">
              <span className="font-bold text-[#1C251E] flex items-center gap-1.5 uppercase text-[10px] tracking-wider text-earth-500">
                <MapPin className="w-3.5 h-3.5 text-[#49614D]" />
                Delivery Address:
              </span>
              <p className="font-semibold text-[#1C251E]">
                {order.deliveryAddress?.fullName || order.patientName}
              </p>
              <p className="text-earth-600">
                {order.deliveryAddress?.addressLine || 'Flat 402, Green Orchid Residency, Linking Road'}
              </p>
              <p className="text-earth-600">
                {order.deliveryAddress?.city || 'Mumbai'}, {order.deliveryAddress?.state || 'Maharashtra'} - {order.deliveryAddress?.pincode || '400050'}
              </p>
              <p className="text-earth-500 pt-0.5">
                Contact: {order.deliveryAddress?.phone || '+91 98200 12345'}
              </p>
            </div>
          </div>

          {/* Ordered Formulations Breakdown */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CBD5CD] shadow-soft-sm space-y-5">
            <h3 className="font-serif text-xl font-bold text-[#1C251E] pb-3 border-b border-warm-200">
              Formulation Items
            </h3>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs py-2 border-b border-warm-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-warm-100 flex items-center justify-center font-serif font-bold text-[#49614D] shrink-0 border border-warm-200">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1C251E]">{item.name}</h4>
                      <span className="text-[11px] text-earth-500">
                        Qty: {item.quantity} &times; ₹{item.price}
                      </span>
                    </div>
                  </div>

                  <span className="font-serif font-bold text-sm text-[#1C251E]">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-1.5 pt-4 border-t border-warm-200 text-xs">
              <div className="flex justify-between text-earth-600">
                <span>Items Subtotal</span>
                <span className="font-medium text-[#1C251E]">
                  ₹{order.subtotal || order.items.reduce((acc, i) => acc + i.price * i.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between text-earth-600">
                <span>Botanical Delivery Fee</span>
                <span className="font-medium text-emerald-700">
                  {order.shippingFee === 0 || !order.shippingFee ? 'FREE' : `₹${order.shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1C251E] pt-2 border-t border-warm-200">
                <span className="font-serif">Total Order Amount</span>
                <span className="font-serif text-lg text-[#49614D]">₹{order.total}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to="/patient/dashboard" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center"
                icon={FileText}
                iconPosition="left"
              >
                View My Orders in Dashboard
              </Button>
            </Link>

            <Link to="/products" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="md"
                className="w-full justify-center"
                icon={ShoppingBag}
                iconPosition="left"
              >
                Continue Shopping Catalog
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
