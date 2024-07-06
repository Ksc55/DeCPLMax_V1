const VideoSchema = new mongoose.Schema({
    owner: {
      type: String,
      required: true,
    },
    video_id: {
      type: String,
      required: true,
      unique: true,
    },
    video_uri: {
      type: String,
      required : true,
      unique: true,
    },
    nft_address: {
      type: String,
      required : true,
    },
    nft_uri: {
        type: String,
        required : false,
        unique: true,
      },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
   leads: {
        type: Number,
        default: 0,
      },
       created_at : {
    type: Date,
    default: Date.now,
  },
  updated_at : {
    type: Date,
    default: Date.now,
  },
  created_at : {
    type: Date,
    default: Date.now,
  },
  updated_at : {
    type: Date,
    default: Date.now,
  },
  });
  
  /**{ 
   timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at' // and `updated_at` to store the last updated date
}} ); **/
  
  module.exports = Video = mongoose.model('video', VideoSchema);