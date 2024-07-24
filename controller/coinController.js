
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



