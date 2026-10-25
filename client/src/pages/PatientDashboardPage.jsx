import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Stethoscope, 
  ShoppingBag, 
  Clock, 
  Calendar, 
  Package, 
  CheckCircle2, 
  Truck, 
  AlertCircle, 
  FileText,
  ChevronRight,
  ShieldCheck,
  Plus
} from 'lucide-react';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import DemoHeaderBar from '../components/common/DemoHeaderBar';
import { useDemoData } from '../context/DemoDataContext';
import { useCart } from '../context/CartContext';

export default function PatientDashboardPage() {
  const { 
    patients, 
    doctors, 
    products, 
    recommendations, 
    orders, 
    currentPatient, 
    setCurrentPatientId, 
    diseaseCategories 
  } = useDemoData();

  const { addToCart } = useCart();
  const [addedItemNotice, setAddedItemNotice] = useState(null);

  // Linked Doctor for current patient
  const linkedDoctor = doctors.find((d) => d.id === currentPatient?.linkedDoctorId);

  // Disease category for current patient
  const diseaseCategory = diseaseCategories.find((c) => c.id === currentPatient?.diseaseCategoryId);

  // Recommendations filtered strictly by current patient ID and active status
  const patientRecommendations = recommendations.filter(
    (r) => r.patientId === currentPatient?.id && r.status !== 'withdrawn'
  );

  // Orders filtered strictly by current patient ID
  const patientOrders = orders.filter((o) => o.patientId === currentPatient?.id);

  const handleAddRecommendedToCart = (rec) => {
    const product = products.find((p) => p.id === rec.productId);
    if (product) {
      addToCart(product, 1);
      setAddedItemNotice(`Added "${product.name}" to your cart!`);
      setTimeout(() => setAddedItemNotice(null), 3000);
    }
  };

  return (
    <div className="bg-[#F7F5EF] min-h-screen pb-20 font-sans">
      {/* Top Demo Context Bar */}
      <DemoHeaderBar activeRoleName="Patient Portal" />

      <Container className="pt-8">
        {/* Patient Switcher & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-warm-300">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="botanical">Patient Portal & Care Plans</Badge>
              <span className="text-[11px] text-earth-500 font-mono">ID: #{currentPatient?.id}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C251E]">
              Welcome, {currentPatient?.name}
            </h1>
            <p className="text-xs text-earth-600 font-sans mt-0.5">
              Review customized botanical regimens prescribed by your doctor and track your authentic order refills.
            </p>
          </div>

          {/* Quick Patient Identity Switcher (For Presentation Demonstration) */}
          <div className="bg-white p-2.5 rounded-2xl border border-warm-300 shadow-soft-sm flex items-center gap-2">
            <span className="text-xs font-semibold text-earth-700 whitespace-nowrap pl-1">
              Switch Patient:
            </span>
            <select
              value={currentPatient?.id}
              onChange={(e) => setCurrentPatientId(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-xl border border-warm-300 bg-warm-50 font-medium text-[#1C251E] focus:outline-none focus:ring-2 focus:ring-[#49614D]"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.gender}, {p.age}y &bull; {p.primaryCondition})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Added Item Toast Notification */}
        {addedItemNotice && (
          <div className="mb-6 p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-xs text-emerald-900 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span className="font-semibold">{addedItemNotice}</span>
            </div>
            <span className="text-[11px] text-emerald-800 underline cursor-pointer">
              Cart updated in Navbar
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Patient Profile & Linked Doctor Summary */}
          <div className="lg:col-span-4 space-y-6">
            {/* Patient Clinical Profile Card */}
            <Card hoverEffect={false} className="bg-white border-[#49614D]/20 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-warm-200">
                <div className="w-12 h-12 rounded-2xl bg-[#49614D] text-white flex items-center justify-center font-serif text-lg font-bold shadow-soft-sm">
                  {currentPatient?.avatarText}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1C251E]">
                    {currentPatient?.name}
                  </h3>
                  <span className="text-xs text-earth-500">{currentPatient?.city}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-warm-50 border border-warm-200">
                  <span className="text-[10px] text-earth-500 uppercase tracking-wide block">Age / Gender</span>
                  <span className="font-semibold text-[#1C251E]">{currentPatient?.age} yrs, {currentPatient?.gender}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-warm-50 border border-warm-200">
                  <span className="text-[10px] text-earth-500 uppercase tracking-wide block">Blood Group</span>
                  <span className="font-semibold text-[#1C251E]">{currentPatient?.bloodGroup}</span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-[10px] text-earth-500 uppercase tracking-wide font-bold block">Primary Concern:</span>
                <p className="font-semibold text-[#49614D] bg-[#F4F6F4] p-2.5 rounded-xl border border-botanical-200">
                  {currentPatient?.primaryCondition}
                </p>
                {diseaseCategory && (
                  <span className="text-[10px] text-earth-500 block pt-1">
                    Master Category: <span className="font-medium text-earth-700">{diseaseCategory.name}</span>
                  </span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-warm-100 border border-warm-200 text-xs text-earth-700 space-y-1">
                <span className="font-bold text-[#1C251E] block">Clinical Observation:</span>
                <p className="text-[11px] leading-relaxed text-earth-600">
                  "{currentPatient?.medicalNotes}"
                </p>
              </div>
            </Card>

            {/* Linked Doctor Card */}
            <Card hoverEffect={false} className="bg-white border-[#49614D]/20 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-warm-200">
                <div className="flex items-center gap-2 text-xs font-bold text-[#49614D] uppercase tracking-wide">
                  <Stethoscope className="w-4 h-4" />
                  <span>Linked Physician</span>
                </div>
                {linkedDoctor ? (
                  <Badge variant="botanical" dot={true}>Verified Practitioner</Badge>
                ) : (
                  <Badge variant="neutral">Independent Shopper</Badge>
                )}
              </div>

              {linkedDoctor ? (
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-[#1C251E]">
                    {linkedDoctor.name}
                  </h4>
                  <p className="text-xs text-earth-600 font-medium">{linkedDoctor.qualification}</p>
                  <p className="text-xs text-[#49614D]">{linkedDoctor.specialization}</p>

                  <div className="pt-2 text-[11px] text-earth-500 space-y-1 border-t border-warm-100">
                    <div>License: <span className="font-mono text-earth-700 font-medium">{linkedDoctor.licenseNo}</span></div>
                    <div>Hours: <span className="text-earth-700">{linkedDoctor.consultationHours}</span></div>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-warm-50 border border-warm-200 text-xs space-y-1.5 text-earth-700">
                  <span className="font-bold text-[#1C251E] block">No Doctor Connected Yet</span>
                  <p className="text-[11px] leading-relaxed text-earth-600">
                    You are shopping independently. When you consult a clinic physician in the future, your physician's clinical profile will appear here.
                  </p>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column: Doctor Recommendations & Order History */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section 1: Prescribed Doctor Recommendations */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1C251E]">
                    Doctor's Recommended Regimen
                  </h2>
                  <p className="text-xs text-earth-600">
                    Customized formulations prescribed by {linkedDoctor?.name || 'your physician'} for your health protocol.
                  </p>
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#49614D]/10 text-[#49614D]">
                  {patientRecommendations.length} {patientRecommendations.length === 1 ? 'Product Prescribed' : 'Products Prescribed'}
                </span>
              </div>

              {!currentPatient?.linkedDoctorId ? (
                /* Empty state for independent customer with no doctor connected yet */
                <div className="bg-white rounded-3xl p-8 border border-warm-300 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-warm-100 text-[#49614D] flex items-center justify-center mx-auto">
                    <Leaf className="w-6 h-6 opacity-70" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#1C251E]">
                    No Doctor Connected Yet
                  </h4>
                  <p className="text-xs text-earth-600 max-w-md mx-auto leading-relaxed">
                    No doctor connected yet — You are shopping independently. When you consult a clinic physician in the future, your personalized botanical care recommendations will appear here.
                  </p>
                  <div className="pt-2">
                    <Link to="/products">
                      <Button variant="primary" size="sm" icon={ShoppingBag} iconPosition="left">
                        Explore Healthcare Shop
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : patientRecommendations.length === 0 ? (
                /* Empty state for linked patient with no current prescriptions */
                <div className="bg-white rounded-3xl p-8 border border-warm-300 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-warm-200 text-earth-500 flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6 opacity-60" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#1C251E]">
                    No Active Prescriptions Found
                  </h4>
                  <p className="text-xs text-earth-600 max-w-sm mx-auto">
                    Your physician has not prescribed any custom formulations yet. Switch to the <strong>Doctor Dashboard</strong> as {linkedDoctor?.name} to curate a recommendation for {currentPatient?.name}.
                  </p>
                  <div className="pt-2">
                    <Link to="/demo-access">
                      <Button variant="outline" size="sm">
                        Switch to Doctor Role to Prescribe
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                /* List of recommendations */
                <div className="space-y-4">
                  {patientRecommendations.map((rec) => {
                    const product = products.find((p) => p.id === rec.productId);
                    const isOutOfStock = product && product.stock <= 0;

                    return (
                      <div
                        key={rec.id}
                        className="bg-white rounded-3xl p-6 border border-[#49614D]/25 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
                      >
                        {/* Product visual & details */}
                        <div className="flex gap-4 items-start">
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FCFBF8] to-warm-100 p-2 flex items-center justify-center shrink-0 border border-[#CBD5CD] shadow-2xs">
                            {product?.image ? (
                              <img
                                src={product.image}
                                alt={rec.productName}
                                className="max-h-full max-w-full object-contain"
                              />
                            ) : (
                              <span className="font-serif text-2xl font-bold text-[#49614D]">
                                {rec.productName ? rec.productName.charAt(0) : 'P'}
                              </span>
                            )}
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="botanical" className="text-[10px]">
                                Active Doctor Regimen
                              </Badge>
                              <span className="text-[11px] text-earth-500">
                                Prescribed on {rec.datePrescribed} &bull; Duration: {rec.duration}
                              </span>
                            </div>

                            <h3 className="font-serif text-xl font-bold text-[#1C251E]">
                              {rec.productName}
                            </h3>

                            {product && (
                              <p className="text-xs text-earth-500">
                                {product.subtitle} &bull; <span className="font-medium">{product.volume}</span>
                              </p>
                            )}

                            {/* Dosage Instructions Box */}
                            <div className="mt-2 p-3 rounded-xl bg-warm-50 border border-warm-200 text-xs">
                              <span className="font-bold text-[#49614D] block text-[11px] uppercase tracking-wide">
                                Physician Dosage & Intake Instructions:
                              </span>
                              <p className="text-earth-800 text-xs mt-0.5 font-medium">
                                {rec.dosageNotes}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Price & Add to Cart Action */}
                        <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-warm-200">
                          <div className="text-left md:text-right">
                            <span className="text-[10px] text-earth-500 block uppercase font-bold">Standard Clinic Price</span>
                            <span className="font-serif text-2xl font-bold text-[#1C251E]">
                              ₹{product ? product.price : 449}
                            </span>
                            <span className="text-[10px] text-emerald-700 block font-medium">
                              {product ? `In Stock (${product.stock} units)` : 'Available'}
                            </span>
                          </div>

                          <Button
                            variant="vermilion"
                            size="sm"
                            icon={ShoppingBag}
                            iconPosition="left"
                            disabled={isOutOfStock}
                            onClick={() => handleAddRecommendedToCart(rec)}
                          >
                            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Section 2: Sample Order History with Timeline */}
            <div className="space-y-4 pt-4 border-t border-warm-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1C251E]">
                    Order History & Delivery Timeline
                  </h2>
                  <p className="text-xs text-earth-600">
                    Track the fulfillment and doorstep dispatch of your botanical wellness refills.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-warm-200 text-earth-700">
                  {patientOrders.length} {patientOrders.length === 1 ? 'Order' : 'Orders'}
                </span>
              </div>

              {patientOrders.length === 0 ? (
                /* Empty state for orders */
                <div className="bg-white rounded-3xl p-8 border border-warm-300 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-warm-200 text-earth-500 flex items-center justify-center mx-auto">
                    <Package className="w-6 h-6 opacity-60" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1C251E]">
                    No Orders Placed Yet
                  </h4>
                  <p className="text-xs text-earth-600 max-w-sm mx-auto">
                    When you order products or refill your doctor's recommendations, your order dispatch timeline will appear here.
                  </p>
                </div>
              ) : (
                /* List of Orders */
                <div className="space-y-4">
                  {patientOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white rounded-3xl p-6 border border-warm-300 shadow-soft-sm space-y-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-warm-200">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#1C251E]">{ord.id}</span>
                            <span className="text-xs text-earth-500">&bull; {ord.date}</span>
                          </div>
                          <span className="text-xs text-earth-600">
                            Tracking: <code className="font-mono text-[11px] text-[#49614D] font-bold">{ord.trackingNumber}</code>
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-serif text-lg font-bold text-[#1C251E]">
                            ₹{ord.total}
                          </span>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                            ord.status === 'Delivered' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : ord.status === 'Dispatched'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {ord.status}
                          </span>
                        </div>
                      </div>

                      {/* Purchased Items */}
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold text-earth-500">Items Ordered:</span>
                        {ord.items.map((item, idx) => {
                          const prodMatch = products.find((p) => p.id === item.productId);
                          return (
                            <div key={idx} className="flex justify-between items-center text-xs text-earth-800 py-1 border-b border-warm-100/60 last:border-0">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-warm-100 flex items-center justify-center p-1 border border-warm-200 shrink-0">
                                  {prodMatch?.image ? (
                                    <img src={prodMatch.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                                  ) : (
                                    <span className="font-serif font-bold text-xs text-[#49614D]">{item.name.charAt(0)}</span>
                                  )}
                                </div>
                                <span className="font-medium text-[#1C251E]">{item.name} &times; {item.quantity}</span>
                              </div>
                              <span className="font-semibold text-[#1C251E]">₹{item.price * item.quantity}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Status Timeline */}
                      <div className="pt-3 border-t border-warm-100">
                        <span className="text-[10px] uppercase font-bold text-earth-500 block mb-2">
                          Fulfillment Progress:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {ord.timeline.map((step, idx) => (
                            <div
                              key={idx}
                              className={`p-2 rounded-xl border text-[11px] ${
                                step.done
                                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                                  : 'bg-warm-50 border-warm-200 text-earth-400'
                              }`}
                            >
                              <div className="flex items-center gap-1 font-semibold">
                                {step.done ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <Clock className="w-3.5 h-3.5 shrink-0" />}
                                <span className="truncate">{step.step}</span>
                              </div>
                              <span className="text-[10px] text-earth-500 block mt-0.5 truncate">{step.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
