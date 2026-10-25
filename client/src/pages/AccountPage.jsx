import React, { useState } from 'react';
import { User, ShieldCheck, Stethoscope, FileText, ShoppingBag, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('patient');
  const { addToCart } = useCart();
  const [addedSample, setAddedSample] = useState(false);

  const sampleRecommended = PRODUCTS.slice(0, 2);

  const handleAddAllRecommended = () => {
    sampleRecommended.forEach((p) => addToCart(p, 1));
    setAddedSample(true);
    setTimeout(() => setAddedSample(false), 3000);
  };

  return (
    <div className="py-12 md:py-20 bg-warm-100 min-h-screen">
      <Container size="narrow">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <Badge variant="vermilion">Upcoming Feature &bull; Milestone 2</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-botanical-900">
            Doctor-Patient Account Portal
          </h1>
          <p className="text-xs sm:text-sm text-earth-600 max-w-lg mx-auto font-sans">
            A unified gateway connecting patient wellness profiles with doctor-prescribed botanical regimens and seamless doorstep refills.
          </p>
        </div>

        {/* Interactive Demo Dashboards Callout */}
        <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-[#49614D] to-[#3D5240] text-white shadow-soft-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F7F5EF] bg-white/20 px-2.5 py-0.5 rounded-full inline-block">
              Interactive Milestone 3 Live
            </span>
            <h3 className="font-serif text-xl font-bold text-white">
              Launch Role-Based Connected Dashboards
            </h3>
            <p className="text-xs text-warm-200">
              Test real-time doctor recommendations, patient dashboard reflection, and admin inventory control.
            </p>
          </div>
          <Link
            to="/demo-access"
            className="px-5 py-2.5 rounded-full bg-[#E83F35] text-white text-xs font-bold tracking-wide hover:bg-[#D4271D] transition-colors shrink-0 shadow-sm"
          >
            Launch Demo Roles &rarr;
          </Link>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-2xl bg-warm-200 border border-warm-300">
            <button
              type="button"
              onClick={() => setActiveTab('patient')}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'patient'
                  ? 'bg-white text-botanical-900 shadow-soft-sm'
                  : 'text-earth-600 hover:text-botanical-800'
              }`}
            >
              Patient Portal Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('doctor')}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'doctor'
                  ? 'bg-white text-botanical-900 shadow-soft-sm'
                  : 'text-earth-600 hover:text-botanical-800'
              }`}
            >
              Doctor Recommendations Flow
            </button>
          </div>
        </div>

        {/* Tab 1: Patient Portal Preview */}
        {activeTab === 'patient' && (
          <div className="space-y-6">
            <Card hoverEffect={false} className="border-botanical-200 bg-white">
              <div className="flex items-center justify-between pb-4 border-b border-warm-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-botanical-100 flex items-center justify-center text-botanical-700">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-botanical-900">
                      Patient Account Overview
                    </h3>
                    <p className="text-xs text-earth-500">
                      Sample Profile: Rohan Mehta (ID: #VC-PAT-4821)
                    </p>
                  </div>
                </div>

                <Badge variant="botanical" dot={true}>
                  Active Care Plan
                </Badge>
              </div>

              {/* Doctor Recommendation Widget */}
              <div className="pt-6 space-y-4">
                <div className="p-4 rounded-2xl bg-botanical-50 border border-botanical-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-botanical-700" />
                      <span className="text-xs font-bold text-botanical-900">
                        Prescribed Regimen by Dr. A. Vallabh, MD
                      </span>
                    </div>
                    <span className="text-[10px] text-earth-500">Updated 3 days ago</span>
                  </div>
                  <p className="text-xs text-earth-700 font-sans">
                    "Recommended 6-week daily protocol for gastro-metabolic harmony and evening stress recovery. Take formulations consistently with warm water."
                  </p>
                </div>

                {/* Items in Regimen */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-semibold text-earth-700 uppercase tracking-wider block">
                    Recommended Products for Your Plan:
                  </span>
                  {sampleRecommended.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl border border-warm-200 flex items-center justify-between bg-warm-50/60"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-botanical-900">{item.name}</h4>
                        <p className="text-[11px] text-earth-500">{item.subtitle}</p>
                        <span className="text-xs font-serif font-bold text-botanical-800">
                          ₹{item.price}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addToCart(item, 1)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    variant="vermilion"
                    size="sm"
                    icon={ShoppingBag}
                    iconPosition="left"
                    onClick={handleAddAllRecommended}
                  >
                    {addedSample ? '✓ Added to Cart!' : 'Add All Recommended to Cart'}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Implementation note */}
            <div className="p-4 rounded-2xl bg-warm-200/60 border border-warm-300 text-xs text-earth-700 flex items-start gap-3">
              <Lock className="w-4 h-4 text-botanical-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-botanical-900 block">Milestone 1 Preview Note:</span>
                Patient authentication, password encryption, MongoDB Atlas schemas, and real-time doctor prescription sync will be introduced in Milestone 2.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Doctor Recommendations Flow */}
        {activeTab === 'doctor' && (
          <div className="space-y-6">
            <Card hoverEffect={false} className="border-botanical-200 bg-white space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-warm-200">
                <div className="w-12 h-12 rounded-2xl bg-botanical-100 flex items-center justify-center text-botanical-700">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-botanical-900">
                    How Doctor Recommendations Work
                  </h3>
                  <p className="text-xs text-earth-500">
                    Bridge clinical consultation with convenient healthcare e-commerce
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: '01',
                    title: 'Clinical Consultation & Diagnosis',
                    desc: 'The doctor evaluates patient biomarkers, constitutional health history, and current symptoms.'
                  },
                  {
                    step: '02',
                    title: 'Custom Digital Protocol Selection',
                    desc: 'From the clinic catalog, the physician assigns specific non-prescription botanical extracts, dosages, and regimen duration.'
                  },
                  {
                    step: '03',
                    title: 'Patient Account Notification',
                    desc: 'The patient immediately receives a notification on their mobile or web portal with their curated care plan.'
                  },
                  {
                    step: '04',
                    title: 'One-Click Refill & Doorstep Delivery',
                    desc: 'Patients review physician instructions and order authentic formulations in Indian Rupees (₹) with guaranteed express delivery.'
                  }
                ].map((s) => (
                  <div key={s.step} className="flex gap-4 items-start p-3 rounded-xl bg-warm-50 border border-warm-200">
                    <span className="w-8 h-8 rounded-lg bg-botanical-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {s.step}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-botanical-900">{s.title}</h4>
                      <p className="text-xs text-earth-600 font-sans mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </Container>
    </div>
  );
}
