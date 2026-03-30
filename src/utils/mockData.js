export const cropData = {
  wheat:     { emoji:'🌾', season:'Rabi (Oct–Mar)',    seasonHi:'रबी (अक्टू–मार्च)',   sowEn:'Oct–Nov',  sowHi:'अक्टू–नवं',   harvestEn:'Mar–Apr',        harvestHi:'मार्च–अप्रैल',    irrigDays:10, waterEn:'Medium', waterHi:'मध्यम' },
  rice:      { emoji:'🍚', season:'Kharif (Jun–Nov)',  seasonHi:'खरीफ (जून–नवं)',     sowEn:'Jun–Jul',  sowHi:'जून–जुलाई',    harvestEn:'Oct–Nov',        harvestHi:'अक्टू–नवंबर',     irrigDays:3,  waterEn:'High',   waterHi:'अधिक'  },
  maize:     { emoji:'🌽', season:'Kharif (Jun–Oct)',  seasonHi:'खरीफ (जून–अक्टू)',   sowEn:'Jun–Jul',  sowHi:'जून–जुलाई',    harvestEn:'Sep–Oct',        harvestHi:'सितं–अक्टूबर',    irrigDays:7,  waterEn:'Medium', waterHi:'मध्यम' },
  sugarcane: { emoji:'🎋', season:'Year-round',        seasonHi:'वार्षिक',             sowEn:'Feb–Mar',  sowHi:'फरवरी–मार्च',  harvestEn:'Nov–Apr',        harvestHi:'नवं–अप्रैल',      irrigDays:5,  waterEn:'High',   waterHi:'अधिक'  },
  cotton:    { emoji:'☁️', season:'Kharif (May–Oct)',  seasonHi:'खरीफ (मई–अक्टू)',    sowEn:'May–Jun',  sowHi:'मई–जून',        harvestEn:'Oct–Jan',        harvestHi:'अक्टू–जनवरी',     irrigDays:8,  waterEn:'Medium', waterHi:'मध्यम' },
  soybean:   { emoji:'🫘', season:'Kharif (Jun–Oct)',  seasonHi:'खरीफ (जून–अक्टू)',   sowEn:'Jun–Jul',  sowHi:'जून–जुलाई',    harvestEn:'Sep–Oct',        harvestHi:'सितं–अक्टूबर',    irrigDays:7,  waterEn:'Low',    waterHi:'कम'    },
  tomato:    { emoji:'🍅', season:'Year-round',        seasonHi:'वार्षिक',             sowEn:'Jun–Jul / Nov–Dec', sowHi:'जून–जुलाई / नवं–दिसं', harvestEn:'60–70 days post planting', harvestHi:'रोपण के 60–70 दिन बाद', irrigDays:4, waterEn:'Medium', waterHi:'मध्यम' },
  onion:     { emoji:'🧅', season:'Rabi (Oct–Apr)',    seasonHi:'रबी (अक्टू–अप्रैल)', sowEn:'Oct–Nov',  sowHi:'अक्टू–नवंबर',  harvestEn:'Mar–Apr',        harvestHi:'मार्च–अप्रैल',    irrigDays:7,  waterEn:'Medium', waterHi:'मध्यम' },
};

export const soilData = {
  black: { emoji:'⚫', nameEn:'Black Soil', nameHi:'काली मिट्टी' },
  red:   { emoji:'🔴', nameEn:'Red Soil',   nameHi:'लाल मिट्टी'  },
  sandy: { emoji:'🟡', nameEn:'Sandy Soil', nameHi:'रेतीली मिट्टी' },
  clay:  { emoji:'🟤', nameEn:'Clay Soil',  nameHi:'चिकनी मिट्टी' },
  loamy: { emoji:'🌰', nameEn:'Loamy Soil', nameHi:'दोमट मिट्टी'  },
};

export const fertData = {
  wheat:     { chemEn:'Urea + DAP',       chemHi:'यूरिया + डीएपी',         timeEn:'Basal at sowing + top dress @ 30 days', timeHi:'बुवाई पर बेसल + 30 दिन टॉप ड्रेसिंग', doseEn:'DAP: 50 kg/acre; Urea: 25 kg/acre', doseHi:'डीएपी: 50 किग्रा/एकड़; यूरिया: 25 किग्रा/एकड़', orgEn:'Vermicompost + Wood ash', orgHi:'वर्मीकंपोस्ट + लकड़ी की राख' },
  rice:      { chemEn:'Zinc Sulphate + Urea', chemHi:'जिंक सल्फेट + यूरिया', timeEn:'At transplanting + tillering stage',     timeHi:'रोपाई + कल्लेदार अवस्था',             doseEn:'Zinc: 25 kg/acre; Urea: 30 kg/acre', doseHi:'जिंक: 25 किग्रा/एकड़; यूरिया: 30 किग्रा/एकड़', orgEn:'Green manure + Azolla',   orgHi:'हरी खाद + अजोला' },
  maize:     { chemEn:'NPK 12:32:16',     chemHi:'एनपीके 12:32:16',         timeEn:'Basal at sowing; split Urea at 20&40d', timeHi:'बुवाई पर बेसल; 20 व 40 दिन यूरिया',   doseEn:'NPK: 50 kg/acre',            doseHi:'एनपीके: 50 किग्रा/एकड़',             orgEn:'FYM + Jeevamrit',         orgHi:'गोबर खाद + जीवामृत' },
  sugarcane: { chemEn:'Potash + Urea + SSP', chemHi:'पोटाश + यूरिया + एसएसपी', timeEn:'Basal at planting; top dress every 45d', timeHi:'रोपण पर बेसल; हर 45 दिन टॉप ड्रेसिंग', doseEn:'Urea: 40 kg/acre every 45 days', doseHi:'यूरिया: 40 किग्रा/एकड़ हर 45 दिन', orgEn:'Press mud + Panchgavya', orgHi:'प्रेस मड + पंचगव्य' },
  cotton:    { chemEn:'NPK + Sulphur',    chemHi:'एनपीके + सल्फर',           timeEn:'Basal at sowing; top dress at boll form', timeHi:'बुवाई पर बेसल; बोल बनने पर',          doseEn:'NPK 12:32:16 at 50 kg/acre + S 10 kg', doseHi:'एनपीके 50 किग्रा/एकड़ + सल्फर 10 किग्रा', orgEn:'Neem cake + Jeevamrit',  orgHi:'नीम केक + जीवामृत स्प्रे' },
  soybean:   { chemEn:'Rhizobium + SSP', chemHi:'राइज़ोबियम + एसएसपी',     timeEn:'Seed treatment + basal at sowing',       timeHi:'बीज उपचार + बुवाई पर बेसल',           doseEn:'SSP: 50 kg/acre + Rhizobium seed treat', doseHi:'एसएसपी: 50 किग्रा/एकड़ + बीज उपचार', orgEn:'Compost + Beejamrit',     orgHi:'कंपोस्ट + बीजामृत' },
  tomato:    { chemEn:'NPK 19:19:19 + Ca', chemHi:'एनपीके 19:19:19 + कैल्शियम', timeEn:'Weekly foliar spray post transplanting', timeHi:'रोपाई के बाद साप्ताहिक फोलियर स्प्रे', doseEn:'NPK: 25 kg/acre; diluted weekly', doseHi:'एनपीके: 25 किग्रा/एकड़', orgEn:'Panchgavya + Neem spray', orgHi:'पंचगव्य + नीम स्प्रे' },
  onion:     { chemEn:'Urea + MOP + Boron', chemHi:'यूरिया + एमओपी + बोरॉन', timeEn:'Split at 30 and 60 days',               timeHi:'30 व 60 दिन पर विभाजित खुराक',        doseEn:'MOP: 25 kg/acre; Urea 20 kg each split', doseHi:'एमओपी: 25 किग्रा/एकड़; यूरिया 20 किग्रा', orgEn:'Vermicompost + Biozyme',  orgHi:'वर्मीकंपोस्ट + बायोजाइम' },
};

export const pestDatabase = {
  wheat:     [ { emoji:'🟡', en:'Yellow Rust',      hi:'पीली रस्ट',         risk:'high',   descEn:'Yellow stripes on leaves. Spray Propiconazole 25 EC.',        descHi:'पत्तों पर पीली धारियाँ। प्रोपिकोनाज़ोल 25 ईसी स्प्रे।' }, { emoji:'🐛', en:'Aphids',          hi:'माहू / चेपा',       risk:'medium', descEn:'Tiny insects under leaves. Use neem oil @ 3 ml/L.',           descHi:'पत्तों के नीचे छोटे कीड़े। नीम तेल 3 मिली/लीटर।' } ],
  rice:      [ { emoji:'🦗', en:'Brown Plant Hopper', hi:'भूरा माहो',        risk:'high',   descEn:'Hopper burn in center. Drain field; apply Imidacloprid.',     descHi:'बीच में जलना। खेत निकास करें, इमिडाक्लोप्रिड।' }, { emoji:'🍃', en:'Blast Disease',   hi:'ब्लास्ट रोग',       risk:'high',   descEn:'Diamond spots on leaves. Spray Tricyclazole.',                descHi:'पत्तों पर हीरे के धब्बे। ट्राइसाइक्लाज़ोल।' } ],
  maize:     [ { emoji:'🐛', en:'Fall Armyworm',    hi:'फॉल आर्मीवर्म',    risk:'high',   descEn:'Larvae eat whorl. Use Chlorantraniliprole granules.',         descHi:'लार्वा पत्तों को खाते हैं। क्लोरेंट्रानिलिप्रोल दाने डालें।' } ],
  sugarcane: [ { emoji:'🐛', en:'Internode Borer',  hi:'इंटरनोड बोरर',     risk:'high',   descEn:'Dead heart symptom. Use Chlorpyrifos 20 EC.',                 descHi:'डेड हार्ट लक्षण। क्लोरपाइरीफॉस 20 ईसी।' } ],
  cotton:    [ { emoji:'🐛', en:'Pink Bollworm',    hi:'गुलाबी सुंडी',      risk:'high',   descEn:'Attacks bolls. Install pheromone traps @ 5/acre.',           descHi:'बोल पर हमला। फेरोमोन ट्रैप 5/एकड़।' }, { emoji:'🕷️', en:'Spider Mite',     hi:'स्पाइडर माइट',      risk:'medium', descEn:'Yellowing leaves. Spray Spiromesifen or neem oil.',          descHi:'पत्ते पीले पड़ना। स्पाइरोमेसिफेन या नीम तेल।' } ],
  soybean:   [ { emoji:'🐜', en:'Girdle Beetle',   hi:'गर्डल बीटल',        risk:'medium', descEn:'Stem girdling. Spray Triazophos + Deltamethrin.',             descHi:'तना काटना। ट्राएज़ोफॉस + डेल्टामेथ्रिन।' } ],
  tomato:    [ { emoji:'🪲', en:'Tomato Leaf Miner', hi:'टमाटर लीफ माइनर', risk:'medium', descEn:'Mines in leaves. Use Spinosad or yellow sticky traps.',       descHi:'पत्तों में सुरंग। स्पिनोसैड या पीला चिपचिपा ट्रैप।' }, { emoji:'🍂', en:'Early Blight',    hi:'अर्ली ब्लाइट',      risk:'high',   descEn:'Brown spots with yellow halo. Spray Mancozeb 75 WP.',        descHi:'पीले घेरे के साथ भूरे धब्बे। मेंकोज़ेब 75 डब्ल्यूपी।' } ],
  onion:     [ { emoji:'🟣', en:'Purple Blotch',   hi:'पर्पल ब्लॉच',       risk:'high',   descEn:'Purplish lesions on leaves. Spray Iprodione or Mancozeb.',   descHi:'पत्तों पर बैंगनी धब्बे। इप्रोडीओन या मेंकोज़ेब।' } ],
};

export const naturalFarmingMethods = [
  {
    id: 'jeevamrit', emoji: '💧',
    nameEn: 'Jeevamrit (Microbial Tonic)', nameHi: 'जीवामृत (सूक्ष्मजीव टॉनिक)',
    stepsEn: ['10 kg local cow dung', '10 L cow urine', '1 kg jaggery + 1 kg gram flour', 'A fistful of undisturbed soil', 'Mix in 200 L water; stir twice daily for 48 hrs'],
    stepsHi: ['10 किग्रा देसी गाय का गोबर', '10 लीटर गोमूत्र', '1 किग्रा गुड़ + 1 किग्रा बेसन', 'एक मुट्ठी खेत की मिट्टी', '200 लीटर पानी में मिलाएं; 48 घंटे दिन में दो बार हिलाएं'],
  },
  {
    id: 'neem', emoji: '🌿',
    nameEn: 'Neem Astra (Organic Pesticide)', nameHi: 'नीम अस्त्र (जैविक कीटनाशक)',
    stepsEn: ['5 kg neem leaves – crush to paste', '5 L cow urine + 2 kg cow dung', 'Ferment 48 hours covered', 'Filter and dilute 1:20 in water', 'Spray in evening hours'],
    stepsHi: ['5 किग्रा नीम के पत्ते पीसकर पेस्ट', '5 लीटर गोमूत्र + 2 किग्रा गोबर', '48 घंटे ढककर किण्वित करें', 'फ़िल्टर कर 1:20 पानी में मिलाएं', 'शाम को स्प्रे करें'],
  },
  {
    id: 'beejamrit', emoji: '🌱',
    nameEn: 'Beejamrit (Seed Treatment)', nameHi: 'बीजामृत (बीज उपचार)',
    stepsEn: ['5 kg cow dung + 5 L cow urine', '50 g lime + handful of soil from bund', 'Mix in 20 L water; keep overnight', 'Soak seeds 6 hrs before sowing', 'Dry seeds in shade and sow'],
    stepsHi: ['5 किग्रा गोबर + 5 लीटर गोमूत्र', '50 ग्राम चूना + मेड़ की मुट्ठी मिट्टी', '20 लीटर पानी में मिलाएं; रात भर रखें', 'बुवाई से पहले 6 घंटे बीज भिगोएं', 'छाया में सुखाकर बोएं'],
  },
  {
    id: 'panchgavya', emoji: '🐄',
    nameEn: 'Panchgavya (Growth Promoter)', nameHi: 'पंचगव्य (वृद्धि वर्धक)',
    stepsEn: ['5 kg cow dung + 3 kg cow ghee (ferment 3 days)', 'Add 3 L cow milk + 2 L curd + 3 L cow urine', 'Stir twice daily for 7 days', 'Filter; dilute 3% in water', 'Spray at flowering / vegetative stage'],
    stepsHi: ['5 किग्रा गोबर + 3 किग्रा देसी घी (3 दिन)', '3 लीटर दूध + 2 लीटर दही + 3 लीटर गोमूत्र', '7 दिन दो बार रोज हिलाएं', 'छान कर 3% पानी में मिलाएं', 'फूल आने / वृद्धि अवस्था में स्प्रे'],
  },
];
