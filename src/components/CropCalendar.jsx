import { t } from '../utils/translations';
import { cropData } from '../utils/mockData';

export default function CropCalendar({ lang, crop, weather }) {
  const s = t[lang];
  const cd = crop ? cropData[crop] : null;
  const temp = weather?.main?.temp ?? 28;

  // Generate upcoming irrigation days
  const generateIrrDays = (intervalDays) => {
    const today = new Date();
    return Array.from({ length: 4 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + (i + 1) * intervalDays);
      return d.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
    });
  };

  const isHot = temp > 35;

  return (
    <div className="card">
      <div className="card-title">
        <span className="card-title-icon">📅</span>
        {s.cropCalendar}
      </div>

      {!cd ? (
        <div className="alert alert-info" style={{ marginBottom: 0 }}>
          <span className="alert-icon">💡</span>
          <div>{lang === 'hi' ? 'कैलेंडर देखने के लिए फसल चुनें।' : 'Select a crop to view its calendar.'}</div>
        </div>
      ) : (
        <>
          <div className="cal-grid">
            <div className="cal-cell">
              <div className="cal-icon">🌱</div>
              <div className="cal-label">{s.sowingTime}</div>
              <div className="cal-value">{lang === 'hi' ? cd.sowHi : cd.sowEn}</div>
            </div>
            <div className="cal-cell">
              <div className="cal-icon">🌾</div>
              <div className="cal-label">{s.harvestTime}</div>
              <div className="cal-value">{lang === 'hi' ? cd.harvestHi : cd.harvestEn}</div>
            </div>
            <div className="cal-cell">
              <div className="cal-icon">💧</div>
              <div className="cal-label">{s.waterNeed}</div>
              <div className="cal-value">{lang === 'hi' ? cd.waterHi : cd.waterEn}</div>
            </div>
            <div className="cal-cell">
              <div className="cal-icon">🗓️</div>
              <div className="cal-label">{s.season}</div>
              <div className="cal-value" style={{ fontSize: '0.8rem' }}>{lang === 'hi' ? cd.seasonHi : cd.season}</div>
            </div>
          </div>

          {isHot && (
            <div className="alert alert-warning" style={{ marginBottom: 14 }}>
              <span className="alert-icon">🌡️</span>
              <div>
                {lang === 'hi'
                  ? `गर्मी के कारण सिंचाई जल्दी करें — हर ${Math.max(2, cd.irrigDays - 2)} दिन।`
                  : `Due to heat, irrigate more frequently — every ${Math.max(2, cd.irrigDays - 2)} days.`}
              </div>
            </div>
          )}

          <div className="section-label">{s.nextIrrigation}</div>
          <div className="ir-timeline">
            {generateIrrDays(isHot ? Math.max(2, cd.irrigDays - 2) : cd.irrigDays).map((day, i) => (
              <div key={i} className="ir-item">
                <div className="ir-day">💧 {day}</div>
                <div className="ir-detail">
                  {lang === 'hi'
                    ? `${i === 0 ? 'अगली' : ''} सिंचाई — ${cd.waterHi} पानी`
                    : `${i === 0 ? 'Next' : ''} irrigation — ${cd.waterEn} water needs`}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
