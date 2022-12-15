module.exports = (db) => {

const doctorSchema = new db.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    speciality: { type: String, required: true, trim: true },
    image: { type: String },
    //quotes: [{ type: db.Schema.Types.ObjectId, ref: 'quotes' }] 
  },
  {
    timestamps: true,
  }
);
return db.model("doctors", doctorSchema);
};