import { t } from '../utils/translations';
import { pestDatabase } from '../utils/mockData';

export default function PestAlerts({ lang, crop, weather }) {
  const s = t[lang];
  const pests = crop ? (pestDatabase[crop] || []) : [];

  // Elevate risk if weather is humid/rainy
  const temp = weather?.main?.temp ?? 28;
  const humidity = weather?.main?.humidity ?? 60;
  const isHighRisk = humidity > 75 || ['Rain', 'Drizzle'].includes(weather?.weather?.[0]?.main);

  return (
    <div className="card">
      <div className="card-title">
        <span className="card-title-icon">🐛</span>
        {s.pestAlerts}
        {isHighRisk && pests.length > 0 && (
          <span className="badge badge-red" style={{ marginLeft: 8 }}>
            {lang === 'hi' ? 'उच्च जोखिम' : 'High Risk'}
          </span>
        )}
      </div>

      {!crop ? (
        <div className="alert alert-info" style={{ marginBottom: 0 }}>
          <span className="alert-icon">💡</span>
          <div>{lang === 'hi' ? 'कीट चेतावनी के लिए फसल चुनें।' : 'Select a crop to see pest alerts.'}</div>
        </div>
      ) : pests.length === 0 ? (
        <div className="alert alert-success" style={{ marginBottom: 0 }}>
          <span className="alert-icon">✅</span>
          <div>{s.noPestAlert}</div>
        </div>
      ) : (
        <>
          {isHighRisk && (
            <div className="alert alert-warning" style={{ marginBottom: 12 }}>
              <span className="alert-icon">⚠️</span>
              <div>
                {lang === 'hi'
                  ? `अधिक नमी (${humidity}%) के कारण कीट/रोग का खतरा बढ़ा हुआ है। फसल की नियमित निगरानी करें।`
                  : `High humidity (${humidity}%) increases pest/disease risk. Monitor your crop regularly.`}
              </div>
            </div>
          )}
          {pests.map((p, i) => (
            <div key={i} className="pest-card">
              <div className="pest-emoji">{p.emoji}</div>
              <div style={{ flex: 1 }}>
                <div className="pest-title">
                  {lang === 'hi' ? p.hi : p.en}
                  <span className={`risk-badge risk-${p.risk}`}>
                    {lang === 'hi'
                      ? p.risk === 'high' ? 'उच्च' : p.risk === 'medium' ? 'मध्यम' : 'कम'
                      : p.risk.charAt(0).toUpperCase() + p.risk.slice(1)}
                  </span>
                </div>
                <div className="pest-desc">{lang === 'hi' ? p.descHi : p.descEn}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
