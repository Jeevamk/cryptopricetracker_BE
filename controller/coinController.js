import Coin from "../models/coinModel.js";


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