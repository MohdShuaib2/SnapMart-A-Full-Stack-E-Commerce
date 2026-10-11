const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
dns.setServers(['1.1.1.1', '8.8.8.8']);

const products = [
  {
    name: 'Aurora Wireless Headphones',
    description: 'Premium wireless headphones with deep bass, soft cushions, and long battery life.',
    price: 2499,
    category: 'Electronics',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    ratings: 4.7,
    numReviews: 41
  },
  {
    name: 'Pulse Smartwatch Pro',
    description: 'Fitness smartwatch with heart-rate tracking, sleep insights, and bright AMOLED display.',
    price: 3299,
    category: 'Electronics',
    stock: 42,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    ratings: 4.6,
    numReviews: 58
  },
  {
    name: 'Nova Desk Lamp',
    description: 'Adjustable LED desk lamp with warm and cool light modes for study or work.',
    price: 899,
    category: 'Home',
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
    ratings: 4.4,
    numReviews: 19
  },
  {
    name: 'Metro Everyday Backpack',
    description: 'Durable backpack with laptop sleeve, padded straps, and clean everyday styling.',
    price: 1499,
    category: 'Bags',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
    ratings: 4.5,
    numReviews: 33
  },
  {
    name: 'Cloud Runner Sneakers',
    description: 'Lightweight sneakers with cushioned sole and breathable upper for daily comfort.',
    price: 2199,
    category: 'Fashion',
    stock: 55,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    ratings: 4.8,
    numReviews: 72
  },
  {
    name: 'Zen Ceramic Mug Set',
    description: 'Set of four matte ceramic mugs for coffee, tea, and cozy mornings.',
    price: 699,
    category: 'Home',
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80',
    ratings: 4.3,
    numReviews: 24
  },
  {
    name: 'Titan Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with punchy sound, water resistance, and rugged body.',
    price: 1799,
    category: 'Electronics',
    stock: 47,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80',
    ratings: 4.5,
    numReviews: 37
  },
  {
    name: 'Aero Mechanical Keyboard',
    description: 'Compact mechanical keyboard with tactile switches and RGB backlighting.',
    price: 2899,
    category: 'Electronics',
    stock: 28,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
    ratings: 4.7,
    numReviews: 46
  },
  {
    name: 'Focus Wireless Mouse',
    description: 'Ergonomic wireless mouse with silent clicks and adjustable DPI.',
    price: 799,
    category: 'Electronics',
    stock: 75,
    imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
    ratings: 4.4,
    numReviews: 29
  },
  {
    name: 'Luxe Leather Wallet',
    description: 'Slim leather wallet with neat card slots and premium textured finish.',
    price: 999,
    category: 'Fashion',
    stock: 64,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80',
    ratings: 4.5,
    numReviews: 22
  },
  {
    name: 'Breeze Cotton T-Shirt',
    description: 'Soft cotton crew-neck t-shirt made for everyday casual wear.',
    price: 599,
    category: 'Fashion',
    stock: 95,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    ratings: 4.2,
    numReviews: 31
  },
  {
    name: 'Summit Travel Duffel',
    description: 'Spacious travel duffel with reinforced handles and separate shoe pocket.',
    price: 1999,
    category: 'Bags',
    stock: 38,
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80',
    ratings: 4.6,
    numReviews: 27
  },
  {
    name: 'Pure Stainless Bottle',
    description: 'Insulated stainless steel bottle that keeps drinks hot or cold for hours.',
    price: 749,
    category: 'Home',
    stock: 88,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
    ratings: 4.7,
    numReviews: 65
  },
  {
    name: 'Orbit Sunglasses',
    description: 'UV-protected sunglasses with lightweight frame and modern lens shape.',
    price: 1199,
    category: 'Fashion',
    stock: 57,
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80',
    ratings: 4.3,
    numReviews: 18
  },
  {
    name: 'Studio Table Clock',
    description: 'Minimal table clock with silent movement and clean modern face.',
    price: 649,
    category: 'Home',
    stock: 44,
    imageUrl: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=900&q=80',
    ratings: 4.1,
    numReviews: 15
  },
  {
    name: 'Arc Laptop Stand',
    description: 'Aluminium laptop stand for better posture, airflow, and desk organization.',
    price: 1399,
    category: 'Electronics',
    stock: 39,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
    ratings: 4.6,
    numReviews: 34
  },
  {
    name: 'Glow Skincare Kit',
    description: 'Daily skincare kit with cleanser, moisturizer, and serum for a fresh routine.',
    price: 1599,
    category: 'Beauty',
    stock: 48,
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
    ratings: 4.4,
    numReviews: 26
  },
  {
    name: 'Calm Scented Candles',
    description: 'Pack of scented candles with relaxing notes for bedrooms and living spaces.',
    price: 549,
    category: 'Home',
    stock: 72,
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80',
    ratings: 4.5,
    numReviews: 21
  },
  {
    name: 'Flex Yoga Mat',
    description: 'Anti-slip yoga mat with comfortable cushioning for workouts and stretching.',
    price: 999,
    category: 'Fitness',
    stock: 66,
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=900&q=80',
    ratings: 4.6,
    numReviews: 44
  },
  {
    name: 'Core Dumbbell Pair',
    description: 'Durable dumbbell pair with comfortable grip for home strength training.',
    price: 1299,
    category: 'Fitness',
    stock: 31,
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    ratings: 4.7,
    numReviews: 53
  },
  {
    name: 'Chef Nonstick Pan',
    description: 'Nonstick frying pan with even heat distribution and sturdy handle.',
    price: 1199,
    category: 'Kitchen',
    stock: 52,
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80',
    ratings: 4.4,
    numReviews: 20
  },
  {
    name: 'Brew French Press',
    description: 'Glass French press for rich coffee with stainless steel filter and frame.',
    price: 899,
    category: 'Kitchen',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80',
    ratings: 4.5,
    numReviews: 32
  },
  {
    name: 'Pixel Phone Case',
    description: 'Shock-absorbing phone case with raised camera edges and smooth matte grip.',
    price: 499,
    category: 'Accessories',
    stock: 110,
    imageUrl: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&w=900&q=80',
    ratings: 4.2,
    numReviews: 17
  },
  {
    name: 'Wave Gaming Controller',
    description: 'Wireless gaming controller with responsive triggers and comfortable layout.',
    price: 2499,
    category: 'Gaming',
    stock: 34,
    imageUrl: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=900&q=80',
    ratings: 4.6,
    numReviews: 39
  },
  {
    name: 'Echo True Wireless Earbuds',
    description: 'Compact earbuds with clear calls, touch controls, and pocket charging case.',
    price: 1899,
    category: 'Electronics',
    stock: 62,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80',
    ratings: 4.5,
    numReviews: 48
  },
  {
    name: 'Spark Fast Charger',
    description: 'Dual-port fast charger for phones, tablets, and everyday travel use.',
    price: 699,
    category: 'Electronics',
    stock: 120,
    imageUrl: 'https://images.unsplash.com/photo-1603539444875-76e7684265f6?auto=format&fit=crop&w=900&q=80',
    ratings: 4.3,
    numReviews: 36
  },
  {
    name: 'Volt USB-C Cable Pack',
    description: 'Pack of braided USB-C cables built for reliable charging and syncing.',
    price: 399,
    category: 'Accessories',
    stock: 150,
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80',
    ratings: 4.2,
    numReviews: 28
  },
  {
    name: 'Slate Tablet Sleeve',
    description: 'Soft padded tablet sleeve with slim profile and secure zipper closure.',
    price: 799,
    category: 'Accessories',
    stock: 70,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80',
    ratings: 4.4,
    numReviews: 19
  },
  {
    name: 'Matrix Webcam HD',
    description: 'Full HD webcam with built-in microphone for meetings and online classes.',
    price: 1599,
    category: 'Electronics',
    stock: 46,
    imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80',
    ratings: 4.5,
    numReviews: 31
  },
  {
    name: 'Clear Glass Food Jar Set',
    description: 'Airtight glass jars for storing snacks, spices, pulses, and pantry staples.',
    price: 899,
    category: 'Kitchen',
    stock: 82,
    imageUrl: 'https://images.unsplash.com/photo-1584269600519-112a1dcc4a89?auto=format&fit=crop&w=900&q=80',
    ratings: 4.6,
    numReviews: 42
  },
  {
    name: 'Prime Chef Knife',
    description: 'Sharp stainless steel chef knife with balanced handle for daily cooking.',
    price: 1099,
    category: 'Kitchen',
    stock: 43,
    imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=900&q=80',
    ratings: 4.7,
    numReviews: 34
  },
  {
    name: 'Fresh Lunch Box',
    description: 'Leak-resistant lunch box with compartments for office, school, and travel.',
    price: 649,
    category: 'Kitchen',
    stock: 96,
    imageUrl: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=900&q=80',
    ratings: 4.4,
    numReviews: 25
  },
  {
    name: 'Bistro Electric Kettle',
    description: 'Quick-boil electric kettle with auto shut-off and stainless steel body.',
    price: 1399,
    category: 'Kitchen',
    stock: 51,
    imageUrl: 'https://images.unsplash.com/photo-1571552879083-e93b6ea70d1d?auto=format&fit=crop&w=900&q=80',
    ratings: 4.5,
    numReviews: 30
  },
  {
    name: 'Harvest Wooden Chopping Board',
    description: 'Durable wooden chopping board for vegetables, fruits, bread, and serving.',
    price: 749,
    category: 'Kitchen',
    stock: 67,
    imageUrl: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?auto=format&fit=crop&w=900&q=80',
    ratings: 4.3,
    numReviews: 18
  },
  {
    name: 'Comfy Bed Pillow Pair',
    description: 'Soft pillow pair with supportive filling for restful sleep and comfort.',
    price: 1299,
    category: 'Home',
    stock: 74,
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80',
    ratings: 4.5,
    numReviews: 37
  },
  {
    name: 'Urban Cotton Bedsheet',
    description: 'Breathable cotton bedsheet with smooth finish and easy-care fabric.',
    price: 1599,
    category: 'Home',
    stock: 58,
    imageUrl: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=900&q=80',
    ratings: 4.4,
    numReviews: 29
  },
  {
    name: 'Aura Wall Mirror',
    description: 'Round wall mirror with clean frame for bedroom, hallway, or dressing area.',
    price: 1899,
    category: 'Home',
    stock: 32,
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80',
    ratings: 4.6,
    numReviews: 21
  },
  {
    name: 'Nest Storage Basket Set',
    description: 'Woven storage baskets for organizing shelves, wardrobes, and living rooms.',
    price: 999,
    category: 'Home',
    stock: 69,
    imageUrl: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=900&q=80',
    ratings: 4.3,
    numReviews: 24
  },
  {
    name: 'Soft Bath Towel Set',
    description: 'Absorbent towel set with plush feel for bathroom and daily use.',
    price: 1199,
    category: 'Home',
    stock: 84,
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
    ratings: 4.5,
    numReviews: 33
  },
  {
    name: 'Trail Hiking Backpack',
    description: 'Light hiking backpack with bottle pockets and breathable back support.',
    price: 1799,
    category: 'Bags',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?auto=format&fit=crop&w=900&q=80',
    ratings: 4.6,
    numReviews: 27
  },
  {
    name: 'Office Laptop Backpack',
    description: 'Professional laptop backpack with organizer pockets and padded laptop section.',
    price: 2199,
    category: 'Bags',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=900&q=80',
    ratings: 4.7,
    numReviews: 38
  },
  {
    name: 'Canvas Tote Bag',
    description: 'Reusable canvas tote bag with roomy interior for shopping and daily errands.',
    price: 499,
    category: 'Bags',
    stock: 105,
    imageUrl: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80',
    ratings: 4.2,
    numReviews: 16
  },
  {
    name: 'Voyage Cabin Trolley',
    description: 'Lightweight cabin trolley with spinner wheels and secure telescopic handle.',
    price: 3499,
    category: 'Bags',
    stock: 26,
    imageUrl: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=900&q=80',
    ratings: 4.6,
    numReviews: 22
  },
  {
    name: 'Everyday Crossbody Bag',
    description: 'Compact crossbody bag with adjustable strap and quick-access pockets.',
    price: 1199,
    category: 'Bags',
    stock: 54,
    imageUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80',
    ratings: 4.4,
    numReviews: 23
  },
  {
    name: 'Classic Denim Jacket',
    description: 'Timeless denim jacket with sturdy stitching and easy casual fit.',
    price: 2499,
    category: 'Fashion',
    stock: 36,
    imageUrl: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&w=900&q=80',
    ratings: 4.5,
    numReviews: 32
  },
  {
    name: 'Stride Running Shoes',
    description: 'Breathable running shoes with cushioned midsole and grippy outsole.',
    price: 2699,
    category: 'Fashion',
    stock: 48,
    imageUrl: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80',
    ratings: 4.7,
    numReviews: 45
  },
  {
    name: 'Formal Oxford Shirt',
    description: 'Crisp oxford shirt for office wear, meetings, and smart casual looks.',
    price: 1299,
    category: 'Fashion',
    stock: 76,
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
    ratings: 4.3,
    numReviews: 26
  },
  {
    name: 'Cozy Hoodie',
    description: 'Warm pullover hoodie with soft fleece lining and relaxed everyday fit.',
    price: 1699,
    category: 'Fashion',
    stock: 59,
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80',
    ratings: 4.6,
    numReviews: 41
  },
  {
    name: 'Active Track Pants',
    description: 'Comfortable track pants with stretch fabric for workouts and lounging.',
    price: 999,
    category: 'Fashion',
    stock: 88,
    imageUrl: 'https://images.unsplash.com/photo-1506629905607-d405b7a30db9?auto=format&fit=crop&w=900&q=80',
    ratings: 4.2,
    numReviews: 20
  },
  {
    name: 'Balance Fitness Band',
    description: 'Smart fitness band with step tracking, sleep data, and phone notifications.',
    price: 1499,
    category: 'Fitness',
    stock: 64,
    imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=900&q=80',
    ratings: 4.4,
    numReviews: 35
  },
  {
    name: 'Power Resistance Bands',
    description: 'Set of resistance bands for strength training, mobility, and stretching.',
    price: 599,
    category: 'Fitness',
    stock: 112,
    imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80',
    ratings: 4.5,
    numReviews: 39
  },
  {
    name: 'Grip Push-Up Bars',
    description: 'Stable push-up bars with foam handles for better wrist support.',
    price: 799,
    category: 'Fitness',
    stock: 73,
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80',
    ratings: 4.3,
    numReviews: 21
  },
  {
    name: 'Speed Skipping Rope',
    description: 'Adjustable skipping rope with smooth bearings for cardio training.',
    price: 349,
    category: 'Fitness',
    stock: 140,
    imageUrl: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=900&q=80',
    ratings: 4.4,
    numReviews: 30
  },
  {
    name: 'Hydra Protein Shaker',
    description: 'Leakproof protein shaker with mixing ball and easy measurement marks.',
    price: 449,
    category: 'Fitness',
    stock: 98,
    imageUrl: 'https://images.unsplash.com/photo-1612831455359-970e23a1e4e9?auto=format&fit=crop&w=900&q=80',
    ratings: 4.2,
    numReviews: 17
  },
  {
    name: 'Radiance Face Serum',
    description: 'Lightweight face serum for a smoother, hydrated, and brighter-looking skin routine.',
    price: 899,
    category: 'Beauty',
    stock: 77,
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
    ratings: 4.5,
    numReviews: 28
  },
  {
    name: 'Velvet Matte Lipstick Set',
    description: 'Set of long-wear matte lipsticks in versatile everyday shades.',
    price: 799,
    category: 'Beauty',
    stock: 83,
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80',
    ratings: 4.4,
    numReviews: 34
  },
  {
    name: 'Silk Hair Dryer',
    description: 'Compact hair dryer with heat settings for quick styling and smooth finish.',
    price: 1499,
    category: 'Beauty',
    stock: 39,
    imageUrl: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&w=900&q=80',
    ratings: 4.3,
    numReviews: 20
  },
  {
    name: 'Fresh Body Wash Duo',
    description: 'Refreshing body wash duo with gentle formula for daily shower care.',
    price: 599,
    category: 'Beauty',
    stock: 102,
    imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
    ratings: 4.2,
    numReviews: 18
  },
  {
    name: 'Bloom Perfume Mist',
    description: 'Light perfume mist with fresh floral notes for everyday use.',
    price: 999,
    category: 'Beauty',
    stock: 55,
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80',
    ratings: 4.6,
    numReviews: 31
  },
  {
    name: 'Quest Gaming Mouse',
    description: 'RGB gaming mouse with programmable buttons and high-precision sensor.',
    price: 1299,
    category: 'Gaming',
    stock: 52,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80',
    ratings: 4.6,
    numReviews: 44
  },
  {
    name: 'Arena Gaming Headset',
    description: 'Comfortable gaming headset with surround-style sound and noise-reducing mic.',
    price: 1999,
    category: 'Gaming',
    stock: 37,
    imageUrl: 'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=900&q=80',
    ratings: 4.5,
    numReviews: 33
  },
  {
    name: 'Nova RGB Mouse Pad',
    description: 'Large gaming mouse pad with smooth surface and RGB edge lighting.',
    price: 999,
    category: 'Gaming',
    stock: 61,
    imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?auto=format&fit=crop&w=900&q=80',
    ratings: 4.3,
    numReviews: 22
  },
  {
    name: 'Turbo Cooling Pad',
    description: 'Laptop cooling pad with quiet fans, angle adjustment, and USB power.',
    price: 1199,
    category: 'Gaming',
    stock: 49,
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=900&q=80',
    ratings: 4.4,
    numReviews: 24
  },
  {
    name: 'Retro Handheld Console',
    description: 'Portable handheld game console with compact design and classic controls.',
    price: 2899,
    category: 'Gaming',
    stock: 29,
    imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80',
    ratings: 4.5,
    numReviews: 26
  },
  {
    name: 'Orbit Desk Organizer',
    description: 'Desk organizer with compartments for pens, notes, cables, and accessories.',
    price: 599,
    category: 'Office',
    stock: 90,
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
    ratings: 4.3,
    numReviews: 19
  },
  {
    name: 'Focus Notebook Set',
    description: 'Set of ruled notebooks for school, office notes, planning, and journaling.',
    price: 399,
    category: 'Office',
    stock: 130,
    imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80',
    ratings: 4.4,
    numReviews: 27
  },
  {
    name: 'Swift Ball Pen Pack',
    description: 'Smooth ball pen pack with comfortable grip for daily writing.',
    price: 249,
    category: 'Office',
    stock: 180,
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=900&q=80',
    ratings: 4.1,
    numReviews: 14
  },
  {
    name: 'Ergo Office Chair Cushion',
    description: 'Supportive seat cushion for long study, office, and work-from-home hours.',
    price: 999,
    category: 'Office',
    stock: 56,
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80',
    ratings: 4.5,
    numReviews: 32
  },
  {
    name: 'Bright Whiteboard Kit',
    description: 'Magnetic whiteboard kit with marker, eraser, and mounting accessories.',
    price: 1299,
    category: 'Office',
    stock: 42,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    ratings: 4.3,
    numReviews: 18
  },
  {
    name: 'Mini Tripod Stand',
    description: 'Portable tripod stand for phones, cameras, videos, and stable photos.',
    price: 799,
    category: 'Accessories',
    stock: 68,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
    ratings: 4.4,
    numReviews: 23
  },
  {
    name: 'Secure Bike Lock',
    description: 'Heavy-duty bike lock with durable cable and easy key mechanism.',
    price: 699,
    category: 'Accessories',
    stock: 87,
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=80',
    ratings: 4.2,
    numReviews: 16
  },
  {
    name: 'Rainproof Umbrella',
    description: 'Compact rainproof umbrella with sturdy ribs and automatic open button.',
    price: 549,
    category: 'Accessories',
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
    ratings: 4.3,
    numReviews: 21
  },
  {
    name: 'Polar Travel Mug',
    description: 'Insulated travel mug with spill-resistant lid for coffee on the move.',
    price: 849,
    category: 'Accessories',
    stock: 71,
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80',
    ratings: 4.5,
    numReviews: 29
  },
  {
    name: 'Magnetic Car Phone Holder',
    description: 'Dashboard phone holder with strong magnet and adjustable viewing angle.',
    price: 499,
    category: 'Accessories',
    stock: 118,
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=900&q=80',
    ratings: 4.2,
    numReviews: 25
  }
];

const addProducts = async () => {
  try {
    await connectDB();

    const existing = await Product.find({ name: { $in: products.map((product) => product.name) } }).select('name');
    const existingNames = new Set(existing.map((product) => product.name));
    const newProducts = products.filter((product) => !existingNames.has(product.name));

    if (newProducts.length) {
      await Product.insertMany(newProducts);
    }

    console.log(`${newProducts.length} products added`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

addProducts();
