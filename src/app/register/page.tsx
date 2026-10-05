'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Sparkles,
  Upload,
  User,
  Phone,
  FileText,
  Video,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Globe,
  Film,
  Camera,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  X,
  FileCheck,
  Megaphone,
  Star,
  Scissors,
  Mic,
  Zap,
  Radio,
  Volume2,
  Check,
  ShieldCheck,
  TrendingUp,
  Award,
  Sliders,
  CheckSquare,
} from 'lucide-react';
import { getApiBaseUrl } from '@/utils/config';
import { useApp } from '@/context/AppContext';

// ============================================================
// CONSTANTS & DEFINITIONS
// ============================================================
const EXCLUDED_ROLES_FOR_SYNOPSIS = ['Actor', 'Actress', 'Cinematographer', 'Editor'];

const MAX_PROJECT_LINKS = 5;
const MAX_PHOTO_SIZE = 5 * 1024 * 1024;
const MAX_PDF_SIZE = 15 * 1024 * 1024;

interface RoleCardItem {
  id: string;
  labelEng: string;
  labelHin: string;
  subEng: string;
  subHin: string;
  icon: LucideIcon;
}

const ROLE_CARDS: RoleCardItem[] = [
  {
    id: 'Director',
    labelEng: 'Director',
    labelHin: 'निर्देशक (Director)',
    subEng: 'Features & Episodic',
    subHin: 'फीचर्स एवं एपिसोडिक',
    icon: Megaphone,
  },
  {
    id: 'Actor',
    labelEng: 'Actor',
    labelHin: 'अभिनेता (Actor)',
    subEng: 'Principal & Lead',
    subHin: 'मुख्य एवं लीड भूमिकाएं',
    icon: User,
  },
  {
    id: 'Actress',
    labelEng: 'Actress',
    labelHin: 'अभिनेत्री (Actress)',
    subEng: 'Principal & Drama',
    subHin: 'मुख्य एवं ड्रामा भूमिकाएं',
    icon: Star,
  },
  {
    id: 'Writer',
    labelEng: 'Writer',
    labelHin: 'लेखक (Writer)',
    subEng: 'Screenplay & Narrative',
    subHin: 'पटकथा एवं कथा लेखन',
    icon: FileText,
  },
  {
    id: 'Cinematographer',
    labelEng: 'Cinematographer',
    labelHin: 'सिनेमैटोग्राफर',
    subEng: 'DP & Camera Op',
    subHin: 'डीपी एवं कैमरा संचालन',
    icon: Camera,
  },
  {
    id: 'Editor',
    labelEng: 'Editor',
    labelHin: 'संपादक (Editor)',
    subEng: 'Offline & Assembly',
    subHin: 'ऑफलाइन एवं असेंबली',
    icon: Scissors,
  },
  {
    id: 'Singer',
    labelEng: 'Singer',
    labelHin: 'गायक (Singer)',
    subEng: 'Playback & Vocalist',
    subHin: 'प्लेबैक एवं वोकलिस्ट',
    icon: Mic,
  },
  {
    id: 'Dancer',
    labelEng: 'Dancer',
    labelHin: 'नर्तक (Dancer)',
    subEng: 'Choreo & Movement',
    subHin: 'कोरियोग्राफी एवं मूवमेंट',
    icon: Zap,
  },
  {
    id: 'Anchor',
    labelEng: 'Anchor / Host',
    labelHin: 'एंकर / होस्ट',
    subEng: 'Broadcast & Live',
    subHin: 'ब्रॉडकास्ट एवं लाइव',
    icon: Radio,
  },
  {
    id: 'Sound Designer',
    labelEng: 'Sound Designer',
    labelHin: 'साउंड डिजाइनर',
    subEng: 'Foley & Mix',
    subHin: 'फ़ॉली एवं साउंड मिक्स',
    icon: Volume2,
  },
];

const ALL_STEPS = [
  {
    key: 'step-professional',
    nameEng: 'Professional Information',
    nameHin: 'व्यावसायिक जानकारी',
    shortEng: 'Professional',
    shortHin: 'व्यावसायिक',
    icon: Film,
    requiresSynopsis: false,
  },
  {
    key: 'step-personal',
    nameEng: 'Personal Information',
    nameHin: 'व्यक्तिगत जानकारी',
    shortEng: 'Personal',
    shortHin: 'व्यक्तिगत',
    icon: User,
    requiresSynopsis: false,
  },
  {
    key: 'step-cinematic',
    nameEng: 'Cinematic Profile & Synopsis',
    nameHin: 'सिनेमैटिक प्रोफाइल एवं सिनोप्सिस',
    shortEng: 'Cinematic',
    shortHin: 'सिनेमैटिक',
    icon: Video,
    requiresSynopsis: true,
  },
  {
    key: 'step-contact',
    nameEng: 'Contact Information & Address',
    nameHin: 'संपर्क जानकारी एवं पता',
    shortEng: 'Contact & Address',
    shortHin: 'संपर्क एवं पता',
    icon: Phone,
    requiresSynopsis: false,
  },
  {
    key: 'step-social',
    nameEng: 'Social Media Profiles',
    nameHin: 'सोशल मीडिया प्रोफाइल',
    shortEng: 'Social Media',
    shortHin: 'सोशल मीडिया',
    icon: Globe,
    requiresSynopsis: false,
  },
];

// Helper styles & validations
const inputCls = (error?: string) =>
  `w-full rounded-xl bg-black/60 border ${error ? 'border-red-500' : 'border-white/15 focus:border-amber-400'
  } px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all`;

const isValidUrl = (value: string) => {
  if (!value.trim()) return true;
  try {
    const url = new URL(value.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

const isValidPhone = (value: string) => {
  if (!/^[0-9+\-\s()]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
};

// ============================================================
// SMALL HELPER COMPONENTS
// ============================================================
function Field({
  id,
  label,
  required,
  error,
  className = '',
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div id={`field-${id}`} className={`space-y-2 scroll-mt-28 ${className}`}>
      <label htmlFor={id} className="block text-xs font-bold text-slate-300">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs font-semibold">{error}</p>}
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#090d1f]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-300">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">{title}</h2>
          <p className="text-slate-400 text-xs sm:text-sm">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================
export default function RegisterPage() {
  const { language } = useApp();
  const isHin = language === 'HIN';

  // Step state
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Professional Information
  const [preferredLanguage, setPreferredLanguage] = useState('Both');
  const [experienceLevel, setExperienceLevel] = useState('Newcomer');
  const [interestedRoles, setInterestedRoles] = useState<string[]>([]);

  // Step 2: Personal Information
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Prefer not to say');
  const [email, setEmail] = useState('');
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState('');

  // Step 3: Cinematic Profile & Synopsis
  const [yearsOfExperience, setYearsOfExperience] = useState('0');
  const [previousProjects, setPreviousProjects] = useState('');
  const [projectVideoUrls, setProjectVideoUrls] = useState<string[]>(['']);
  const [introductoryVideoUrl, setIntroductoryVideoUrl] = useState('');
  const [aboutYourself, setAboutYourself] = useState('');
  const [synopsisPdfFile, setSynopsisPdfFile] = useState<File | null>(null);

  // Step 4: Contact Information & Address
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [callingNumber, setCallingNumber] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Rajasthan');
  const [country, setCountry] = useState('India');

  // Step 5: Social Media Profiles
  const [socialLink1, setSocialLink1] = useState('');
  const [socialLink2, setSocialLink2] = useState('');

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const photoInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const isExperienced = experienceLevel === 'Experienced';

  // Visibility check for Synopsis section
  const showAboutSection = useMemo(() => {
    if (interestedRoles.length === 0) return true;
    return !interestedRoles.every((role) => EXCLUDED_ROLES_FOR_SYNOPSIS.includes(role));
  }, [interestedRoles]);

  // Compute active steps dynamically based on selected roles
  const activeSteps = useMemo(() => {
    const stepsList = showAboutSection
      ? ALL_STEPS
      : ALL_STEPS.filter((s) => !s.requiresSynopsis);

    return stepsList.map((step, index) => ({
      ...step,
      id: index + 1,
      nameEng: `${index + 1}. ${step.nameEng}`,
      nameHin: `${index + 1}. ${step.nameHin}`,
    }));
  }, [showAboutSection]);

  const currentStepObj = activeSteps[currentStep - 1] || activeSteps[0];
  const currentStepKey = currentStepObj?.key;

  React.useEffect(() => {
    if (currentStep > activeSteps.length) {
      setCurrentStep(activeSteps.length);
    }
  }, [activeSteps.length, currentStep]);

  const clearError = (key: string) => {
    setErrors((prev) => (prev[key] ? { ...prev, [key]: '' } : prev));
  };

  const bind =
    (setter: (v: string) => void, key?: string) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setter(e.target.value);
        if (key) clearError(key);
      };

  // Toggle roles
  const toggleRole = (role: string) => {
    setInterestedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
    clearError('interestedRoles');
  };

  // File handlers
  const removePhoto = () => {
    setProfilePhotoFile(null);
    setProfilePhotoPreview('');
    if (photoInputRef.current) photoInputRef.current.value = '';
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        profilePhoto: isHin
          ? 'केवल JPG, PNG और WEBP फ़ोटो समर्थित हैं'
          : 'Only JPG, PNG and WEBP images are supported',
      }));
      e.target.value = '';
      return;
    }
    if (file.size > MAX_PHOTO_SIZE) {
      setErrors((prev) => ({
        ...prev,
        profilePhoto: isHin
          ? 'फ़ोटो का आकार 5MB से कम होना चाहिए'
          : 'Image size must be under 5MB',
      }));
      e.target.value = '';
      return;
    }

    clearError('profilePhoto');
    setProfilePhotoFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setProfilePhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setErrors((prev) => ({
        ...prev,
        synopsisPdf: isHin
          ? 'कृपया एक वैध पीडीएफ दस्तावेज़ अपलोड करें'
          : 'Please upload a valid PDF document',
      }));
      e.target.value = '';
      return;
    }
    if (file.size > MAX_PDF_SIZE) {
      setErrors((prev) => ({
        ...prev,
        synopsisPdf: isHin
          ? 'पीडीएफ का आकार 15MB से कम होना चाहिए'
          : 'PDF size must be under 15MB',
      }));
      e.target.value = '';
      return;
    }

    clearError('synopsisPdf');
    setSynopsisPdfFile(file);
  };

  // Video Links
  const handleAddVideoUrl = () => {
    if (projectVideoUrls.length < MAX_PROJECT_LINKS) {
      setProjectVideoUrls([...projectVideoUrls, '']);
    }
  };

  const handleVideoUrlChange = (index: number, value: string) => {
    setProjectVideoUrls((prev) => prev.map((u, i) => (i === index ? value : u)));
    clearError('projectVideoUrls');
  };

  const handleRemoveVideoUrl = (index: number) => {
    if (projectVideoUrls.length > 1) {
      setProjectVideoUrls(projectVideoUrls.filter((_, i) => i !== index));
    }
  };

  // Step validation
  const validateStep = (stepNumber: number): boolean => {
    const stepObj = activeSteps[stepNumber - 1];
    if (!stepObj) return true;

    const e: Record<string, string> = {};

    if (stepObj.key === 'step-professional') {
      if (interestedRoles.length === 0) {
        e.interestedRoles = isHin
          ? 'कम से कम एक विभाग / भूमिका चुनें जिसमें आपकी रुचि है'
          : 'Select at least one department or role you are interested in';
      }
    }

    if (stepObj.key === 'step-personal') {
      if (!fullName.trim()) {
        e.fullName = isHin ? 'पूरा नाम आवश्यक है' : 'Full name is required';
      }

      const numAge = parseInt(age, 10);
      if (!age || isNaN(numAge) || numAge < 1 || numAge > 120) {
        e.age = isHin ? 'कृपया एक वैध आयु (1-120) दर्ज करें' : 'Please enter a valid age (1-120)';
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        e.email = isHin ? 'एक वैध ईमेल पता आवश्यक है' : 'A valid email address is required';
      }

      if (!profilePhotoFile) {
        e.profilePhoto = isHin ? 'प्रोफ़ाइल फ़ोटो आवश्यक है' : 'Profile photo is required';
      }
    }

    if (stepObj.key === 'step-cinematic') {
      if (isExperienced) {
        if (!isValidUrl(introductoryVideoUrl)) {
          e.introductoryVideoUrl = isHin
            ? 'http:// या https:// से शुरू होने वाला एक वैध लिंक दर्ज करें'
            : 'Enter a valid link starting with http:// or https://';
        }
        if (projectVideoUrls.some((u) => !isValidUrl(u))) {
          e.projectVideoUrls = isHin
            ? 'एक या अधिक प्रोजेक्ट लिंक वैध नहीं हैं (http:// या https:// का उपयोग करें)'
            : 'One or more project links are not valid (use http:// or https://)';
        }
      }
    }

    if (stepObj.key === 'step-contact') {
      if (!isValidPhone(whatsAppNumber.trim())) {
        e.whatsAppNumber = isHin
          ? 'एक वैध व्हाट्सएप नंबर (10-15 अंक) दर्ज करें'
          : 'Enter a valid WhatsApp number (10-15 digits)';
      }
      if (!isValidPhone(callingNumber.trim())) {
        e.callingNumber = isHin
          ? 'एक वैध कॉलिंग नंबर (10-15 अंक) दर्ज करें'
          : 'Enter a valid calling number (10-15 digits)';
      }
      if (!fullAddress.trim()) {
        e.fullAddress = isHin ? 'पूरा पता आवश्यक है' : 'Full address is required';
      }
      if (!city.trim()) {
        e.city = isHin ? 'शहर का नाम आवश्यक है' : 'City is required';
      }
      if (!state.trim()) {
        e.state = isHin ? 'राज्य का नाम आवश्यक है' : 'State is required';
      }
      if (!country.trim()) {
        e.country = isHin ? 'देश का नाम आवश्यक है' : 'Country is required';
      }
    }

    if (stepObj.key === 'step-social') {
      if (!isValidUrl(socialLink1)) {
        e.socialLink1 = isHin
          ? 'http:// या https:// से शुरू होने वाला एक वैध लिंक दर्ज करें'
          : 'Enter a valid link starting with http:// or https://';
      }
      if (!isValidUrl(socialLink2)) {
        e.socialLink2 = isHin
          ? 'http:// या https:// से शुरू होने वाला एक वैध लिंक दर्ज करें'
          : 'Enter a valid link starting with http:// or https://';
      }
    }

    setErrors((prev) => ({ ...prev, ...e }));
    return Object.keys(e).length === 0;
  };

  // Step Navigation handlers
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setFormError(null);
      setCurrentStep((prev) => Math.min(prev + 1, activeSteps.length));
      window.scrollTo({ top: 160, behavior: 'smooth' });
    } else {
      setFormError(
        isHin
          ? 'कृपया आगे बढ़ने से पहले इस चरण के सभी आवश्यक फ़ील्ड ठीक करें।'
          : 'Please fix the highlighted fields in this step before continuing.'
      );
    }
  };

  const handlePrevStep = () => {
    setFormError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 160, behavior: 'smooth' });
  };

  const handleJumpToStep = (targetStep: number) => {
    if (targetStep < currentStep) {
      setFormError(null);
      setCurrentStep(targetStep);
      window.scrollTo({ top: 160, behavior: 'smooth' });
    } else if (targetStep > currentStep) {
      let canProceed = true;
      for (let s = 1; s < targetStep; s++) {
        if (!validateStep(s)) {
          canProceed = false;
          setCurrentStep(s);
          setFormError(
            isHin
              ? `कृपया चरण ${s} के सभी आवश्यक फ़ील्ड भरें।`
              : `Please complete all required fields in Step ${s} first.`
          );
          window.scrollTo({ top: 160, behavior: 'smooth' });
          break;
        }
      }
      if (canProceed) {
        setFormError(null);
        setCurrentStep(targetStep);
        window.scrollTo({ top: 160, behavior: 'smooth' });
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setSubmitSuccess(false);
    setSubmittedData(null);
    setFormError(null);
    setErrors({});
    setCurrentStep(1);
    setPreferredLanguage('Both');
    setExperienceLevel('Newcomer');
    setInterestedRoles([]);
    setFullName('');
    setAge('');
    setGender('Prefer not to say');
    setEmail('');
    setProfilePhotoFile(null);
    setProfilePhotoPreview('');
    setYearsOfExperience('0');
    setPreviousProjects('');
    setProjectVideoUrls(['']);
    setIntroductoryVideoUrl('');
    setAboutYourself('');
    setSynopsisPdfFile(null);
    setWhatsAppNumber('');
    setCallingNumber('');
    setFullAddress('');
    setCity('');
    setState('Rajasthan');
    setCountry('India');
    setSocialLink1('');
    setSocialLink2('');
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validate all active steps
    for (let s = 1; s <= activeSteps.length; s++) {
      if (!validateStep(s)) {
        setCurrentStep(s);
        setFormError(
          isHin
            ? `कृपया पंजीकरण जमा करने से पहले चरण ${s} को पूरा करें।`
            : `Please complete Step ${s} before submitting.`
        );
        window.scrollTo({ top: 160, behavior: 'smooth' });
        return;
      }
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append('fullName', fullName.trim());
      formData.append('age', age.trim());
      formData.append('gender', gender);
      formData.append('email', email.trim().toLowerCase());
      formData.append('preferredLanguage', preferredLanguage);
      formData.append('experienceLevel', experienceLevel);

      interestedRoles.forEach((role) => formData.append('interestedRoles', role));

      formData.append('yearsOfExperience', isExperienced ? yearsOfExperience : '0');
      formData.append('previousProjects', isExperienced ? previousProjects.trim() : '');
      formData.append('introductoryVideoUrl', isExperienced ? introductoryVideoUrl.trim() : '');
      if (isExperienced) {
        projectVideoUrls
          .map((u) => u.trim())
          .filter(Boolean)
          .forEach((url) => formData.append('projectVideoUrls', url));
      }

      formData.append('aboutYourself', showAboutSection ? aboutYourself.trim() : '');

      formData.append('whatsAppNumber', whatsAppNumber.trim());
      formData.append('callingNumber', callingNumber.trim());
      formData.append('fullAddress', fullAddress.trim());
      formData.append('city', city.trim());
      formData.append('state', state.trim());
      formData.append('country', country.trim());

      formData.append('socialLink1', socialLink1.trim());
      formData.append('socialLink2', socialLink2.trim());

      if (profilePhotoFile) formData.append('profilePhoto', profilePhotoFile);
      if (synopsisPdfFile && showAboutSection) formData.append('synopsisPdf', synopsisPdfFile);

      const response = await fetch(`${getApiBaseUrl()}/talent/register`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data?.message ||
          (isHin ? 'पंजीकरण विफल रहा। कृपया पुन: प्रयास करें।' : 'Registration failed. Please try again.')
        );
      }

      setSubmittedData(data.application);
      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Talent Registration Error:', err);
      setFormError(
        err?.message ||
        (isHin
          ? 'पंजीकरण जमा करने में विफल। कृपया अपना इंटरनेट कनेक्शन जांचें।'
          : 'Failed to submit registration. Please check your connection.')
      );
    } finally {
      setSubmitting(false);
    }
  };

  const progressPercent = Math.round((currentStep / activeSteps.length) * 100);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-amber-400 selection:text-black pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* BACKGROUND AMBIENT LIGHTING */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-amber-400/15 via-yellow-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-yellow-500/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* HERO BRANDING */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isHin ? 'MAYAD प्रोडक्शन हाउस · टैलेंट नेटवर्क' : 'MAYAD Production House · Talent Network'}</span>
          </div>
          <div className="flex flex-col items-center justify-center px-4">
            <div className="flex justify-center mb-2">
              <Image
                src="/mayad22.png"
                alt="MAYAD Logo"
                width={840}
                height={360}
                priority
                className="h-auto w-full max-w-[220px] object-contain sm:max-w-[260px]"
              />
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
              थांरो हुनर, मायड़ रो मान। आओ, म्हारे संग आपणी पहचान बनावो।
            </p>
          </div>
        </motion.div>

        {/* STEPPER HEADER PROGRESS BAR */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 font-extrabold">
              {isHin ? `चरण ${currentStep} का ${activeSteps.length}` : `STEP ${currentStep} OF ${activeSteps.length}`}
            </span>
            <span>•</span>
            <span>{isHin ? 'टैलेंट रजिस्ट्रेशन डोजियर' : 'Talent Intake Dossier'}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-36 sm:w-48 h-2 rounded-full bg-slate-800 overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-amber-400 font-extrabold">{progressPercent}% {isHin ? 'पूर्ण' : 'Completed'}</span>
          </div>
        </div>

        {/* STEPPER TABS NAVIGATION */}
        <div className={`mb-8 grid ${activeSteps.length === 4 ? 'grid-cols-4' : 'grid-cols-5'} gap-1.5 sm:gap-3 p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl shadow-xl`}>
          {activeSteps.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => handleJumpToStep(step.id)}
                className={`group relative flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl transition-all duration-300 text-center ${isActive
                  ? 'bg-amber-400 text-black font-extrabold shadow-[0_0_20px_rgba(245,197,24,0.35)]'
                  : isCompleted
                    ? 'bg-amber-400/10 text-amber-300 border border-amber-400/20 hover:bg-amber-400/20'
                    : 'bg-black/30 text-slate-400 border border-white/5 hover:border-white/20 hover:text-slate-200'
                  }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={`flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-[11px] font-extrabold transition-colors ${isActive
                      ? 'bg-black text-amber-400'
                      : isCompleted
                        ? 'bg-amber-400 text-black'
                        : 'bg-slate-800 text-slate-400'
                      }`}
                  >
                    {isCompleted ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : step.id}
                  </span>
                </div>
                <span className="hidden md:block text-[11px] font-bold tracking-tight truncate w-full">
                  {isHin ? step.nameHin : step.nameEng}
                </span>
                <span className="block md:hidden text-[10px] font-bold tracking-tight truncate w-full">
                  {isHin ? step.shortHin : step.shortEng}
                </span>
              </button>
            );
          })}
        </div>

        {/* SUCCESS STATE */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-3xl border border-amber-400/40 bg-[#090d1f]/95 p-8 sm:p-12 text-center shadow-2xl backdrop-blur-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative w-20 h-20 rounded-full bg-amber-400/20 border-2 border-yellow-300 text-yellow-300 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(245,197,24,0.4)]">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h2 className="relative text-2xl sm:text-3xl font-extrabold text-white mb-3">
                {isHin ? 'पंजीकरण सफलतापूर्वक जमा किया गया!' : 'Registration submitted successfully!'}
              </h2>

              <p className="relative text-slate-300 text-base max-w-xl mx-auto mb-8 leading-relaxed">
                {isHin ? 'धन्यवाद, ' : 'Thank you, '}
                <strong className="text-amber-300">{submittedData?.fullName || fullName}</strong>!{' '}
                {isHin
                  ? 'आपका टैलेंट रजिस्ट्रेशन हमारी कास्टिंग और प्रोडक्शन टीम को प्राप्त हो गया है।'
                  : 'Your talent registration has been received by our casting and production team.'}
              </p>

              <div className="relative max-w-md mx-auto rounded-2xl bg-black/60 border border-white/10 p-5 mb-8 text-left space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                  <span className="text-slate-400">{isHin ? 'आवेदन आईडी' : 'Application ID'}</span>
                  <span className="font-mono text-amber-300 font-bold break-all text-right">
                    {submittedData?.id || 'SUBMITTED'}
                  </span>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                  <span className="text-slate-400">{isHin ? 'इच्छुक भूमिकाएं' : 'Interested roles'}</span>
                  <span className="text-white font-semibold text-right">
                    {submittedData?.interestedRoles?.join(', ') || interestedRoles.join(', ')}
                  </span>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                  <span className="text-slate-400">{isHin ? 'अनुभव का स्तर' : 'Experience level'}</span>
                  <span className="text-white font-semibold">
                    {submittedData?.experienceLevel || experienceLevel}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">{isHin ? 'स्थिति' : 'Status'}</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
                    {isHin ? 'एडमिन समीक्षा के लिए लंबित' : 'Pending admin review'}
                  </span>
                </div>
              </div>

              <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/movies"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-bold text-sm shadow-lg hover:scale-105 transition-all text-center"
                >
                  {isHin ? 'MAYAD फिल्में देखें' : 'Explore MAYAD movies'}
                </Link>
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/20 bg-white/5 text-slate-200 font-bold text-sm hover:bg-white/10 transition-all text-center"
                >
                  {isHin ? 'एक अन्य प्रोफ़ाइल जमा करें' : 'Submit another profile'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN MULTI-STEP FORM */}
        {!submitSuccess && (
          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {/* GLOBAL STEP ERROR ALERT */}
            {formError && (
              <div
                role="alert"
                className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-red-200 text-sm flex items-start gap-3 shadow-lg"
              >
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-red-300 mb-0.5">
                    {isHin ? 'कृपया फ़ॉर्म पूरा करें' : 'Form Validation Notice'}
                  </span>
                  <span>{formError}</span>
                </div>
              </div>
            )}

            {/* ============================================================
                STEP 1: PROFESSIONAL INFORMATION
            ============================================================ */}
            {currentStepKey === 'step-professional' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SectionCard
                  icon={Film}
                  title={isHin ? '1. व्यावसायिक जानकारी' : '1. Professional Information'}
                  subtitle={
                    isHin
                      ? 'अपनी भाषा प्राथमिकताएं, अनुभव स्तर और प्राथमिक विभागों (Interested In) का चयन करें।'
                      : 'Select your creative discipline, language preferences, and experience level.'
                  }
                >
                  {/* PREFERRED LANGUAGE & EXPERIENCE LEVEL */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field
                      id="preferredLanguage"
                      label={isHin ? 'आपकी पसंदीदा भाषा कौन-सी है?' : 'PREFERRED LANGUAGE'}
                    >
                      <div className="relative">
                        <select
                          id="preferredLanguage"
                          value={preferredLanguage}
                          onChange={bind(setPreferredLanguage)}
                          className={inputCls()}
                        >
                          <option value="Both" className="bg-[#090d1f]">
                            {isHin ? 'दोनों (हिंदी और अंग्रेजी)' : 'Both (English & Hindi)'}
                          </option>
                          <option value="Hindi" className="bg-[#090d1f]">{isHin ? 'हिंदी (Hindi)' : 'Hindi'}</option>
                          <option value="English" className="bg-[#090d1f]">{isHin ? 'अंग्रेजी (English)' : 'English'}</option>
                        </select>
                        <Globe className="pointer-events-none absolute right-4 top-3.5 h-4 w-4 text-amber-400" />
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {isHin
                          ? 'ऑडिशन्स, स्क्रिप्ट्स और प्रोजेक्ट कॉल इस चयन के आधार पर फिल्टर किए जाएंगे।'
                          : 'Scripts, cue cards & auditions will be filtered by this selection.'}
                      </p>
                    </Field>

                    <Field id="experienceLevel" label={isHin ? 'अनुभव का स्तर' : 'EXPERIENCE LEVEL'}>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setExperienceLevel('Newcomer')}
                          className={`py-3 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all ${experienceLevel === 'Newcomer'
                            ? 'bg-amber-400 text-black border-amber-400 shadow-[0_0_15px_rgba(245,197,24,0.3)]'
                            : 'bg-black/60 text-slate-300 border-white/15 hover:border-white/30'
                            }`}
                        >
                          <Zap className="h-4 w-4" />
                          <span>{isHin ? 'नए कलाकार (Newcomer)' : 'Newcomer'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setExperienceLevel('Experienced')}
                          className={`py-3 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all ${experienceLevel === 'Experienced'
                            ? 'bg-amber-400 text-black border-amber-400 shadow-[0_0_15px_rgba(245,197,24,0.3)]'
                            : 'bg-black/60 text-slate-300 border-white/15 hover:border-white/30'
                            }`}
                        >
                          <TrendingUp className="h-4 w-4" />
                          <span>{isHin ? 'अनुभवी (Experienced)' : 'Experienced'}</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {isHin
                          ? 'आपके स्तर के अनुसार प्रासंगिक प्रोजेक्ट और कास्टिंग आवश्यकताओं को तैयार किया जाता है।'
                          : 'Curates relevant production scale and casting tiers.'}
                      </p>
                    </Field>
                  </div>

                  {/* INTERESTED IN CATEGORY CARDS GRID */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                          <span>{isHin ? 'आप क्या बनना चाहते हैं?' : 'Interested In'}</span>
                          <span className="text-red-400">*</span>
                        </h3>
                        <p className="text-xs text-slate-400">
                          {isHin
                            ? '(एक या अधिक प्राथमिक विभागों का चयन करें)'
                            : '(Select one or more primary departments)'}
                        </p>
                      </div>
                      {interestedRoles.length > 0 && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                          {interestedRoles.length} {isHin ? 'चयनित (Selected)' : 'Selected'}
                        </span>
                      )}
                    </div>

                    {errors.interestedRoles && (
                      <p className="text-red-400 text-xs font-semibold">{errors.interestedRoles}</p>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                      {ROLE_CARDS.map((card) => {
                        const Icon = card.icon;
                        const isSelected = interestedRoles.includes(card.id);
                        return (
                          <button
                            key={card.id}
                            type="button"
                            onClick={() => toggleRole(card.id)}
                            className={`group relative flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-300 active:scale-95 ${isSelected
                              ? 'bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-900 border-amber-400 text-white shadow-[0_0_20px_rgba(245,197,24,0.2)]'
                              : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-amber-400/40 hover:bg-slate-900 hover:text-white'
                              }`}
                          >
                            {/* Top Right Checkbox / Checkmark Badge */}
                            <div
                              className={`absolute top-2.5 right-2.5 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${isSelected
                                ? 'bg-amber-400 text-black shadow-md'
                                : 'border border-white/20 bg-black/40 text-transparent group-hover:border-amber-400/50'
                                }`}
                            >
                              {isSelected ? <Check className="h-3 w-3 stroke-[3]" /> : '+'}
                            </div>

                            {/* Centered Icon Box */}
                            <div
                              className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${isSelected
                                ? 'border-amber-400/50 bg-amber-400/10 text-amber-300 shadow-inner'
                                : 'border-white/10 bg-white/5 text-slate-400 group-hover:border-amber-400/30 group-hover:text-amber-300'
                                }`}
                            >
                              <Icon className="h-6 w-6" />
                            </div>

                            {/* Role Title */}
                            <h4 className="text-sm font-extrabold tracking-tight text-white mb-1">
                              {isHin ? card.labelHin : card.labelEng}
                            </h4>

                            {/* Subtitle */}
                            <p className="text-[10px] text-slate-400 leading-tight">
                              {isHin ? card.subHin : card.subEng}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </SectionCard>
              </motion.div>
            )}

            {/* ============================================================
                STEP 2: PERSONAL INFORMATION
            ============================================================ */}
            {currentStepKey === 'step-personal' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SectionCard
                  icon={User}
                  title={isHin ? currentStepObj?.nameHin : currentStepObj?.nameEng}
                  subtitle={
                    isHin
                      ? 'अपनी बुनियादी व्यक्तिगत जानकारी दर्ज करें और अपनी प्रोफ़ाइल फ़ोटो अपलोड करें।'
                      : 'Enter your details and upload your profile photo.'
                  }
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field id="fullName" label={isHin ? 'पूरा नाम' : 'Full name'} required error={errors.fullName}>
                      <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={bind(setFullName, 'fullName')}
                        placeholder={isHin ? 'अपना पूरा नाम दर्ज करें' : 'Enter your full name'}
                        autoComplete="name"
                        className={inputCls(errors.fullName)}
                      />
                    </Field>

                    <Field id="age" label={isHin ? 'आयु (वर्ष)' : 'Age (years)'} required error={errors.age}>
                      <input
                        id="age"
                        type="number"
                        min="1"
                        max="120"
                        value={age}
                        onChange={bind(setAge, 'age')}
                        placeholder={isHin ? 'जैसे: 24' : 'e.g. 24'}
                        className={inputCls(errors.age)}
                      />
                    </Field>

                    <Field id="gender" label={isHin ? 'लिंग' : 'Gender'}>
                      <select id="gender" value={gender} onChange={bind(setGender)} className={inputCls()}>
                        <option value="Male" className="bg-[#090d1f]">{isHin ? 'पुरुष' : 'Male'}</option>
                        <option value="Female" className="bg-[#090d1f]">{isHin ? 'महिला' : 'Female'}</option>
                        <option value="Non-Binary" className="bg-[#090d1f]">{isHin ? 'नॉन-बाइनरी' : 'Non-Binary'}</option>
                        <option value="Prefer not to say" className="bg-[#090d1f]">{isHin ? 'बताना नहीं चाहते' : 'Prefer not to say'}</option>
                        <option value="Other" className="bg-[#090d1f]">{isHin ? 'अन्य' : 'Other'}</option>
                      </select>
                    </Field>

                    <Field id="email" label={isHin ? 'ईमेल पता' : 'Email address'} required error={errors.email}>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={bind(setEmail, 'email')}
                        placeholder="yourname@example.com"
                        autoComplete="email"
                        className={inputCls(errors.email)}
                      />
                    </Field>
                  </div>

                  {/* PROFILE PHOTO UPLOAD */}
                  <Field
                    id="profilePhotoInput"
                    label={isHin ? 'प्रोफ़ाइल फ़ोटो (JPG, PNG, WEBP)' : 'Profile photo (JPG, PNG, WEBP)'}
                    required
                    error={errors.profilePhoto}
                  >
                    <div
                      id="field-profilePhoto"
                      className="scroll-mt-28 flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-black/40 border border-white/10"
                    >
                      <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-black/80 shrink-0 flex items-center justify-center group shadow-md">
                        {profilePhotoPreview ? (
                          <>
                            <img
                              src={profilePhotoPreview}
                              alt="Profile preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={removePhoto}
                              className="absolute top-1 right-1 p-1 rounded-full bg-red-600/90 text-white hover:bg-red-500 transition-all sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
                              title={isHin ? 'फ़ोटो हटाएं' : 'Remove photo'}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <div className="text-center p-2">
                            <Camera className="w-8 h-8 text-slate-500 mx-auto mb-1" />
                            <span className="text-[10px] text-slate-400 font-semibold">
                              {isHin ? 'कोई फ़ोटो नहीं' : 'No image'}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 text-center sm:text-left space-y-2">
                        <label
                          htmlFor="profilePhotoInput"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-bold text-xs cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-md"
                        >
                          <Upload className="w-4 h-4" />
                          <span>
                            {isHin
                              ? (profilePhotoPreview ? 'फ़ोटो बदलें' : 'प्रोफ़ाइल फ़ोटो अपलोड करें')
                              : (profilePhotoPreview ? 'Change photo' : 'Upload profile photo')}
                          </span>
                        </label>
                        <input
                          ref={photoInputRef}
                          id="profilePhotoInput"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handlePhotoChange}
                          className="sr-only"
                        />
                        <p className="text-xs text-slate-400">
                          {isHin
                            ? 'उच्च गुणवत्ता वाली पोर्ट्रेट फ़ोटो (अधिकतम 5MB)।'
                            : 'High-resolution portrait photo (max 5MB).'}
                        </p>
                      </div>
                    </div>
                  </Field>
                </SectionCard>
              </motion.div>
            )}

            {/* ============================================================
                STEP 3: CINEMATIC PROFILE & SYNOPSIS
            ============================================================ */}
            {currentStepKey === 'step-cinematic' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SectionCard
                  icon={Video}
                  title={isHin ? '3. सिनेमैटिक प्रोफाइल एवं सिनोप्सिस' : '3. Cinematic Profile & Synopsis'}
                  subtitle={
                    isHin
                      ? 'अपना शोरील, पिछले प्रोजेक्ट लिंक, रचनात्मक दृष्टिकोण और पोर्टफोलियो पीडीएफ साझा करें।'
                      : 'Share your portfolio, showreels, previous work summary and PDF synopsis.'
                  }
                >
                  {/* EXPERIENCE DETAILS (IF EXPERIENCED) */}
                  {isExperienced && (
                    <div className="space-y-6 pb-6 border-b border-white/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field id="yearsOfExperience" label={isHin ? 'अनुभव के वर्ष' : 'Years of experience'}>
                          <select
                            id="yearsOfExperience"
                            value={yearsOfExperience}
                            onChange={bind(setYearsOfExperience)}
                            className={inputCls()}
                          >
                            <option value="0" className="bg-[#090d1f]">{isHin ? 'नवागंतुक / 0 वर्ष' : 'Fresher / 0 years'}</option>
                            <option value="1" className="bg-[#090d1f]">{isHin ? '1 वर्ष' : '1 year'}</option>
                            <option value="2" className="bg-[#090d1f]">{isHin ? '2 वर्ष' : '2 years'}</option>
                            <option value="3-5" className="bg-[#090d1f]">{isHin ? '3 से 5 वर्ष' : '3 to 5 years'}</option>
                            <option value="5-10" className="bg-[#090d1f]">{isHin ? '5 से 10 वर्ष' : '5 to 10 years'}</option>
                            <option value="10+" className="bg-[#090d1f]">{isHin ? '10+ वर्ष' : '10+ years'}</option>
                          </select>
                        </Field>

                        <Field
                          id="introductoryVideoUrl"
                          label={isHin ? 'परिचयात्मक वीडियो लिंक (यूट्यूब / वीमियो / ड्राइव)' : 'Introductory video link (YouTube / Vimeo / Drive)'}
                          error={errors.introductoryVideoUrl}
                        >
                          <input
                            id="introductoryVideoUrl"
                            type="url"
                            value={introductoryVideoUrl}
                            onChange={bind(setIntroductoryVideoUrl, 'introductoryVideoUrl')}
                            placeholder="https://youtube.com/watch?v=..."
                            className={inputCls(errors.introductoryVideoUrl)}
                          />
                        </Field>
                      </div>

                      <Field id="previousProjects" label={isHin ? 'पिछले प्रोजेक्ट्स का विवरण' : 'Previous projects summary'}>
                        <textarea
                          id="previousProjects"
                          rows={3}
                          value={previousProjects}
                          onChange={bind(setPreviousProjects)}
                          placeholder={
                            isHin
                              ? 'शॉर्ट फिल्मों, फिल्मों, सीरीज, विज्ञापनों या म्यूजिक वीडियो का उल्लेख करें जिन पर आपने काम किया है...'
                              : 'Mention short films, movies, series, ads or music videos you have worked on...'
                          }
                          className={`${inputCls()} resize-none`}
                        />
                      </Field>

                      <Field
                        id="projectVideoUrls"
                        label={isHin ? `प्रोजेक्ट वीडियो लिंक (${MAX_PROJECT_LINKS} तक)` : `Project video links (up to ${MAX_PROJECT_LINKS})`}
                        error={errors.projectVideoUrls}
                      >
                        <div className="space-y-3">
                          {projectVideoUrls.map((url, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <input
                                id={index === 0 ? 'projectVideoUrls' : undefined}
                                type="url"
                                value={url}
                                onChange={(e) => handleVideoUrlChange(index, e.target.value)}
                                placeholder={isHin ? `प्रोजेक्ट वीडियो लिंक #${index + 1}` : `Project video link #${index + 1}`}
                                className={`flex-1 ${inputCls(errors.projectVideoUrls)}`}
                              />
                              {projectVideoUrls.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveVideoUrl(index)}
                                  className="p-3 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/40 border border-red-500/30 transition-all shrink-0"
                                  title={isHin ? 'लिंक हटाएं' : 'Remove link'}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}

                          {projectVideoUrls.length < MAX_PROJECT_LINKS && (
                            <button
                              type="button"
                              onClick={handleAddVideoUrl}
                              className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:underline"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{isHin ? 'एक और लिंक जोड़ें' : 'Add another link'}</span>
                            </button>
                          )}
                        </div>
                      </Field>
                    </div>
                  )}

                  {/* ABOUT & SYNOPSIS PDF */}
                  {showAboutSection && (
                    <div className="space-y-6">
                      <Field id="aboutYourself" label={isHin ? 'अपने बारे में / व्यावसायिक सिनोप्सिस' : 'About yourself / professional synopsis'}>
                        <textarea
                          id="aboutYourself"
                          rows={4}
                          value={aboutYourself}
                          onChange={bind(setAboutYourself)}
                          placeholder={
                            isHin
                              ? 'अपनी रचनात्मक दृष्टि, निर्देशन या लेखन शैली, तकनीकी विशेषज्ञता या पृष्ठभूमि का वर्णन करें...'
                              : 'Describe your creative vision, directing or writing style, technical expertise, or background...'
                          }
                          className={`${inputCls()} resize-none`}
                        />
                      </Field>

                      <Field
                        id="synopsisPdfInput"
                        label={isHin ? 'पीडीएफ सिनोप्सिस / पोर्टफोलियो (वैकल्पिक)' : 'PDF synopsis / cinematic portfolio (optional)'}
                        error={errors.synopsisPdf}
                      >
                        <div
                          id="field-synopsisPdf"
                          className="scroll-mt-28 p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 shrink-0">
                              <FileCheck className="w-6 h-6" />
                            </div>
                            <div className="min-w-0">
                              <span className="block text-sm font-semibold text-white truncate">
                                {synopsisPdfFile
                                  ? synopsisPdfFile.name
                                  : isHin
                                    ? 'कोई पीडीएफ चयनित नहीं है'
                                    : 'No PDF selected'}
                              </span>
                              <span className="text-xs text-slate-400">
                                {isHin ? '15MB तक के पीडीएफ दस्तावेज़।' : 'PDF documents up to 15MB.'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <label
                              htmlFor="synopsisPdfInput"
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 text-slate-200 font-bold text-xs cursor-pointer hover:bg-white/10 transition-all"
                            >
                              <Upload className="w-4 h-4 text-amber-300" />
                              <span>
                                {isHin
                                  ? (synopsisPdfFile ? 'पीडीएफ बदलें' : 'पीडीएफ चुनें')
                                  : (synopsisPdfFile ? 'Change PDF' : 'Select PDF')}
                              </span>
                            </label>
                            {synopsisPdfFile && (
                              <button
                                type="button"
                                onClick={() => {
                                  setSynopsisPdfFile(null);
                                  if (pdfInputRef.current) pdfInputRef.current.value = '';
                                }}
                                className="p-2.5 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/40 border border-red-500/30 transition-all"
                                title={isHin ? 'पीडीएफ हटाएं' : 'Remove PDF'}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <input
                            ref={pdfInputRef}
                            id="synopsisPdfInput"
                            type="file"
                            accept="application/pdf"
                            onChange={handlePdfChange}
                            className="sr-only"
                          />
                        </div>
                      </Field>
                    </div>
                  )}
                </SectionCard>
              </motion.div>
            )}

            {/* ============================================================
                STEP 4: CONTACT INFORMATION & ADDRESS
            ============================================================ */}
            {currentStepKey === 'step-contact' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SectionCard
                  icon={Phone}
                  title={isHin ? currentStepObj?.nameHin : currentStepObj?.nameEng}
                  subtitle={
                    isHin
                      ? 'कास्टिंग और प्रोडक्शन टीम से सीधा संपर्क स्थापित करने के लिए संपर्क विवरण दर्ज करें।'
                      : 'Direct contact details for production communication and location dispatch.'
                  }
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field id="whatsAppNumber" label={isHin ? 'व्हाट्सएप नंबर' : 'WhatsApp number'} required error={errors.whatsAppNumber}>
                      <input
                        id="whatsAppNumber"
                        type="tel"
                        inputMode="tel"
                        value={whatsAppNumber}
                        onChange={bind(setWhatsAppNumber, 'whatsAppNumber')}
                        placeholder="+91 9876543210"
                        autoComplete="tel"
                        className={inputCls(errors.whatsAppNumber)}
                      />
                    </Field>

                    <Field id="callingNumber" label={isHin ? 'कॉलिंग नंबर' : 'Calling number'} required error={errors.callingNumber}>
                      <input
                        id="callingNumber"
                        type="tel"
                        inputMode="tel"
                        value={callingNumber}
                        onChange={bind(setCallingNumber, 'callingNumber')}
                        placeholder="+91 9876543210"
                        className={inputCls(errors.callingNumber)}
                      />
                    </Field>
                  </div>

                  <Field id="fullAddress" label={isHin ? 'पूरा पता' : 'Full address'} required error={errors.fullAddress}>
                    <textarea
                      id="fullAddress"
                      rows={2}
                      value={fullAddress}
                      onChange={bind(setFullAddress, 'fullAddress')}
                      placeholder={isHin ? 'सड़क का पता, मकान नंबर, इलाका...' : 'Street address, house no., locality...'}
                      autoComplete="street-address"
                      className={`${inputCls(errors.fullAddress)} resize-none`}
                    />
                  </Field>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Field id="city" label={isHin ? 'शहर' : 'City'} required error={errors.city}>
                      <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={bind(setCity, 'city')}
                        placeholder={isHin ? 'जैसे: जयपुर' : 'e.g. Jaipur'}
                        className={inputCls(errors.city)}
                      />
                    </Field>

                    <Field id="state" label={isHin ? 'राज्य' : 'State'} required error={errors.state}>
                      <input
                        id="state"
                        type="text"
                        value={state}
                        onChange={bind(setState, 'state')}
                        placeholder={isHin ? 'जैसे: राजस्थान' : 'e.g. Rajasthan'}
                        className={inputCls(errors.state)}
                      />
                    </Field>

                    <Field id="country" label={isHin ? 'देश' : 'Country'} required error={errors.country}>
                      <input
                        id="country"
                        type="text"
                        value={country}
                        onChange={bind(setCountry, 'country')}
                        placeholder={isHin ? 'भारत' : 'India'}
                        className={inputCls(errors.country)}
                      />
                    </Field>
                  </div>
                </SectionCard>
              </motion.div>
            )}

            {/* ============================================================
                STEP 5: SOCIAL MEDIA PROFILES & DOSSIER REVIEW
            ============================================================ */}
            {currentStepKey === 'step-social' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SectionCard
                  icon={Globe}
                  title={isHin ? currentStepObj?.nameHin : currentStepObj?.nameEng}
                  subtitle={
                    isHin
                      ? 'अपनी सोशल मीडिया प्रोफाइल लिंक जोड़ें और अंतिम पंजीकरण जमा करने से पहले समीक्षा करें।'
                      : 'Add your active social media links and review your dossier before final submission.'
                  }
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field id="socialLink1" label={isHin ? 'सोशल मीडिया लिंक 1 (इंस्टाग्राम/यूट्यूब)' : 'Social media link 1 (Instagram/YouTube)'} error={errors.socialLink1}>
                      <input
                        id="socialLink1"
                        type="url"
                        value={socialLink1}
                        onChange={bind(setSocialLink1, 'socialLink1')}
                        placeholder="https://instagram.com/username"
                        className={inputCls(errors.socialLink1)}
                      />
                    </Field>

                    <Field id="socialLink2" label={isHin ? 'सोशल मीडिया लिंक 2 (फेसबुक/लिंक्डइन)' : 'Social media link 2 (Facebook/LinkedIn)'} error={errors.socialLink2}>
                      <input
                        id="socialLink2"
                        type="url"
                        value={socialLink2}
                        onChange={bind(setSocialLink2, 'socialLink2')}
                        placeholder="https://youtube.com/@channel"
                        className={inputCls(errors.socialLink2)}
                      />
                    </Field>
                  </div>

                  {/* DOSSIER PREVIEW SUMMARY CARD */}
                  <div className="mt-6 p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3 text-xs sm:text-sm">
                    <h4 className="font-extrabold text-amber-300 text-sm flex items-center gap-2 border-b border-white/10 pb-2">
                      <ShieldCheck className="h-4 w-4 text-amber-400" />
                      <span>{isHin ? 'टैलेंट डोजियर सारांश (Review Summary)' : 'Talent Dossier Summary'}</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <span className="text-slate-400 block text-[11px] font-semibold">{isHin ? 'नाम एवं ईमेल' : 'Name & Email'}:</span>
                        <span className="text-white font-bold">{fullName || '-'}</span> ({email || '-'})
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px] font-semibold">{isHin ? 'इच्छुक भूमिकाएं' : 'Interested Roles'}:</span>
                        <span className="text-amber-300 font-bold">{interestedRoles.join(', ') || '-'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px] font-semibold">{isHin ? 'अनुभव एवं भाषा' : 'Experience & Language'}:</span>
                        <span className="text-white font-semibold">{experienceLevel} • {preferredLanguage}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px] font-semibold">{isHin ? 'संपर्क व्हाट्सएप' : 'WhatsApp Contact'}:</span>
                        <span className="text-white font-semibold">{whatsAppNumber || '-'}</span> ({city}, {state})
                      </div>
                    </div>
                  </div>
                </SectionCard>
              </motion.div>
            )}

            {/* STEP NAVIGATION BOTTOM CONTROLS */}
            <div className="rounded-3xl border border-white/10 bg-[#090d1f]/90 p-5 sm:p-6 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/20 bg-white/5 text-slate-200 font-bold text-xs hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2 active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  <span>{isHin ? '← पिछला चरण' : '← Previous Step'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-white/10 bg-black/40 text-slate-400 font-bold text-xs hover:text-slate-200 transition-all"
                >
                  {isHin ? 'फॉर्म साफ़ करें' : 'Clear Form'}
                </button>
              )}

              <div className="hidden md:block text-xs font-bold text-slate-400">
                {currentStep < activeSteps.length && activeSteps[currentStep] && (
                  <span>
                    {isHin
                      ? `अगला चरण: ${activeSteps[currentStep].nameHin}`
                      : `Next: ${activeSteps[currentStep].nameEng}`}
                  </span>
                )}
              </div>

              {currentStep < activeSteps.length ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-extrabold text-sm shadow-[0_0_20px_rgba(245,197,24,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <span>
                    {isHin
                      ? `आगे बढ़ें (चरण ${currentStep + 1})`
                      : `Continue to Step ${currentStep + 1}`}
                  </span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-extrabold text-sm shadow-[0_0_25px_rgba(245,197,24,0.4)] hover:scale-105 active:scale-95 disabled:opacity-50 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                      <span>{isHin ? 'जमा हो रहा है...' : 'Submitting...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{isHin ? 'पंजीकरण जमा करें' : 'Submit Registration'}</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}