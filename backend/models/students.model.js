const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    gata: {
      type: String,
      required: true
    },
    postnummer: {
      type: String,
      required: true
    },
    ort: {
      type: String,
      required: true
    }
  }
})

module.exports = mongoose.model('Student', StudentSchema);
