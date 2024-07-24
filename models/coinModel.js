import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
  timestamp: { 
    type: Date, 
    required: true 
   },
  price: {
    btc: { type: Number, default: 0 },
    eur: { type: Number, default: 0 },
    idr: { type: Number, default: 0 },
    inr: { type: Number, default: 0 },
    ngn: { type: Number, default: 0 },
    rub: { type: Number, default: 0 },
    sar: { type: Number, default: 0 },
    try: { type: Number, default: 0 },
    uah: { type: Number, default: 0 },
    usdt: { type: Number, default: 0 },
    wrx: { type: Number, default: 0 }
  }
});

const coinSchema = new mongoose.Schema({
  symbol: { 
    type: String, 
    required: true 
},
  prices: [priceSchema]
});

const Coin = mongoose.model('Coin', coinSchema);

export default Coin;
