import React, { useState } from 'react';
import { Camera, Upload, AlertCircle } from 'lucide-react';
import { wasteItems } from '../data/wasteData';

export default function Scanner() {
  var [imagePreview, setImagePreview] = useState(null);
  var [isScanning, setIsScanning] = useState(false);
  var [scanProgress, setScanProgress] = useState(0);
  var [scanStatus, setScanStatus] = useState('');
  var [scanResult, setScanResult] = useState(null);
  var [detectedList, setDetectedList] = useState([]);

  // Sample items for quick demo scanning
  var sampleItems = [
    { name: 'Banana Peel', icon: '🍌', itemId: 'banana-peel' },
    { name: 'AA Battery', icon: '🔋', itemId: 'battery-alkaline' },
    { name: 'Plastic Bottle', icon: '🍼', itemId: 'plastic-bottle' },
    { name: 'Old Laptop', icon: '💻', itemId: 'laptop' },
    { name: 'CFL Bulb', icon: '💡', itemId: 'light-bulb' }
  ];

  // Simulator for AI Scanning
  var runScanSimulation = function (itemId, name, isGeneralUpload) {
    setIsScanning(true);
    setScanProgress(0);
    setScanResult(null);
    setDetectedList([]);
    
    var progressInterval = setInterval(function () {
      setScanProgress(function (prev) {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsScanning(false);

          if (isGeneralUpload) {
            // General upload - simulate mixed objects detection
            var plasticBottle = wasteItems.find(function (i) { return i.id === 'plastic-bottle'; }) || wasteItems[0];
            var tissue = wasteItems.find(function (i) { return i.id === 'used-tissue'; }) || wasteItems[1];
            var foodScraps = wasteItems.find(function (i) { return i.id === 'food-scraps'; }) || wasteItems[2];
            var battery = wasteItems.find(function (i) { return i.id === 'battery-alkaline'; }) || wasteItems[3];

            var list = [
              { item: plasticBottle, confidence: 92 },
              { item: tissue, confidence: 81 },
              { item: foodScraps, confidence: 68 },
              { item: battery, confidence: 45 }
            ];
            setDetectedList(list);
            setScanResult(plasticBottle); // Select top item by default
          } else {
            // Specific sample or keyword matched scan
            var matchedItem = wasteItems.find(function (i) {
              return i.id === itemId;
            });

            if (!matchedItem) {
              matchedItem = {
                name: name || "Unknown Object",
                category: "dry",
                icon: "📦",
                description: "Mixed material item detected.",
                whatToDo: ["Dispose of in dry mixed waste bin.", "Check local guidelines for composite items."],
                avoid: ["Do not mix with organic wet waste.", "Do not burn."],
                bestOption: "Dry Trash Collection",
                environmentalImpact: "Diverting hazardous and electronic components reduces soil toxins."
              };
            }

            var list = [{ item: matchedItem, confidence: 96 }];
            setDetectedList(list);
            setScanResult(matchedItem);
          }
          
          return 100;
        }
        
        var nextProgress = prev + 10;
        if (nextProgress < 30) {
          setScanStatus('📷 Accessing Camera Lens...');
        } else if (nextProgress < 60) {
          setScanStatus('🧠 Analyzing shapes & colors...');
        } else if (nextProgress < 90) {
          setScanStatus('🔍 Matching with EcoGuide Database...');
        } else {
          setScanStatus('✅ Object Identified!');
        }
        
        return nextProgress;
      });
    }, 150);
  };

  // Handle sample click
  var handleSampleClick = function (sample) {
    setImagePreview(null);
    runScanSimulation(sample.itemId, sample.name, false);
  };

  // Handle file upload
  var handleFileUpload = function (e) {
    var file = e.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onloadend = function () {
      setImagePreview(reader.result);
      
      var fileName = file.name.toLowerCase();
      var matchedId = null;
      var matchedName = '';

      if (fileName.indexOf('battery') !== -1 || fileName.indexOf('cell') !== -1) {
        matchedId = 'battery-alkaline';
        matchedName = 'Battery';
      } else if (fileName.indexOf('bottle') !== -1 || fileName.indexOf('plastic') !== -1) {
        matchedId = 'plastic-bottle';
        matchedName = 'Plastic Bottle';
      } else if (fileName.indexOf('laptop') !== -1 || fileName.indexOf('computer') !== -1) {
        matchedId = 'laptop';
        matchedName = 'Laptop';
      } else if (fileName.indexOf('bulb') !== -1 || fileName.indexOf('light') !== -1) {
        matchedId = 'light-bulb';
        matchedName = 'CFL Bulb';
      } else if (fileName.indexOf('paper') !== -1 || fileName.indexOf('book') !== -1) {
        matchedId = 'newspaper';
        matchedName = 'Paper';
      } else if (fileName.indexOf('food') !== -1 || fileName.indexOf('apple') !== -1) {
        matchedId = 'food-scraps';
        matchedName = 'Cooked Food';
      }

      if (matchedId) {
        runScanSimulation(matchedId, matchedName, false);
      } else {
        // Run general simulation for mixed trash uploads
        runScanSimulation(null, null, true);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="scanner-page" style={{ padding: '40px 0' }}>
      <div className="container" style={{ padding: '0 16px' }}>
        <h2>📷 Smart AI Waste Scanner</h2>
        <p className="page-subtitle" style={{ marginBottom: '24px' }}>
          Take or upload a photo of any household waste. Our simulated AI system will analyze it and tell you where and how to dump it!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
          
          {/* Scanner Viewport Box */}
          <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '340px', position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
            
            {/* Scan animation line */}
            {isScanning && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                backgroundColor: 'var(--primary)',
                boxShadow: '0 0 10px var(--primary)',
                animation: 'scanLineAnimation 2s infinite ease-in-out',
                zIndex: 10
              }}></div>
            )}

            {/* Viewport Content */}
            {!imagePreview && !isScanning && !scanResult && (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)' }}>
                <Camera size={40} style={{ marginBottom: '12px', opacity: 0.7 }} />
                <p style={{ fontWeight: 500, fontSize: '0.95rem' }}>No image loaded</p>
                <p style={{ fontSize: '0.82rem' }}>Upload a photo or select a sample below to start the scan.</p>
              </div>
            )}

            {imagePreview && (
              <img 
                src={imagePreview} 
                alt="Upload preview" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '220px', 
                  borderRadius: 'var(--radius-sm)', 
                  objectFit: 'contain',
                  opacity: isScanning ? 0.6 : 1
                }} 
              />
            )}

            {!imagePreview && isScanning && (
              <div style={{ fontSize: '3.5rem', animation: 'pulseAnimation 1.5s infinite', margin: '16px 0' }}>
                📷
              </div>
            )}

            {/* Scanning Overlay / Loader */}
            {isScanning && (
              <div style={{ width: '100%', textAlign: 'center', marginTop: '16px', boxSizing: 'border-box', padding: '0 10px' }}>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>
                  {scanStatus}
                </p>
                <div className="progress-bar" style={{ height: '6px' }}>
                  <div className="progress-fill" style={{ width: scanProgress + '%' }}></div>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{scanProgress}% scanned</span>
              </div>
            )}

            {/* File Upload Selector */}
            {!isScanning && (
              <div style={{ marginTop: '20px', width: '100%' }}>
                <label className="btn-secondary btn" style={{ width: '100%', cursor: 'pointer', gap: '8px', boxSizing: 'border-box', padding: '10px 16px' }}>
                  <Upload size={18} />
                  Upload Photo to Scan
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    style={{ display: 'none' }} 
                  />
                </label>
              </div>
            )}
          </div>

          {/* Result / Guide Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Quick Sample Selector */}
            <div className="card" style={{ padding: '16px' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>Try a Quick Demo</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Click one of these common waste items to simulate an AI camera scan:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {sampleItems.map(function (sample, idx) {
                  return (
                    <button
                      key={idx}
                      className="btn"
                      onClick={function () { handleSampleClick(sample); }}
                      style={{ 
                        padding: '6px 10px', 
                        fontSize: '0.8rem', 
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-app)',
                        color: 'var(--text-main)',
                        gap: '4px'
                      }}
                    >
                      <span>{sample.icon}</span>
                      <span>{sample.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Detected Objects list */}
            {detectedList.length > 0 && !isScanning && (
              <div className="card" style={{ padding: '16px' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', color: 'var(--primary-dark)' }}>🧠 AI Detected Objects (Confidence):</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {detectedList.map(function (detected, idx) {
                    var isSelected = scanResult && scanResult.id === detected.item.id;
                    return (
                      <button
                        key={idx}
                        className="btn"
                        onClick={function () { setScanResult(detected.item); }}
                        style={{
                          padding: '6px 10px',
                          fontSize: '0.8rem',
                          border: '1px solid ' + (isSelected ? 'var(--primary)' : 'var(--border-color)'),
                          backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-card)',
                          color: isSelected ? 'var(--primary-dark)' : 'var(--text-main)',
                          fontWeight: isSelected ? '700' : 'normal',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>{detected.item.icon}</span>
                        <span>{detected.item.name}</span>
                        <span style={{ fontSize: '0.72rem', opacity: 0.7 }}>({detected.confidence}%)</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Results Display */}
            {scanResult && !isScanning ? (
              <div className="card" style={{ 
                padding: '16px', 
                borderLeft: '6px solid ' + (
                  scanResult.category === 'wet' ? '#10b981' :
                  scanResult.category === 'dry' ? '#f59e0b' :
                  scanResult.category === 'recyclable' ? '#3b82f6' : '#ef4444'
                )
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '2rem' }}>{scanResult.icon}</span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{scanResult.name}</h3>
                    <span className={'badge badge-' + scanResult.category} style={{ marginTop: '2px' }}>
                      {scanResult.category}
                    </span>
                  </div>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px', lineHeight: '1.5' }}>
                  {scanResult.description}
                </p>

                <h4 style={{ fontSize: '0.88rem', color: 'var(--primary-dark)', marginBottom: '4px' }}>📋 How to Dump/Dispose:</h4>
                <ul style={{ paddingLeft: '18px', fontSize: '0.82rem', lineHeight: '1.5', marginBottom: '12px' }}>
                  {scanResult.whatToDo.map(function (step, i) {
                    return <li key={i}>{step}</li>;
                  })}
                </ul>

                <h4 style={{ fontSize: '0.88rem', color: '#ef4444', marginBottom: '4px' }}>⚠️ What to Avoid:</h4>
                <ul style={{ paddingLeft: '18px', fontSize: '0.82rem', lineHeight: '1.5', marginBottom: '12px', listStyleType: 'square' }}>
                  {scanResult.avoid.map(function (step, i) {
                    return <li key={i}>{step}</li>;
                  })}
                </ul>

                <div className="best-option" style={{ padding: '8px 12px', fontSize: '0.82rem', marginTop: '12px' }}>
                  <strong>Best Option:</strong> {scanResult.bestOption}
                </div>
              </div>
            ) : !isScanning ? (
              <div className="card" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <AlertCircle size={28} style={{ marginBottom: '8px', opacity: 0.5 }} />
                <h4 style={{ fontSize: '0.95rem' }}>Waiting for Scan</h4>
                <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Upload a waste item image or select a demo item from the box above to see recommendations.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Add CSS Keyframes on mount */}
      <style>{`
        @keyframes scanLineAnimation {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        @keyframes pulseAnimation {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}
