import { useState } from 'react';
import { t } from '../utils/translations';
import { naturalFarmingMethods } from '../utils/mockData';

export default function NaturalFarming({ lang }) {
  const s = t[lang];
  const [expanded, setExpanded] = useState('jeevamrit');

  return (
    <div className="card">
      <div className="card-title"><span className="card-title-icon">🌿</span>{s.naturalFarming}</div>

      {naturalFarmingMethods.map((method) => {
        const name = lang === 'hi' ? method.nameHi : method.nameEn;
        const steps = lang === 'hi' ? method.stepsHi : method.stepsEn;
        const isOpen = expanded === method.id;
        return (
          <div key={method.id} className="step-card" style={{ cursor: 'pointer', marginBottom: 10 }}>
            <div
              className="step-card-title"
              style={{ justifyContent: 'space-between', cursor: 'pointer' }}
              onClick={() => setExpanded(isOpen ? null : method.id)}
            >
              <span>{method.emoji} {name}</span>
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && (
              <ul className="step-list">
                {steps.map((step, i) => (
                  <li key={i} className="step-item">
                    <span className="step-num">{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
