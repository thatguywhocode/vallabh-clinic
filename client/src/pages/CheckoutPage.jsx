import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  ShieldAlert, 
  Truck, 
  User, 
  UserPlus, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  Package,
  Clock,
  Sparkles
} from 'lucide-react';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import ProductImage from '../components/common/ProductImage';
import { useCart } from '../context/CartContext';
import { useDemoData } from '../context/DemoDataContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const { 
    activeUser, 
    loginAsPatient, 
    registerCustomer, 
    placeDemoOrder, 
    patients 
  } = useDemoData();

  // New customer inline registration state
  const [authMode, setAuthMode] = useState('demo_select'); // 'demo_select' | 'new_register'
  const [newCustName, setNewCustName] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustCity, setNewCustCity] = useState('Mumbai, MH');

  // Shipping details state
  const [recipientName, setRecipientName] = useState(activeUser?.name || 'Rohan Mehta');
  const [addressLine, setAddressLine] = useState('402, Green Orchid Residency, Linking Road, Bandra West');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('400050');
  const [phone, setPhone] = useState(activeUser?.phone || '+91 98200 12345');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState(null);

  // Financial calculations
  const shippingFee = totalPrice >= 499 ? 0 : 50;
  const orderTotal = totalPrice + shippingFee;

  // Pre-fill sample address helper
  const handlePrefillAddress = () => {
    setRecipientName(activeUser?.name || 'Rohan Mehta');
    setAddressLine('402, Green Orchid Residency, Linking Road, Bandra West');
    setCity('Mumbai');
    setState('Maharashtra');
    setPincode('400050');
    setPhone('+91 98200 12345');
  };

  // Quick Demo Patient Switcher for Identification
  const handleSelectDemoPatient = (patientId) => {
    const user = loginAsPatient(patientId);
    setRecipientName(user.name);
    setPhone(user.phone || '+91 98200 12345');
  };

  // Register New Customer Inline
  const handleRegisterNewCustomer = (e) => {
    e.preventDefault();
    if (!newCustName.trim() || !newCustEmail.trim()) {
      alert('Please provide your name and email address.');
      return;
    }
    const user = registerCustomer({
      name: newCustName,
      email: newCustEmail,
      phone: newCustPhone,
      city: newCustCity,
    });
    setRecipientName(user.name);
    setPhone(user.phone);
  };

  // Final Order Confirmation
  const handleConfirmOrder = () => {
    if (!activeUser) {
      setOrderError('Please select or register a demo customer account in Step 1 before confirming.');
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    if (!recipientName.trim() || !addressLine.trim() || !city.trim() || !pincode.trim()) {
      setOrderError('Please complete the delivery address fields in Step 2.');
      return;
    }

    setIsSubmitting(true);
    setOrderError(null);

    try {
      const deliveryAddress = {
        fullName: recipientName,
        addressLine,
        city,
        state,
        pincode,
        phone,
      };

      const result = placeDemoOrder({
        patientId: activeUser.id,
        patientName: activeUser.name,
        items: cart,
        subtotal: totalPrice,
        shippingFee,
        total: orderTotal,
        deliveryAddress,
      });

      if (result.success) {
        clearCart();
        navigate(`/order-confirmation/${result.orderId}`);
      }
    } catch (err) {
      console.error('Failed to place order:', err);
      setOrderError('An unexpected error occurred while placing simulated order. Please retry.');
      setIsSubmitting(false);
    }
  };

  // If cart is empty, show friendly empty cart state
  if (cart.length === 0) {
    return (
      <div className="py-20 bg-[#F7F5EF] min-h-[75vh] flex items-center justify-center font-sans">
        <Container size="narrow">
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-warm-300 text-center space-y-4 shadow-soft-sm">
            <div className="w-16 h-16 rounded-full bg-warm-200 text-[#49614D] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8 opacity-70" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#1C251E]">
              Your Wellness Cart is Empty
            </h2>
            <p className="text-xs sm:text-sm text-earth-600 max-w-sm mx-auto">
              You do not have any healthcare products in your cart to checkout. Browse our physician-approved botanical catalog to begin.
            </p>
            <div className="pt-2">
              <Link to="/products">
                <Button variant="primary" icon={ArrowLeft} iconPosition="left">
                  Explore Healthcare Shop
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-14 bg-[#F7F5EF] min-h-screen font-sans">
      <Container>
        {/* Breadcrumb & Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-earth-600">
          <Link to="/" className="hover:text-[#49614D]">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#49614D]">Shop</Link>
          <span>/</span>
          <span className="text-[#1C251E] font-medium">Checkout & Order Placement</span>
        </div>

        {/* Page Header */}
        <div className="mb-6 space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Badge variant="botanical">Simulated Prototype Checkout</Badge>
            <span className="text-xs text-earth-500 font-medium">
              Pan-India Express Dispatch
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C251E]">
            Complete Your Healthcare Order
          </h1>
          <p className="text-xs text-earth-600">
            Verify your delivery address and review formulation quantities before placing your simulated clinic dispatch.
          </p>
        </div>

        {/* Elegant 3-Step Progress Indicator */}
        <div className="mb-10 max-w-2xl mx-auto py-2">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-warm-300 z-0" />
            
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center bg-[#F7F5EF] px-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                activeUser ? 'bg-[#49614D] text-white ring-4 ring-[#49614D]/20 shadow-xs' : 'bg-white text-[#49614D] border-2 border-[#49614D]'
              }`}>
                {activeUser ? <CheckCircle2 className="w-4 h-4 text-white" /> : '1'}
              </div>
              <span className="text-[11px] font-bold text-[#1C251E] mt-1.5">Account</span>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center bg-[#F7F5EF] px-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                recipientName && addressLine && city ? 'bg-[#49614D] text-white ring-4 ring-[#49614D]/20 shadow-xs' : 'bg-white text-earth-500 border-2 border-warm-300'
              }`}>
                2
              </div>
              <span className="text-[11px] font-bold text-[#1C251E] mt-1.5">Delivery Details</span>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center bg-[#F7F5EF] px-3">
              <div className="w-9 h-9 rounded-full bg-white text-[#E83F35] border-2 border-[#E83F35] flex items-center justify-center font-bold text-xs ring-4 ring-[#E83F35]/15 shadow-xs">
                3
              </div>
              <span className="text-[11px] font-bold text-[#1C251E] mt-1.5">Review & Confirm</span>
            </div>
          </div>
        </div>

        {orderError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-300 text-xs text-red-900 flex items-center gap-3 animate-in fade-in">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
            <p className="font-medium">{orderError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Multi-step checkout details */}
          <div className="lg:col-span-7 space-y-6">
            {/* STEP 1: ACCOUNT IDENTIFICATION */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#CBD5CD] shadow-soft-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-warm-200">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#49614D] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="font-serif text-xl font-bold text-[#1C251E]">
                    Account Identification
                  </h2>
                </div>

                {activeUser ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Identified
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-[#E83F35] bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                    Required for Order Record
                  </span>
                )}
              </div>

              {activeUser ? (
                /* Authenticated State Display */
                <div className="p-4 rounded-2xl bg-[#F4F6F4] border border-botanical-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#49614D] text-white flex items-center justify-center font-serif font-bold text-sm">
                      {activeUser.avatarText || activeUser.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#1C251E]">
                        {activeUser.name}
                      </h4>
                      <p className="text-xs text-earth-600">
                        {activeUser.email} &bull; <span className="capitalize">{activeUser.role} Account</span>
                      </p>
                      {activeUser.linkedDoctorId ? (
                        <span className="text-[10px] text-[#49614D] font-semibold block">
                          ✓ Linked to Clinic Physician
                        </span>
                      ) : (
                        <span className="text-[10px] text-earth-500 font-medium block">
                          Independent Shopper (No doctor connected yet)
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    to="/login?redirect=/checkout"
                    className="text-xs text-[#49614D] font-bold hover:underline"
                  >
                    Switch Identity &rarr;
                  </Link>
                </div>
              ) : (
                /* Unauthenticated State: Select Demo Patient or 1-Click Register */
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 p-1 bg-warm-100 rounded-2xl border border-warm-300">
                    <button
                      type="button"
                      onClick={() => setAuthMode('demo_select')}
                      className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                        authMode === 'demo_select'
                          ? 'bg-white text-[#49614D] shadow-soft-sm'
                          : 'text-earth-600 hover:text-[#1C251E]'
                      }`}
                    >
                      Use Demo Patient
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode('new_register')}
                      className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                        authMode === 'new_register'
                          ? 'bg-white text-[#49614D] shadow-soft-sm'
                          : 'text-earth-600 hover:text-[#1C251E]'
                      }`}
                    >
                      Register New Customer
                    </button>
                  </div>

                  {authMode === 'demo_select' ? (
                    <div className="space-y-2.5">
                      <p className="text-xs text-earth-600">
                        Select a fictional demonstration patient to link this order to their dashboard:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {patients.slice(0, 4).map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => handleSelectDemoPatient(p.id)}
                            className="p-3 rounded-2xl border border-warm-300 hover:border-[#49614D] bg-[#F4F6F4] text-left transition-all cursor-pointer hover:shadow-xs group"
                          >
                            <span className="font-serif font-bold text-xs text-[#1C251E] block group-hover:text-[#49614D]">
                              {p.name}
                            </span>
                            <span className="text-[11px] text-earth-500 block truncate">
                              {p.email}
                            </span>
                            <span className="text-[10px] text-[#49614D] font-medium block mt-0.5">
                              ID: #{p.id} &bull; {p.city}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="pt-1 text-center">
                        <Link
                          to="/login?redirect=/checkout"
                          className="text-xs text-[#49614D] font-bold hover:underline"
                        >
                          Have custom credentials? Sign in via Portal &rarr;
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleRegisterNewCustomer} className="space-y-3 text-xs">
                      <p className="text-xs text-earth-600">
                        Create an instant customer profile for this order (independent shopper, no doctor linked yet):
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="font-bold text-[#1C251E] block mb-1">Your Full Name:</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Meera Joshi"
                            value={newCustName}
                            onChange={(e) => setNewCustName(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-[#1C251E] block mb-1">Email Address:</label>
                          <input
                            type="email"
                            required
                            placeholder="meera@example.com"
                            value={newCustEmail}
                            onChange={(e) => setNewCustEmail(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="font-bold text-[#1C251E] block mb-1">Phone Number:</label>
                          <input
                            type="tel"
                            placeholder="+91 98200 99881"
                            value={newCustPhone}
                            onChange={(e) => setNewCustPhone(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-[#1C251E] block mb-1">City, State:</label>
                          <input
                            type="text"
                            placeholder="Mumbai, MH"
                            value={newCustCity}
                            onChange={(e) => setNewCustCity(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        className="w-full"
                        icon={UserPlus}
                        iconPosition="left"
                      >
                        Create Account & Continue Order
                      </Button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* STEP 2: DELIVERY DETAILS */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#CBD5CD] shadow-soft-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-warm-200">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#49614D] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="font-serif text-xl font-bold text-[#1C251E]">
                    Delivery Address
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handlePrefillAddress}
                  className="text-xs text-[#49614D] font-bold hover:underline bg-[#F4F6F4] px-3 py-1 rounded-full border border-botanical-200 cursor-pointer"
                >
                  ⚡ Auto-Fill Sample Address
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-[#1C251E] block">Full Recipient Name:</label>
                    <input
                      type="text"
                      required
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#1C251E] block">Contact Mobile Number:</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98200 12345"
                      className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1C251E] block">Street Address / House / Apartment:</label>
                  <input
                    type="text"
                    required
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder="Flat / Building, Street, Landmark"
                    className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div className="space-y-1">
                    <label className="font-bold text-[#1C251E] block">City:</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#1C251E] block">State:</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State"
                      className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#1C251E] block">PIN Code:</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="400050"
                      className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: PAYMENT SIMULATION DISCLAIMER */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#CBD5CD] shadow-soft-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-warm-200">
                <span className="w-7 h-7 rounded-full bg-[#49614D] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="font-serif text-xl font-bold text-[#1C251E]">
                  Payment & Delivery Mode
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-warm-50 border border-warm-300 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="simulated_cod"
                      name="payment_method"
                      defaultChecked
                      className="text-[#49614D] focus:ring-[#49614D]"
                    />
                    <label htmlFor="simulated_cod" className="text-xs font-bold text-[#1C251E] cursor-pointer">
                      Simulated Cash on Delivery / Demo Payment
                    </label>
                  </div>
                  <Badge variant="botanical">Prototype Mode</Badge>
                </div>
                <p className="text-[11px] text-earth-600 pl-5">
                  No payment gateway or card numbers required. Instant order authorization for demonstration.
                </p>
              </div>

              {/* Prominent Prototype Simulation Notice */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 text-xs text-amber-950 space-y-1">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>DEMO CHECKOUT — No Payment Collected</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-900">
                  This checkout is a full prototype simulation. Submitting this order will immediately deduct item quantities from live stock in the <strong>Admin Dashboard</strong> and register the dispatch record in your <strong>Patient Order History</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review & Financial Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#CBD5CD] shadow-soft-sm space-y-5 sticky top-28">
              <div className="flex items-center justify-between pb-3 border-b border-warm-200">
                <h3 className="font-serif text-xl font-bold text-[#1C251E]">
                  Order Summary
                </h3>
                <span className="text-xs text-earth-500 font-medium">
                  {cart.length} {cart.length === 1 ? 'Formulation' : 'Formulations'}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 text-xs py-2 border-b border-warm-100 last:border-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-warm-100 flex items-center justify-center font-serif font-bold text-[#49614D] shrink-0 border border-warm-200">
                        {item.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-[#1C251E] truncate">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-earth-500">
                          Qty: {item.quantity} &times; ₹{item.price} &bull; {item.volume || 'Standard Pack'}
                        </span>
                      </div>
                    </div>

                    <span className="font-serif font-bold text-sm text-[#1C251E] shrink-0">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-3 border-t border-warm-200 text-xs">
                <div className="flex justify-between text-earth-600">
                  <span>Catalog Subtotal</span>
                  <span className="font-medium text-[#1C251E]">₹{totalPrice}</span>
                </div>

                <div className="flex justify-between text-earth-600">
                  <span>Standard Botanical Delivery</span>
                  <span className="font-medium text-emerald-700">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>

                {shippingFee > 0 && (
                  <p className="text-[10px] text-earth-500">
                    Add ₹{499 - totalPrice} more to qualify for Free Shipping!
                  </p>
                )}

                <div className="flex justify-between text-sm font-bold text-[#1C251E] pt-3 border-t border-warm-200">
                  <span className="font-serif text-lg">Total Amount Due</span>
                  <span className="font-serif text-xl text-[#49614D]">₹{orderTotal}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                variant="vermilion"
                size="lg"
                className="w-full justify-center shadow-md hover:shadow-lg"
                icon={ArrowRight}
                iconPosition="right"
                disabled={isSubmitting}
                onClick={handleConfirmOrder}
              >
                {isSubmitting ? 'Placing Order...' : 'Confirm Simulated Order'}
              </Button>

              {/* Reassurances */}
              <div className="space-y-1.5 pt-2 text-center text-[11px] text-earth-500">
                <div className="flex items-center justify-center gap-1.5 font-medium text-[#49614D]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Genuine Non-Prescription Botanical Stock</span>
                </div>
                <p className="text-[10px] text-earth-400">
                  Central Herbarium Fulfillment &bull; Doorstep Tracking Included
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
