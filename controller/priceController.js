import Coin from "../models/coinModel.js";

export const priceData = async (req, res) => {
    const { symbol } = req.params;
    try {
      const coin = await Coin.findOne({ symbol });
      if (!coin) return res.status(404).json({ message: 'Coin not found' });
  
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      const recentPrices = coin.prices.filter(price => price.timestamp >= thirtyMinutesAgo);
  
      res.json(recentPrices);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching price data' });
    }
  };