// src/components/UserDashboard.tsx

import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { 
  FileText, 
  Download, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  User, 
  Heart,
  Activity,
  Stethoscope,
  Users,
  Scale,
  Calendar,
  ChevronDown,
  ChevronUp,
  Shield,
  Star,
  TrendingUp,
  Loader2
} from 'lucide-react';

// --- Type Definitions for the Complete Questionnaire Data ---
interface PersonalInfo { age?: number; gender?: string; contact?: string; }
interface Lifestyle { smoking_status?: string; alcohol_consumption?: string; physical_activity?: string; diet?: string; }
interface MedicalHistory { diabetes?: boolean; hypertension?: boolean; heart_disease?: boolean; other_conditions?: string; medications?: string; allergies?: string; }
interface FamilyHistory { diabetes?: boolean; heart_disease?: boolean; cancer?: boolean; other?: string; }
interface Measurements { height_cm?: number; weight_kg?: number; bmi?: number; blood_pressure?: string; blood_sugar?: string; cholesterol?: string; }
interface Symptoms { chest_pain?: boolean; breathlessness?: boolean; fatigue?: boolean; sleep_quality?: string; stress_level?: string; }
interface PreventiveCare { last_checkup?: string; vaccinations?: string; }
interface Recommendation { test_name: string; reason: string; category: string; }
interface Suggestion { suggestion_text: string; category: string; }

interface FullQuestionnaire {
  id: number;
  status: string;
  admin_feedback: string;
  submitted_at: string;
  personal_info: PersonalInfo;
  lifestyle: Lifestyle;
  medical_history: MedicalHistory;
  family_history: FamilyHistory;
  measurements: Measurements;
  symptoms: Symptoms;
  preventive_care: PreventiveCare;
  recommendations: Recommendation[];
  suggestions: Suggestion[];
}

// --- Helper Components ---
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock,
          text: 'Pending Review'
        };
      case 'reviewed':
        return { 
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          text: 'Reviewed'
        };
      case 'approved':
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: CheckCircle,
          text: 'Approved'
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Clock,
          text: status.charAt(0).toUpperCase() + status.slice(1)
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${config.color}`}>
      <Icon className="h-4 w-4" />
      {config.text}
    </span>
  );
};

const InfoCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}> = ({ icon, title, children, className = "", gradient = "from-[#4C7B4C] to-[#5a8a5a]" }) => (
  <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}>
    <div className="p-6 border-b border-gray-100 bg-[#F5F9F5]">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  
  let displayValue = value;
  if (typeof value === 'boolean') {
    displayValue = value ? 'Yes' : 'No';
  } else if (label === 'Last Check-up' && value) {
     displayValue = new Date(value).toLocaleDateString();
  }
  
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
      <span className="font-medium text-gray-700">{label}</span>
      <span className="text-gray-900 text-right max-w-xs truncate">{displayValue}</span>
    </div>
  );
};

const CollapsibleSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-semibold text-gray-800">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      {isOpen && (
        <div className="p-4 bg-white border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

// --- Main Dashboard Component ---
export const UserDashboard: React.FC = () => {
  const [questionnaire, setQuestionnaire] = useState<FullQuestionnaire | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.getQuestionnaire(); 
        setQuestionnaire(res.data[0] || null); 
      } catch (err) {
        setError('Failed to load your questionnaire data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F9F5] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-[#4C7B4C] animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading your health report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F9F5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Data</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!questionnaire) {
    return (
      <div className="min-h-screen bg-[#F5F9F5] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <FileText className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No Questionnaire Found</h1>
            <p className="text-xl text-gray-600 mb-8">
              You haven't submitted a health questionnaire yet. Complete one to view your personalized dashboard.
            </p>
            <a
              href="/questionnaire"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <FileText className="h-5 w-5" />
              Start Questionnaire
            </a>
          </div>
        </div>
      </div>
    );
  }

  const hasRecommendations = questionnaire.recommendations?.length > 0 || questionnaire.suggestions?.length > 0;

  return (
    <div className="min-h-screen bg-[#F5F9F5] py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Your Health Report</h1>
                <p className="text-white/90">
                  Submitted on {new Date(questionnaire.submitted_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={questionnaire.status} />
                <a 
                  href={`http://127.0.0.1:8000/questionnaire/${questionnaire.id}/download/`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-white text-[#4C7B4C] px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Download className="h-5 w-5" />
                  Download Report
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor's Feedback Section */}
        <InfoCard
          icon={<Shield className="h-6 w-6 text-white" />}
          title="Doctor's Review"
          gradient="from-blue-500 to-blue-600"
          className="border-l-4 border-blue-500"
        >
          {questionnaire.admin_feedback ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600 mb-3">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Review Complete</span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Personalized Feedback:</h4>
                <div className="text-blue-800 whitespace-pre-line leading-relaxed">
                  {questionnaire.admin_feedback}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-yellow-600 bg-yellow-50 p-4 rounded-xl border border-yellow-200">
              <Clock className="h-6 w-6 flex-shrink-0" />
              <div>
                <p className="font-semibold">Pending Medical Review</p>
                <p className="text-sm text-yellow-700 mt-1">
                  Your submission is being reviewed by our medical team. You'll receive personalized feedback soon.
                </p>
              </div>
            </div>
          )}
        </InfoCard>

        {/* Automated Recommendations */}
        <InfoCard
          icon={<TrendingUp className="h-6 w-6 text-white" />}
          title="Automated Health Recommendations"
          gradient="from-green-500 to-green-600"
          className="border-l-4 border-green-500"
        >
          {hasRecommendations ? (
            <div className="space-y-6">
              {questionnaire.recommendations.length > 0 && (
                <div>
                  <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                    <Stethoscope className="h-5 w-5" />
                    Recommended Health Screenings
                  </h4>
                  <div className="space-y-3">
                    {questionnaire.recommendations.map((rec, index) => (
                      <div key={`rec-${index}`} className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 rounded-full p-1.5 flex-shrink-0 mt-0.5">
                            <Star className="h-3 w-3 text-white" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-green-900">{rec.test_name}</h5>
                            <p className="text-green-700 text-sm mt-1">{rec.reason}</p>
                            <span className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium mt-2">
                              {rec.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {questionnaire.suggestions.length > 0 && (
                <div className="pt-4 border-t border-green-200">
                  <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Lifestyle & Health Suggestions
                  </h4>
                  <div className="space-y-3">
                    {questionnaire.suggestions.map((sug, index) => (
                      <div key={`sug-${index}`} className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 rounded-full p-1.5 flex-shrink-0 mt-0.5">
                            <Activity className="h-3 w-3 text-white" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-green-900">{sug.category}</h5>
                            <p className="text-green-700 text-sm mt-1">{sug.suggestion_text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600">No specific automated recommendations were generated based on your profile.</p>
            </div>
          )}
        </InfoCard>

        {/* Submitted Information Overview */}
        <InfoCard
          icon={<FileText className="h-6 w-6 text-white" />}
          title="Your Submitted Information"
          gradient="from-purple-500 to-purple-600"
        >
          <div className="space-y-4">
            <p className="text-gray-600 mb-6">
              Here's a summary of the health information you provided. Click each section to view details.
            </p>
            
            <div className="space-y-3">
              <CollapsibleSection
                title="Personal Information"
                icon={<User className="h-5 w-5 text-gray-600" />}
              >
                <div className="space-y-1">
                  <InfoField label="Age" value={questionnaire.personal_info.age} />
                  <InfoField label="Gender" value={questionnaire.personal_info.gender} />
                  <InfoField label="Contact" value={questionnaire.personal_info.contact} />
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Lifestyle"
                icon={<Activity className="h-5 w-5 text-gray-600" />}
              >
                <div className="space-y-1">
                  <InfoField label="Smoking Status" value={questionnaire.lifestyle.smoking_status} />
                  <InfoField label="Alcohol Consumption" value={questionnaire.lifestyle.alcohol_consumption} />
                  <InfoField label="Physical Activity" value={questionnaire.lifestyle.physical_activity} />
                  <InfoField label="Diet" value={questionnaire.lifestyle.diet} />
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Medical History"
                icon={<Heart className="h-5 w-5 text-gray-600" />}
              >
                <div className="space-y-1">
                  <InfoField label="Diabetes" value={questionnaire.medical_history.diabetes} />
                  <InfoField label="Hypertension" value={questionnaire.medical_history.hypertension} />
                  <InfoField label="Heart Disease" value={questionnaire.medical_history.heart_disease} />
                  <InfoField label="Other Conditions" value={questionnaire.medical_history.other_conditions} />
                  <InfoField label="Current Medications" value={questionnaire.medical_history.medications} />
                  <InfoField label="Allergies" value={questionnaire.medical_history.allergies} />
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Family History"
                icon={<Users className="h-5 w-5 text-gray-600" />}
              >
                <div className="space-y-1">
                  <InfoField label="Family Diabetes" value={questionnaire.family_history.diabetes} />
                  <InfoField label="Family Heart Disease" value={questionnaire.family_history.heart_disease} />
                  <InfoField label="Family Cancer" value={questionnaire.family_history.cancer} />
                  <InfoField label="Other Family Conditions" value={questionnaire.family_history.other} />
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Measurements & Vitals"
                icon={<Scale className="h-5 w-5 text-gray-600" />}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-3">Physical Measurements</h5>
                    <div className="space-y-1">
                      <InfoField label="Height (cm)" value={questionnaire.measurements.height_cm} />
                      <InfoField label="Weight (kg)" value={questionnaire.measurements.weight_kg} />
                      <InfoField label="BMI" value={questionnaire.measurements.bmi} />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-3">Vital Signs</h5>
                    <div className="space-y-1">
                      <InfoField label="Blood Pressure" value={questionnaire.measurements.blood_pressure} />
                      <InfoField label="Blood Sugar" value={questionnaire.measurements.blood_sugar} />
                      <InfoField label="Cholesterol" value={questionnaire.measurements.cholesterol} />
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Symptoms & Well-being"
                icon={<AlertTriangle className="h-5 w-5 text-gray-600" />}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-3">Symptoms</h5>
                    <div className="space-y-1">
                      <InfoField label="Chest Pain" value={questionnaire.symptoms.chest_pain} />
                      <InfoField label="Breathlessness" value={questionnaire.symptoms.breathlessness} />
                      <InfoField label="Fatigue" value={questionnaire.symptoms.fatigue} />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-3">General Well-being</h5>
                    <div className="space-y-1">
                      <InfoField label="Sleep Quality" value={questionnaire.symptoms.sleep_quality} />
                      <InfoField label="Stress Level" value={questionnaire.symptoms.stress_level} />
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Preventive Care"
                icon={<Calendar className="h-5 w-5 text-gray-600" />}
              >
                <div className="space-y-1">
                  <InfoField label="Last Check-up" value={questionnaire.preventive_care.last_checkup} />
                  <InfoField label="Recent Vaccinations" value={questionnaire.preventive_care.vaccinations} />
                </div>
              </CollapsibleSection>
            </div>
          </div>
        </InfoCard>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] rounded-2xl p-8 text-white">
          <div className="text-center space-y-4">
            <Shield className="h-12 w-12 mx-auto opacity-90" />
            <h2 className="text-2xl font-bold">Next Steps</h2>
            <p className="text-white/90 max-w-2xl mx-auto leading-relaxed">
              Share this report with your healthcare provider to discuss your personalized recommendations and create a comprehensive health plan tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a 
                href={`http://127.0.0.1:8000/questionnaire/${questionnaire.id}/download/`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-white text-[#4C7B4C] px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg"
              >
                <Download className="h-5 w-5" />
                Download Full Report
              </a>
              <button className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#4C7B4C] transition-all duration-300">
                <FileText className="h-5 w-5" />
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

