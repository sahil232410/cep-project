import React, { useState } from 'react';
import { Camera, CheckCircle, ArrowRight, RefreshCw, FileText, MapPin, Layers, Calendar } from 'lucide-react';

export default function ReportWaste({ reports, setReports, setTrackId, setCurrentPage }) {
  // Form states
  var [reporterName, setReporterName] = useState('');
  var [location, setLocation] = useState('');
  var [wasteType, setWasteType] = useState('Wet Waste');
  var [description, setDescription] = useState('');
  var [date, setDate] = useState(function() {
    return new Date().toISOString().split('T')[0];
  });
  var [imagePreview, setImagePreview] = useState('');
  
  // Submission success states
  var [submittedReport, setSubmittedReport] = useState(null);

  // Helper to generate sequential Report ID (e.g. ET-1001, ET-1002...)
  var generateReportId = function() {
    if (!reports || reports.length === 0) return 'ET-1001';
    
    var numericIds = reports.map(function(r) {
      if (!r || !r.id || typeof r.id !== 'string') return 1000;
      var match = r.id.match(/ET-(\d+)/);
      return match ? parseInt(match[1]) : 1000;
    });
    
    var maxId = Math.max.apply(null, numericIds);
    return 'ET-' + (maxId + 1);
  };

  // Image Upload handler with auto-compression to prevent LocalStorage QuotaExceededError
  var handleImageChange = function(e) {
    var file = e.target.files[0];
    if (!file) return;

    // Optional limit: only images
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (png, jpg, jpeg).');
      return;
    }

    var reader = new FileReader();
    reader.onload = function(readerEvent) {
      var img = new Image();
      img.onload = function() {
        var maxDim = 800;
        var width = img.width;
        var height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress image to JPEG (~30KB-60KB) to ensure localStorage quota is never exceeded
        var compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        setImagePreview(compressedBase64);
      };
      img.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Form submission handler
  var handleSubmit = function(e) {
    e.preventDefault();
    if (!location.trim() || !description.trim()) {
      alert('Please fill in the Location and Description.');
      return;
    }

    var newId = generateReportId();
    var newReport = {
      id: newId,
      reporterName: reporterName.trim() || 'Anonymous Resident',
      location: location.trim(),
      wasteType: wasteType,
      description: description.trim(),
      date: date,
      status: 'Reported',
      imageUrl: imagePreview
    };

    // Add to reports array
    setReports([newReport, ...reports]);
    
    // Set success display
    setSubmittedReport(newReport);
  };

  // Reset form to submit another report
  var handleReset = function() {
    setReporterName('');
    setLocation('');
    setWasteType('Wet Waste');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    setImagePreview('');
    setSubmittedReport(null);
  };

  // Redirect user to track report page
  var handleTrackNow = function(id) {
    setTrackId(id);
    setCurrentPage('track-report');
  };

  return (
    <section className="report-waste-page" id="report-waste" style={{ padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        
        {/* Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2>Report Waste Dump</h2>
          <p>Help local authorities keep our community clean by reporting overflows or dirty zones.</p>
        </div>

        {/* Success View */}
        {submittedReport ? (
          <div className="card text-center" style={{ padding: '40px 32px', textAlign: 'center', borderTop: '6px solid var(--primary)' }}>
            <div style={{ display: 'inline-flex', padding: '16px', background: 'var(--primary-light)', borderRadius: '50%', color: 'var(--primary)', marginBottom: '24px' }}>
              <CheckCircle size={48} />
            </div>
            
            <h3 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Waste Report Submitted Successfully</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              Thank you for contributing to your community. Your report has been logged in the EcoTrack network.
            </p>

            {/* Ticket Box */}
            <div style={{ background: 'var(--bg-app)', border: '1px dashed var(--border-color)', borderRadius: '12px', padding: '24px', margin: '0 auto 32px', maxWidth: '440px' }}>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Generated Report ID</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-heading)', margin: '8px 0' }}>
                {submittedReport.id}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                Copy this ID to track your complaint status anytime.
              </p>
            </div>

            {/* Quick summary */}
            <div style={{ textAlign: 'left', background: 'var(--bg-app)', padding: '16px 20px', borderRadius: '8px', marginBottom: '32px', fontSize: '0.9rem', borderLeft: '3px solid var(--primary)' }}>
              <div style={{ margin: '4px 0' }}><strong>Location:</strong> {submittedReport.location}</div>
              <div style={{ margin: '4px 0' }}><strong>Waste Type:</strong> {submittedReport.wasteType}</div>
              <div style={{ margin: '4px 0' }}><strong>Submitted On:</strong> {submittedReport.date}</div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px', margin: '0 auto' }}>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={function() { handleTrackNow(submittedReport.id); }}
                style={{ width: '100%' }}
              >
                Track Report Status <ArrowRight size={18} />
              </button>
              
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleReset}
                style={{ width: '100%' }}
              >
                Report Another Issue <RefreshCw size={18} />
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="card" style={{ padding: '32px', borderTop: '4px solid var(--primary)' }}>
            
            {/* Reporter Name Field */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text-heading)' }}>
                <FileText size={16} /> Reporter Name <span style={{ fontWeight: 'normal', color: 'var(--text-muted)', fontSize: '0.8rem' }}>(Optional)</span>
              </label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Amit Sharma or leave blank for Anonymous" 
                value={reporterName}
                onChange={function(e) { setReporterName(e.target.value); }}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              />
            </div>

            {/* Location Field */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text-heading)' }}>
                <MapPin size={16} style={{ color: '#ef4444' }} /> Location / Area <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Near XYZ Park gate, ABC Road Corner" 
                value={location}
                onChange={function(e) { setLocation(e.target.value); }}
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              />
            </div>

            {/* Two Column Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              {/* Waste Type Dropdown */}
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text-heading)' }}>
                  <Layers size={16} /> Waste Type
                </label>
                <select 
                  className="form-control" 
                  value={wasteType}
                  onChange={function(e) { setWasteType(e.target.value); }}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
                >
                  <option value="Wet Waste">🟢 Wet Waste (Organic)</option>
                  <option value="Dry Waste">🟡 Dry Waste (Trash)</option>
                  <option value="Plastic Waste">🔵 Plastic Waste</option>
                  <option value="E-Waste">🔴 E-Waste (Hazardous)</option>
                  <option value="Mixed Waste">🟠 Mixed Waste</option>
                  <option value="Other">⚪ Other</option>
                </select>
              </div>

              {/* Date Field */}
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text-heading)' }}>
                  <Calendar size={16} /> Date
                </label>
                <input 
                  type="date" 
                  className="form-control" 
                  value={date}
                  onChange={function(e) { setDate(e.target.value); }}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                />
              </div>
            </div>

            {/* Description Field */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '8px', display: 'block', color: 'var(--text-heading)' }}>
                Description of Waste Concern <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <textarea 
                className="form-control" 
                rows="4" 
                placeholder="Describe the problem (e.g. Size of accumulation, blockage caused, plastic bottles overflowing, bad odour, etc.)"
                value={description}
                onChange={function(e) { setDescription(e.target.value); }}
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)', fontFamily: 'var(--font-family)', resize: 'vertical' }}
              />
            </div>

            {/* Image Photo Upload Field */}
            <div className="form-group" style={{ marginBottom: '28px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text-heading)' }}>
                <Camera size={16} /> Upload Photo Proof
              </label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  id="waste-file-input" 
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <label 
                  htmlFor="waste-file-input"
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '8px',
                    padding: '24px 16px', 
                    border: '2px dashed var(--border-color)', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    transition: 'all 0.2s',
                    background: 'var(--bg-app)'
                  }}
                  onMouseOver={function(e) { e.currentTarget.style.borderColor = 'var(--primary)'; }}
                  onMouseOut={function(e) { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                >
                  <Camera size={24} style={{ color: 'var(--text-muted)' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Click to select/take waste photo</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PNG, JPG, or JPEG up to 5MB</span>
                </label>

                {/* Upload Image Preview */}
                {imagePreview && (
                  <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                    <img 
                      src={imagePreview} 
                      alt="Waste dump preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button 
                      type="button" 
                      onClick={function() { setImagePreview(''); }}
                      style={{ 
                        position: 'absolute', 
                        top: '4px', 
                        right: '4px', 
                        width: '20px', 
                        height: '20px', 
                        borderRadius: '50%', 
                        background: 'rgba(0,0,0,0.6)', 
                        color: 'white', 
                        border: 'none', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '12px', fontWeight: '600', fontSize: '1rem' }}
            >
              Submit Waste Report
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
