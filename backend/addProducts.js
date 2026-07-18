const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const Product = require('./models/Product');
const connectDB = require('./config/DB');

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
