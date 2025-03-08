import React, { useState } from "react";

const ReportPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        description: "",
        lastSeenLocation: "",
        missingSince: "",
        contactInfo: "",
        photoUrl: "",
        reportedBy: "",
        status: "Missing", // ✅ Fix: Default status to "Missing"
    });
    

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Report submitted successfully!");
        setFormData({
          name: "",
          age: "",
          description: "",
          lastSeenLocation: "",
          missingSince: "",
          contactInfo: "",
          photoUrl: "",
          reportedBy: "",
        });
      } else {
        alert("Failed to submit report.");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2>Report a Missing Child</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
  <input type="text" name="name" placeholder="Child's Name" value={formData.name} onChange={handleChange} required />
  <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
  <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
  <input type="text" name="lastSeenLocation" placeholder="Last Seen Location" value={formData.lastSeenLocation} onChange={handleChange} required />
  <input type="date" name="missingSince" value={formData.missingSince} onChange={handleChange} required />
  <input type="text" name="contactInfo" placeholder="Your Contact Info" value={formData.contactInfo} onChange={handleChange} required />
  <input type="url" name="photoUrl" placeholder="Photo URL (Optional)" value={formData.photoUrl} onChange={handleChange} />
  <input type="text" name="reportedBy" placeholder="Your Name" value={formData.reportedBy} onChange={handleChange} required />
  
  {/* ✅ Add Status Dropdown Here */}
  <select name="status" value={formData.status} onChange={handleChange} required>
    <option value="Missing">Missing</option>
    <option value="Found">Found</option>
    <option value="Closed">Closed</option>
  </select>

  <button type="submit" style={{ backgroundColor: "blue", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
    Submit Report
  </button>
</form>

    </div>
  );
};

export default ReportPage;
