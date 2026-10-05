export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  questionHin?: string;
  answerHin?: string;
  category?: string;
}

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is MAYAD?',
    answer: 'MAYAD is a media and entertainment platform dedicated to delivering engaging content, promoting creativity, and creating meaningful experiences for its audience.',
    questionHin: 'मायड़ क्या है?',
    answerHin: 'मायड़ एक मीडिया और मनोरंजन प्लेटफॉर्म है जो आकर्षक सामग्री देने, रचनात्मकता को बढ़ावा देने और अपने दर्शकों के लिए सार्थक अनुभव बनाने के लिए समर्पित है।',
    category: 'General',
  },
  {
    id: 'faq-2',
    question: 'What services does MAYAD offer?',
    answer: 'MAYAD offers a range of media, entertainment, and digital content services. Our goal is to connect audiences with engaging content and innovative entertainment experiences.',
    questionHin: 'मायड़ क्या सेवाएँ प्रदान करता है?',
    answerHin: 'मायड़ मीडिया, मनोरंजन और डिजिटल सामग्री सेवाओं की एक विस्तृत श्रृंखला प्रदान करता है। हमारा उद्देश्य दर्शकों को बेहतरीन मनोरंजन और अभिनव अनुभवों से जोड़ना है।',
    category: 'Services',
  },
  {
    id: 'faq-3',
    question: 'How can I contact the MAYAD team?',
    answer: 'You can contact the MAYAD team through the Contact Us form available on our website. Simply fill in your details and message, and our team will get back to you.',
    questionHin: 'मैं मायड़ टीम से कैसे संपर्क कर सकता हूँ?',
    answerHin: 'आप हमारी वेबसाइट पर उपलब्ध संपर्क करें (Contact Us) फॉर्म के माध्यम से मायड़ टीम से संपर्क कर सकते हैं। अपनी जानकारी और संदेश भरें, हमारी टीम आपसे शीघ्र संपर्क करेगी।',
    category: 'Contact',
  },
  {
    id: 'faq-4',
    question: 'Does MAYAD offer career opportunities?',
    answer: "Yes! You can register through our website's registration form to explore opportunities and become part of the MAYAD community.",
    questionHin: 'क्या मायड़ करियर के अवसर प्रदान करता है?',
    answerHin: 'हाँ! आप नए अवसरों की खोज करने और मायड़ समुदाय का हिस्सा बनने के लिए हमारी वेबसाइट के पंजीकरण (Registration) फॉर्म के माध्यम से पंजीकरण कर सकते हैं।',
    category: 'Careers',
  },
];

export function getStoredFaqs(): FAQItem[] {
  if (typeof window === 'undefined') return DEFAULT_FAQS;
  const stored = localStorage.getItem('mayad_faqs');
  if (!stored) {
    localStorage.setItem('mayad_faqs', JSON.stringify(DEFAULT_FAQS));
    return DEFAULT_FAQS;
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_FAQS;
  } catch {
    return DEFAULT_FAQS;
  }
}

export function saveStoredFaqs(faqs: FAQItem[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mayad_faqs', JSON.stringify(faqs));
    window.dispatchEvent(new Event('faqUpdated'));
  }
}
