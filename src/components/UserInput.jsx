import { useState } from 'react';
import { t } from '../utils/translations';
import { cropData, soilData } from '../utils/mockData';

const CROPS = ['wheat', 'rice', 'maize', 'sugarcane', 'cotton', 'soybean', 'tomato', 'onion'];
const SOILS = ['black', 'red', 'sandy', 'clay', 'loamy'];

export default function UserInput({ lang, onSelectionChange, crop: selectedCrop, soil: selectedSoil }) {
  const s = t[lang];

  const handleCrop = (c) => onSelectionChange({ crop: c, soil: selectedSoil });
  const handleSoil = (sl) => onSelectionChange({ crop: selectedCrop, soil: sl });

  return (
    <div className="card">
      <div className="card-title">
        <span className="card-title-icon">🌱</span>
        {s.selectCrop}
      </div>
      <div className="selection-grid">
        {CROPS.map((c) => (
          <button
            key={c}
            onClick={() => handleCrop(c)}
            className={`selection-btn ${selectedCrop === c ? 'active' : ''}`}
          >
            <span className="sel-emoji">{cropData[c].emoji}</span>
            <span>{s[c]?.replace(/\s[\S]+$/, '') || c}</span>
          </button>
        ))}
      </div>

      <div className="divider" style={{ margin: '18px 0 14px' }} />

      <div className="card-title" style={{ marginBottom: 12 }}>
        <span className="card-title-icon">🏔️</span>
        {s.selectSoil}
      </div>
      <div className="selection-grid" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
        {SOILS.map((sl) => (
          <button
            key={sl}
            onClick={() => handleSoil(sl)}
            className={`selection-btn ${selectedSoil === sl ? 'active' : ''}`}
          >
            <span className="sel-emoji">{soilData[sl].emoji}</span>
            <span>{s[sl]}</span>
          </button>
        ))}
      </div>

      {selectedCrop && selectedSoil && (
        <div className="alert alert-success" style={{ marginTop: 14, marginBottom: 0 }}>
          <span className="alert-icon">✅</span>
          <div>
            {lang === 'hi'
              ? `${cropData[selectedCrop].emoji} ${s[selectedCrop]?.replace(/\s[\S]+$/, '')} + ${soilData[selectedSoil].nameHi} — AI सलाह तैयार है।`
              : `${cropData[selectedCrop].emoji} ${s[selectedCrop]?.replace(/\s[\S]+$/, '')} + ${soilData[selectedSoil].nameEn} — AI advice ready.`}
          </div>
        </div>
      )}
    </div>
  );
}
