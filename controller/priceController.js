
import Coin from "../models/coinModel.js";
import axios from 'axios';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

export const priceData = async (req, res) => {
    const { symbol } = req.params;
    try {
        const coin = await Coin.findOne({ symbol });
        if (!coin) return res.status(404).json({ message: 'Coin not found' });

        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        const recentPrices = coin.prices.filter(price => price.timestamp >= thirtyMinutesAgo);

        const coinGeckoResponse = await axios.get(COINGECKO_API_URL);
        const coinGeckoData = coinGeckoResponse.data.find(coin => coin.symbol.toLowerCase() === symbol.toLowerCase());

        res.json({
            coinGeckoInfo: coinGeckoData,
            recentPrices
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching price data' });
    }
};
