const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plan: {
    type: String,
    enum: ['basic', 'pro', 'premium'],
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'trial', 'canceled'],
    default: 'trial',
  },
  start_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  end_date: {
    type: Date,
    required: true,
  },
});
mongoose.models = {};
export default mongoose.model('Subscription', SubscriptionSchema);
