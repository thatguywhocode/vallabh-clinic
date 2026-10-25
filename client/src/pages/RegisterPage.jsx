import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  User, 
  Stethoscope, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Mail, 
  Phone,
  MapPin,
  AlertCircle,
  FileCheck,
  ShoppingBag
} from 'lucide-react';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useDemoData } from '../context/DemoDataContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || null;

  const { registerCustomer } = useDemoData();

  const [roleTab, setRoleTab] = useState('patient'); // 'patient' | 'doctor' | 'admin'

  // Patient form
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientCity, setPatientCity] = useState('');
  const [patientPassword, setPatientPassword] = useState('');
  const [patientConfirmPassword, setPatientConfirmPassword] = useState('');

  // Doctor form
  const [doctorName, setDoctorName] = useState('');
  const [doctorEmail, setDoctorEmail] = useState('');
  const [doctorLicense, setDoctorLicense] = useState('');
  const [doctorQualification, setDoctorQualification] = useState('');
  const [doctorSpecialization, setDoctorSpecialization] = useState('');

  // Demonstration feedback toast
  const [demoNotice, setDemoNotice] = useState(null);

  const handlePatientSubmit = (e) => {
    e.preventDefault();
    if (patientPassword && patientConfirmPassword && patientPassword !== patientConfirmPassword) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }

    // Register customer automatically into demo store with linkedDoctorId: null
    registerCustomer({
      name: patientName,
      email: patientEmail,
      phone: patientPhone,
      city: patientCity,
    });

    // If redirected from checkout, navigate right back to checkout
    if (redirectUrl) {
      navigate(redirectUrl);
    } else {
      navigate('/patient/dashboard');
    }
  };

  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    setDemoNotice({
      title: 'Practitioner Verification Request Logged',
      message: 'Physician registration requires official Medical Council credential verification before prescribing authority is activated. You can immediately test clinical prescribing using Dr. Arvind Vallabh.',
    });
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
                  Create Account to Complete Checkout
                </span>
                <p className="text-[11px] text-earth-700">
                  Register below as a demo customer to proceed with your order. Your cart items are preserved.
                </p>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#49614D]">
              Healthcare Platform Portal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C251E]">
              Create an Account
            </h1>
            <p className="text-xs text-earth-600">
              Join the VALLABH CLINIC platform to access personalized botanical care and physician consultation.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CBD5CD] shadow-soft-sm space-y-5">
            {/* Account Type Toggle */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-earth-600 block">
                Account Registration Category:
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-warm-100 rounded-2xl border border-warm-300">
                <button
                  type="button"
                  onClick={() => {
                    setRoleTab('patient');
                    setDemoNotice(null);
                  }}
                  className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    roleTab === 'patient'
                      ? 'bg-white text-[#49614D] shadow-soft-sm'
                      : 'text-earth-600 hover:text-[#1C251E]'
                  }`}
                >
                  Patient
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRoleTab('doctor');
                    setDemoNotice(null);
                  }}
                  className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    roleTab === 'doctor'
                      ? 'bg-white text-[#49614D] shadow-soft-sm'
                      : 'text-earth-600 hover:text-[#1C251E]'
                  }`}
                >
                  Doctor
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRoleTab('admin');
                    setDemoNotice(null);
                  }}
                  className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    roleTab === 'admin'
                      ? 'bg-white text-[#E83F35] shadow-soft-sm'
                      : 'text-earth-600 hover:text-[#1C251E]'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            {/* Notice Display */}
            {demoNotice && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs space-y-1 animate-in fade-in">
                <span className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  {demoNotice.title}
                </span>
                <p className="text-[11px] leading-relaxed text-emerald-800">
                  {demoNotice.message}
                </p>
                <div className="pt-1">
                  <Link to={redirectUrl ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : '/login'} className="font-bold text-[#49614D] underline">
                    Return to Login Page &rarr;
                  </Link>
                </div>
              </div>
            )}

            {/* TAB 1: Patient Registration */}
            {roleTab === 'patient' && !demoNotice && (
              <form onSubmit={handlePatientSubmit} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[#1C251E] block">Full Name:</label>
                  <input
                    type="text"
                    placeholder="e.g. Meera Joshi"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1C251E] block">Email Address:</label>
                  <input
                    type="email"
                    placeholder="meera@example.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="font-bold text-[#1C251E] block">Phone Number:</label>
                    <input
                      type="tel"
                      placeholder="+91 98200 12345"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#1C251E] block">City & State:</label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, MH"
                      value={patientCity}
                      onChange={(e) => setPatientCity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1C251E] block">Create Password:</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={patientPassword}
                    onChange={(e) => setPatientPassword(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1C251E] block">Confirm Password:</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={patientConfirmPassword}
                    onChange={(e) => setPatientConfirmPassword(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full mt-2"
                >
                  Register Customer / Patient Account
                </Button>
              </form>
            )}

            {/* TAB 2: Doctor Registration */}
            {roleTab === 'doctor' && !demoNotice && (
              <form onSubmit={handleDoctorSubmit} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[#1C251E] block">Doctor Full Name & Title:</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. K. N. Varma"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1C251E] block">Official Email Address:</label>
                  <input
                    type="email"
                    placeholder="dr.varma@clinic.org"
                    value={doctorEmail}
                    onChange={(e) => setDoctorEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1C251E] block">Medical Council Registration / License No:</label>
                  <input
                    type="text"
                    placeholder="e.g. MCI-REG-2016-5829"
                    value={doctorLicense}
                    onChange={(e) => setDoctorLicense(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1C251E] block">Qualifications & Degrees:</label>
                  <input
                    type="text"
                    placeholder="e.g. BAMS, MD (Ayurveda), Fellowship in Phyto-Therapy"
                    value={doctorQualification}
                    onChange={(e) => setDoctorQualification(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1C251E] block">Clinical Specialization Focus:</label>
                  <input
                    type="text"
                    placeholder="e.g. Integrative Gastroenterology, Hepatology"
                    value={doctorSpecialization}
                    onChange={(e) => setDoctorSpecialization(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:ring-2 focus:ring-[#49614D]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full mt-2"
                >
                  Submit Practitioner Verification Request
                </Button>
              </form>
            )}

            {/* TAB 3: Admin Provisioning Message */}
            {roleTab === 'admin' && (
              <div className="p-6 rounded-2xl bg-warm-100 border border-warm-300 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#E83F35]/10 text-[#E83F35] flex items-center justify-center mx-auto">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C251E]">
                  Internal Provisioning Only
                </h3>
                <p className="text-xs text-earth-700 leading-relaxed font-sans max-w-sm mx-auto">
                  Administrator and central pharmacy operations accounts cannot be registered publicly. They are provisioned internally by clinical operations.
                </p>
                <div className="pt-2">
                  <Link to={redirectUrl ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : '/login'}>
                    <Button variant="secondary" size="sm">
                      Go to Demo Persona Sign-In
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Footer Back to Login */}
            <div className="pt-3 border-t border-warm-200 text-center text-xs text-earth-600">
              Already have an account?{' '}
              <Link
                to={redirectUrl ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : '/login'}
                className="font-bold text-[#49614D] underline hover:text-black"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
