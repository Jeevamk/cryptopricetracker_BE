const fetchAndStorePrices = async () => {
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
  
        await Coin.findOneAndUpdate(
          { symbol },
          { $push: { prices: priceData } },
          { upsert: true, new: true }
        );
      }
  
      console.log('Price data fetched and stored successfully');
    } catch (error) {
      console.error('Error fetching or storing price data:', error);
    }
  };
  
