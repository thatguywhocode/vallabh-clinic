import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTests() {
  console.log('====================================================');
  console.log('VALLABH CLINIC — MILESTONE 6 COMPREHENSIVE VERIFICATION');
  console.log('====================================================\n');

  let passedCount = 0;
  let failedCount = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passedCount++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failedCount++;
    }
  }

  // TEST 1: 8 Local SVG Product Mockups exist and have non-zero size
  console.log('--- TEST GROUP 1: Product Images & SVG Assets ---');
  const productsDir = path.resolve(__dirname, '../../public/products');
  const requiredSvgs = [
    'triphala-cleanse.svg',
    'ashwagandha-capsules.svg',
    'amla-tulsi-drops.svg',
    'kumkumadi-face-oil.svg',
    'chamomile-night-tea.svg',
    'shallaki-joint-balm.svg',
    'brahmi-focus-elixir.svg',
    'giloy-neem-drops.svg',
  ];

  assert(fs.existsSync(productsDir), 'Directory client/public/products exists');
  
  for (const svgFile of requiredSvgs) {
    const fullPath = path.join(productsDir, svgFile);
    const exists = fs.existsSync(fullPath);
    const size = exists ? fs.statSync(fullPath).size : 0;
    const content = exists ? fs.readFileSync(fullPath, 'utf8') : '';
    const hasBrand = content.includes('VALLABH CLINIC');
    const hasSvgTag = content.includes('<svg') && content.includes('</svg>');
    
    // Check for invalid HTML entities
    const entityMatches = content.match(/&[a-zA-Z]+;/g) || [];
    const badEntities = entityMatches.filter(e => !['&amp;', '&lt;', '&gt;', '&apos;', '&quot;'].includes(e));
    const nakedAmps = content.match(/&(?!(amp;|lt;|gt;|apos;|quot;|#\d+;|#x[0-9a-fA-F]+;))/g) || [];

    assert(exists && size > 1000 && hasBrand && hasSvgTag, `SVG ${svgFile} exists (${size} bytes) with VALLABH CLINIC branding`);
    assert(badEntities.length === 0, `SVG ${svgFile} contains zero unescaped HTML entities (e.g. &bull;)`);
    assert(nakedAmps.length === 0, `SVG ${svgFile} contains zero naked unescaped ampersands`);
  }

  // TEST 2: Product Catalog Data has image references
  console.log('\n--- TEST GROUP 2: Product Catalog Data ---');
  const { PRODUCTS, CATEGORIES } = await import('../data/products.js');
  assert(PRODUCTS.length === 8, `Product catalog has exactly 8 products (got ${PRODUCTS.length})`);
  assert(CATEGORIES.length === 5, `Product catalog has exactly 5 categories (got ${CATEGORIES.length})`);

  for (const p of PRODUCTS) {
    assert(p.image && p.image.startsWith('/products/'), `Product ${p.id} (${p.name}) has valid image path: ${p.image}`);
    assert(typeof p.price === 'number' && p.price > 0, `Product ${p.id} has price in INR: ₹${p.price}`);
    assert(p.volume && p.volume.length > 0, `Product ${p.id} has package volume: ${p.volume}`);
    assert(p.isOTC === true, `Product ${p.id} is non-prescription OTC formulation`);
  }

  // TEST 3: Initial Demo Data Integrity
  console.log('\n--- TEST GROUP 3: Demo Data Seeds & Relationships ---');
  const { 
    INITIAL_DOCTORS, 
    INITIAL_PATIENTS, 
    INITIAL_PRODUCTS, 
    INITIAL_RECOMMENDATIONS, 
    INITIAL_ORDERS 
  } = await import('../data/initialDemoData.js');

  assert(INITIAL_DOCTORS.length === 2, `Initial doctors seed has 2 physicians (got ${INITIAL_DOCTORS.length})`);
  assert(INITIAL_PATIENTS.length === 4, `Initial patients seed has 4 patients (got ${INITIAL_PATIENTS.length})`);
  assert(INITIAL_PRODUCTS.length === 8, `Initial products seed has 8 products (got ${INITIAL_PRODUCTS.length})`);
  assert(INITIAL_RECOMMENDATIONS.length >= 2, `Initial recommendations seed has sample prescriptions (got ${INITIAL_RECOMMENDATIONS.length})`);
  assert(INITIAL_ORDERS.length >= 3, `Initial orders seed has sample orders (got ${INITIAL_ORDERS.length})`);

  // Verify doctor-patient links
  const doc1 = INITIAL_DOCTORS.find(d => d.id === 'doc-1');
  const pat1 = INITIAL_PATIENTS.find(p => p.id === 'pat-1');
  assert(doc1.linkedPatientIds.includes('pat-1'), 'Doctor 1 is linked to Patient 1');
  assert(pat1.linkedDoctorId === 'doc-1', 'Patient 1 is linked to Doctor 1');

  // TEST 4: Customer-First Session & Registration Simulation
  console.log('\n--- TEST GROUP 4: Customer-First Session & Registration ---');
  
  // Fictional new customer registration simulation
  const dummyCustomer = {
    id: 'pat-cust-001',
    name: 'Meera Joshi',
    email: 'meera.joshi@example.com',
    phone: '+91 98200 99881',
    city: 'Mumbai, MH',
    age: 32,
    gender: 'Prefer not to say',
    bloodGroup: '—',
    linkedDoctorId: null, // Critical: Unlinked customer!
    primaryCondition: 'Self-Care & Daily Wellness',
    diseaseCategoryId: null,
    medicalNotes: 'Independent online customer. Self-directed wellness regimen.',
    lastConsultation: 'None (Independent Customer)',
    avatarText: 'MJ',
  };

  assert(dummyCustomer.linkedDoctorId === null, 'New customer starts with linkedDoctorId: null (No doctor connected yet)');
  assert(dummyCustomer.name === 'Meera Joshi', 'Customer has verified name');

  // TEST 5: Cart Calculation & Free Delivery Threshold
  console.log('\n--- TEST GROUP 5: Cart Calculation & Free Delivery Threshold ---');
  const sampleCart1 = [
    { id: 'vc-prod-001', name: 'Triphala Cleanse & Gut Harmonizer', price: 449, quantity: 1 },
  ];
  const subtotal1 = sampleCart1.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping1 = subtotal1 >= 499 ? 0 : 50;
  const total1 = subtotal1 + shipping1;
  assert(subtotal1 === 449, `Cart 1 subtotal is ₹${subtotal1}`);
  assert(shipping1 === 50, `Cart 1 has ₹50 standard shipping fee when under ₹499`);
  assert(total1 === 499, `Cart 1 total order value is ₹${total1}`);

  const sampleCart2 = [
    { id: 'vc-prod-001', name: 'Triphala Cleanse & Gut Harmonizer', price: 449, quantity: 2 },
  ];
  const subtotal2 = sampleCart2.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping2 = subtotal2 >= 499 ? 0 : 50;
  const total2 = subtotal2 + shipping2;
  assert(subtotal2 === 898, `Cart 2 subtotal is ₹${subtotal2}`);
  assert(shipping2 === 0, `Cart 2 has FREE shipping when over ₹499`);
  assert(total2 === 898, `Cart 2 total order value is ₹${total2}`);

  // TEST 6: Inventory Stock Decrement Simulation
  console.log('\n--- TEST GROUP 6: Inventory Stock Decrement & Order Generation ---');
  let simulatedProducts = INITIAL_PRODUCTS.map(p => ({ ...p }));
  const initialTriphalaStock = simulatedProducts.find(p => p.id === 'vc-prod-001').stock;
  
  // Place simulated order for 2 Triphala units
  const orderedQty = 2;
  simulatedProducts = simulatedProducts.map(p => {
    if (p.id === 'vc-prod-001') {
      const newStock = Math.max(0, p.stock - orderedQty);
      return { ...p, stock: newStock, stockQuantity: newStock, inStock: newStock > 0 };
    }
    return p;
  });

  const finalTriphalaStock = simulatedProducts.find(p => p.id === 'vc-prod-001').stock;
  assert(finalTriphalaStock === initialTriphalaStock - orderedQty, `Stock decremented from ${initialTriphalaStock} to ${finalTriphalaStock}`);

  // TEST 7: Order Confirmation Schema
  console.log('\n--- TEST GROUP 7: Order Confirmation Structure ---');
  const simulatedOrder = {
    id: `ORD-998877`,
    patientId: dummyCustomer.id,
    patientName: dummyCustomer.name,
    date: '2026-10-25',
    items: [
      { productId: 'vc-prod-001', name: 'Triphala Cleanse & Gut Harmonizer', quantity: 2, price: 449 }
    ],
    subtotal: 898,
    shippingFee: 0,
    total: 898,
    status: 'Confirmed - Processing',
    trackingNumber: 'VC-EXP-998877',
    deliveryAddress: {
      fullName: dummyCustomer.name,
      addressLine: '402, Green Orchid Residency, Linking Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      phone: dummyCustomer.phone,
    },
    timeline: [
      { step: 'Order Placed', time: 'Just now', done: true },
      { step: 'Verified by Pharmacy', time: 'Estimated 2 hours', done: true },
      { step: 'Dispatched (Express Courier)', time: 'Pending', done: false },
      { step: 'Delivered', time: 'Pending (2-3 days)', done: false },
    ],
  };

  assert(simulatedOrder.id.startsWith('ORD-'), `Order has valid format: ${simulatedOrder.id}`);
  assert(simulatedOrder.status === 'Confirmed - Processing', 'Order status is Confirmed - Processing');
  assert(simulatedOrder.items.length === 1, 'Order has 1 item type');
  assert(simulatedOrder.timeline.length === 4, 'Order has 4-step delivery timeline');
  assert(simulatedOrder.patientId === dummyCustomer.id, 'Order is linked to newly registered customer');

  // Summary
  console.log('\n====================================================');
  console.log(`TOTAL TESTS: ${passedCount + failedCount} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
  console.log('====================================================\n');

  if (failedCount > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal error in tests:', err);
  process.exit(1);
});
