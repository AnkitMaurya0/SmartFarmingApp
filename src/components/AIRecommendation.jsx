import { t } from '../utils/translations';
import { getAIRecommendation } from '../utils/aiLogic';
import { cropData } from '../utils/mockData';

export default function AIRecommendation({ lang, crop, soil, weather }) {
  const s = t[lang];
  const isHi = lang === 'hi';

  // Always show prompt if no crop selected
  if (!crop) return (
    <div className="card">
      <div className="card-title"><span className="card-title-icon">🤖</span>{s.aiAdvice}</div>
      <div className="alert alert-info" style={{ marginBottom: 0 }}>
        <span className="alert-icon">💡</span>
        <div>{isHi ? 'ऊपर अपनी फसल और मिट्टी चुनें — AI सलाह यहाँ दिखेगी।' : 'Select your crop & soil above — AI advice will appear here.'}</div>
      </div>
    </div>
  );

  const cd = cropData[crop];
  const advice = getAIRecommendation(crop, soil, weather, lang);

  // Build output sections
  const temp = weather?.main?.temp ?? weather?.temp ?? null;
  const humidity = weather?.main?.humidity ?? weather?.humidity ?? null;

  return (
    <div className="card" style={{ border: '1px solid rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.04)' }}>
      <div className="card-title">
        <span className="card-title-icon">🤖</span>
        {s.aiAdvice}
        {cd && (
          <span style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            <span className="badge badge-green">{cd.emoji} {isHi ? s[crop]?.replace(/\s[\S]+$/, '') : s[crop]?.replace(/\s[\S]+$/, '')}</span>
            {soil && <span className="badge badge-gold">🏔️ {s[soil]}</span>}
          </span>
        )}
      </div>

      {/* Main AI Advice */}
      <div className="ai-advice-box" style={{ marginBottom: 14 }}>
        {advice}
      </div>

      {/* Weather context info */}
      {(temp !== null || humidity !== null) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
          {temp !== null && (
            <div className="stat-chip">
              <span className="stat-icon">🌡️</span>
              <span className="stat-val">{Math.round(temp)}°C</span>
              <span className="stat-lbl">{isHi ? 'तापमान' : 'Temp'}</span>
            </div>
          )}
          {humidity !== null && (
            <div className="stat-chip">
              <span className="stat-icon">💧</span>
              <span className="stat-val">{humidity}%</span>
              <span className="stat-lbl">{isHi ? 'नमी' : 'Humidity'}</span>
            </div>
          )}
          {cd && (
            <div className="stat-chip">
              <span className="stat-icon">💦</span>
              <span className="stat-val">{isHi ? cd.waterHi : cd.waterEn}</span>
              <span className="stat-lbl">{isHi ? 'पानी' : 'Water'}</span>
            </div>
          )}
        </div>
      )}

      {/* Quick actions */}
      {cd && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
              {isHi ? '🌱 बुवाई' : '🌱 Sowing'}
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary)' }}>
              {isHi ? cd.sowHi : cd.sowEn}
            </div>
          </div>
          <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
              {isHi ? '💧 सिंचाई' : '💧 Irrigate'}
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent)' }}>
              {isHi ? `हर ${cd.irrigDays} दिन` : `Every ${cd.irrigDays} days`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
