import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { 
  User, 
  Heart, 
  Activity, 
  Stethoscope, 
  Users, 
  Scale, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText
} from 'lucide-react';

// The form data structure remains the same
type QuestionnaireForm = {
  age?: number;
  gender?: string;
  contact?: string;
  smoking_status?: string;
  alcohol_consumption?: string;
  physical_activity?: string;
  diet?: string;
  // Medical History
  diabetes_medical?: boolean;
  hypertension?: boolean;
  heart_disease_medical?: boolean;
  other_conditions?: string;
  medications?: string;
  allergies?: string;
  // Family History - names are distinguished to avoid state collision
  diabetes_family?: boolean;
  heart_disease_family?: boolean;
  cancer_family?: boolean;
  other_family?: string;
  // Measurements
  height_cm?: number;
  weight_kg?: number;
  bmi?: number;
  blood_pressure?: string;
  blood_sugar?: string;
  cholesterol?: string;
  // Symptoms
  chest_pain?: boolean;
  breathlessness?: boolean;
  fatigue?: boolean;
  sleep_quality?: string;
  stress_level?: string;
  // Preventive Care
  last_checkup?: string;
  vaccinations?: string;
};

const SectionCard: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  children: React.ReactNode;
  iconBg?: string;
}> = ({ icon, title, children, iconBg = "from-[#4C7B4C] to-[#5a8a5a]" }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
    <div className="p-6 border-b border-gray-100 bg-[#F5F9F5]">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${iconBg} shadow-lg`}>
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
    </div>
    <div className="p-8">
      {children}
    </div>
  </div>
);

const InputField: React.FC<{
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options?: { value: string; label: string }[];
  className?: string;
  required?: boolean;
}> = ({ 
  label, 
  id, 
  name, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  options, 
  className = "",
  required = false 
}) => (
  <div className={`space-y-2 ${className}`}>
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {options ? (
      <select
        id={id}
        name={name}
        value={value || ''}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4C7B4C] focus:border-transparent transition-all duration-300 bg-white hover:border-gray-400"
      >
        <option value="">Select...</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4C7B4C] focus:border-transparent transition-all duration-300 hover:border-gray-400"
      />
    )}
  </div>
);

const CheckboxField: React.FC<{
  label: string;
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, id, name, checked, onChange }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F5F9F5] transition-colors duration-200">
    <input
      id={id}
      name={name}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-5 w-5 text-[#4C7B4C] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#4C7B4C] focus:ring-offset-2 transition-colors duration-200"
    />
    <label htmlFor={id} className="text-sm font-medium text-gray-700 cursor-pointer">
      {label}
    </label>
  </div>
);

export const Questionnaire: React.FC = () => {
  const [form, setForm] = useState<QuestionnaireForm>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login first');
      return;
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    let newValue: string | number | boolean = value;

    if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      newValue = value === '' ? '' : Number(value);
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.submitCompleteQuestionnaire(form);
      setSuccess(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.response?.data?.message || err.message || 'An unexpected error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F5F9F5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-100">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-green-600 mb-2">Thank You!</h2>
            <p className="text-gray-600 leading-relaxed">
              Your health questionnaire has been submitted successfully. Our medical team will review your information and provide personalized recommendations.
            </p>
          </div>
          <div className="bg-[#F5F9F5] rounded-xl p-4">
            <p className="text-sm text-gray-600">
              You'll receive your detailed health report within 24-48 hours. Check your dashboard for updates.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F9F5] py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-[#4C7B4C] to-[#5a8a5a] rounded-2xl shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Questionnaire</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Help us understand your health profile to provide personalized recommendations and insights.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <SectionCard 
            icon={<User className="h-6 w-6 text-white" />}
            title="Personal Information"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Age"
                id="age"
                name="age"
                type="number"
                placeholder="Enter your age"
                value={form.age}
                onChange={handleChange}
                required
              />
              <InputField
                label="Gender"
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" }
                ]}
                required
              />
              <InputField
                label="Contact (Phone or Email)"
                id="contact"
                name="contact"
                type="text"
                placeholder="Your preferred contact method"
                value={form.contact}
                onChange={handleChange}
                className="md:col-span-2"
              />
            </div>
          </SectionCard>

          {/* Lifestyle Section */}
          <SectionCard 
            icon={<Activity className="h-6 w-6 text-white" />}
            title="Lifestyle"
            iconBg="from-blue-500 to-blue-600"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Smoking Status"
                id="smoking_status"
                name="smoking_status"
                value={form.smoking_status}
                onChange={handleChange}
                options={[
                  { value: "never", label: "Never Smoked" },
                  { value: "former", label: "Former Smoker" },
                  { value: "current", label: "Current Smoker" }
                ]}
              />
              <InputField
                label="Alcohol Consumption"
                id="alcohol_consumption"
                name="alcohol_consumption"
                placeholder="e.g., 2 drinks per week"
                value={form.alcohol_consumption}
                onChange={handleChange}
              />
              <InputField
                label="Physical Activity"
                id="physical_activity"
                name="physical_activity"
                placeholder="e.g., 3 times a week for 30 minutes"
                value={form.physical_activity}
                onChange={handleChange}
                className="md:col-span-2"
              />
              <InputField
                label="General Diet Description"
                id="diet"
                name="diet"
                placeholder="e.g., Balanced, Vegetarian, Low-carb"
                value={form.diet}
                onChange={handleChange}
                className="md:col-span-2"
              />
            </div>
          </SectionCard>

          {/* Medical & Family History Section */}
          <SectionCard 
            icon={<Heart className="h-6 w-6 text-white" />}
            title="Medical & Family History"
            iconBg="from-red-500 to-red-600"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Medical History */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-red-500" />
                  Your Medical Conditions
                </h3>
                <div className="space-y-2">
                  <CheckboxField
                    label="Diabetes"
                    id="diabetes_medical"
                    name="diabetes_medical"
                    checked={!!form.diabetes_medical}
                    onChange={handleChange}
                  />
                  <CheckboxField
                    label="Hypertension (High Blood Pressure)"
                    id="hypertension"
                    name="hypertension"
                    checked={!!form.hypertension}
                    onChange={handleChange}
                  />
                  <CheckboxField
                    label="Heart Disease"
                    id="heart_disease_medical"
                    name="heart_disease_medical"
                    checked={!!form.heart_disease_medical}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Family Medical History */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-red-500" />
                  Family History (Parents, Siblings)
                </h3>
                <div className="space-y-2">
                  <CheckboxField
                    label="Diabetes"
                    id="diabetes_family"
                    name="diabetes_family"
                    checked={!!form.diabetes_family}
                    onChange={handleChange}
                  />
                  <CheckboxField
                    label="Heart Disease"
                    id="heart_disease_family"
                    name="heart_disease_family"
                    checked={!!form.heart_disease_family}
                    onChange={handleChange}
                  />
                  <CheckboxField
                    label="Cancer"
                    id="cancer_family"
                    name="cancer_family"
                    checked={!!form.cancer_family}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200">
              <InputField
                label="Other Personal Conditions"
                id="other_conditions"
                name="other_conditions"
                placeholder="List any other medical conditions"
                value={form.other_conditions}
                onChange={handleChange}
              />
              <InputField
                label="Other Family Conditions"
                id="other_family"
                name="other_family"
                placeholder="List any other family medical history"
                value={form.other_family}
                onChange={handleChange}
              />
              <InputField
                label="Current Medications"
                id="medications"
                name="medications"
                placeholder="List current medications (comma-separated)"
                value={form.medications}
                onChange={handleChange}
              />
              <InputField
                label="Known Allergies"
                id="allergies"
                name="allergies"
                placeholder="List known allergies (comma-separated)"
                value={form.allergies}
                onChange={handleChange}
              />
            </div>
          </SectionCard>

          {/* Symptoms Section */}
          <SectionCard 
            icon={<AlertCircle className="h-6 w-6 text-white" />}
            title="Symptoms & Well-being"
            iconBg="from-orange-500 to-orange-600"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Current Symptoms
                </h3>
                <div className="space-y-2">
                  <CheckboxField
                    label="Chest Pain"
                    id="chest_pain"
                    name="chest_pain"
                    checked={!!form.chest_pain}
                    onChange={handleChange}
                  />
                  <CheckboxField
                    label="Breathlessness"
                    id="breathlessness"
                    name="breathlessness"
                    checked={!!form.breathlessness}
                    onChange={handleChange}
                  />
                  <CheckboxField
                    label="Unusual Fatigue"
                    id="fatigue"
                    name="fatigue"
                    checked={!!form.fatigue}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  General Well-being
                </h3>
                <InputField
                  label="Sleep Quality"
                  id="sleep_quality"
                  name="sleep_quality"
                  placeholder="e.g., Good, Poor, 6 hours/night"
                  value={form.sleep_quality}
                  onChange={handleChange}
                />
                <InputField
                  label="Stress Level"
                  id="stress_level"
                  name="stress_level"
                  placeholder="e.g., Low, Moderate, High"
                  value={form.stress_level}
                  onChange={handleChange}
                />
              </div>
            </div>
          </SectionCard>

          {/* Measurements & Preventive Care Section */}
          <SectionCard 
            icon={<Scale className="h-6 w-6 text-white" />}
            title="Measurements & Preventive Care"
            iconBg="from-purple-500 to-purple-600"
          >
            <div className="space-y-8">
              {/* Measurements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-purple-500" />
                  Physical Measurements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputField
                    label="Height (cm)"
                    id="height_cm"
                    name="height_cm"
                    type="number"
                    placeholder="e.g., 170"
                    value={form.height_cm}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Weight (kg)"
                    id="weight_kg"
                    name="weight_kg"
                    type="number"
                    placeholder="e.g., 70"
                    value={form.weight_kg}
                    onChange={handleChange}
                  />
                  <InputField
                    label="BMI (if known)"
                    id="bmi"
                    name="bmi"
                    type="number"
                    placeholder="e.g., 24.2"
                    value={form.bmi}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Vital Signs */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-purple-500" />
                  Recent Vital Signs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputField
                    label="Last Blood Pressure"
                    id="blood_pressure"
                    name="blood_pressure"
                    placeholder="e.g., 120/80"
                    value={form.blood_pressure}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Last Blood Sugar"
                    id="blood_sugar"
                    name="blood_sugar"
                    placeholder="e.g., 5.5 mmol/L or 100 mg/dL"
                    value={form.blood_sugar}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Last Cholesterol"
                    id="cholesterol"
                    name="cholesterol"
                    placeholder="e.g., 5.0 mmol/L or 190 mg/dL"
                    value={form.cholesterol}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Preventive Care */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  Preventive Care History
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Date of Last Check-up"
                    id="last_checkup"
                    name="last_checkup"
                    type="date"
                    value={form.last_checkup}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Recent Vaccinations"
                    id="vaccinations"
                    name="vaccinations"
                    placeholder="e.g., Flu (2023), COVID-19 (2023)"
                    value={form.vaccinations}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-800">Submission Error</h3>
                  <p className="text-sm text-red-600 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="text-center space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Submit?</h3>
                <p className="text-gray-600">
                  Review your information and submit your questionnaire to receive personalized health recommendations.
                </p>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#4C7B4C] to-[#5a8a5a] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4C7B4C] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Submitting Your Information...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Submit Health Questionnaire</span>
                  </>
                )}
              </button>
              
              <p className="text-sm text-gray-500">
                🔒 Your information is encrypted and secure
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

