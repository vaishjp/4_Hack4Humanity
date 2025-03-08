const mongoose = require("mongoose");

require("dotenv").config(); // Load secret key from .env
const { encrypt, decrypt } = require("../utils/encryption");

const reportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    description: { type: String, required: true },
    lastSeenLocation: { type: String, required: true },
    missingSince: { type: Date, required: true },
    photoUrl: { type: String },
    status: { type: String, enum: ["Missing", "Found", "Closed"], default: "Missing" },
    reportedBy: { type: String, required: true },
    reportedAt: { type: Date, default: Date.now },
    contactInfo: {
        type: String,
        required: true,
        set: (data) => encrypt(data.toString()),  // Ensure contact info is a string before encrypting
        get: (data) => decrypt(data),
    }
}, { toJSON: { getters: true } });

const auditSchema = new mongoose.Schema({
    reportId: { type: mongoose.Schema.Types.ObjectId, ref: "Report" },
    changedAt: { type: Date, default: Date.now },
    changes: { type: Object }, // Stores what was changed
  });
  
  const AuditLog = mongoose.model("AuditLog", auditSchema);
  
  reportSchema.pre("save", async function (next) {
    if (!this.isNew) {
      const changes = this.modifiedPaths().reduce((acc, field) => {
        acc[field] = this[field];
        return acc;
      }, {});
      await AuditLog.create({ reportId: this._id, changes });
    }
    next();
  });
  
  if (!process.env.SECRET_KEY) {
    throw new Error("❌ SECRET_KEY is missing in .env file!");
}
reportSchema.plugin(encrypt, { secret: process.env.SECRET_KEY, encryptedFields: ["contactInfo"] });



module.exports = mongoose.model('Report', reportSchema);