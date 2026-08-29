import React, { useState } from 'react';
import { Layers, CheckCircle, RefreshCw, AlertCircle, BarChart2, List, Trash2, Eye, MapPin, Tag, Calendar, User, FileText, Upload, Lock, Unlock } from 'lucide-react';

export default function AdminDashboard({ reports, setReports, setTrackId, setCurrentPage }) {
  // Authentication states
  var [isAuthenticated, setIsAuthenticated] = useState(function() {
    return sessionStorage.getItem('adminAuth') === 'true';
  });
  var [password, setPassword] = useState('');
  var [authError, setAuthError] = useState(false);

  // Tabs within dashboard: 'list' or 'analytics'
  var [activeSubTab, setActiveSubTab] = useState('list');
  
  // Filters and searches
  var [filterStatus, setFilterStatus] = useState('All');
  var [filterType, setFilterType] = useState('All');
  var [searchQuery, setSearchQuery] = useState('');

  // Selected report for modal
  var [selectedReport, setSelectedReport] = useState(null);
  var [editStatus, setEditStatus] = useState('');

  // CSV parsing helper
  var parseCSVLine = function(line) {
    var result = [];
    var current = '';
    var inQuotes = false;
    for (var i = 0; i < line.length; i++) {
      var char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  // Google Form CSV Uploader handler
  var handleCsvUpload = function(e) {
    var file = e.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function(evt) {
      var contents = evt.target.result;
      var lines = contents.split(/\r?\n/);
      if (lines.length <= 1) {
        alert('The CSV file is empty.');
        return;
      }

      // Parse headers
      var headers = parseCSVLine(lines[0]);
      
      // Dynamic column indices based on header keywords
      var colIndices = {
        date: -1,
        name: -1,
        location: -1,
        type: -1,
        desc: -1,
        image: -1
      };

      for (var i = 0; i < headers.length; i++) {
        var h = headers[i].toLowerCase();
        if (h.indexOf('timestamp') !== -1 || h.indexOf('date') !== -1 || h.indexOf('time') !== -1) colIndices.date = i;
        else if (h.indexOf('name') !== -1 || h.indexOf('reporter') !== -1 || h.indexOf('who') !== -1) colIndices.name = i;
        else if (h.indexOf('location') !== -1 || h.indexOf('area') !== -1 || h.indexOf('address') !== -1 || h.indexOf('where') !== -1) colIndices.location = i;
        else if (h.indexOf('type') !== -1 || h.indexOf('category') !== -1 || h.indexOf('what') !== -1) colIndices.type = i;
        else if (h.indexOf('description') !== -1 || h.indexOf('detail') !== -1 || h.indexOf('describe') !== -1 || h.indexOf('problem') !== -1) colIndices.desc = i;
        else if (h.indexOf('photo') !== -1 || h.indexOf('image') !== -1 || h.indexOf('proof') !== -1 || h.indexOf('upload') !== -1 || h.indexOf('file') !== -1) colIndices.image = i;
      }

      // Fallbacks if header keywords are not found
      if (colIndices.date === -1) colIndices.date = 0;
      if (colIndices.name === -1) colIndices.name = 1;
      if (colIndices.location === -1) colIndices.location = 2;
      if (colIndices.type === -1) colIndices.type = 3;
      if (colIndices.desc === -1) colIndices.desc = 4;
      if (colIndices.image === -1) colIndices.image = 5;

      var newReports = [];
      var nextIdNum = 1001;

      // Find current max ID to increment
      if (reports && reports.length > 0) {
        var numericIds = reports.map(function(r) {
          if (!r || !r.id || typeof r.id !== 'string') return 1000;
          var match = r.id.match(/ET-(\d+)/);
          return match ? parseInt(match[1]) : 1000;
        });
        nextIdNum = Math.max.apply(null, numericIds) + 1;
      }

      for (var j = 1; j < lines.length; j++) {
        var line = lines[j].trim();
        if (!line) continue;

        var cells = parseCSVLine(line);
        if (cells.length < 2) continue; // Skip blank lines

        // Reformat date from M/D/YYYY or YYYY-MM-DD
        var rawDate = cells[colIndices.date] || '';
        var dateFormatted = new Date().toISOString().split('T')[0];
        if (rawDate) {
          var dateParts = rawDate.split(' ')[0].split(/[\/\-]/);
          if (dateParts.length === 3) {
            if (dateParts[0].length === 4) { // YYYY-MM-DD
              dateFormatted = dateParts.join('-');
            } else if (dateParts[2].length === 4) { // MM/DD/YYYY or DD/MM/YYYY
              var yy = dateParts[2];
              var mm = dateParts[0].padStart(2, '0');
              var dd = dateParts[1].padStart(2, '0');
              dateFormatted = yy + '-' + mm + '-' + dd;
            }
          }
        }

        var wasteTypeRaw = cells[colIndices.type] || 'Other';
        var wasteTypeVal = 'Other';
        if (wasteTypeRaw.toLowerCase().indexOf('wet') !== -1) wasteTypeVal = 'Wet Waste';
        else if (wasteTypeRaw.toLowerCase().indexOf('dry') !== -1) wasteTypeVal = 'Dry Waste';
        else if (wasteTypeRaw.toLowerCase().indexOf('plastic') !== -1) wasteTypeVal = 'Plastic Waste';
        else if (wasteTypeRaw.toLowerCase().indexOf('e-waste') !== -1 || wasteTypeRaw.toLowerCase().indexOf('electronic') !== -1) wasteTypeVal = 'E-Waste';
        else if (wasteTypeRaw.toLowerCase().indexOf('mixed') !== -1) wasteTypeVal = 'Mixed Waste';

        var newReport = {
          id: 'ET-' + nextIdNum,
          reporterName: cells[colIndices.name] || 'Anonymous Resident',
          location: cells[colIndices.location] || 'Unknown Location',
          wasteType: wasteTypeVal,
          description: cells[colIndices.desc] || 'No details provided.',
          date: dateFormatted,
          status: 'Reported',
          imageUrl: cells[colIndices.image] || '' // Google Drive sheet link or empty
        };

        newReports.push(newReport);
        nextIdNum++;
      }

      if (newReports.length > 0) {
        setReports(function(prev) {
          // Avoid duplicate imports
          var filteredNew = newReports.filter(function(nr) {
            var exists = prev.some(function(pr) {
              return pr.location.toLowerCase() === nr.location.toLowerCase() && 
                     pr.description.toLowerCase() === nr.description.toLowerCase();
            });
            return !exists;
          });

          if (filteredNew.length === 0) {
            alert('All reports in this CSV have already been imported.');
            return prev;
          }

          alert('Successfully imported ' + filteredNew.length + ' new complaints from Google Form responses!');
          return [].concat(filteredNew, prev);
        });
      } else {
        alert('No valid rows found in the CSV.');
      }
    };
    reader.readAsText(file);
  };

  // Auth Submit handler
  var handleLogin = function(e) {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // Logout handler
  var handleLogout = function() {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setPassword('');
  };

  // Calculations for stats
  var totalCount = reports.length;
  var reportedCount = reports.filter(function(r) { return r.status === 'Reported'; }).length;
  var reviewCount = reports.filter(function(r) { return r.status === 'Under Review'; }).length;
  var progressCount = reports.filter(function(r) { return r.status === 'In Progress'; }).length;
  var resolvedCount = reports.filter(function(r) { return r.status === 'Resolved'; }).length;

  // Filters
  var filteredReports = reports.filter(function(r) {
    var statusMatch = filterStatus === 'All' || r.status === filterStatus;
    var typeMatch = filterType === 'All' || r.wasteType === filterType;
    var query = searchQuery.toLowerCase().trim();
    var searchMatch = !query || 
      r.id.toLowerCase().indexOf(query) !== -1 ||
      r.location.toLowerCase().indexOf(query) !== -1 ||
      r.reporterName.toLowerCase().indexOf(query) !== -1 ||
      r.wasteType.toLowerCase().indexOf(query) !== -1;

    return statusMatch && typeMatch && searchMatch;
  });

  var handleOpenReport = function(report) {
    setSelectedReport(report);
    setEditStatus(report.status);
  };

  var handleSaveStatus = function() {
    if (!selectedReport) return;
    var updatedList = reports.map(function(r) {
      if (r.id === selectedReport.id) return { ...r, status: editStatus };
      return r;
    });
    setReports(updatedList);
    setSelectedReport({ ...selectedReport, status: editStatus });
  };

  var handleDeleteReport = function(id) {
    if (window.confirm('Delete report ' + id + '?')) {
      setReports(reports.filter(function(r) { return r.id !== id; }));
      setSelectedReport(null);
    }
  };

  var handleTrackReport = function(id) {
    setTrackId(id);
    setCurrentPage('track-report');
  };

  // Analytics
  var getReportsByWasteType = function() {
    var types = ['Wet Waste', 'Dry Waste', 'Plastic Waste', 'E-Waste', 'Mixed Waste', 'Other'];
    return types.map(function(type) {
      return { type: type, count: reports.filter(function(r) { return r.wasteType === type; }).length };
    });
  };

  var getReportsByLocation = function() {
    var counts = {};
    reports.forEach(function(r) {
      var loc = r.location.split(',')[0].trim();
      counts[loc] = (counts[loc] || 0) + 1;
    });
    return Object.keys(counts).map(function(key) {
      return { name: key, count: counts[key] };
    }).sort(function(a, b) { return b.count - a.count; }).slice(0, 5);
  };

  var reportsByType = getReportsByWasteType();
  var reportsByLoc = getReportsByLocation();
  var resolutionRate = totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 0;

  // Render passcode gate if not authenticated
  if (!isAuthenticated) {
    return (
      <section className="admin-login-page" style={{ padding: '80px 0', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '400px' }}>
          <form onSubmit={handleLogin} className="card" style={{ padding: '32px', textAlign: 'center', borderTop: '4px solid var(--primary)' }}>
            <div style={{ display: 'inline-flex', padding: '12px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '50%', marginBottom: '16px' }}>
              <Lock size={28} />
            </div>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Admin Portal Access</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Enter the coordinator passcode to access reports and analytics.
            </p>

            <div className="form-group" style={{ marginBottom: '16px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Passcode</label>
              <input 
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={function(e) { setPassword(e.target.value); }}
                required
                style={{ width: '100%', padding: '10px 12px', marginTop: '6px' }}
              />
            </div>

            {authError && (
              <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: '-8px 0 16px', fontWeight: '500' }}>
                Incorrect passcode. Please try again.
              </p>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px 0' }}>
              Access Dashboard
            </button>

            <button 
              type="button" 
              onClick={function() { setCurrentPage('home'); }}
              style={{ 
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                marginTop: '16px',
                cursor: 'pointer',
                textDecoration: 'underline',
                display: 'block',
                width: '100%',
                textAlign: 'center'
              }}
            >
              ← Back to Public Site
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-page" id="admin-dashboard" style={{ padding: '40px 0' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              Admin Complaint Dashboard 
              <span style={{ fontSize: '0.75rem', fontWeight: 'normal', background: 'var(--primary-light)', color: 'var(--primary-dark)', padding: '2px 8px', borderRadius: '4px' }}>
                Secure Portal
              </span>
            </h2>
            <p className="page-subtitle" style={{ margin: 0 }}>Review submitted reports, update collection statuses, and analyze community trends.</p>
          </div>
          
          {/* Sub Navigation & Logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-card)', padding: '6px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <button 
                type="button"
                className="btn"
                onClick={function() { setActiveSubTab('list'); }}
                style={{ 
                  padding: '8px 16px', 
                  fontSize: '0.85rem', 
                  background: activeSubTab === 'list' ? 'var(--primary)' : 'transparent',
                  color: activeSubTab === 'list' ? 'white' : 'var(--text-main)',
                  border: 'none',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <List size={16} /> Manage Complaints
              </button>
              <button 
                type="button"
                className="btn"
                onClick={function() { setActiveSubTab('analytics'); }}
                style={{ 
                  padding: '8px 16px', 
                  fontSize: '0.85rem', 
                  background: activeSubTab === 'analytics' ? 'var(--primary)' : 'transparent',
                  color: activeSubTab === 'analytics' ? 'white' : 'var(--text-main)',
                  border: 'none',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <BarChart2 size={16} /> Waste Analytics
              </button>
            </div>
            
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={function() { setCurrentPage('home'); }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', padding: '8px 12px', background: '#ffffff', color: 'var(--primary)' }}
            >
              Public Site
            </button>

            <button 
              type="button" 
              className="btn" 
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', padding: '8px 12px', background: 'var(--primary-dark)', color: '#ffffff', border: 'none' }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Google Form CSV Sync Card */}
        <div className="card" style={{ padding: '20px', marginBottom: '32px', borderLeft: '4px solid var(--primary)', background: 'var(--primary-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <h4 style={{ margin: '0 0 6px 0', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
              📥 Sync Google Form Responses
            </h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Download your Google Form responses spreadsheet as a <strong>.csv</strong> file, then upload it here to load submissions into this panel.
            </p>
          </div>
          
          <div>
            <input 
              type="file" 
              accept=".csv" 
              id="google-form-csv" 
              onChange={handleCsvUpload} 
              style={{ display: 'none' }} 
            />
            <label 
              htmlFor="google-form-csv" 
              className="btn btn-primary"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                cursor: 'pointer',
                fontSize: '0.88rem',
                padding: '10px 16px'
              }}
            >
              <Upload size={16} /> Import Google Form CSV
            </label>
          </div>
        </div>

        {/* 4 Summary Stats Cards */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div className="stat-card card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderLeft: '4px solid var(--text-muted)' }}>
            <div>
              <div className="stat-num" style={{ fontSize: '2rem' }}>{totalCount}</div>
              <div className="stat-label" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Reports</div>
            </div>
            <div style={{ fontSize: '2rem', opacity: 0.2 }}><FileText size={32} /></div>
          </div>

          <div className="stat-card card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderLeft: '4px solid #ef4444' }}>
            <div>
              <div className="stat-num" style={{ fontSize: '2rem', color: '#ef4444' }}>{reportedCount + reviewCount}</div>
              <div className="stat-label" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pending Review</div>
            </div>
            <div style={{ fontSize: '2rem', opacity: 0.2, color: '#ef4444' }}><AlertCircle size={32} /></div>
          </div>

          <div className="stat-card card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderLeft: '4px solid #3b82f6' }}>
            <div>
              <div className="stat-num" style={{ fontSize: '2rem', color: '#3b82f6' }}>{progressCount}</div>
              <div className="stat-label" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>In Progress</div>
            </div>
            <div style={{ fontSize: '2rem', opacity: 0.2, color: '#3b82f6' }}><RefreshCw size={32} /></div>
          </div>

          <div className="stat-card card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderLeft: '4px solid var(--primary)' }}>
            <div>
              <div className="stat-num" style={{ fontSize: '2rem', color: 'var(--primary)' }}>{resolvedCount}</div>
              <div className="stat-label" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Resolved</div>
            </div>
            <div style={{ fontSize: '2rem', opacity: 0.2, color: 'var(--primary)' }}><CheckCircle size={32} /></div>
          </div>
        </div>

        {/* View 1: Manage Reports Table */}
        {activeSubTab === 'list' && (
          <div className="card" style={{ padding: '24px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
                <input 
                  type="text" 
                  placeholder="Search ID, Location or Reporter..." 
                  className="form-control"
                  value={searchQuery}
                  onChange={function(e) { setSearchQuery(e.target.value); }}
                  style={{ minWidth: '240px', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                />

                <select 
                  className="form-control"
                  value={filterStatus}
                  onChange={function(e) { setFilterStatus(e.target.value); }}
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                >
                  <option value="All">All Statuses</option>
                  <option value="Reported">Reported</option>
                  <option value="Under Review">Under Review</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>

                <select 
                  className="form-control"
                  value={filterType}
                  onChange={function(e) { setFilterType(e.target.value); }}
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', fontSize: '0.9rem' }}
                >
                  <option value="All">All Waste Types</option>
                  <option value="Wet Waste">Wet Waste</option>
                  <option value="Dry Waste">Dry Waste</option>
                  <option value="Plastic Waste">Plastic Waste</option>
                  <option value="E-Waste">E-Waste</option>
                  <option value="Mixed Waste">Mixed Waste</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Showing <strong>{filteredReports.length}</strong> of <strong>{totalCount}</strong> entries
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <th style={{ padding: '12px 16px' }}>Report ID</th>
                    <th style={{ padding: '12px 16px' }}>Location</th>
                    <th style={{ padding: '12px 16px' }}>Waste Type</th>
                    <th style={{ padding: '12px 16px' }}>Date</th>
                    <th style={{ padding: '12px 16px' }}>Status</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        No complaints match your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredReports.map(function(report) {
                      var statusBg = '#e2e8f0';
                      var statusColor = '#334155';
                      if (report.status === 'Reported') { statusBg = '#fee2e2'; statusColor = '#991b1b'; }
                      else if (report.status === 'Under Review') { statusBg = '#fef9c3'; statusColor = '#854d0e'; }
                      else if (report.status === 'In Progress') { statusBg = '#dbeafe'; statusColor = '#1e40af'; }
                      else if (report.status === 'Resolved') { statusBg = '#d1fae5'; statusColor = '#065f46'; }

                      return (
                        <tr key={report.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem', verticalAlign: 'middle' }}>
                          <td style={{ padding: '14px 16px', fontWeight: 'bold' }}>{report.id}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <MapPin size={14} style={{ color: '#ef4444', flexShrink: 0 }} />
                              <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '160px' }}>
                                {report.location}
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: '14px 16px' }}>{report.wasteType}</td>
                          <td style={{ padding: '14px 16px' }}>{report.date}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: '600', background: statusBg, color: statusColor, textTransform: 'uppercase' }}>
                              {report.status}
                            </span>
                          </td>
                          <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                            <div style={{ display: 'inline-flex', gap: '8px' }}>
                              <button 
                                className="btn-secondary btn" 
                                onClick={function() { handleOpenReport(report); }}
                                style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                              >
                                <Eye size={12} /> Manage
                              </button>
                              <button 
                                className="btn-danger-text" 
                                onClick={function() { handleDeleteReport(report.id); }}
                                style={{ color: '#ef4444', padding: '4px 8px', fontSize: '0.8rem' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View 2: Analytics Panels */}
        {activeSubTab === 'analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              
              {/* SVG Ring */}
              <div className="card text-center" style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-heading)', marginBottom: '16px' }}>Complaint Resolution Success Rate</h4>
                
                <div style={{ position: 'relative', width: '160px', height: '160px', marginBottom: '16px' }}>
                  <svg width="100%" height="100%" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--border-color)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--primary)" strokeWidth="3" 
                      strokeDasharray={resolutionRate + ' ' + (100 - resolutionRate)} 
                      style={{ transition: 'stroke-dasharray 0.5s ease-in-out' }}
                    />
                  </svg>
                  <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-heading)' }}>{resolutionRate}%</span>
                    <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Cleaned</span>
                  </div>
                </div>
                
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  A total of <strong>{resolvedCount}</strong> reported dumping zones have been cleared by local crew sweeps.
                </p>
              </div>

              {/* Hotspot location chart */}
              <div className="card" style={{ padding: '28px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-heading)', marginBottom: '16px' }}>Top Hotspot Complaint Areas</h4>
                {reportsByLoc.length === 0 ? (
                  <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '40px 0' }}>No locations recorded.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {reportsByLoc.map(function(loc, idx) {
                      var maxCount = reportsByLoc[0].count;
                      var widthPct = maxCount > 0 ? (loc.count / maxCount) * 100 : 0;
                      return (
                        <div key={idx}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                            <strong>{loc.name}</strong>
                            <span style={{ color: 'var(--text-muted)' }}>{loc.count} reports</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', background: 'var(--bg-app)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: widthPct + '%', height: '100%', background: '#ef4444', borderRadius: '4px' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Waste type breakdown */}
            <div className="card" style={{ padding: '28px' }}>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '20px' }}>Reports Breakdown by Waste Category</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {reportsByType.map(function(item) {
                  var maxTypeCount = Math.max.apply(null, reportsByType.map(function(i) { return i.count; }));
                  var pct = maxTypeCount > 0 ? (item.count / maxTypeCount) * 100 : 0;
                  
                  var categoryColor = 'var(--text-muted)';
                  if (item.type === 'Wet Waste') categoryColor = 'var(--wet-color)';
                  else if (item.type === 'Dry Waste') categoryColor = 'var(--dry-color)';
                  else if (item.type === 'Plastic Waste') categoryColor = '#3b82f6';
                  else if (item.type === 'E-Waste') categoryColor = 'var(--ewaste-color)';
                  else if (item.type === 'Mixed Waste') categoryColor = '#f97316';

                  return (
                    <div key={item.type} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ width: '120px', fontSize: '0.85rem', fontWeight: '500', textAlign: 'right', flexShrink: 0 }}>{item.type}</span>
                      <div style={{ flex: 1, height: '20px', background: 'var(--bg-app)', borderRadius: '4px', overflow: 'hidden' }}>
                        {item.count > 0 && <div style={{ width: pct + '%', height: '100%', background: categoryColor }} />}
                      </div>
                      <span style={{ width: '32px', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-heading)' }}>{item.count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Modal: View Details & Update Status */}
        {selectedReport && (
          <div className="modal-overlay" onClick={function() { setSelectedReport(null); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div className="modal-content" onClick={function(e) { e.stopPropagation(); }} style={{ padding: '28px', maxWidth: '640px', width: '100%', maxHeight: '85vh', overflowY: 'auto' }}>
              <button className="modal-close" onClick={function() { setSelectedReport(null); }}>✕</button>

              <h3 style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px' }}>
                Manage Report Details
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: selectedReport.imageUrl ? '1fr 180px' : '1fr', gap: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Report ID</span>
                    <strong style={{ fontSize: '1.1rem' }}>{selectedReport.id}</strong>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Reporter</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                      <User size={14} style={{ color: 'var(--text-muted)' }} /> {selectedReport.reporterName}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Location</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                      <MapPin size={14} style={{ color: '#ef4444' }} /> {selectedReport.location}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Category</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Tag size={14} style={{ color: 'var(--primary)' }} /> {selectedReport.wasteType}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Date</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} style={{ color: 'var(--text-muted)' }} /> {selectedReport.date}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Description</span>
                    <p style={{ margin: '4px 0 0', fontSize: '0.82rem', lineHeight: '1.4', background: 'var(--bg-app)', padding: '10px 14px', borderRadius: '6px', color: 'var(--text-main)', border: '1px solid var(--border-color)', maxHeight: '100px', overflowY: 'auto' }}>
                      {selectedReport.description}
                    </p>
                  </div>
                </div>

                {selectedReport.imageUrl && (
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Evidence Photo</span>
                    <div style={{ width: '180px', height: '180px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                      {selectedReport.imageUrl.startsWith('data:') ? (
                        <img src={selectedReport.imageUrl} alt="Uploaded Proof" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'var(--bg-app)', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', textAlign: 'center', fontSize: '0.75rem' }}>
                          <FileText size={24} style={{ color: 'var(--primary)' }} />
                          <a href={selectedReport.imageUrl} target="_blank" rel="noopener noreferrer" style={{ wordBreak: 'break-all', textDecoration: 'underline' }}>
                            View Google Drive File
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ background: 'var(--bg-app)', padding: '16px 20px', borderRadius: '8px', marginBottom: '24px', border: '1px solid var(--border-color)' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Update Status</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <select 
                    className="form-control"
                    value={editStatus}
                    onChange={function(e) { setEditStatus(e.target.value); }}
                    style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
                  >
                    <option value="Reported">🔴 Reported</option>
                    <option value="Under Review">🟡 Under Review</option>
                    <option value="In Progress">🔵 In Progress</option>
                    <option value="Resolved">🟢 Resolved</option>
                  </select>
                  <button type="button" className="btn btn-primary" onClick={handleSaveStatus} style={{ padding: '0 20px' }}>Update</button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button type="button" className="btn btn-secondary" onClick={function() { handleTrackReport(selectedReport.id); }}>View Timeline</button>
                <button type="button" className="btn btn-secondary" onClick={function() { setSelectedReport(null); }}>Close</button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
