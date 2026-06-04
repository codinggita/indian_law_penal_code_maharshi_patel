const mongoose = require('mongoose');

const lawSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters']
    },
    act: {
      type: String,
      required: [true, 'Act is required'],
      trim: true
    },
    chapter: {
      type: String,
      trim: true
    },
    section: {
      type: Number,
      required: [true, 'Section is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    state: {
      type: String,
      trim: true,
      default: 'India'
    },
    description: {
      type: String,
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true
    },
    views: {
      type: Number,
      default: 0
    },
    isArchived: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Law', lawSchema);
