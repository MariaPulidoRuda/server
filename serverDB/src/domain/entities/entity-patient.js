
module.exports = (db) => {

  const patientSchema = new db.Schema(
    {
      name: { type: String, required: true, unique: true, trim: true },
    age: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    quotes: [{ type: db.Schema.Types.ObjectId, ref: 'quotes' }],
    image: { type: String },
    },
    {
      timestamps: true,
    }
  );
  return db.model("patients", patientSchema);
  };

  