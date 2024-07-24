import Coin from "../models/coinModel.js";
import axios from "axios";


const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
const WAZIRX_API_URL = 'https://x.wazirx.com/wazirx-falcon/api/v2.0/crypto_rates';
const DUMMY_IMAGE_URL = 'https://dummyimage.com/100x100/000/fff';

export const getCoin = async (req, res) => {
    try {
      const coingeckoResponse = await fetch(COINGECKO_API_URL);
      const coingeckoData = await coingeckoResponse.json();
  
      const wazirxResponse = await fetch(WAZIRX_API_URL);
      const wazirxData = await wazirxResponse.json();
  
      const coins = coingeckoData.map(coin => ({
        coinName: coin.name,
        symbol: coin.symbol,
        image: coin.image || DUMMY_IMAGE_URL,
        usdtPrice: wazirxData[coin.symbol]?.usdt || '0.00'
      }));
  
      res.json(coins);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }



export const coinHistory = async (req, res) => {
  try {
    const { symbol } = req.params;
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    const coin = await Coin.findOne({
      symbol,
      'prices.timestamp': { $gte: thirtyMinutesAgo }
    });

    if (!coin) {
      return res.status(404).json({ error: 'Coin not found' });
    }

    const prices = coin.prices.filter(price => price.timestamp >= thirtyMinutesAgo);
    res.json(prices);
  } catch (error) {
    console.error('Error retrieving price history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 


export const fetchAndStorePrices = async () => {
  try {
    const response = await axios.get(WAZIRX_API_URL);
    const data = response.data;

    for (const [symbol, prices] of Object.entries(data)) {
      const priceData = {
        timestamp: new Date(),
        price: {
          btc: parseFloat(prices.btc) || 0,
          eur: parseFloat(prices.eur) || 0,
          idr: parseFloat(prices.idr) || 0,
          inr: parseFloat(prices.inr) || 0,
          ngn: parseFloat(prices.ngn) || 0,
          rub: parseFloat(prices.rub) || 0,
          sar: parseFloat(prices.sar) || 0,
          try: parseFloat(prices.try) || 0,
          uah: parseFloat(prices.uah) || 0,
          usdt: parseFloat(prices.usdt) || 0,
          wrx: parseFloat(prices.wrx) || 0
        }
      };

    const coin =  await Coin.findOneAndUpdate(
        { symbol },
        { $push: { prices: priceData } },
        { upsert: true, new: true }
      );
      if (coin) {
        if(coin.prices.length > 30) {
          coin.prices.shift();
          await coin.save()
        }
      }
    }

  } catch (error) {
    console.error('Error fetching or storing price data:', error);
  }
};
