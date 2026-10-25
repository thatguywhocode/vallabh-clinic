import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_DOCTORS,
  INITIAL_PATIENTS,
  INITIAL_PRODUCTS,
  INITIAL_RECOMMENDATIONS,
  INITIAL_ORDERS,
  INITIAL_DISEASE_CATEGORIES,
} from '../data/initialDemoData.js';
import { PRODUCTS } from '../data/products.js';

const STORAGE_KEY = 'vallabh_demo_store_v1';

const DemoDataContext = createContext();

export function DemoDataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure products loaded from older localStorage are hydrated with their image path
        const rawProducts = parsed.products || INITIAL_PRODUCTS;
        const hydratedProducts = rawProducts.map((p) => {
          const catalogItem = PRODUCTS.find((cat) => cat.id === p.id);
          return {
            ...p,
            image: p.image || catalogItem?.image || `/products/${p.id}.svg`,
          };
        });

        return {
          doctors: parsed.doctors || INITIAL_DOCTORS,
          patients: parsed.patients || INITIAL_PATIENTS,
          products: hydratedProducts,
          recommendations: parsed.recommendations || INITIAL_RECOMMENDATIONS,
          orders: parsed.orders || INITIAL_ORDERS,
          diseaseCategories: parsed.diseaseCategories || INITIAL_DISEASE_CATEGORIES,
          currentDoctorId: parsed.currentDoctorId || 'doc-1',
          currentPatientId: parsed.currentPatientId || 'pat-1',
          activeRole: parsed.activeRole || 'guest',
          activeUser: parsed.activeUser !== undefined ? parsed.activeUser : null,
        };
      }
    } catch (e) {
      console.warn('Failed to parse demo data from localStorage, resetting to defaults.', e);
    }
    return {
      doctors: INITIAL_DOCTORS,
      patients: INITIAL_PATIENTS,
      products: INITIAL_PRODUCTS,
      recommendations: INITIAL_RECOMMENDATIONS,
      orders: INITIAL_ORDERS,
      diseaseCategories: INITIAL_DISEASE_CATEGORIES,
      currentDoctorId: 'doc-1',
      currentPatientId: 'pat-1',
      activeRole: 'guest',
      activeUser: null,
    };
  });

  // Sync to localStorage on any state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save demo data to localStorage:', e);
    }
  }, [data]);

  // Current active entity helpers
  const currentDoctor = data.doctors.find((d) => d.id === data.currentDoctorId) || data.doctors[0];
  const currentPatient =
    (data.activeUser?.role === 'patient' && data.patients.find((p) => p.id === data.activeUser.id)) ||
    data.patients.find((p) => p.id === data.currentPatientId) ||
    data.patients[0];

  // Role & selection setters
  const setActiveRole = (role) => {
    setData((prev) => ({ ...prev, activeRole: role }));
  };

  const setCurrentDoctorId = (id) => {
    const doc = data.doctors.find((d) => d.id === id);
    setData((prev) => ({
      ...prev,
      currentDoctorId: id,
      activeUser: prev.activeUser?.role === 'doctor' && doc ? { ...doc, role: 'doctor' } : prev.activeUser,
    }));
  };

  const setCurrentPatientId = (id) => {
    const pat = data.patients.find((p) => p.id === id);
    setData((prev) => ({
      ...prev,
      currentPatientId: id,
      activeUser: prev.activeUser?.role === 'patient' && pat ? { ...pat, role: 'patient' } : prev.activeUser,
    }));
  };

  // Auth / Session Management for Demo
  const loginAsPatient = (patientId = 'pat-1') => {
    const patient = data.patients.find((p) => p.id === patientId) || data.patients[0];
    const user = { ...patient, role: 'patient' };
    setData((prev) => ({
      ...prev,
      currentPatientId: patient.id,
      activeRole: 'patient',
      activeUser: user,
    }));
    return user;
  };

  const loginAsDoctor = (doctorId = 'doc-1') => {
    const doctor = data.doctors.find((d) => d.id === doctorId) || data.doctors[0];
    const user = { ...doctor, role: 'doctor' };
    setData((prev) => ({
      ...prev,
      currentDoctorId: doctor.id,
      activeRole: 'doctor',
      activeUser: user,
    }));
    return user;
  };

  const loginAsAdmin = () => {
    const adminUser = {
      id: 'admin-1',
      name: 'Clinic Administrator',
      email: 'admin@vallabhclinic.demo',
      role: 'admin',
    };
    setData((prev) => ({
      ...prev,
      activeRole: 'admin',
      activeUser: adminUser,
    }));
    return adminUser;
  };

  const logout = () => {
    setData((prev) => ({
      ...prev,
      activeRole: 'guest',
      activeUser: null,
    }));
  };

  // Customer Self-Registration (Creates unlinked patient profile)
  const registerCustomer = ({ name, email, phone, city }) => {
    const trimmedName = name?.trim() || 'Valued Customer';
    const trimmedEmail = email?.trim() || `customer-${Date.now().toString().slice(-4)}@demo.patient`;
    const newId = `pat-${Date.now().toString().slice(-4)}`;

    const newCustomer = {
      id: newId,
      name: trimmedName,
      email: trimmedEmail,
      phone: phone?.trim() || '+91 98200 99881',
      city: city?.trim() || 'Mumbai, MH',
      age: 32,
      gender: 'Prefer not to say',
      bloodGroup: '—',
      linkedDoctorId: null, // NO DOCTOR CONNECTED YET (Independent Shopper)
      primaryCondition: 'Self-Care & Daily Wellness',
      diseaseCategoryId: null,
      medicalNotes: 'Independent online customer. Self-directed wellness regimen.',
      lastConsultation: 'None (Independent Customer)',
      avatarText: trimmedName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'CU',
    };

    const user = { ...newCustomer, role: 'patient' };

    setData((prev) => ({
      ...prev,
      patients: [...prev.patients, newCustomer],
      currentPatientId: newId,
      activeRole: 'patient',
      activeUser: user,
    }));

    return user;
  };

  // Place Demo Order: Decrements inventory, saves order to orders pipeline
  const placeDemoOrder = ({
    patientId,
    patientName,
    items,
    subtotal,
    shippingFee,
    total,
    deliveryAddress,
  }) => {
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const today = new Date().toISOString().split('T')[0];

    const newOrder = {
      id: orderId,
      patientId: patientId || currentPatient.id,
      patientName: patientName || currentPatient.name,
      date: today,
      items: items.map((i) => ({
        productId: i.id,
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
      subtotal: subtotal !== undefined ? subtotal : items.reduce((acc, i) => acc + i.price * i.quantity, 0),
      shippingFee: shippingFee !== undefined ? shippingFee : (subtotal >= 499 ? 0 : 50),
      total: total !== undefined ? total : (subtotal + (subtotal >= 499 ? 0 : 50)),
      status: 'Confirmed - Processing',
      trackingNumber: `VC-EXP-${Date.now().toString().slice(-6)}`,
      deliveryAddress: deliveryAddress || {
        fullName: patientName || currentPatient.name,
        addressLine: 'Flat 402, Green Orchid Residency, Linking Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        phone: '+91 98200 12345',
      },
      timeline: [
        { step: 'Order Placed', time: 'Just now', done: true },
        { step: 'Verified by Pharmacy', time: 'Estimated 2 hours', done: true },
        { step: 'Dispatched (Express Courier)', time: 'Pending', done: false },
        { step: 'Delivered', time: 'Pending (2-3 days)', done: false },
      ],
    };

    setData((prev) => {
      // Decrement stock for ordered items
      const updatedProducts = prev.products.map((p) => {
        const orderedItem = items.find((item) => item.id === p.id);
        if (orderedItem) {
          const currentQty = p.stock !== undefined ? p.stock : (p.stockQuantity || 30);
          const newStock = Math.max(0, currentQty - orderedItem.quantity);
          return {
            ...p,
            stock: newStock,
            stockQuantity: newStock,
            inStock: newStock > 0,
          };
        }
        return p;
      });

      return {
        ...prev,
        products: updatedProducts,
        orders: [newOrder, ...prev.orders],
      };
    });

    return { success: true, orderId, order: newOrder };
  };

  // Recommendation Actions
  const createRecommendation = ({ patientId, doctorId, productId, dosageNotes, duration = '30 Days' }) => {
    const product = data.products.find((p) => p.id === productId);
    const newRec = {
      id: `rec-${Date.now()}`,
      patientId,
      doctorId,
      productId,
      productName: product ? product.name : 'Prescribed Botanical Formulation',
      dosageNotes: dosageNotes || 'As advised by doctor with warm water.',
      duration: duration || '30 Days',
      datePrescribed: new Date().toISOString().split('T')[0],
      status: 'active',
    };

    setData((prev) => ({
      ...prev,
      recommendations: [newRec, ...prev.recommendations],
    }));

    return newRec;
  };

  const updateRecommendation = (recId, updates) => {
    setData((prev) => ({
      ...prev,
      recommendations: prev.recommendations.map((rec) =>
        rec.id === recId ? { ...rec, ...updates } : rec
      ),
    }));
  };

  const withdrawRecommendation = (recId) => {
    setData((prev) => ({
      ...prev,
      recommendations: prev.recommendations.map((rec) =>
        rec.id === recId ? { ...rec, status: 'withdrawn' } : rec
      ),
    }));
  };

  // Product Inventory Actions (Admin)
  const updateProductStock = (productId, newStock) => {
    const cleanStock = Math.max(0, parseInt(newStock, 10) || 0);
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === productId ? { ...p, stock: cleanStock, stockQuantity: cleanStock, inStock: cleanStock > 0 } : p
      ),
    }));
  };

  const addProduct = (newProductData) => {
    const newProduct = {
      id: `vc-prod-${Date.now()}`,
      name: newProductData.name,
      subtitle: newProductData.subtitle || 'Botanical Healthcare Formulation',
      price: Number(newProductData.price) || 499,
      originalPrice: Number(newProductData.originalPrice) || Number(newProductData.price) + 100,
      stock: Number(newProductData.stock) || 50,
      stockQuantity: Number(newProductData.stock) || 50,
      category: newProductData.category || 'vitality',
      categoryName: newProductData.categoryName || 'Immunity & Vitality',
      rating: 4.8,
      reviewsCount: 1,
      tag: 'New Formulation',
      volume: newProductData.volume || '100g Pack',
      inStock: (Number(newProductData.stock) || 50) > 0,
      isOTC: true,
      description: newProductData.description || 'Doctor-reviewed botanical wellness formulation.',
      isArchived: false,
    };

    setData((prev) => ({
      ...prev,
      products: [newProduct, ...prev.products],
    }));
    return newProduct;
  };

  const updateProduct = (productId, updatedFields) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === productId ? { ...p, ...updatedFields } : p
      ),
    }));
  };

  const archiveProduct = (productId) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === productId ? { ...p, isArchived: !p.isArchived } : p
      ),
    }));
  };

  // Order Actions (Admin)
  const updateOrderStatus = (orderId, newStatus) => {
    setData((prev) => ({
      ...prev,
      orders: prev.orders.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      ),
    }));
  };

  // Reset to initial demo state
  const resetDemoData = () => {
    const freshData = {
      doctors: INITIAL_DOCTORS,
      patients: INITIAL_PATIENTS,
      products: INITIAL_PRODUCTS,
      recommendations: INITIAL_RECOMMENDATIONS,
      orders: INITIAL_ORDERS,
      diseaseCategories: INITIAL_DISEASE_CATEGORIES,
      currentDoctorId: 'doc-1',
      currentPatientId: 'pat-1',
      activeRole: 'guest',
      activeUser: null,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(freshData));
    } catch (e) {
      console.error(e);
    }
    setData(freshData);
  };

  return (
    <DemoDataContext.Provider
      value={{
        ...data,
        currentDoctor,
        currentPatient,
        setActiveRole,
        setCurrentDoctorId,
        setCurrentPatientId,
        loginAsPatient,
        loginAsDoctor,
        loginAsAdmin,
        logout,
        registerCustomer,
        placeDemoOrder,
        createRecommendation,
        updateRecommendation,
        withdrawRecommendation,
        updateProductStock,
        addProduct,
        updateProduct,
        archiveProduct,
        updateOrderStatus,
        resetDemoData,
      }}
    >
      {children}
    </DemoDataContext.Provider>
  );
}

export function useDemoData() {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error('useDemoData must be used within a DemoDataProvider');
  }
  return context;
}
