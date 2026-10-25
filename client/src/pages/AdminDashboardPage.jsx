import React, { useState } from 'react';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  Stethoscope, 
  Search, 
  Plus, 
  Edit2, 
  Archive, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Layers, 
  Filter, 
  RotateCcw,
  ShieldCheck,
  Save
} from 'lucide-react';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import DemoHeaderBar from '../components/common/DemoHeaderBar';
import { useDemoData } from '../context/DemoDataContext';

export default function AdminDashboardPage() {
  const { 
    products, 
    orders, 
    doctors, 
    patients, 
    diseaseCategories, 
    updateProductStock, 
    addProduct, 
    archiveProduct, 
    updateOrderStatus, 
    resetDemoData 
  } = useDemoData();

  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'orders' | 'doctors' | 'diseases'

  // Inventory search & category filter
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Stock edit tracking
  const [editingStockId, setEditingStockId] = useState(null);
  const [stockInputValue, setStockInputValue] = useState('');

  // Add Product Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('vitality');
  const [newProductPrice, setNewProductPrice] = useState('499');
  const [newProductStock, setNewProductStock] = useState('50');
  const [newProductVolume, setNewProductVolume] = useState('100g Jar');
  const [newProductDesc, setNewProductDesc] = useState('');

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.category.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 15).length;
  const outOfStockCount = products.filter((p) => p.stock <= 0).length;

  const handleSaveStock = (productId) => {
    updateProductStock(productId, stockInputValue);
    setEditingStockId(null);
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const catNameMap = {
      vitality: 'Immunity & Vitality',
      digestion: 'Digestive Health',
      stress: 'Stress & Sleep',
      skin: 'Dermal Care',
      joint: 'Joint Care',
    };

    addProduct({
      name: newProductName.trim(),
      category: newProductCategory,
      categoryName: catNameMap[newProductCategory] || 'Healthcare Essential',
      price: Number(newProductPrice) || 499,
      stock: Number(newProductStock) || 50,
      volume: newProductVolume.trim() || '100g Pack',
      description: newProductDesc.trim() || 'Clinically verified botanical formulation.',
    });

    setShowAddModal(false);
    setNewProductName('');
    setNewProductDesc('');
  };

  return (
    <div className="bg-[#F7F5EF] min-h-screen pb-20 font-sans">
      {/* Top Demo Context Bar */}
      <DemoHeaderBar activeRoleName="Administrator & Operations" />

      <Container className="pt-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-warm-300">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="vermilion">Operations & Inventory Console</Badge>
              <span className="text-[11px] text-earth-500 font-mono">Role: Central Operations Manager</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C251E]">
              Clinic & Pharmacy Administration
            </h1>
            <p className="text-xs text-earth-600 font-sans mt-0.5">
              Oversee inventory levels, fulfillment pipelines, verified practitioners, and disease taxonomies across the platform.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={RotateCcw}
              onClick={() => {
                if (window.confirm('Reset demo inventory, orders, and practitioner states?')) {
                  resetDemoData();
                }
              }}
            >
              Reset Data
            </Button>

            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setShowAddModal(true)}
            >
              Add New Product
            </Button>
          </div>
        </div>

        {/* Admin KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-3xl border border-warm-200/90 shadow-soft-sm hover:shadow-soft-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-earth-500 font-semibold uppercase tracking-wider">Catalog Items</span>
              <div className="w-9 h-9 rounded-xl bg-[#49614D]/10 text-[#49614D] flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1C251E] block">
              {products.length}
            </span>
            <span className="text-[11px] text-emerald-700 font-medium block mt-1">Standardized Formulations</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-warm-200/90 shadow-soft-sm hover:shadow-soft-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-earth-500 font-semibold uppercase tracking-wider">Stock Attention</span>
              <div className="w-9 h-9 rounded-xl bg-[#E83F35]/10 text-[#E83F35] flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#E83F35] block">
              {lowStockCount + outOfStockCount}
            </span>
            <span className="text-[11px] text-earth-500 font-medium block mt-1">
              {outOfStockCount} out of stock &bull; {lowStockCount} low
            </span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-warm-200/90 shadow-soft-sm hover:shadow-soft-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-earth-500 font-semibold uppercase tracking-wider">Total Orders</span>
              <div className="w-9 h-9 rounded-xl bg-[#49614D]/10 text-[#49614D] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#49614D] block">
              {orders.length}
            </span>
            <span className="text-[11px] text-earth-500 font-medium block mt-1">Across registered patients</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-warm-200/90 shadow-soft-sm hover:shadow-soft-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-earth-500 font-semibold uppercase tracking-wider">Practicing Clinicians</span>
              <div className="w-9 h-9 rounded-xl bg-[#49614D]/10 text-[#49614D] flex items-center justify-center">
                <Stethoscope className="w-4 h-4" />
              </div>
            </div>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1C251E] block">
              {doctors.length}
            </span>
            <span className="text-[11px] text-[#49614D] font-medium block mt-1">100% Verified Credentials</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-warm-300 gap-2 mb-6 overflow-x-auto pb-1">
          {[
            { id: 'inventory', label: 'Product Inventory & Stock', icon: Package },
            { id: 'orders', label: 'Sample Orders & Fulfillment', icon: ShoppingBag },
            { id: 'doctors', label: 'Practitioners Panel', icon: Stethoscope },
            { id: 'diseases', label: 'Disease Master Categories', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-t-2xl font-semibold text-xs tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#49614D] border-t-2 border-[#49614D] shadow-soft-sm'
                    : 'text-earth-600 hover:text-[#1C251E] hover:bg-white/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Product Inventory Table & Controls */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl p-6 border border-warm-200 shadow-soft-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-earth-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products by title or category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#49614D]"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-earth-500 font-medium">Category:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="text-xs py-2 px-3 rounded-xl border border-warm-300 bg-warm-50 text-[#1C251E] font-medium focus:ring-2 focus:ring-[#49614D]"
                >
                  <option value="all">All Collections</option>
                  <option value="vitality">Immunity & Vitality</option>
                  <option value="digestion">Digestive Health</option>
                  <option value="stress">Stress & Sleep</option>
                  <option value="skin">Dermal Care</option>
                  <option value="joint">Joint Care</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-warm-200 text-earth-500 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Product Title & Pack</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Price (₹)</th>
                    <th className="py-3 px-3">Stock Quantity</th>
                    <th className="py-3 px-3">Inventory Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  {filteredProducts.map((p) => {
                    const isEditing = editingStockId === p.id;
                    const isLow = p.stock > 0 && p.stock <= 15;
                    const isOut = p.stock <= 0;

                    return (
                      <tr key={p.id} className={`hover:bg-warm-50/70 transition-colors ${p.isArchived ? 'opacity-50' : ''}`}>
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FCFBF8] to-warm-100 p-1 flex items-center justify-center shrink-0 border border-[#CBD5CD] shadow-2xs">
                              {p.image ? (
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="max-h-full max-w-full object-contain"
                                />
                              ) : (
                                <Package className="w-5 h-5 text-[#49614D]" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-[#1C251E] text-xs hover:text-[#49614D] transition-colors">{p.name}</div>
                              <span className="text-[11px] text-earth-500">{p.volume} &bull; <span className="font-mono text-earth-400">{p.sku || p.id}</span></span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 font-medium text-earth-700">
                          {p.categoryName || p.category}
                        </td>
                        <td className="py-3.5 px-3 font-serif text-sm font-bold text-[#1C251E]">
                          ₹{p.price}
                        </td>
                        <td className="py-3.5 px-3">
                          {isEditing ? (
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                min="0"
                                value={stockInputValue}
                                onChange={(e) => setStockInputValue(e.target.value)}
                                className="w-20 px-2 py-1 text-xs border rounded-lg focus:ring-2 focus:ring-[#49614D]"
                              />
                              <button
                                type="button"
                                onClick={() => handleSaveStock(p.id)}
                                className="p-1 bg-[#49614D] text-white rounded hover:bg-[#3D5240] transition-colors"
                                title="Save quantity"
                              >
                                <Save className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-[#1C251E]">{p.stock} units</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingStockId(p.id);
                                  setStockInputValue(p.stock);
                                }}
                                className="text-earth-400 hover:text-[#49614D] p-1 transition-colors"
                                title="Edit stock quantity"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-3">
                          {p.isArchived ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-warm-200 text-earth-700 font-bold text-[10px] uppercase tracking-wider">
                              Archived
                            </span>
                          ) : isOut ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-[#E83F35] font-bold text-[10px] uppercase tracking-wider">
                              Out of Stock
                            </span>
                          ) : isLow ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] uppercase tracking-wider">
                              Low Stock ({p.stock})
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-[#49614D]/10 text-[#49614D] font-bold text-[10px] uppercase tracking-wider">
                              In Stock
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => archiveProduct(p.id)}
                            className="p-1.5 rounded-lg text-earth-500 hover:text-[#E83F35] hover:bg-warm-100 text-xs inline-flex items-center gap-1 cursor-pointer"
                            title={p.isArchived ? 'Unarchive product' : 'Archive product'}
                          >
                            <Archive className="w-3.5 h-3.5" />
                            <span>{p.isArchived ? 'Restore' : 'Archive'}</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Orders & Fulfillment Table */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 border border-warm-200 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-warm-200">
              <h3 className="font-serif text-xl font-bold text-[#1C251E]">
                All Sample Orders Pipeline
              </h3>
              <span className="text-xs text-earth-500 font-medium">
                {orders.length} Total Registered Refill Orders
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-warm-200 text-earth-500 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Order ID & Date</th>
                    <th className="py-3 px-3">Patient Profile</th>
                    <th className="py-3 px-3">Items Summary</th>
                    <th className="py-3 px-3">Total Value</th>
                    <th className="py-3 px-3">Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-warm-50/70">
                      <td className="py-3.5 px-3">
                        <div className="font-mono font-bold text-[#1C251E]">{ord.id}</div>
                        <span className="text-[11px] text-earth-500">{ord.date}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-[#1C251E]">{ord.patientName || ord.patientId}</span>
                        <span className="text-[11px] text-earth-400 block">ID: #{ord.patientId}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="space-y-1">
                          {ord.items.map((i, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[11px] text-earth-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#49614D]/60 shrink-0" />
                              <span className="font-medium">{i.name}</span>
                              <span className="text-earth-500 font-mono text-[10px]">&times; {i.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-serif text-sm font-bold text-[#1C251E]">
                        ₹{ord.total}
                      </td>
                      <td className="py-3.5 px-3">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                          className={`text-xs py-1.5 px-3 rounded-xl font-bold border transition-colors ${
                            ord.status === 'Delivered'
                              ? 'bg-[#49614D]/10 border-[#49614D]/30 text-[#49614D]'
                              : ord.status === 'Dispatched'
                              ? 'bg-blue-50 border-blue-200 text-blue-800'
                              : 'bg-amber-50 border-amber-200 text-amber-800'
                          }`}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Practitioners Verification Table */}
        {activeTab === 'doctors' && (
          <div className="bg-white rounded-3xl p-6 border border-warm-200 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-warm-200">
              <h3 className="font-serif text-xl font-bold text-[#1C251E]">
                Clinical Practitioners Panel
              </h3>
              <span className="text-xs text-earth-500 font-medium">
                {doctors.length} Registered Clinicians
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-warm-200 text-earth-500 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Physician Name & Title</th>
                    <th className="py-3 px-3">Qualifications & Experience</th>
                    <th className="py-3 px-3">Medical License Number</th>
                    <th className="py-3 px-3">Specialization Focus</th>
                    <th className="py-3 px-3">Linked Patients</th>
                    <th className="py-3 px-3">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  {doctors.map((doc) => (
                    <tr key={doc.id} className="hover:bg-warm-50/70">
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-[#1C251E] text-sm">{doc.name}</div>
                        <span className="text-[11px] text-earth-500">{doc.title}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-medium text-earth-800">{doc.qualification}</span>
                        <span className="text-[11px] text-earth-500 block">{doc.experience}</span>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-[#49614D]">
                        {doc.licenseNo}
                      </td>
                      <td className="py-3.5 px-3 text-earth-700">
                        {doc.specialization}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-bold px-2 py-0.5 rounded-full bg-[#49614D]/10 text-[#49614D]">
                          {doc.linkedPatientIds.length} Patients ({doc.linkedPatientIds.join(', ')})
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1 text-[#49614D] bg-[#49614D]/10 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#49614D]" />
                          Verified
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Master Disease Categories Preview */}
        {activeTab === 'diseases' && (
          <div className="bg-white rounded-3xl p-6 border border-warm-200 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-warm-200">
              <h3 className="font-serif text-xl font-bold text-[#1C251E]">
                Master Clinical Disease Categories
              </h3>
              <span className="text-xs text-earth-500 font-medium">
                Standardized Clinical Taxonomy
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-warm-200 text-earth-500 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Category Code</th>
                    <th className="py-3 px-3">Category Title</th>
                    <th className="py-3 px-3">Common Symptomatology & Markers</th>
                    <th className="py-3 px-3">Active Linked Demo Patients</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  {diseaseCategories.map((cat) => {
                    const linkedPatientsList = patients.filter((p) => p.diseaseCategoryId === cat.id);

                    return (
                      <tr key={cat.id} className="hover:bg-warm-50/70">
                        <td className="py-3.5 px-3 font-mono font-bold text-[#49614D]">
                          {cat.code}
                        </td>
                        <td className="py-3.5 px-3 font-bold text-[#1C251E]">
                          {cat.name}
                        </td>
                        <td className="py-3.5 px-3 text-earth-600 leading-relaxed text-[11px]">
                          {cat.commonSymptoms}
                        </td>
                        <td className="py-3.5 px-3">
                          {linkedPatientsList.length > 0 ? (
                            <span className="font-bold text-[#1C251E]">
                              {linkedPatientsList.map((p) => p.name).join(', ')}
                            </span>
                          ) : (
                            <span className="text-earth-400 italic">None assigned</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Container>

      {/* Modal: Add New Product */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 border border-warm-300">
            <h3 className="font-serif text-2xl font-bold text-[#1C251E]">
              Add New Catalog Product
            </h3>
            <p className="text-xs text-earth-500">
              Formulate a new non-prescription botanical essential into the clinic catalog.
            </p>

            <form onSubmit={handleCreateProduct} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#1C251E] block">Product Title:</label>
                <input
                  type="text"
                  placeholder="e.g. Giloy & Neem Purifying Drops"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#1C251E] block">Category:</label>
                  <select
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    className="w-full p-2.5 border rounded-xl"
                  >
                    <option value="vitality">Immunity & Vitality</option>
                    <option value="digestion">Digestive Health</option>
                    <option value="stress">Stress & Sleep</option>
                    <option value="skin">Dermal Care</option>
                    <option value="joint">Joint Care</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1C251E] block">Pack Volume:</label>
                  <input
                    type="text"
                    value={newProductVolume}
                    onChange={(e) => setNewProductVolume(e.target.value)}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#1C251E] block">Price in INR (₹):</label>
                  <input
                    type="number"
                    min="1"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    className="w-full p-2.5 border rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1C251E] block">Initial Stock:</label>
                  <input
                    type="number"
                    min="0"
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(e.target.value)}
                    className="w-full p-2.5 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#1C251E] block">Description:</label>
                <textarea
                  rows={3}
                  value={newProductDesc}
                  onChange={(e) => setNewProductDesc(e.target.value)}
                  placeholder="Doctor-vetted botanical formulation details..."
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                >
                  Create Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
