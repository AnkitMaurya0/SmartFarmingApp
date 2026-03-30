import { useState } from 'react';
import { t } from '../utils/translations';
import { fertData } from '../utils/mockData';

export default function FertilizerModule({ lang, crop }) {
  const [tab, setTab] = useState('chemical');
  const s = t[lang];

  if (!crop) return (
    <div className="card">
      <div className="card-title"><span className="card-title-icon">🧪</span>{s.fertilizer}</div>
      <div className="alert alert-info" style={{ marginBottom: 0 }}>
        <span className="alert-icon">💡</span>
        <div>{lang === 'hi' ? 'उर्वरक जानकारी के लिए फसल चुनें।' : 'Select a crop to view fertilizer info.'}</div>
      </div>
    </div>
  );

  const f = fertData[crop];
  if (!f) return null;

  return (
    <div className="card">
      <div className="card-title"><span className="card-title-icon">🧪</span>{s.fertilizer}</div>

      <div className="tab-row">
        <button className={`tab-btn ${tab === 'chemical' ? 'active' : ''}`} onClick={() => setTab('chemical')}>
          ⚗️ {s.chemical}
        </button>
        <button className={`tab-btn ${tab === 'organic' ? 'active' : ''}`} onClick={() => setTab('organic')}>
          🌿 {s.organic}
        </button>
      </div>

      {tab === 'chemical' ? (
        <div className="fert-card">
          <div className="fert-name">{lang === 'hi' ? f.chemHi : f.chemEn}</div>
          <div className="fert-row">
            <strong>🕐 {s.timing}:</strong>
            <span>{lang === 'hi' ? f.timeHi : f.timeEn}</span>
          </div>
          <div className="fert-row">
            <strong>⚖️ {s.dose}:</strong>
            <span>{lang === 'hi' ? f.doseHi : f.doseEn}</span>
          </div>
          <div className="alert alert-warning" style={{ marginTop: 12, marginBottom: 0, fontSize: '0.82rem' }}>
            <span className="alert-icon">⚠️</span>
            <div>{lang === 'hi' ? 'रासायनिक उर्वरक का उचित मात्रा में ही उपयोग करें। अधिक मात्रा मिट्टी को हानि पहुँचाती है।' : 'Use chemical fertilizers in correct doses only. Overuse harms soil health.'}</div>
          </div>
        </div>
      ) : (
        <div className="fert-card">
          <div className="fert-name">🌿 {lang === 'hi' ? f.orgHi : f.orgEn}</div>
          <div className="alert alert-success" style={{ marginBottom: 0, fontSize: '0.85rem' }}>
            <span className="alert-icon">🌱</span>
            <div>{lang === 'hi' ? 'जैविक खाद मिट्टी की उर्वरता बढ़ाती है, पर्यावरण को बचाती है और लागत घटाती है।' : 'Organic inputs improve soil fertility, protect the environment, and reduce input costs.'}</div>
          </div>
        </div>
      )}
    </div>
  );
}
