module.exports = (db) => {

const adminSchema = new db.Schema(
  {
    adminName: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);
    return db.model("admins", adminSchema);
    };