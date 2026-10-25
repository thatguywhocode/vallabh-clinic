import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RotateCcw, ArrowLeft, Users, ShieldAlert, Sparkles, CheckCircle } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import Badge from './Badge';

export default function DemoHeaderBar({ activeRoleName = 'Dashboard' }) {
  const { activeRole, currentDoctor, currentPatient, resetDemoData } = useDemoData();
  const [resetDone, setResetDone] = useState(false);
  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm('Reset all demo data back to initial seed state? This will restore default doctors, patients, inventory, and sample recommendations.')) {
      resetDemoData();
      setResetDone(true);
      setTimeout(() => setResetDone(false), 2500);
    }
  };

  return (
    <div className="bg-[#3D5240] text-white border-b border-[#28362B] text-xs py-2 px-4 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Mode Notice */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#E83F35] text-white font-bold tracking-wider uppercase text-[10px]">
            <ShieldAlert className="w-3 h-3" />
            DEMO MODE — SAMPLE DATA
          </span>
          <span className="hidden sm:inline text-white/80">
            Presentation demonstration &bull; Fictional identities &bull; Local persistence
          </span>
        </div>

        {/* Center: Current Persona Indicator */}
        <div className="flex items-center gap-2 font-medium text-white/90">
          <span className="text-white/60">Active Demo Persona:</span>
          {activeRole === 'patient' && (
            <span className="bg-white/15 px-2.5 py-0.5 rounded-full text-white font-semibold">
              Patient: {currentPatient?.name} ({currentPatient?.id})
            </span>
          )}
          {activeRole === 'doctor' && (
            <span className="bg-white/15 px-2.5 py-0.5 rounded-full text-white font-semibold">
              Doctor: {currentDoctor?.name}
            </span>
          )}
          {activeRole === 'admin' && (
            <span className="bg-white/15 px-2.5 py-0.5 rounded-full text-white font-semibold">
              Admin & Inventory Manager
            </span>
          )}
        </div>

        {/* Right: Quick Controls */}
        <div className="flex items-center gap-2">
          {resetDone ? (
            <span className="inline-flex items-center gap-1 text-emerald-300 font-semibold text-[11px] bg-emerald-950/40 px-2 py-1 rounded">
              <CheckCircle className="w-3.5 h-3.5" /> Reset Done
            </span>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-[11px]"
              title="Reset sample data to initial factory demo state"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Demo Data</span>
            </button>
          )}

          <Link
            to="/login"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors text-[11px]"
            title="Go to professional Login & Registration portal"
          >
            <span>Sign In</span>
          </Link>

          <Link
            to="/demo-access"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#E83F35] hover:bg-[#D4271D] text-white font-semibold transition-colors text-[11px]"
          >
            <Users className="w-3 h-3" />
            <span>Switch Role</span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors text-[11px]"
            title="Return to public e-commerce store"
          >
            <ArrowLeft className="w-3 h-3" />
            <span className="hidden md:inline">Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
