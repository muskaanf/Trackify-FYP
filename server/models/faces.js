const mongoose = require('mongoose');

const facesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
    title: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String, 
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Faces', facesSchema);


