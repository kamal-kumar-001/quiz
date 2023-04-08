const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      default: 'Untitled',
    },
    mainColor: {
      type: String,
      required: true,
      default: '#000000',
    },
    textColor: {
      type: String,
      required: true,
      default: '#ffffff',
    },
    bgColor: {
      type: String,
      required: true,
      default: '#ffffff',
    },
    buttonType: {
      type: String,
      required: true,
      default: 'solid',
    },
    width: {
      type: Number,
      required: true,
      default: 100,
    },
    height: {
      type: Number,
      required: true,
      default: 40,
    },
    font: {
      type: String,
      required: true,
      default: 'Arial',
    },
    fontSize: {
      type: Number,
      required: true,
      default: 14,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  }, {timestamps: true});


mongoose.models = {};
export default mongoose.model('Template', TemplateSchema);
