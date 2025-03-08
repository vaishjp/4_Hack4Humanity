import React, { useState } from "react";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setErrorMessage("Please enter a name to search.");
      return;
    }

    try {
      console.log("🔍 Searching for:", searchTerm);
      const response = await fetch(`http://localhost:5000/api/reports/search?name=${searchTerm}`);
      const data = await response.json();

      if (response.ok) {
        setSearchResults(data);
        setErrorMessage(""); // Clear error if search is successful
      } else {
        setSearchResults([]);
        setErrorMessage(data.message || "No reports found.");
      }
    } catch (error) {
      console.error("❌ Error fetching reports:", error);
      setErrorMessage("Failed to fetch reports.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2>Search Missing Reports</h2>
      <input
        type="text"
        placeholder="Enter name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <button onClick={handleSearch} style={{ backgroundColor: "green", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
        Search
      </button>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <div>
        {searchResults.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
          {searchResults.map((report) => (
            <li key={report._id} style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ddd" }}>
              <p><strong>Name:</strong> {report.name} | <strong>Status:</strong> {report.status}</p>
              <p><strong>Age:</strong> {report.age} | <strong>Last Seen:</strong> {report.lastSeenLocation}</p>
              <p><strong>Missing Since:</strong> {new Date(report.missingSince).toLocaleDateString()}</p>
              <p><strong>Reported By:</strong> {report.reportedBy} | <strong>Contact:</strong> {report.contactInfo}</p>
              <p><strong>Description:</strong> {report.description}</p>
              {report.photoUrl && (
                <img src={report.photoUrl} alt="Missing Person" style={{ width: "120px", height: "120px", borderRadius: "5px" }} />
              )}
            </li>
          ))}
        </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
