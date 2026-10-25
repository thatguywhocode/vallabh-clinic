import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  User, 
  Stethoscope, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Sparkles,
  Users,
  ShoppingBag
} from 'lucide-react';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useDemoData } from '../context/DemoDataContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || null;

  const { 
    loginAsPatient, 
    loginAsDoctor, 
    loginAsAdmin, 
    registerCustomer, 
    patients, 
    doctors 
  } = useDemoData();

  const [accountType, setAccountType] = useState('patient'); // 'patient' | 'doctor' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authNotice, setAuthNotice] = useState(null);
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert('Please enter an email address to proceed.');
      return;
    }

    if (accountType === 'patient') {
      const existing = patients.find(
        (p) => p.email?.toLowerCase() === email.trim().toLowerCase()
      );
      if (existing) {
        loginAsPatient(existing.id);
      } else {
        // Automatically create a demo patient account for this email
        const derivedName = email.split('@')[0].replace(/[._-]/g, ' ');
        const capName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
        registerCustomer({
          name: capName || 'Demo Customer',
          email: email.trim(),
        });
      }
      navigate(redirectUrl || '/patient/dashboard');
    } else if (accountType === 'doctor') {
      const existing = doctors.find(
        (d) => d.email?.toLowerCase() === email.trim().toLowerCase()
      );
      loginAsDoctor(existing ? existing.id : 'doc-1');
      navigate(redirectUrl || '/doctor/dashboard');
    } else {
      loginAsAdmin();
      navigate(redirectUrl || '/admin/dashboard');
    }
  };

  const handleLaunchDemoPatient = (patientId = 'pat-1') => {
    loginAsPatient(patientId);
    navigate(redirectUrl || '/patient/dashboard');
  };

  const handleLaunchDemoDoctor = (doctorId = 'doc-1') => {
    loginAsDoctor(doctorId);
    navigate(redirectUrl || '/doctor/dashboard');
  };

  const handleLaunchDemoAdmin = () => {
    loginAsAdmin();
    navigate(redirectUrl || '/admin/dashboard');
  };

  return (
    <div className="py-12 md:py-16 bg-[#F7F5EF] min-h-screen font-sans flex items-center justify-center">
      <Container size="narrow">
        <div className="max-w-md mx-auto space-y-6">
          {/* Checkout Return Banner Notice */}
          {redirectUrl && (
            <div className="p-4 rounded-2xl bg-[#49614D]/10 border border-[#49614D]/30 text-xs text-[#28362B] flex items-center gap-3 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-[#49614D] text-white flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold block text-sm text-[#1C251E]">
                  Checkout Account Identification
                </span>
                <p className="text-[11px] text-earth-700">
                  Please sign in or select a demo persona below to proceed with your order. Your cart items are preserved.
                </p>
              </div>
            </div>
          )}

          {/* Header Title */}
          <div className="text-center space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#49614D]">
              Healthcare Platform Portal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C251E]">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-earth-600">
              Access your personalized botanical care plans, physician records, or clinic inventory.
            </p>
          </div>

          {/* Main Auth Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CBD5CD] shadow-soft-sm space-y-5">
            {/* Account Type Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-earth-600 block">
                Select Account Type:
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-warm-100 rounded-2xl border border-warm-300">
                <button
                  type="button"
                  onClick={() => setAccountType('patient')}
                  className={`py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    accountType === 'patient'
                      ? 'bg-white text-[#49614D] shadow-soft-sm'
                      : 'text-earth-600 hover:text-[#1C251E]'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Patient</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType('doctor')}
                  className={`py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    accountType === 'doctor'
                      ? 'bg-white text-[#49614D] shadow-soft-sm'
                      : 'text-earth-600 hover:text-[#1C251E]'
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Doctor</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType('admin')}
                  className={`py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    accountType === 'admin'
                      ? 'bg-white text-[#49614D] shadow-soft-sm'
                      : 'text-earth-600 hover:text-[#1C251E]'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </button>
              </div>
            </div>

            {/* Email & Password Form */}
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-earth-700 block">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-earth-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      accountType === 'patient'
                        ? 'rohan.mehta@demo.patient'
                        : accountType === 'doctor'
                        ? 'dr.arvind@vallabhclinic.demo'
                        : 'admin@vallabhclinic.demo'
                    }
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#49614D] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-earth-700 block">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotNotice(true)}
                    className="text-[11px] text-earth-500 hover:text-[#49614D] transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-earth-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter any password for demo"
                    className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#49614D] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-400 hover:text-earth-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {showForgotNotice && (
                <div className="p-3 rounded-xl bg-warm-100 border border-warm-300 text-xs text-earth-700 space-y-1">
                  <div className="flex items-center justify-between font-semibold text-[#1C251E]">
                    <span>Password Reset Notice</span>
                    <button
                      type="button"
                      onClick={() => setShowForgotNotice(false)}
                      className="text-earth-400 hover:text-earth-700"
                    >
                      &times;
                    </button>
                  </div>
                  <p className="text-[11px] text-earth-600">
                    Self-service credential recovery will be available with backend deployment. For evaluation, use any demo persona or enter your email.
                  </p>
                </div>
              )}

              <Button
                variant="primary"
                type="submit"
                className="w-full justify-center"
                icon={ArrowRight}
                iconPosition="right"
              >
                Sign In to {accountType === 'patient' ? 'Patient Portal' : accountType === 'doctor' ? 'Clinical Portal' : 'Admin Operations'}
              </Button>
            </form>

            {/* Registration Prompt Link */}
            <div className="pt-3 border-t border-warm-200 text-center text-xs text-earth-600">
              <span>New to VALLABH CLINIC? </span>
              <Link
                to={redirectUrl ? `/register?redirect=${encodeURIComponent(redirectUrl)}` : '/register'}
                className="text-[#49614D] font-bold hover:underline"
              >
                Create an account
              </Link>
            </div>
          </div>

          {/* Quick Demo Personas Showcase (1-Click Switchers) */}
          <div className="bg-white rounded-3xl p-6 border border-warm-300 shadow-soft-sm space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#49614D]" />
              <h3 className="font-serif text-lg font-bold text-[#1C251E]">
                Explore Demo Personas
              </h3>
            </div>
            <p className="text-xs text-earth-600">
              For evaluation, click any identity below to sign in instantly and test connected dashboard flows:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleLaunchDemoPatient('pat-1')}
                className="p-3 rounded-2xl border border-warm-300 hover:border-[#49614D] bg-[#F4F6F4] text-left transition-all cursor-pointer group"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#49614D] block">Patient</span>
                <span className="font-serif font-bold text-sm text-[#1C251E] block">Rohan Mehta</span>
                <span className="text-[10px] text-earth-500">Dyspepsia Regimen</span>
              </button>

              <button
                type="button"
                onClick={() => handleLaunchDemoDoctor('doc-1')}
                className="p-3 rounded-2xl border border-warm-300 hover:border-[#49614D] bg-[#F4F6F4] text-left transition-all cursor-pointer group"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#49614D] block">Physician</span>
                <span className="font-serif font-bold text-sm text-[#1C251E] block">Dr. A. Vallabh</span>
                <span className="text-[10px] text-earth-500">2 Linked Patients</span>
              </button>

              <button
                type="button"
                onClick={handleLaunchDemoAdmin}
                className="p-3 rounded-2xl border border-warm-300 hover:border-[#E83F35] bg-warm-100 text-left transition-all cursor-pointer group"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E83F35] block">Admin</span>
                <span className="font-serif font-bold text-sm text-[#1C251E] block">Operations Desk</span>
                <span className="text-[10px] text-earth-500">Stock & Orders</span>
              </button>
            </div>

            <div className="pt-2 text-center">
              <Link
                to="/demo-access"
                className="text-xs text-[#49614D] font-semibold underline hover:text-black inline-flex items-center gap-1"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Open Detailed Role & Persona Switcher</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
