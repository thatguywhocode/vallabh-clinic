import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Users, 
  PlusCircle, 
  FileText, 
  Search, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  Clock, 
  ShoppingBag, 
  Calendar,
  AlertCircle,
  Package,
  Activity,
  ArrowRight
} from 'lucide-react';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import DemoHeaderBar from '../components/common/DemoHeaderBar';
import { useDemoData } from '../context/DemoDataContext';

export default function DoctorDashboardPage() {
  const { 
    doctors, 
    patients, 
    products, 
    recommendations, 
    orders, 
    diseaseCategories,
    currentDoctor, 
    setCurrentDoctorId,
    createRecommendation,
    withdrawRecommendation,
    updateRecommendation
  } = useDemoData();

  // Filter patients linked ONLY to the current doctor
  const linkedPatients = useMemo(() => {
    if (!currentDoctor) return [];
    return patients.filter((p) => currentDoctor.linkedPatientIds.includes(p.id));
  }, [patients, currentDoctor]);

  // Selected patient within linked list
  const [selectedPatientId, setSelectedPatientId] = useState(
    linkedPatients[0]?.id || ''
  );

  // Keep selectedPatient updated if doctor switches
  const selectedPatient = linkedPatients.find((p) => p.id === selectedPatientId) || linkedPatients[0];

  // Search within linked patients
  const [patientSearch, setPatientSearch] = useState('');
  const searchedLinkedPatients = linkedPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
      p.primaryCondition.toLowerCase().includes(patientSearch.toLowerCase())
  );

  // New recommendation form state
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [dosageNotes, setDosageNotes] = useState('');
  const [duration, setDuration] = useState('30 Days');
  const [successToast, setSuccessToast] = useState(null);

  // Editing state
  const [editingRecId, setEditingRecId] = useState(null);
  const [editDosage, setEditDosage] = useState('');

  // Selected patient's recommendations
  const patientRecommendations = recommendations.filter(
    (r) => r.patientId === selectedPatient?.id
  );

  // Selected patient's sample orders
  const patientOrders = orders.filter((o) => o.patientId === selectedPatient?.id);

  // Selected patient's disease category
  const patientDiseaseCategory = diseaseCategories.find(
    (c) => c.id === selectedPatient?.diseaseCategoryId
  );

  const handleCreateRecommendation = (e) => {
    e.preventDefault();
    if (!selectedPatient || !selectedProductId) return;

    const chosenProduct = products.find((p) => p.id === selectedProductId);

    createRecommendation({
      patientId: selectedPatient.id,
      doctorId: currentDoctor.id,
      productId: selectedProductId,
      dosageNotes: dosageNotes.trim() || 'Take 1 serving daily with warm water as advised.',
      duration,
    });

    setSuccessToast(`Prescription for "${chosenProduct?.name}" assigned to ${selectedPatient.name}!`);
    setDosageNotes('');
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleSaveEdit = (recId) => {
    updateRecommendation(recId, { dosageNotes: editDosage });
    setEditingRecId(null);
  };

  return (
    <div className="bg-[#F7F5EF] min-h-screen pb-20 font-sans">
      {/* Top Demo Context Bar */}
      <DemoHeaderBar activeRoleName="Doctor Consultation Desk" />

      <Container className="pt-8">
        {/* Doctor Switcher & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-warm-300">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="botanical">Clinician Consultation Portal</Badge>
              <span className="text-[11px] text-earth-500 font-mono">License: {currentDoctor?.licenseNo}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C251E]">
              {currentDoctor?.name}
            </h1>
            <p className="text-xs text-earth-600 font-sans mt-0.5">
              {currentDoctor?.qualification} &bull; {currentDoctor?.specialization}
            </p>
          </div>

          {/* Quick Doctor Identity Switcher */}
          <div className="bg-white p-2.5 rounded-2xl border border-warm-300 shadow-soft-sm flex items-center gap-2">
            <span className="text-xs font-semibold text-earth-700 whitespace-nowrap pl-1">
              Active Doctor:
            </span>
            <select
              value={currentDoctor?.id}
              onChange={(e) => {
                setCurrentDoctorId(e.target.value);
                const newDoc = doctors.find((d) => d.id === e.target.value);
                if (newDoc && newDoc.linkedPatientIds.length > 0) {
                  setSelectedPatientId(newDoc.linkedPatientIds[0]);
                }
              }}
              className="text-xs py-1.5 px-3 rounded-xl border border-warm-300 bg-warm-50 font-medium text-[#1C251E] focus:outline-none focus:ring-2 focus:ring-[#49614D]"
            >
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.specialization.split('&')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctor KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-3xl border border-warm-200/90 shadow-soft-sm hover:shadow-soft-md transition-all flex items-center justify-between">
            <div>
              <span className="text-xs text-earth-500 font-semibold uppercase tracking-wider block">Linked Patients</span>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1C251E] mt-1 block">
                {linkedPatients.length}
              </span>
              <span className="text-[11px] text-earth-400 block mt-1">Assigned to your care profile</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#49614D]/10 text-[#49614D] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-warm-200/90 shadow-soft-sm hover:shadow-soft-md transition-all flex items-center justify-between">
            <div>
              <span className="text-xs text-earth-500 font-semibold uppercase tracking-wider block">Active Regimens Curated</span>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#49614D] mt-1 block">
                {recommendations.filter((r) => r.doctorId === currentDoctor?.id && r.status !== 'withdrawn').length}
              </span>
              <span className="text-[11px] text-earth-400 block mt-1">Across linked patient records</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#49614D]/10 text-[#49614D] flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-warm-200/90 shadow-soft-sm hover:shadow-soft-md transition-all flex items-center justify-between">
            <div>
              <span className="text-xs text-earth-500 font-semibold uppercase tracking-wider block">Catalog Formulations</span>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1C251E] mt-1 block">
                {products.length}
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold block mt-1">Verified non-prescription OTC</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#E83F35]/10 text-[#E83F35] flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Success Alert Toast */}
        {successToast && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-xs text-emerald-950 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <span className="font-bold block">{successToast}</span>
                <span className="text-[11px] text-emerald-800">
                  Switch to the Patient Dashboard in Demo Access to verify it appears immediately in their account.
                </span>
              </div>
            </div>
            <Link
              to="/demo-access"
              className="text-[11px] font-bold text-[#49614D] underline hover:text-black whitespace-nowrap"
            >
              Verify in Patient View &rarr;
            </Link>
          </div>
        )}

        {/* Main Work Area: Linked Patient List (Left) & Clinical Management (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Searchable List of Linked Patients */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-warm-200 shadow-soft-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1C251E]">
                    Assigned Patients
                  </h3>
                  <span className="text-[11px] text-earth-500">
                    Filtered strictly for {currentDoctor?.name}
                  </span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#49614D]/10 text-[#49614D]">
                  {linkedPatients.length}
                </span>
              </div>

              {/* Patient Search Input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-earth-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by name or condition..."
                  value={patientSearch}
                  onChange={(e) => setPatientSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#49614D]"
                />
              </div>

              {/* List of Patients */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {searchedLinkedPatients.map((pat) => {
                  const isSelected = pat.id === selectedPatient?.id;
                  const patRecs = recommendations.filter((r) => r.patientId === pat.id && r.status !== 'withdrawn');

                  return (
                    <button
                      key={pat.id}
                      type="button"
                      onClick={() => setSelectedPatientId(pat.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between ${
                        isSelected
                          ? 'bg-[#F4F6F4] border-[#49614D] shadow-soft-sm ring-1 ring-[#49614D]'
                          : 'bg-white hover:bg-warm-50 border-warm-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-[#1C251E]">
                          <span>{pat.name}</span>
                          <span className="text-[10px] text-earth-400 font-normal">
                            ({pat.gender}, {pat.age}y)
                          </span>
                        </div>
                        <p className="text-[11px] text-earth-600 line-clamp-1">
                          {pat.primaryCondition}
                        </p>
                        <div className="flex items-center gap-2 pt-1 text-[10px] text-earth-500">
                          <span>{patRecs.length} Active Prescriptions</span>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#49614D] shrink-0 mt-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Selected Patient Detail, Prescribe Form & Histories */}
          <div className="lg:col-span-8 space-y-6">
            {selectedPatient ? (
              <>
                {/* Selected Patient Banner */}
                <div className="bg-white rounded-3xl p-6 border border-warm-300 shadow-soft-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-warm-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#49614D] text-white flex items-center justify-center font-serif text-lg font-bold">
                        {selectedPatient.avatarText}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-2xl font-bold text-[#1C251E]">
                            {selectedPatient.name}
                          </h3>
                          <span className="text-xs text-earth-500 font-mono">#{selectedPatient.id}</span>
                        </div>
                        <span className="text-xs text-earth-600">
                          {selectedPatient.age} years &bull; {selectedPatient.gender} &bull; Blood: {selectedPatient.bloodGroup} &bull; {selectedPatient.city}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-earth-500 block uppercase font-bold">Last Consultation</span>
                      <span className="text-xs font-semibold text-[#1C251E]">{selectedPatient.lastConsultation}</span>
                    </div>
                  </div>

                  {/* Disease Record Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-4 rounded-2xl bg-warm-50/90 border border-warm-200/80 border-l-4 border-l-[#49614D]">
                      <span className="text-[10px] uppercase font-bold text-[#49614D] tracking-wider block mb-1">
                        Primary Clinical Diagnosis
                      </span>
                      <p className="font-semibold text-[#1C251E] text-sm">
                        {selectedPatient.primaryCondition}
                      </p>
                      {patientDiseaseCategory && (
                        <span className="text-[11px] text-earth-500 block mt-1">
                          Taxonomy: {patientDiseaseCategory.name} ({patientDiseaseCategory.code})
                        </span>
                      )}
                    </div>

                    <div className="p-4 rounded-2xl bg-warm-50/90 border border-warm-200/80 border-l-4 border-l-[#49614D]">
                      <span className="text-[10px] uppercase font-bold text-[#49614D] tracking-wider block mb-1">
                        Physician Observation History
                      </span>
                      <p className="text-earth-700 leading-relaxed text-[11px]">
                        "{selectedPatient.medicalNotes}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form: Prescribe Product from Existing Catalog */}
                <div className="bg-white rounded-3xl p-6 border border-[#49614D]/30 shadow-soft-sm space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-warm-200">
                    <PlusCircle className="w-5 h-5 text-[#49614D]" />
                    <h3 className="font-serif text-xl font-bold text-[#1C251E]">
                      Prescribe Botanical Recommendation for {selectedPatient.name}
                    </h3>
                  </div>

                  <form onSubmit={handleCreateRecommendation} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Product Select */}
                      <div className="space-y-1 text-xs">
                        <label className="font-bold text-[#1C251E] block">
                          Select Catalog Product:
                        </label>
                        <select
                          value={selectedProductId}
                          onChange={(e) => setSelectedProductId(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-xs font-medium text-[#1C251E] focus:outline-none focus:ring-2 focus:ring-[#49614D]"
                        >
                          {products.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} — ₹{p.price} ({p.stock} in stock)
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Regimen Duration */}
                      <div className="space-y-1 text-xs">
                        <label className="font-bold text-[#1C251E] block">
                          Regimen Duration:
                        </label>
                        <select
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-xs font-medium text-[#1C251E] focus:outline-none focus:ring-2 focus:ring-[#49614D]"
                        >
                          <option value="15 Days">15 Days Initial Trial</option>
                          <option value="30 Days">30 Days Standard Cycle</option>
                          <option value="45 Days">45 Days Constitutional Protocol</option>
                          <option value="60 Days">60 Days Maintenance Regimen</option>
                        </select>
                      </div>
                    </div>

                    {/* Visual Product Summary Card */}
                    {(() => {
                      const chosen = products.find((p) => p.id === selectedProductId);
                      if (!chosen) return null;
                      return (
                        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-warm-50/80 border border-warm-200">
                          <div className="w-14 h-14 rounded-xl bg-white border border-[#CBD5CD] p-1.5 flex items-center justify-center shrink-0 shadow-2xs">
                            {chosen.image ? (
                              <img
                                src={chosen.image}
                                alt={chosen.name}
                                className="max-h-full max-w-full object-contain"
                              />
                            ) : (
                              <Package className="w-5 h-5 text-[#49614D]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-bold text-sm text-[#1C251E] truncate">
                                {chosen.name}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#49614D]/10 text-[#49614D] font-bold shrink-0">
                                {chosen.volume}
                              </span>
                            </div>
                            <p className="text-[11px] text-earth-600 line-clamp-1 mt-0.5">
                              {chosen.subtitle}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-earth-500 mt-1 flex-wrap">
                              <span className="font-semibold text-[#1C251E]">₹{chosen.price}</span>
                              <span>&bull;</span>
                              <span className={chosen.stock > 10 ? 'text-emerald-700 font-medium' : 'text-amber-700 font-medium'}>
                                {chosen.stock} units available in clinic inventory
                              </span>
                              {chosen.herbs && chosen.herbs.length > 0 && (
                                <>
                                  <span>&bull;</span>
                                  <span className="truncate italic text-earth-600">Herbs: {chosen.herbs.slice(0, 3).join(', ')}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Dosage Instructions & Notes */}
                    <div className="space-y-1 text-xs">
                      <label className="font-bold text-[#1C251E] block">
                        Dosage Instructions & Intake Guidance:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Take 1 capsule twice daily with warm water 30 minutes after meals."
                        value={dosageNotes}
                        onChange={(e) => setDosageNotes(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#49614D]"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <p className="text-[11px] text-earth-500">
                        Notice: Prescriptions will appear immediately in the patient's dashboard for review and cart addition.
                      </p>
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        icon={PlusCircle}
                        iconPosition="left"
                      >
                        Prescribe Product
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Existing Recommendations for this Patient */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-bold text-[#1C251E]">
                      Current Prescriptions for {selectedPatient.name}
                    </h3>
                    <span className="text-xs text-earth-500">
                      {patientRecommendations.length} Prescriptions recorded
                    </span>
                  </div>

                  {patientRecommendations.length === 0 ? (
                    <div className="bg-white rounded-3xl p-6 border border-warm-200 text-center text-xs text-earth-500">
                      No prescriptions created yet for {selectedPatient.name}. Use the form above to prescribe a product.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {patientRecommendations.map((rec) => {
                        const product = products.find((p) => p.id === rec.productId);
                        const isWithdrawn = rec.status === 'withdrawn';
                        const isEditing = editingRecId === rec.id;

                        return (
                          <div
                            key={rec.id}
                            className={`bg-white rounded-2xl p-5 border transition-all ${
                              isWithdrawn
                                ? 'border-warm-200 opacity-60 bg-warm-50/50'
                                : 'border-warm-300 shadow-soft-sm hover:shadow-soft-md'
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-warm-100">
                              <div className="flex items-center gap-2">
                                <h4 className="font-serif text-base font-bold text-[#1C251E]">
                                  {rec.productName}
                                </h4>
                                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                  isWithdrawn
                                    ? 'bg-warm-200 text-earth-600'
                                    : 'bg-[#49614D]/10 text-[#49614D]'
                                }`}>
                                  {isWithdrawn ? 'Withdrawn' : 'Active Protocol'}
                                </span>
                              </div>

                              <span className="text-[11px] text-earth-500 font-medium">
                                Prescribed on {rec.datePrescribed} &bull; {rec.duration}
                              </span>
                            </div>

                            <div className="pt-3 text-xs">
                              {isEditing ? (
                                <div className="space-y-2 mt-1">
                                  <input
                                    type="text"
                                    value={editDosage}
                                    onChange={(e) => setEditDosage(e.target.value)}
                                    className="w-full p-2.5 text-xs rounded-xl border border-warm-300 focus:ring-2 focus:ring-[#49614D]"
                                  />
                                  <div className="flex gap-2">
                                    <Button
                                      variant="primary"
                                      size="sm"
                                      onClick={() => handleSaveEdit(rec.id)}
                                    >
                                      Save Changes
                                    </Button>
                                    <Button
                                      variant="secondary"
                                      size="sm"
                                      onClick={() => setEditingRecId(null)}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                  <div className="flex items-start gap-3.5">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FCFBF8] to-warm-100 p-1.5 flex items-center justify-center shrink-0 border border-[#CBD5CD] shadow-2xs">
                                      {product?.image ? (
                                        <img
                                          src={product.image}
                                          alt={rec.productName}
                                          className="max-h-full max-w-full object-contain"
                                        />
                                      ) : (
                                        <Package className="w-5 h-5 text-[#49614D]" />
                                      )}
                                    </div>
                                    <div className="space-y-1">
                                      <span className="text-[10px] font-bold text-earth-500 uppercase tracking-wide">
                                        Clinical Dosage Guidance:
                                      </span>
                                      <p className="text-xs text-earth-800 font-medium leading-relaxed">
                                        {rec.dosageNotes}
                                      </p>
                                      {product && (
                                        <span className="text-[11px] text-earth-500 block">
                                          {product.volume} &bull; ₹{product.price} ({product.stock} units in dispensary)
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {!isWithdrawn && (
                                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setEditingRecId(rec.id);
                                          setEditDosage(rec.dosageNotes);
                                        }}
                                        className="p-1.5 text-earth-500 hover:text-[#49614D] hover:bg-warm-100 rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-colors"
                                        title="Edit prescription notes"
                                      >
                                        <Edit3 className="w-3.5 h-3.5" />
                                        <span>Edit</span>
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => withdrawRecommendation(rec.id)}
                                        className="p-1.5 text-earth-500 hover:text-[#E83F35] hover:bg-red-50 rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-colors"
                                        title="Withdraw this recommendation"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Withdraw</span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Selected Patient's Recent Orders History */}
                <div className="space-y-4 pt-4 border-t border-warm-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#1C251E]">
                        Patient Refills & Order History
                      </h3>
                      <p className="text-xs text-earth-500">
                        Recommendations do not automatically trigger orders. Orders are initiated independently by the patient.
                      </p>
                    </div>
                    <span className="text-xs text-earth-600 font-mono">
                      {patientOrders.length} records
                    </span>
                  </div>

                  {patientOrders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-5 border border-warm-200 text-xs text-earth-500 text-center">
                      No orders placed yet by {selectedPatient.name}.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {patientOrders.map((ord) => (
                        <div
                          key={ord.id}
                          className="bg-white rounded-2xl p-4 border border-warm-200 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2 font-bold text-[#1C251E]">
                              <span>{ord.id}</span>
                              <span className="text-[11px] text-earth-400 font-normal">({ord.date})</span>
                            </div>
                            <span className="text-[11px] text-earth-600">
                              {ord.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-[#1C251E] block">₹{ord.total}</span>
                            <span className="text-[10px] font-semibold text-[#49614D]">{ord.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white p-8 rounded-3xl text-center text-xs text-earth-500">
                Select a patient from the assigned list on the left to begin consultation.
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
