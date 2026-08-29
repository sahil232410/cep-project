import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Tag, AlertCircle, FileText, CheckCircle, RefreshCw } from 'lucide-react';

export default function TrackReport({ reports, trackId, setTrackId }) {
  var [searchQuery, setSearchQuery] = useState(trackId || '');
  var [searchedReport, setSearchedReport] = useState(null);
  var [searchError, setSearchError] = useState(false);

  // Status step configuration
  var statusSteps = [
    { name: 'Reported', desc: 'Complaint registered' },
    { name: 'Under Review', desc: 'Assigned to inspector' },
    { name: 'In Progress', desc: 'Cleanup crew deployed' },
    { name: 'Resolved', desc: 'Area cleaned successfully' }
  ];

  // Auto-search if trackId prop is updated from App state
  useEffect(function() {
    if (trackId) {
      setSearchQuery(trackId);
      var matched = reports.find(function(r) {
        return r.id.toUpperCase() === trackId.toUpperCase();
      });
      if (matched) {
        setSearchedReport(matched);
        setSearchError(false);
      } else {
        setSearchedReport(null);
        setSearchError(true);
      }
    } else {
      setSearchedReport(null);
      setSearchError(false);
    }
  }, [trackId, reports]);

  var handleSearch = function(e) {
    e.preventDefault();
    var cleanQuery = searchQuery.trim().toUpperCase();
    if (!cleanQuery) return;

    var matched = reports.find(function(r) {
      return r.id.toUpperCase() === cleanQuery;
    });

    if (matched) {
      setSearchedReport(matched);
      setSearchError(false);
      setTrackId(matched.id); // sync up to app state
    } else {
      setSearchedReport(null);
      setSearchError(true);
    }
  };

  var getStatusIndex = function(currentStatus) {
    var index = -1;
    for (var i = 0; i < statusSteps.length; i++) {
      if (statusSteps[i].name === currentStatus) {
        index = i;
        break;
      }
    }
    return index;
  };

  return (
    <section className="track-report-page" id="track-report" style={{ padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '720px' }}>
        
        {/* Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2>Track Complaint Status</h2>
          <p>Monitor real-time updates and field resolution timelines for reported waste dumps.</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="card" style={{ padding: '20px', marginBottom: '24px', display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search 
              size={18} 
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
            />
            <input
              type="text"
              placeholder="Enter Report ID (e.g. ET-1001, ET-1002)"
              className="form-control"
              value={searchQuery}
              onChange={function(e) { setSearchQuery(e.target.value); }}
              style={{ 
                width: '100%', 
                padding: '12px 14px 12px 42px', 
                borderRadius: '6px', 
                border: '1px solid var(--border-color)', 
                textTransform: 'uppercase',
                fontWeight: '500'
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
            Search
          </button>
        </form>

        {/* Error State */}
        {searchError && (
          <div className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid #ef4444', marginBottom: '24px' }}>
            <AlertCircle size={24} style={{ color: '#ef4444', flexShrink: 0 }} />
            <div>
              <h4 style={{ color: '#ef4444', fontSize: '1rem', margin: 0 }}>Report Not Found</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0' }}>
                We couldn't find any report with the ID "{searchQuery.toUpperCase()}". Please check the spelling and try again.
              </p>
            </div>
          </div>
        )}

        {/* Default View (No Search Done Yet) */}
        {!searchedReport && !searchError && (
          <div className="card text-center" style={{ padding: '48px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔎</div>
            <h3>Track Your Waste Complaints</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '460px', margin: '8px auto 24px', fontSize: '0.92rem' }}>
              Whenever you report waste on EcoTrack, you receive a ticket ID like <strong>ET-1001</strong>. Enter it above to see cleanup schedules and inspect resolution outcomes.
            </p>
            
            {/* Quick Suggestions */}
            {reports && reports.length > 0 && (
              <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Demo IDs:</span>
                {reports.slice(0, 3).map(function(r) {
                  return (
                    <button 
                      key={r.id} 
                      type="button" 
                      className="btn-text" 
                      onClick={function() { setTrackId(r.id); }}
                      style={{ fontSize: '0.82rem', padding: '2px 6px', textDecoration: 'none', background: 'var(--primary-light)', color: 'var(--primary-dark)', borderRadius: '4px' }}
                    >
                      {r.id}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Details Card and Status Timeline */}
        {searchedReport && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Complaint details */}
            <div className="card" style={{ padding: '28px' }}>
              
              {/* Header Details */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary-dark)', background: 'var(--primary-light)', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    Complaint Details
                  </span>
                  <h3 style={{ fontSize: '1.5rem', margin: '8px 0 0' }}>Report ID: {searchedReport.id}</h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date Logged</span>
                  <div style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
                    <Calendar size={14} style={{ color: 'var(--primary)' }} /> {searchedReport.date}
                  </div>
                </div>
              </div>

              {/* Grid content */}
              <div style={{ display: 'grid', gridTemplateColumns: searchedReport.imageUrl ? '1fr 160px' : '1fr', gap: '24px' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Reporter</span>
                    <strong style={{ fontSize: '0.95rem' }}>{searchedReport.reporterName}</strong>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Location</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem', fontWeight: '600' }}>
                      <MapPin size={16} style={{ color: '#ef4444' }} /> {searchedReport.location}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Waste Category Type</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem' }}>
                      <Tag size={16} style={{ color: 'var(--primary)' }} /> {searchedReport.wasteType}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Incident Description</span>
                    <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: '1.5', background: 'var(--bg-app)', padding: '12px 16px', borderRadius: '6px', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}>
                      {searchedReport.description}
                    </p>
                  </div>
                </div>

                {/* Uploaded Photo Preview if exists */}
                {searchedReport.imageUrl && (
                  <div style={{ flexShrink: 0 }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Photo Evidence</span>
                    <div style={{ width: '160px', height: '160px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                      <img 
                        src={searchedReport.imageUrl} 
                        alt="Submitted evidence dump" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status Timeline Card */}
            <div className="card" style={{ padding: '28px' }}>
              <h4 style={{ fontSize: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '24px' }}>
                Resolution Progress Timeline
              </h4>

              {/* Vertical timeline layout */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', paddingLeft: '8px' }}>
                
                {statusSteps.map(function(step, idx) {
                  var currentIdx = getStatusIndex(searchedReport.status);
                  var isCompleted = idx < currentIdx;
                  var isActive = idx === currentIdx;
                  var isFuture = idx > currentIdx;

                  // Dynamic color styles
                  var nodeColor = 'var(--border-color)';
                  var textColor = 'var(--text-muted)';
                  var boldColor = 'var(--text-main)';
                  var iconBorder = '2px solid var(--border-color)';
                  var backgroundCircle = 'var(--bg-card)';

                  if (isCompleted) {
                    nodeColor = 'var(--primary)';
                    textColor = 'var(--text-main)';
                    boldColor = 'var(--text-heading)';
                    iconBorder = '2px solid var(--primary)';
                    backgroundCircle = 'var(--primary)';
                  } else if (isActive) {
                    nodeColor = '#3b82f6'; // Active step blue
                    textColor = 'var(--text-main)';
                    boldColor = 'var(--text-heading)';
                    iconBorder = '3px solid #3b82f6';
                    backgroundCircle = 'var(--primary-light)';
                  }

                  return (
                    <div key={idx} style={{ display: 'flex', gap: '20px', position: 'relative', minHeight: '80px' }}>
                      
                      {/* Vertical connector line */}
                      {idx < statusSteps.length - 1 && (
                        <div 
                          style={{ 
                            position: 'absolute', 
                            left: '11px', 
                            top: '24px', 
                            width: '2px', 
                            height: 'calc(100% - 16px)', 
                            background: isCompleted ? 'var(--primary)' : 'var(--border-color)',
                            zIndex: 1
                          }}
                        />
                      )}

                      {/* Icon Circle */}
                      <div 
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          border: iconBorder, 
                          background: backgroundCircle,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 2,
                          color: isCompleted ? 'white' : isActive ? '#3b82f6' : 'var(--text-muted)'
                        }}
                      >
                        {isCompleted ? (
                          <CheckCircle size={14} strokeWidth={3} style={{ fill: 'var(--primary)', color: 'white' }} />
                        ) : isActive ? (
                          <RefreshCw size={12} className="spin-animation" style={{ color: '#3b82f6' }} />
                        ) : (
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)' }} />
                        )}
                      </div>

                      {/* Text */}
                      <div style={{ paddingBottom: '16px' }}>
                        <h5 style={{ fontSize: '1rem', fontWeight: isActive ? '700' : '600', color: boldColor, margin: 0 }}>
                          {step.name}
                          {isActive && (
                            <span style={{ marginLeft: '8px', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '999px', background: '#dbeafe', color: '#1e40af', fontWeight: '500' }}>
                              Current Status
                            </span>
                          )}
                        </h5>
                        <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: textColor }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Spinning Animation CSS */}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              .spin-animation {
                animation: spin 3s linear infinite;
              }
            `}} />
          </div>
        )}
      </div>
    </section>
  );
}
