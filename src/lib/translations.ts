export type Language = 'en' | 'hi' | 'kn';

export interface Translations {
  appName: string;
  tagline: string;
  subTagline: string;
  greeting: string;
  trackMyQueue: string;
  viewBooking: string;
  yourNextProcurement: string;
  nearbyCenters: string;
  viewCenter: string;
  bookSlot: string;
  open: string;
  busy: string;
  paused: string;
  closed: string;
  farmersWaiting: string;
  estimatedWait: string;
  availableSlots: string;
  distanceKm: string;
  operatingHours: string;
  centerCapacity: string;
  todaysSchedule: string;
  chooseDate: string;
  chooseTimeSlot: string;
  confirmation: string;
  confirmBooking: string;
  bookingConfirmed: string;
  yourToken: string;
  currentPosition: string;
  currentlyServing: string;
  updatedJustNow: string;
  viewDirections: string;
  addToCalendar: string;
  turnApproaching: string;
  positionsAway: string;
  proceedToCounter: string;
  beingProcessed: string;
  completedSuccess: string;
  stepConfirmed: string;
  stepCheckedIn: string;
  stepWaiting: string;
  stepProcessing: string;
  stepCompleted: string;
  searchPlaceholder: string;
  filterAll: string;
  filterOpen: string;
  filterLowWait: string;
  filterNearby: string;
  sortNearest: string;
  sortLowestWait: string;
  sortMostSlots: string;
  fullSlot: string;
  slotsLeft: string;
  navHome: string;
  navCenters: string;
  navMyBooking: string;
  navNotifications: string;
  navProfile: string;
  notificationsTitle: string;
  noNotifications: string;
  profileTitle: string;
  village: string;
  cropType: string;
  phoneNumber: string;
  languagePref: string;
  // Support & Help Center
  helpSupport: string;
  helpSubtitle: string;
  viewHelpCenter: string;
  searchQuestion: string;
  faqTitle: string;
  stillNeedHelp: string;
  talkToSupport: string;
  callSupport: string;
  speakWithRep: string;
  messageSupport: string;
  sendQuestion: string;
  reportProblem: string;
  mySupportRequests: string;
  submitRequest: string;
  requestSubmitted: string;
  noSupportRequests: string;
  noFaqFound: string;
  tryDifferentSearch: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'KrishiYantra',
    tagline: 'Know your slot. Skip the wait.',
    subTagline: 'Turn unpredictable procurement-center waiting into a predictable appointment.',
    greeting: 'Namaste, Ravi 👋',
    trackMyQueue: 'Track My Queue',
    viewBooking: 'View Booking',
    yourNextProcurement: 'Your Next Procurement',
    nearbyCenters: 'Nearby Procurement Centers',
    viewCenter: 'View Center',
    bookSlot: 'Book Slot',
    open: 'OPEN',
    busy: 'BUSY',
    paused: 'PAUSED',
    closed: 'CLOSED',
    farmersWaiting: 'farmers waiting',
    estimatedWait: 'Estimated wait',
    availableSlots: 'Available slots',
    distanceKm: 'km',
    operatingHours: 'Operating Hours',
    centerCapacity: 'Daily Capacity',
    todaysSchedule: "Today's Schedule",
    chooseDate: '1. Choose Date',
    chooseTimeSlot: '2. Choose Time Slot',
    confirmation: '3. Booking Summary',
    confirmBooking: 'Confirm Booking',
    bookingConfirmed: 'Booking Confirmed',
    yourToken: 'YOUR TOKEN',
    currentPosition: 'CURRENT POSITION',
    currentlyServing: 'CURRENTLY SERVING',
    updatedJustNow: 'Updated live just now',
    viewDirections: 'View Directions',
    addToCalendar: 'Add to Calendar',
    turnApproaching: 'Your turn is approaching',
    positionsAway: 'You are 3 positions away.',
    proceedToCounter: 'Please proceed to the procurement counter.',
    beingProcessed: 'Your procurement is being processed.',
    completedSuccess: 'Procurement completed successfully.',
    stepConfirmed: 'Booking Confirmed',
    stepCheckedIn: 'Checked In',
    stepWaiting: 'Waiting',
    stepProcessing: 'Processing',
    stepCompleted: 'Completed',
    searchPlaceholder: 'Search by center or village...',
    filterAll: 'All',
    filterOpen: 'Open',
    filterLowWait: 'Low Wait',
    filterNearby: 'Nearby',
    sortNearest: 'Nearest',
    sortLowestWait: 'Lowest Wait',
    sortMostSlots: 'Most Available Slots',
    fullSlot: 'FULL',
    slotsLeft: 'slots left',
    navHome: 'Home',
    navCenters: 'Centers',
    navMyBooking: 'My Booking',
    navNotifications: 'Alerts',
    navProfile: 'Profile',
    notificationsTitle: 'Notifications & Updates',
    noNotifications: "You're all caught up.",
    profileTitle: 'Farmer Profile',
    village: 'Village / Taluk',
    cropType: 'Primary Crop',
    phoneNumber: 'Mobile Number',
    languagePref: 'Preferred Language',
    helpSupport: 'Help & Support',
    helpSubtitle: 'Find quick answers to common questions or get help with your booking.',
    viewHelpCenter: 'View Help Center',
    searchQuestion: 'Search your question...',
    faqTitle: 'Frequently Asked Questions',
    stillNeedHelp: 'Still need help?',
    talkToSupport: "Talk to our support team and we'll help you with your issue.",
    callSupport: 'Call Support',
    speakWithRep: 'Speak with a support representative',
    messageSupport: 'Message Support',
    sendQuestion: 'Send us your question',
    reportProblem: 'Report a Problem',
    mySupportRequests: 'My Support Requests',
    submitRequest: 'Submit Request',
    requestSubmitted: 'Support request submitted',
    noSupportRequests: "You don't have any support requests yet.",
    noFaqFound: "We couldn't find an answer.",
    tryDifferentSearch: 'Try a different search or contact support.',
  },
  hi: {
    appName: 'कृषि यंत्र (KrishiYantra)',
    tagline: 'अपना स्लॉट जानें। कतार से बचें।',
    subTagline: 'खरीद केंद्र पर अनिश्चित इंतजार को एक निश्चित अपॉइंटमेंट में बदलें।',
    greeting: 'नमस्ते, रवि 👋',
    trackMyQueue: 'मेरी कतार ट्रैक करें',
    viewBooking: 'बुकिंग देखें',
    yourNextProcurement: 'आपकी अगली उपज खरीद',
    nearbyCenters: 'नजदीकी खरीद केंद्र',
    viewCenter: 'केंद्र देखें',
    bookSlot: 'स्लॉट बुक करें',
    open: 'खुला है',
    busy: 'व्यस्त',
    paused: 'रुका हुआ',
    closed: 'बंद',
    farmersWaiting: 'किसान प्रतीक्षा में',
    estimatedWait: 'अनुमानित समय',
    availableSlots: 'उपलब्ध स्लॉट',
    distanceKm: 'किमी',
    operatingHours: 'कार्य समय',
    centerCapacity: 'दैनिक क्षमता',
    todaysSchedule: 'आज का समय-सारणी',
    chooseDate: '1. तारीख चुनें',
    chooseTimeSlot: '2. समय स्लॉट चुनें',
    confirmation: '3. बुकिंग विवरण',
    confirmBooking: 'बुकिंग पक्की करें',
    bookingConfirmed: 'बुकिंग पक्की हो गई',
    yourToken: 'आपका टोकन',
    currentPosition: 'वर्तमान कतार संख्या',
    currentlyServing: 'वर्तमान में चालू',
    updatedJustNow: 'अभी लाइव अपडेट हुआ',
    viewDirections: 'दिशा-निर्देश देखें',
    addToCalendar: 'कैलेंडर में जोड़ें',
    turnApproaching: 'आपकी बारी नजदीक है',
    positionsAway: 'आपकी बारी से केवल 3 किसान आगे हैं।',
    proceedToCounter: 'कृपया तुरंत खरीद काउंटर पर पहुंचें।',
    beingProcessed: 'आपकी फसल की खरीद प्रक्रिया जारी है।',
    completedSuccess: 'उपज खरीद सफलतापूर्वक पूरी हुई।',
    stepConfirmed: 'बुकिंग कन्फर्म',
    stepCheckedIn: 'चेक-इन हुआ',
    stepWaiting: 'प्रतीक्षारत',
    stepProcessing: 'प्रक्रिया जारी',
    stepCompleted: 'पूर्ण',
    searchPlaceholder: 'केंद्र या गांव के नाम से खोजें...',
    filterAll: 'सभी',
    filterOpen: 'खुले केंद्र',
    filterLowWait: 'कम इंतजार',
    filterNearby: 'नजदीक',
    sortNearest: 'निकटतम',
    sortLowestWait: 'कम इंतजार',
    sortMostSlots: 'अधिकतम उपलब्ध स्लॉट',
    fullSlot: 'भर गया',
    slotsLeft: 'स्लॉट शेष',
    navHome: 'होम',
    navCenters: 'खरीद केंद्र',
    navMyBooking: 'मेरी बुकिंग',
    navNotifications: 'सूचनाएं',
    navProfile: 'प्रोफाइल',
    notificationsTitle: 'सूचनाएं और अपडेट',
    noNotifications: 'कोई नई सूचना नहीं है।',
    profileTitle: 'किसान प्रोफाइल',
    village: 'गांव / तहसील',
    cropType: 'मुख्य फसल',
    phoneNumber: 'मोबाइल नंबर',
    languagePref: 'पसंदीदा भाषा',
    helpSupport: 'सहायता और समर्थन',
    helpSubtitle: 'सामान्य सवालों के त्वरित उत्तर पाएं या अपनी बुकिंग में मदद लें।',
    viewHelpCenter: 'सहायता केंद्र देखें',
    searchQuestion: 'अपना सवाल खोजें...',
    faqTitle: 'अक्सर पूछे जाने वाले सवाल',
    stillNeedHelp: 'क्या और मदद चाहिए?',
    talkToSupport: 'हमारी सहायता टीम से बात करें, हम आपकी समस्या का समाधान करेंगे।',
    callSupport: 'कॉल सहायता',
    speakWithRep: 'सहायता प्रतिनिधि से बात करें',
    messageSupport: 'मैसेज सहायता',
    sendQuestion: 'अपना प्रश्न हमें भेजें',
    reportProblem: 'समस्या दर्ज करें',
    mySupportRequests: 'मेरे सहायता अनुरोध',
    submitRequest: 'अनुरोध भेजें',
    requestSubmitted: 'अनुरोध सफलतापूर्वक दर्ज हुआ',
    noSupportRequests: 'आपका कोई खुला सहायता अनुरोध नहीं है।',
    noFaqFound: 'हमें कोई उत्तर नहीं मिला।',
    tryDifferentSearch: 'दूसरा शब्द खोजें या सहायता टीम से संपर्क करें।',
  },
  kn: {
    appName: 'ಕೃಷಿ ಯಂತ್ರ (KrishiYantra)',
    tagline: 'ನಿಮ್ಮ ಸ್ಲಾಟ್ ತಿಳಿಯಿರಿ. ಸರದಿಯಲ್ಲಿ ಕಾಯುವುದನ್ನು ತಪ್ಪಿಸಿ.',
    subTagline: 'ಖರೀದಿ ಕೇಂದ್ರಗಳಲ್ಲಿನ ಅನಿಶ್ಚಿತ ಕಾಯುವಿಕೆಯನ್ನು ಯೋಜಿತ ಭೇಟಿಯಾಗಿ ಪರಿವರ್ತಿಸಿ.',
    greeting: 'ನಮಸ್ಕಾರ, ರವಿ 👋',
    trackMyQueue: 'ನನ್ನ ಸರದಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    viewBooking: 'ಬುಕಿಂಗ್ ವೀಕ್ಷಿಸಿ',
    yourNextProcurement: 'ನಿಮ್ಮ ಮುಂದಿನ ಖರೀದಿ',
    nearbyCenters: 'ಹತ್ತಿರದ ಖರೀದಿ ಕೇಂದ್ರಗಳು',
    viewCenter: 'ಕೇಂದ್ರವನ್ನು ನೋಡಿ',
    bookSlot: 'ಸ್ಲಾಟ್ ಬುಕ್ ಮಾಡಿ',
    open: 'ತೆರೆದಿದೆ',
    busy: 'ಕಾರ್ಯನಿರತ',
    paused: 'ತಾತ್ಕಾಲಿಕ ಸ್ಥಗಿತ',
    closed: 'ಮುಚ್ಚಲಾಗಿದೆ',
    farmersWaiting: 'ರೈತರು ಕಾಯುತ್ತಿದ್ದಾರೆ',
    estimatedWait: 'ಅಂದಾಜು ಕಾಯುವ ಸಮಯ',
    availableSlots: 'ಲಭ್ಯವಿರುವ ಸ್ಲಾಟ್‌ಗಳು',
    distanceKm: 'ಕಿ.ಮೀ',
    operatingHours: 'ಕಾರ್ಯ ನಿರ್ವಹಣಾ ಸಮಯ',
    centerCapacity: 'ದೈನಂದಿನ ಸಾಮರ್ಥ್ಯ',
    todaysSchedule: 'ಇಂದಿನ ವೇಳಾಪಟ್ಟಿ',
    chooseDate: '1. ದಿನಾಂಕ ಆಯ್ಕೆಮಾಡಿ',
    chooseTimeSlot: '2. ಸಮಯದ ಸ್ಲಾಟ್ ಆಯ್ಕೆಮಾಡಿ',
    confirmation: '3. ಬುಕಿಂಗ್ ವಿವರ',
    confirmBooking: 'ಬುಕಿಂಗ್ ಖಚಿತಪಡಿಸಿ',
    bookingConfirmed: 'ಬುಕಿಂಗ್ ಖಚಿತಗೊಂಡಿದೆ',
    yourToken: 'ನಿಮ್ಮ ಟೋಕನ್',
    currentPosition: 'ಪ್ರಸ್ತುತ ಸರದಿ ಸಂಖ್ಯೆ',
    currentlyServing: 'ಈಗ ಸೇವೆ ಪಡೆಯುತ್ತಿರುವವರು',
    updatedJustNow: 'ಈಗಷ್ಟೇ ನವೀಕರಿಸಲಾಗಿದೆ',
    viewDirections: 'ದಾರಿ ವಿವರ ನೋಡಿ',
    addToCalendar: 'ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ',
    turnApproaching: 'ನಿಮ್ಮ ಸರದಿ ಹತ್ತಿರ ಬರುತ್ತಿದೆ',
    positionsAway: 'ನೀವು ಕೇವಲ 3 ಸ್ಥಾನಗಳ ಹಿಂದಿದ್ದೀರಿ.',
    proceedToCounter: 'ದಯವಿಟ್ಟು ಖರೀದಿ ಕೌಂಟರ್‌ಗೆ ತೆರಳಿ.',
    beingProcessed: 'ನಿಮ್ಮ ಉತ್ಪನ್ನದ ಪರಿಶೀಲನೆ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ.',
    completedSuccess: 'ಖರೀದಿ ಪ್ರಕ್ರಿಯೆ ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಂಡಿದೆ.',
    stepConfirmed: 'ಬುಕಿಂಗ್ ಖಚಿತವಾಗಿದೆ',
    stepCheckedIn: 'ಚೆಕ್-ಇನ್ ಆಗಿದೆ',
    stepWaiting: 'ಕಾಯಲಾಗುತ್ತಿದೆ',
    stepProcessing: 'ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ',
    stepCompleted: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    searchPlaceholder: 'ಕೇಂದ್ರ ಅಥವಾ ಊರಿನ ಹೆಸರನ್ನು ಹುಡುಕಿ...',
    filterAll: 'ಎಲ್ಲವೂ',
    filterOpen: 'ತೆರೆದಿರುವ',
    filterLowWait: 'ಕಡಿಮೆ ಕಾಯುವಿಕೆ',
    filterNearby: 'ಹತ್ತಿರದವು',
    sortNearest: 'ಅತ್ಯಂತ ಹತ್ತಿರ',
    sortLowestWait: 'ಕಡಿಮೆ ಸಮಯ',
    sortMostSlots: 'ಹೆಚ್ಚು ಲಭ್ಯವಿರುವ ಸ್ಲಾಟ್‌ಗಳು',
    fullSlot: 'ಭರ್ತಿಯಾಗಿದೆ',
    slotsLeft: 'ಸ್ಲಾಟ್‌ಗಳು ಬಾಕಿ',
    navHome: 'ಮುಖಪುಟ',
    navCenters: 'ಕೇಂದ್ರಗಳು',
    navMyBooking: 'ನನ್ನ ಬುಕಿಂಗ್',
    navNotifications: 'ಅಧಿಸೂಚನೆಗಳು',
    navProfile: 'ಪ್ರೊಫೈಲ್',
    notificationsTitle: 'ಅಧಿಸೂಚನೆಗಳು ಮತ್ತು ನವೀಕರಣಗಳು',
    noNotifications: 'ಯಾವುದೇ ಹೊಸ ಅಧಿಸೂಚನೆಗಳಿಲ್ಲ.',
    profileTitle: 'ರೈತರ ಪ್ರೊಫೈಲ್',
    village: 'ಗ್ರಾಮ / ತಾಲೂಕು',
    cropType: 'ಪ್ರಮುಖ ಬೆಳೆ',
    phoneNumber: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    languagePref: 'ಆದ್ಯತೆಯ ಭಾಷೆ',
    helpSupport: 'ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ',
    helpSubtitle: 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ತ್ವರಿತ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ ಅಥವಾ ಸಹಾಯ ಪಡೆಯಿರಿ.',
    viewHelpCenter: 'ಸಹಾಯ ಕೇಂದ್ರವನ್ನು ನೋಡಿ',
    searchQuestion: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಹುಡುಕಿ...',
    faqTitle: 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು',
    stillNeedHelp: 'ಇನ್ನೂ ಸಹಾಯ ಬೇಕೇ?',
    talkToSupport: 'ನಮ್ಮ ಬೆಂಬಲ ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ, ನಾವು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.',
    callSupport: 'ಕರೆ ಬೆಂಬಲ',
    speakWithRep: 'ಸಹಾಯ ಪ್ರತಿನಿಧಿಯೊಂದಿಗೆ ಮಾತನಾಡಿ',
    messageSupport: 'ಸಂದೇಶ ಬೆಂಬಲ',
    sendQuestion: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ನಮಗೆ ಕಳುಹಿಸಿ',
    reportProblem: 'ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ',
    mySupportRequests: 'ನನ್ನ ಸಹಾಯ ವಿನಂತಿಗಳು',
    submitRequest: 'ವಿನಂತಿಯನ್ನು ಸಲ್ಲಿಸಿ',
    requestSubmitted: 'ವಿನಂತಿಯನ್ನು ಸ್ವೀಕರಿಸಲಾಗಿದೆ',
    noSupportRequests: 'ನಿಮಗೆ ಯಾವುದೇ ಸಕ್ರಿಯ ವಿನಂತಿಗಳಿಲ್ಲ.',
    noFaqFound: 'ಯಾವುದೇ ಉತ್ತರ ಕಂಡುಬಂದಿಲ್ಲ.',
    tryDifferentSearch: 'ಬೇರೆ ಹುಡುಕಾಟವನ್ನು ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಬೆಂಬಲವನ್ನು ಸಂಪರ್ಕಿಸಿ.',
  }
};
