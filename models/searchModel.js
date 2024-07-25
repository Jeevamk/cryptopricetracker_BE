import mongoose from "mongoose";


const searchHistorySchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required : true
    },
    searches: [String],

})


export default mongoose.model('SearchHistory',searchHistorySchema)