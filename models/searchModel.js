import mongoose from "mongoose";


const searchHistorySchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required : true
    },
    searches: [String],

    // exploreHistory : {
    //     type : [String],
    //     default :[]
    // },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
})


export default mongoose.model('SearchHistory',searchHistorySchema)