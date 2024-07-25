import searchModel from "../models/searchModel.js";


export const getHistory = async (req, res) => {
    try {
      console.log(req.params );
      const history = await searchModel.findOne({ userId: req.params.userId });
      console.log(history);
      if (!history) {
        return res.status(404).json({ message: 'Search history not found' });
      }
      console.log(history);
      res.json(history);
    } catch (error) {
      console.error('Error fetching search history:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };



 export const postHistory =  async (req, res) => {
    try {
      const { query } = req.body;
      const history = await searchModel.findOne({ userId: req.params.userId });
      if (history) {
        if (!history.searches.includes(query)) {
          history.searches.push(query);
          await history.save();
        }
      } else {
        await searchModel.create({
          userId: req.params.userId,
          searches: [query]
        });
      }
      res.status(201).json({ message: 'Search term added' });
    } catch (error) {
      console.error('Error adding search term:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }



export const removeHistory = async (req, res) => {
    try {
      const { userId, term } = req.params;
      const history = await searchModel.findOne({ userId: userId });
      
      if (history) {
        history.searches = history.searches.filter(search => search !== term);
        await history.save();
        res.status(200).json({ message: 'Search term removed' });
      } else {
        res.status(404).json({ message: 'Search history not found' });
      }
    } catch (error) {
      console.error('Error removing search term:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }