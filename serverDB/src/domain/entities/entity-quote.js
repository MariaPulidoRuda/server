module.exports = (db) => {

const quoteSchema = new db.Schema(
  {
    name: [
      { type: db.Schema.Types.ObjectId, ref: "patients", required: true },
    ],
    date: {type: String},
    reason: { type: String },
    doctor: [
      { type: db.Schema.Types.ObjectId, ref: "doctors", required: true },
    ],
  },
  {
    timestamps: true,
  }
);
return db.model('quotes', quoteSchema);
}

