import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Stethoscope, 
  ShieldAlert, 
  Settings, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  HeartHandshake, 
  ShieldCheck, 
  CheckCircle2,
  Info
} from 'lucide-react';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Logo from '../components/common/Logo';
import { useDemoData } from '../context/DemoDataContext';

export default function DemoAccessPage() {
  const navigate = useNavigate();
  const { 
    doctors, 
    patients, 
    currentDoctorId, 
    currentPatientId, 
    loginAsPatient,
    loginAsDoctor,
    loginAsAdmin,
    resetDemoData 
  } = useDemoData();

  const handleSelectPatient = (patientId) => {
    loginAsPatient(patientId);
    navigate('/patient/dashboard');
  };

  const handleSelectDoctor = (doctorId) => {
    loginAsDoctor(doctorId);
    navigate('/doctor/dashboard');
  };

  const handleSelectAdmin = () => {
    loginAsAdmin();
    navigate('/admin/dashboard');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo data back to factory state? This restores all 2 doctors, 4 patients, initial recommendations, and default stock levels.')) {
      resetDemoData();
      alert('Demo data has been reset to initial factory state.');
    }
  };

  return (
    <div className="py-12 md:py-16 bg-[#F7F5EF] min-h-screen">
      <Container>
        {/* Top Header & Context */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="flex justify-center mb-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-[#49614D] font-bold hover:underline bg-white px-3.5 py-1.5 rounded-full border border-warm-300 shadow-soft-sm"
            >
              &larr; Switch to Professional Sign In (/login)
            </Link>
          </div>

          {/* Fictional System Disclaimer */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E83F35]/10 border border-[#E83F35]/30 text-[#E83F35] text-xs font-semibold">
            <ShieldAlert className="w-4 h-4" />
            <span>DEMO MODE — SAMPLE DATA (Presentation Demonstration — Not Secure Authentication)</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C251E] leading-tight">
            Role-Based Demo Access Portal
          </h1>
          <p className="text-sm sm:text-base text-[#41382E] font-sans max-w-2xl mx-auto leading-relaxed">
            Select an interactive demonstration identity below to explore connected workflows between patients, clinical physicians, and pharmacy administrators. All data persists locally in your browser.
          </p>
        </div>

        {/* 3 Main Role Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Column 1: Patient Persona */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#49614D]/20 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F7F5EF]">
                <div className="w-12 h-12 rounded-2xl bg-[#49614D]/10 text-[#49614D] flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <Badge variant="botanical">Role: Patient</Badge>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1C251E]">
                  Enter as Patient
                </h3>
                <p className="text-xs text-[#5D4F3F] font-sans mt-1">
                  View personalized care protocol, doctor's recommendations, add items to cart, and track order fulfillment.
                </p>
              </div>

              {/* Patient Selector Radio Cards */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[11px] font-bold text-[#49614D] uppercase tracking-wider block">
                  Select Demo Patient Persona:
                </span>
                {patients.map((pat) => {
                  const linkedDoc = doctors.find((d) => d.id === pat.linkedDoctorId);
                  const isSelected = pat.id === currentPatientId;

                  return (
                    <button
                      key={pat.id}
                      type="button"
                      onClick={() => setCurrentPatientId(pat.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#49614D] bg-[#F4F6F4] ring-2 ring-[#49614D]/20'
                          : 'border-warm-300 hover:border-[#49614D]/40 bg-warm-50/50'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-[#1C251E] flex items-center gap-1.5">
                          <span>{pat.name}</span>
                          <span className="text-[10px] text-earth-500 font-normal">({pat.age}y &bull; {pat.gender})</span>
                        </div>
                        <span className="text-[11px] text-earth-600 block truncate max-w-[210px]">
                          {pat.primaryCondition}
                        </span>
                        <span className="text-[10px] text-[#49614D] font-medium block mt-0.5">
                          Doctor: {linkedDoc?.name}
                        </span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#49614D] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-warm-200">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => handleSelectPatient(currentPatientId)}
              >
                Launch Patient Dashboard
              </Button>
            </div>
          </div>

          {/* Column 2: Doctor Persona */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#49614D]/20 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F7F5EF]">
                <div className="w-12 h-12 rounded-2xl bg-[#49614D]/10 text-[#49614D] flex items-center justify-center">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <Badge variant="botanical">Role: Doctor</Badge>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1C251E]">
                  Enter as Clinician
                </h3>
                <p className="text-xs text-[#5D4F3F] font-sans mt-1">
                  Review linked patients, examine health conditions, and prescribe tailored botanical product regimens.
                </p>
              </div>

              {/* Doctor Selector Cards */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-bold text-[#49614D] uppercase tracking-wider block">
                  Select Demo Doctor Persona:
                </span>
                {doctors.map((doc) => {
                  const isSelected = doc.id === currentDoctorId;
                  const patientCount = doc.linkedPatientIds.length;

                  return (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setCurrentDoctorId(doc.id)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#49614D] bg-[#F4F6F4] ring-2 ring-[#49614D]/20'
                          : 'border-warm-300 hover:border-[#49614D]/40 bg-warm-50/50'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-[#1C251E]">{doc.name}</div>
                        <span className="text-[11px] text-earth-500 block">{doc.qualification}</span>
                        <span className="text-[10px] text-earth-600 block mt-0.5 line-clamp-1">
                          {doc.specialization}
                        </span>
                        <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-[#49614D]/10 text-[#49614D] font-semibold">
                          {patientCount} Linked Patients ({doc.linkedPatientIds.join(', ')})
                        </span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#49614D] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-warm-200">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => handleSelectDoctor(currentDoctorId)}
              >
                Launch Doctor Dashboard
              </Button>
            </div>
          </div>

          {/* Column 3: Admin Persona */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#49614D]/20 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F7F5EF]">
                <div className="w-12 h-12 rounded-2xl bg-[#E83F35]/10 text-[#E83F35] flex items-center justify-center">
                  <Settings className="w-6 h-6" />
                </div>
                <Badge variant="vermilion">Role: Admin</Badge>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1C251E]">
                  Enter as Admin
                </h3>
                <p className="text-xs text-[#5D4F3F] font-sans mt-1">
                  Manage inventory stock levels, review incoming sample orders, verify clinic doctors, and oversee master catalog.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-warm-100 border border-warm-200 text-xs space-y-2">
                <span className="font-semibold text-[#1C251E] block">Operations Capabilities:</span>
                <ul className="space-y-1.5 text-earth-700 text-[11px]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#49614D]" />
                    <span>Real-time stock edits and archiving</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#49614D]" />
                    <span>Sample order timeline updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#49614D]" />
                    <span>Doctor credential oversight table</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#49614D]" />
                    <span>Master disease category taxonomy</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-warm-200">
              <Button
                variant="vermilion"
                size="md"
                className="w-full"
                icon={ArrowRight}
                iconPosition="right"
                onClick={handleSelectAdmin}
              >
                Launch Admin Dashboard
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Actions & Reset Utility */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#49614D]/20 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-lg font-bold text-[#1C251E]">
              Need to restart or re-test the entire presentation flow?
            </h4>
            <p className="text-xs text-earth-600 font-sans">
              Resetting restores all default doctors, patients, inventory quantities, and initial recommendations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={RotateCcw}
              onClick={handleResetData}
            >
              Reset All Demo Data
            </Button>
            <Link to="/">
              <Button variant="secondary" size="sm">
                Back to Storefront
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
