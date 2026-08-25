import React, { useState, useEffect } from 'react';
import { Camera, Calendar, MapPin, Users, Upload, Trash2 } from 'lucide-react';

export default function Gallery() {
  // Default campaign activities proof
  var defaultActivities = [
    {
      id: 'default-1',
      title: 'Beach Cleanup Campaign',
      date: '2026-08-10',
      location: 'Local Coastal Beach Shoreline',
      description: 'Sahil, Atul, and Shezad organized a beach cleanup drive. Cleared over 50 kg of plastic bottles, glass shards, and discarded fishing nets to prevent marine pollution.',
      team: ['Sahil', 'Atul', 'Shezad'],
      image: '', // will display a neat placeholder icon
      tag: 'Completed'
    },
    {
      id: 'default-2',
      title: 'E-Waste Awareness & Collection Drive',
      date: '2026-08-15',
      location: 'College Campus & Residential Hub',
      description: 'Set up an e-waste collection bin to gather dead batteries, broken chargers, and old cords. Distributed leaflets on the hazards of e-waste contamination.',
      team: ['Sahil', 'Shezad'],
      image: '',
      tag: 'Completed'
    },
    {
      id: 'default-3',
      title: 'Door-to-Door Segregation Survey',
      date: '2026-08-18',
      location: 'Local Residential Colony',
      description: 'Conducted survey audits with 150 families to research waste segregation practices, demonstrating compost sorting and hazardous waste precautions.',
      team: ['Atul', 'Shezad'],
      image: '',
      tag: 'Completed'
    }
  ];

  // React state for gallery items, persisted in localStorage
  var [activities, setActivities] = useState(function () {
    var saved = localStorage.getItem('galleryActivities');
    return saved ? JSON.parse(saved) : defaultActivities;
  });

  // State for form inputs
  var [title, setTitle] = useState('');
  var [date, setDate] = useState('');
  var [location, setLocation] = useState('');
  var [description, setDescription] = useState('');
  var [imagePreview, setImagePreview] = useState('');
  var [presentTeam, setPresentTeam] = useState({ Sahil: false, Atul: false, Shezad: false });

  // Sync to localStorage
  useEffect(function () {
    localStorage.setItem('galleryActivities', JSON.stringify(activities));
  }, [activities]);

  // Handle Team checkboxes
  var handleTeamCheckbox = function (name) {
    setPresentTeam(function (prev) {
      var copy = { ...prev };
      copy[name] = !copy[name];
      return copy;
    });
  };

  // Handle Image Upload
  var handleImageUpload = function (e) {
    var file = e.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onloadend = function () {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Submit new Activity Card
  var handleSubmit = function (e) {
    e.preventDefault();
    if (!title.trim() || !location.trim() || !description.trim()) return;

    // Get selected team list
    var selectedTeam = [];
    if (presentTeam.Sahil) selectedTeam.push('Sahil');
    if (presentTeam.Atul) selectedTeam.push('Atul');
    if (presentTeam.Shezad) selectedTeam.push('Shezad');

    var newActivity = {
      id: 'custom-' + Date.now(),
      title: title.trim(),
      date: date || new Date().toISOString().split('T')[0],
      location: location.trim(),
      description: description.trim(),
      team: selectedTeam.length > 0 ? selectedTeam : ['Team'],
      image: imagePreview,
      tag: 'Verified Proof'
    };

    setActivities([newActivity, ...activities]);
    
    // Reset Form
    setTitle('');
    setDate('');
    setLocation('');
    setDescription('');
    setImagePreview('');
    setPresentTeam({ Sahil: false, Atul: false, Shezad: false });
  };

  // Delete Activity Card
  var handleDelete = function (id) {
    if (window.confirm('Are you sure you want to remove this activity proof?')) {
      setActivities(activities.filter(function (act) {
        return act.id !== id;
      }));
    }
  };

  // Reset to default activities
  var handleReset = function () {
    if (window.confirm('Reset gallery to show the default campaign activities?')) {
      setActivities(defaultActivities);
    }
  };

  return (
    <section className="gallery-page" style={{ padding: '60px 0' }}>
      <div className="container" style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '8px' }}>
          <h2>📸 Field Activities &amp; Proof</h2>
          <button className="btn-secondary" onClick={handleReset} style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
            Reset Gallery
          </button>
        </div>
        <p className="page-subtitle">
          Photographic evidence and documentation of Sahil, Atul, and Shezad conducting local community engagement, awareness campaigns, and cleanup drives.
        </p>

        {/* Gallery Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '32px' }}>
          {activities.map(function (act) {
            return (
              <div key={act.id} className="card fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', padding: 0 }}>
                
                {/* Photo Header */}
                <div style={{ height: '200px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                  {act.image ? (
                    <img 
                      src={act.image} 
                      alt={act.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <div style={{ textAlign: 'center', color: '#64748b' }}>
                      <Camera size={44} style={{ opacity: 0.6, marginBottom: '8px' }} />
                      <p style={{ fontSize: '0.85rem', fontWeight: 500 }}>Proof Photo Logged</p>
                    </div>
                  )}

                  {/* Status Tag */}
                  <span className="badge" style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    fontSize: '0.75rem'
                  }}>
                    {act.tag}
                  </span>

                  {/* Delete Button */}
                  <button 
                    onClick={function() { handleDelete(act.id); }}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(239, 68, 68, 0.9)',
                      color: 'white',
                      border: 'none',
                      padding: '6px 8px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Delete proof card"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>

                {/* Content Box */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--text-heading)' }}>{act.title}</h3>
                  
                  {/* Meta items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} className="icon" />
                      <span>{act.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} className="icon" />
                      <span>{act.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Users size={14} className="icon" />
                      <span>Team: {act.team.join(', ')}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', lineHeight: '1.6', margin: 0, color: 'var(--text-main)', flex: 1 }}>
                    {act.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Upload Proof Form */}
        <div className="card" style={{ marginTop: '48px', padding: '24px', borderTop: '4px solid var(--primary)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>📤 Upload Campaign Activity Proof</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Add your own cleanup or awareness pictures here as official project evidence!
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            
            {/* Form Inputs Column */}
            <div>
              <div className="form-group">
                <label>Activity Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Versova Beach Cleanup Drive" 
                  value={title}
                  onChange={function(e) { setTitle(e.target.value); }}
                  required 
                />
              </div>

              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label>Date Conducted</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={date}
                    onChange={function(e) { setDate(e.target.value); }}
                  />
                </div>
                <div>
                  <label>Location</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Mumbai Shore" 
                    value={location}
                    onChange={function(e) { setLocation(e.target.value); }}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Team Members Present</label>
                <div style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input 
                      type="checkbox" 
                      checked={presentTeam.Sahil} 
                      onChange={function() { handleTeamCheckbox('Sahil'); }}
                    />
                    Sahil
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input 
                      type="checkbox" 
                      checked={presentTeam.Atul} 
                      onChange={function() { handleTeamCheckbox('Atul'); }}
                    />
                    Atul
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input 
                      type="checkbox" 
                      checked={presentTeam.Shezad} 
                      onChange={function() { handleTeamCheckbox('Shezad'); }}
                    />
                    Shezad
                  </label>
                </div>
              </div>
            </div>

            {/* Description & Photo Column */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div className="form-group">
                <label>Description of Cleanup/Activity</label>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  placeholder="Explain exactly what the team accomplished..."
                  value={description}
                  onChange={function(e) { setDescription(e.target.value); }}
                  style={{ resize: 'vertical' }}
                  required
                />
              </div>

              <div className="form-group">
                <label>Activity Photo (JPG/PNG)</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '6px' }}>
                  <label className="btn-secondary btn" style={{ padding: '8px 12px', fontSize: '0.85rem', cursor: 'pointer', margin: 0 }}>
                    <Upload size={14} />
                    Choose File
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      style={{ display: 'none' }} 
                    />
                  </label>
                  {imagePreview && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary-dark)', fontWeight: 500 }}>
                      ✅ Image Loaded
                    </span>
                  )}
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', height: '40px', marginTop: '10px' }}>
                Add Activity Proof Card
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
