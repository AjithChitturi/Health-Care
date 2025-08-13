// components/AdminReviewPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import {
  ArrowLeft,
  User,
  Calendar,
  Heart,
  Activity,
  Users,
  Scale,
  AlertTriangle,
  Stethoscope,
  CheckCircle,
  Clock,
  Save,
  Loader2,
  Shield,
  Edit3
} from 'lucide-react';

// Type definitions matching your backend models
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
  updated_at: string;
  reviewed_by: string;
  reviewed_at: string;
  personal_info: PersonalInfo;
  lifestyle: Lifestyle;
  medical_history: MedicalHistory;
  family_history: FamilyHistory;
  measurements: Measurements;
  symptoms: Symptoms;
  preventive_care: PreventiveCare;
  recommendations: Recommendation[];
  suggestions: Suggestion[];
  user: { username: string; email: string; };
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock, text: 'Pending Review' };
      case 'reviewed':
        return { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircle, text: 'Reviewed' };
      case 'approved':
        return { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle, text: 'Approved' };
      case 'rejected':
        return { color: 'bg-red-100 text-red-800 border-red-200', icon: AlertTriangle, text: 'Rejected' };
      case 'needs_info':
        return { color: 'bg-orange-100 text-orange-800 border-orange-200', icon: AlertTriangle, text: 'Needs More Info' };
      default:
        return { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: Clock, text: status };
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

const InfoSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  gradient?: string;
}> = ({ title, icon, children, gradient = "from-[#4C7B4C] to-[#5a8a5a]" }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
    <div className="p-4 border-b border-gray-100 bg-[#F5F9F5]">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} shadow-lg`}>
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => {
  if (value === null || value === undefined || value === '') return null;
  
  let displayValue = value;
  if (typeof value === 'boolean') {
    displayValue = value ? 'Yes' : 'No';
  } else if (label === 'Last Check-up' && value) {
    displayValue = new Date(value).toLocaleDateString();
  }
  
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
      <span className="font-medium text-gray-700">{label}</span>
      <span className="text-gray-900 text-right max-w-xs">{displayValue}</span>
    </div>
  );
};

export const AdminReviewPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] = useState<FullQuestionnaire | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  
  // Form states
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('reviewed');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        setLoading(true);
        const response = await api.getQuestionnaireDetail(parseInt(id!));
        const data = response.data;
        setQuestionnaire(data);
        setFeedback(data.admin_feedback || '');
        setStatus(data.status || 'reviewed');
      } catch (err) {
        setError('Failed to load questionnaire details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchQuestionnaire();
    }
  }, [id]);

  const handleSaveFeedback = async () => {
    if (!questionnaire) return;

    setSaving(true);
    try {
      await api.reviewQuestionnaire(questionnaire.id, {
        admin_feedback: feedback,
        status: status
      });

      // Update local state
      setQuestionnaire(prev => prev ? {
        ...prev,
        admin_feedback: feedback,
        status: status,
        reviewed_at: new Date().toISOString()
      } : null);

      setIsEditing(false);
      alert('Feedback saved successfully!');
    } catch (err) {
      console.error('Failed to save feedback:', err);
      alert('Failed to save feedback. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F9F5] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-[#4C7B4C] animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading questionnaire details...</p>
        </div>
      </div>
    );
  }

  if (error || !questionnaire) {
    return (
      <div className="min-h-screen bg-[#F5F9F5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error || 'Questionnaire not found'}</p>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="text-[#4C7B4C] hover:text-[#5a8a5a] font-medium"
          >
            ← Back to Admin Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F9F5] py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-[#4C7B4C] hover:text-[#5a8a5a] font-medium transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Dashboard
          </button>
        </div>

        {/* Patient Info Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] p-8 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 rounded-2xl p-3">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{questionnaire.user.username}</h1>
                  <p className="text-white/90">Patient Health Review</p>
                  <p className="text-white/80 text-sm mt-1">
                    Submitted: {new Date(questionnaire.submitted_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start lg:items-end gap-3">
                <StatusBadge status={questionnaire.status} />
                {questionnaire.reviewed_at && (
                  <p className="text-white/80 text-sm">
                    Last reviewed: {new Date(questionnaire.reviewed_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Admin Feedback Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-[#F5F9F5]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Doctor's Review & Feedback</h2>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Edit3 className="h-4 w-4" />
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {isEditing ? (
              <div className="space-y-4">
                {/* Status Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C7B4C] focus:border-transparent"
                  >
                    <option value="pending">Pending Review</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="needs_info">Needs More Information</option>
                  </select>
                </div>

                {/* Feedback Text Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical Feedback & Recommendations
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter your detailed medical review, recommendations, and suggestions for the patient..."
                    rows={12}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C7B4C] focus:border-transparent resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Provide comprehensive feedback including health recommendations, lifestyle suggestions, and any follow-up actions needed.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSaveFeedback}
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#4C7B4C] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#5a8a5a] transition-colors duration-300 shadow-lg disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5" />
                        Save Feedback
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Current Status:</h3>
                  <StatusBadge status={questionnaire.status} />
                </div>
                
                {questionnaire.admin_feedback ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-900 mb-3">Doctor's Feedback:</h4>
                    <div className="text-blue-800 whitespace-pre-line leading-relaxed">
                      {questionnaire.admin_feedback}
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                    <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                    <p className="text-yellow-800 font-medium">No feedback provided yet</p>
                    <p className="text-yellow-700 text-sm mt-1">Click "Edit" to add your medical review and recommendations</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Patient Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Personal Information */}
          <InfoSection
            title="Personal Information"
            icon={<User className="h-5 w-5 text-white" />}
            gradient="from-purple-500 to-purple-600"
          >
            <div className="space-y-1">
              <InfoField label="Age" value={questionnaire.personal_info.age} />
              <InfoField label="Gender" value={questionnaire.personal_info.gender} />
              <InfoField label="Contact" value={questionnaire.personal_info.contact} />
            </div>
          </InfoSection>

          {/* Lifestyle */}
          <InfoSection
            title="Lifestyle Factors"
            icon={<Activity className="h-5 w-5 text-white" />}
            gradient="from-green-500 to-green-600"
          >
            <div className="space-y-1">
              <InfoField label="Smoking Status" value={questionnaire.lifestyle.smoking_status} />
              <InfoField label="Alcohol Consumption" value={questionnaire.lifestyle.alcohol_consumption} />
              <InfoField label="Physical Activity" value={questionnaire.lifestyle.physical_activity} />
              <InfoField label="Diet" value={questionnaire.lifestyle.diet} />
            </div>
          </InfoSection>

          {/* Medical History */}
          <InfoSection
            title="Medical History"
            icon={<Heart className="h-5 w-5 text-white" />}
            gradient="from-red-500 to-red-600"
          >
            <div className="space-y-1">
              <InfoField label="Diabetes" value={questionnaire.medical_history.diabetes} />
              <InfoField label="Hypertension" value={questionnaire.medical_history.hypertension} />
              <InfoField label="Heart Disease" value={questionnaire.medical_history.heart_disease} />
              <InfoField label="Other Conditions" value={questionnaire.medical_history.other_conditions} />
              <InfoField label="Current Medications" value={questionnaire.medical_history.medications} />
              <InfoField label="Allergies" value={questionnaire.medical_history.allergies} />
            </div>
          </InfoSection>

          {/* Family History */}
          <InfoSection
            title="Family History"
            icon={<Users className="h-5 w-5 text-white" />}
            gradient="from-indigo-500 to-indigo-600"
          >
            <div className="space-y-1">
              <InfoField label="Family Diabetes" value={questionnaire.family_history.diabetes} />
              <InfoField label="Family Heart Disease" value={questionnaire.family_history.heart_disease} />
              <InfoField label="Family Cancer" value={questionnaire.family_history.cancer} />
              <InfoField label="Other Family Conditions" value={questionnaire.family_history.other} />
            </div>
          </InfoSection>

        </div>

        {/* Measurements & Symptoms Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Measurements */}
          <InfoSection
            title="Measurements & Vitals"
            icon={<Scale className="h-5 w-5 text-white" />}
            gradient="from-teal-500 to-teal-600"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">Physical</h5>
                <div className="space-y-1">
                  <InfoField label="Height (cm)" value={questionnaire.measurements.height_cm} />
                  <InfoField label="Weight (kg)" value={questionnaire.measurements.weight_kg} />
                  <InfoField label="BMI" value={questionnaire.measurements.bmi} />
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">Vitals</h5>
                <div className="space-y-1">
                  <InfoField label="Blood Pressure" value={questionnaire.measurements.blood_pressure} />
                  <InfoField label="Blood Sugar" value={questionnaire.measurements.blood_sugar} />
                  <InfoField label="Cholesterol" value={questionnaire.measurements.cholesterol} />
                </div>
              </div>
            </div>
          </InfoSection>

          {/* Symptoms & Well-being */}
          <InfoSection
            title="Symptoms & Well-being"
            icon={<AlertTriangle className="h-5 w-5 text-white" />}
            gradient="from-orange-500 to-orange-600"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">Symptoms</h5>
                <div className="space-y-1">
                  <InfoField label="Chest Pain" value={questionnaire.symptoms.chest_pain} />
                  <InfoField label="Breathlessness" value={questionnaire.symptoms.breathlessness} />
                  <InfoField label="Fatigue" value={questionnaire.symptoms.fatigue} />
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">Well-being</h5>
                <div className="space-y-1">
                  <InfoField label="Sleep Quality" value={questionnaire.symptoms.sleep_quality} />
                  <InfoField label="Stress Level" value={questionnaire.symptoms.stress_level} />
                </div>
              </div>
            </div>
          </InfoSection>

        </div>

        {/* Preventive Care */}
        <InfoSection
          title="Preventive Care"
          icon={<Calendar className="h-5 w-5 text-white" />}
          gradient="from-cyan-500 to-cyan-600"
        >
          <div className="space-y-1">
            <InfoField label="Last Check-up" value={questionnaire.preventive_care.last_checkup} />
            <InfoField label="Recent Vaccinations" value={questionnaire.preventive_care.vaccinations} />
          </div>
        </InfoSection>

        {/* Automated Recommendations */}
        {(questionnaire.recommendations.length > 0 || questionnaire.suggestions.length > 0) && (
          <InfoSection
            title="Automated System Recommendations"
            icon={<Stethoscope className="h-5 w-5 text-white" />}
            gradient="from-emerald-500 to-emerald-600"
          >
            <div className="space-y-4">
              {questionnaire.recommendations.length > 0 && (
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-3">Recommended Health Screenings:</h4>
                  <div className="space-y-2">
                    {questionnaire.recommendations.map((rec, index) => (
                      <div key={index} className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                        <h5 className="font-semibold text-emerald-900">{rec.test_name}</h5>
                        <p className="text-emerald-700 text-sm mt-1">{rec.reason}</p>
                        <span className="inline-block bg-emerald-200 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium mt-2">
                          {rec.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {questionnaire.suggestions.length > 0 && (
                <div className="pt-3 border-t border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-3">Automated Lifestyle Suggestions:</h4>
                  <div className="space-y-2">
                    {questionnaire.suggestions.map((sug, index) => (
                      <div key={index} className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                        <h5 className="font-semibold text-emerald-900">{sug.category}</h5>
                        <p className="text-emerald-700 text-sm mt-1">{sug.suggestion_text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </InfoSection>
        )}

        {/* Quick Actions Footer */}
        <div className="bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Review Actions</h3>
              <p className="text-white/90">
                Provide comprehensive medical feedback to help guide the patient's health journey
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-white text-[#4C7B4C] px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg"
              >
                <Edit3 className="h-5 w-5" />
                {questionnaire.admin_feedback ? 'Edit Feedback' : 'Add Feedback'}
              </button>
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#4C7B4C] transition-all duration-300"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};