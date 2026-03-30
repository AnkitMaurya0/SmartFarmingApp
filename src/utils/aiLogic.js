// Advanced rule-based AI recommendation engine
export const getAIRecommendation = (crop, soil, weather, lang) => {
  if (!crop || !weather) return null;
  const hi = lang === 'hi';
  const temp = weather?.main?.temp ?? weather?.temp ?? 28;
  const humidity = weather?.main?.humidity ?? weather?.humidity ?? 60;
  const condition = weather?.weather?.[0]?.main ?? (weather?.willRainTomorrow ? 'Rain' : 'Clear');
  const willRain = condition === 'Rain' || condition === 'Drizzle' || condition === 'Thunderstorm';

  // Rain + soil rules
  if (willRain) {
    if (soil === 'black')
      return hi ? '🌧️ बारिश की संभावना है। काली मिट्टी पानी लंबे समय तक रोकती है — अगले 3-4 दिन सिंचाई बिल्कुल न करें। जड़ सड़न से बचने के लिए जल निकास सुनिश्चित करें।'
                : '🌧️ Rain expected. Black soil retains water for long — skip irrigation for 3–4 days. Ensure field drainage to prevent root rot.';
    if (soil === 'sandy')
      return hi ? '🌧️ कल बारिश होगी। रेतीली मिट्टी जल्दी सूखती है, इसलिए आज हल्की सिंचाई की जा सकती है लेकिन भारी सिंचाई से बचें।'
                : '🌧️ Rain coming tomorrow. Sandy soil drains fast — light irrigation today is okay, but avoid heavy watering.';
    return hi ? '🌧️ बारिश की संभावना है। आज पानी देने से बचें। फसल को कुदरती पानी मिलेगा।'
              : '🌧️ Rain is expected. Avoid irrigation today — your crops will get natural water.';
  }

  // High heat rules
  if (temp > 38) {
    if (crop === 'wheat')
      return hi ? '🌡️ तापमान बहुत अधिक है (38°C+)। गेहूं के लिए यह तनावपूर्ण है। सुबह 6-8 बजे हल्की सिंचाई करें। दिन में स्प्रे न करें।'
                : '🌡️ Extreme heat (38°C+). Very stressful for wheat. Irrigate lightly at 6–8 AM. Avoid any spray during daytime.';
    if (crop === 'tomato' || crop === 'onion')
      return hi ? '🌡️ बहुत गर्म मौसम। टमाटर/प्याज की जड़ें झुलस सकती हैं। शाम को हल्की सिंचाई दें और मल्च बिछाएं।'
                : '🌡️ Extreme heat. Tomato/onion roots can scorch. Water gently in the evening; apply mulch to retain moisture.';
    return hi ? '🌡️ अत्यधिक गर्मी। सिंचाई सुबह 6 बजे से पहले या शाम 6 बजे के बाद करें। पत्तों पर दोपहर में पानी न डालें — जले के धब्बे पड़ सकते हैं।'
              : '🌡️ Extreme heat. Irrigate before 6 AM or after 6 PM. Avoid spraying on leaves at midday — it causes burn marks.';
  }

  if (temp > 35)
    return hi ? '⚠️ तापमान 35°C से ऊपर है। सुबह जल्दी या शाम को सिंचाई करें। फसल पर सीधे धूप में पानी न डालें।'
              : '⚠️ Temperature above 35°C. Irrigate in early morning or evening. Avoid spraying plants under direct noon sun.';

  // Cold / low temp
  if (temp < 10) {
    if (crop === 'rice')
      return hi ? '🥶 बहुत ठंडा मौसम। धान की रोपाई के लिए यह उचित समय नहीं है। पाले से बचाव के लिए खेत में हल्का पानी भरे रखें।'
                : '🥶 Very cold. Not ideal for rice transplanting. Keep a thin water layer in the field to protect from frost.';
    return hi ? '🥶 तापमान बहुत कम है। फसल को पाले से बचाएं। हल्की सिंचाई से मिट्टी का तापमान बनाए रखें।'
              : '🥶 Temperature is very low. Protect crops from frost. Light irrigation helps maintain soil warmth.';
  }

  // High humidity
  if (humidity > 80)
    return hi ? '💧 अत्यधिक नमी है। फफूंद रोग (ब्लाइट, रस्ट) का खतरा है। पत्तों पर पानी जमने न दें। जरूरत हो तो फफूंदनाशक स्प्रे करें।'
              : '💧 Very high humidity. Risk of fungal diseases (blight, rust). Avoid water stagnation on leaves. Apply fungicide if needed.';

  // Crop-specific default
  const cropDefaults = {
    wheat:     hi ? '🌾 मौसम गेहूं के लिए अनुकूल है। अगले 7 दिनों में सिंचाई की जाँच करें। डीएपी टॉप ड्रेसिंग समय पर दें।' : '🌾 Good conditions for wheat. Check irrigation in 7 days. Apply DAP top dressing on schedule.',
    rice:      hi ? '🍚 धान के लिए अच्छा मौसम। खेत में 2-3 इंच पानी बनाए रखें। बीच-बीच में जल प्रबंधन चेक करें।' : '🍚 Good weather for rice. Maintain 2–3 inch water level. Periodically check water management.',
    maize:     hi ? '🌽 मक्के के लिए उचित मौसम। ध्यान दें — फॉल आर्मीवर्म के शुरुआती लक्षण देखते रहें।' : '🌽 Suitable weather for maize. Watch out for early signs of Fall Armyworm in whorl leaves.',
    sugarcane: hi ? '🎋 गन्ने के लिए मौसम ठीक है। ड्रिप सिंचाई चल रही है तो ट्रिमिंग और बंधाई का कार्य करें।' : '🎋 Conditions okay for sugarcane. If using drip, this is a good time for trimming and earthing-up.',
    cotton:    hi ? '☁️ कपास के लिए अनुकूल मौसम। गुलाबी सुंडी की निगरानी जारी रखें, फेरोमोन ट्रैप लगाएं।' : '☁️ Suitable weather for cotton. Keep monitoring for pink bollworm; install pheromone traps.',
    soybean:   hi ? '🫘 सोयाबीन के लिए ठीक मौसम। गर्डल बीटल की जाँच करें। फूल आने पर सिंचाई न करें।' : '🫘 Good conditions for soybean. Check for Girdle Beetle damage. Avoid irrigation at flowering.',
    tomato:    hi ? '🍅 टमाटर के लिए अच्छा मौसम। ड्रिप से नियमित सिंचाई दें। अर्ली ब्लाइट के लिए पत्तियाँ चेक करें।' : '🍅 Good weather for tomatoes. Maintain regular drip irrigation. Check leaves for early blight spots.',
    onion:     hi ? '🧅 प्याज के लिए अनुकूल मौसम। बल्ब बनने की अवस्था में नाइट्रोजन कम करें, पोटाश बढ़ाएं।' : '🧅 Suitable for onions. At bulb formation stage, reduce nitrogen and increase potassium application.',
  };

  return cropDefaults[crop] || (hi
    ? '✅ मौसम अनुकूल है। नियमित कार्यक्रम के अनुसार सिंचाई और खाद दें।'
    : '✅ Weather is favorable. Proceed with regular irrigation and fertilizer schedule.');
};
