import React, { useState } from 'react';
import { api } from '../api'; // Your API utility

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

export const Questionnaire: React.FC = () => {
  const [form, setForm] = useState<QuestionnaireForm>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;
  
  let newValue: string | number | boolean = value;

  if (type === 'checkbox') {
    newValue = (e.target as HTMLInputElement).checked;
  } else if (type === 'number') {
    newValue = value === '' ? '' : Number(value); // Change undefined to ''
  }

  setForm((prev) => ({
    ...prev,
    [name]: newValue,
  }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError(null);

    // Map the local state to the expected API structure before submission
    const submissionData = {
        ...form,
        diabetes: form.diabetes_medical,
        heart_disease: form.heart_disease_medical,
        cancer: form.cancer_family,
        other: form.other_family
    };

    try {
      // The API calls remain the same
      await api.savePersonalInfo(submissionData);
      await api.saveLifestyle(submissionData);
      await api.saveMedicalHistory(submissionData);
      await api.saveFamilyHistory(submissionData);
      await api.saveMeasurements(submissionData);
      await api.saveSymptoms(submissionData);
      await api.savePreventiveCare(submissionData);
      await api.submitQuestionnaire(submissionData);
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-10 bg-white rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h2>
          <p className="text-gray-700">Your health questionnaire has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Health Questionnaire</h1>
        <p className="text-gray-600 mb-8">Please fill out the form below with the most accurate information.</p>
        
        <form onSubmit={handleSubmit}>
          {/* --- Personal Information Section --- */}
          <section className="mb-10 p-6 border border-gray-200 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input type="number" id="age" name="age" value={form.age || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select id="gender" name="gender" value={form.gender || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact (Phone or Email)</label>
                <input type="text" id="contact" name="contact" value={form.contact || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
            </div>
          </section>

          {/* --- Lifestyle Section --- */}
          <section className="mb-10 p-6 border border-gray-200 rounded-lg">
             <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Lifestyle</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="smoking_status" className="block text-sm font-medium text-gray-700 mb-1">Smoking Status</label>
                    <select id="smoking_status" name="smoking_status" value={form.smoking_status || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">Select...</option>
                        <option value="never">Never Smoked</option>
                        <option value="former">Former Smoker</option>
                        <option value="current">Current Smoker</option>
                    </select>
                 </div>
                 <div>
                    <label htmlFor="alcohol_consumption" className="block text-sm font-medium text-gray-700 mb-1">Alcohol Consumption</label>
                    <input type="text" id="alcohol_consumption" name="alcohol_consumption" placeholder="e.g., 2 drinks per week" value={form.alcohol_consumption || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="physical_activity" className="block text-sm font-medium text-gray-700 mb-1">Physical Activity</label>
                    <input type="text" id="physical_activity" name="physical_activity" placeholder="e.g., 3 times a week for 30 minutes" value={form.physical_activity || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
                 <div className="md:col-span-2">
                    <label htmlFor="diet" className="block text-sm font-medium text-gray-700 mb-1">General Diet Description</label>
                    <input type="text" id="diet" name="diet" placeholder="e.g., Balanced, Vegetarian, Low-carb" value={form.diet || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
            </div>
          </section>

          {/* --- Medical & Family History --- */}
            <section className="mb-10 p-6 border border-gray-200 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Medical History</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                    {/* Personal Medical History */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Your Conditions</h3>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input id="diabetes_medical" name="diabetes_medical" type="checkbox" checked={!!form.diabetes_medical} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                                <label htmlFor="diabetes_medical" className="ml-3 block text-sm font-medium text-gray-700">Diabetes</label>
                            </div>
                            <div className="flex items-center">
                                <input id="hypertension" name="hypertension" type="checkbox" checked={!!form.hypertension} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                                <label htmlFor="hypertension" className="ml-3 block text-sm font-medium text-gray-700">Hypertension (High Blood Pressure)</label>
                            </div>
                            <div className="flex items-center">
                                <input id="heart_disease_medical" name="heart_disease_medical" type="checkbox" checked={!!form.heart_disease_medical} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                                <label htmlFor="heart_disease_medical" className="ml-3 block text-sm font-medium text-gray-700">Heart Disease</label>
                            </div>
                        </div>
                    </div>
                    {/* Family Medical History */}
                     <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Family History (Parents, Siblings)</h3>
                        <div className="space-y-4">
                           <div className="flex items-center">
                                <input id="diabetes_family" name="diabetes_family" type="checkbox" checked={!!form.diabetes_family} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                                <label htmlFor="diabetes_family" className="ml-3 block text-sm font-medium text-gray-700">Diabetes</label>
                            </div>
                           <div className="flex items-center">
                                <input id="heart_disease_family" name="heart_disease_family" type="checkbox" checked={!!form.heart_disease_family} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                                <label htmlFor="heart_disease_family" className="ml-3 block text-sm font-medium text-gray-700">Heart Disease</label>
                            </div>
                           <div className="flex items-center">
                                <input id="cancer_family" name="cancer_family" type="checkbox" checked={!!form.cancer_family} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                                <label htmlFor="cancer_family" className="ml-3 block text-sm font-medium text-gray-700">Cancer</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Details */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label htmlFor="other_conditions" className="block text-sm font-medium text-gray-700 mb-1">Other Personal Conditions</label>
                      <input type="text" id="other_conditions" name="other_conditions" value={form.other_conditions || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                     <div>
                      <label htmlFor="other_family" className="block text-sm font-medium text-gray-700 mb-1">Other Family Conditions</label>
                      <input type="text" id="other_family" name="other_family" value={form.other_family || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div>
                      <label htmlFor="medications" className="block text-sm font-medium text-gray-700 mb-1">Current Medications (comma-separated)</label>
                      <input type="text" id="medications" name="medications" value={form.medications || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div>
                      <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">Known Allergies (comma-separated)</label>
                      <input type="text" id="allergies" name="allergies" value={form.allergies || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                 </div>
            </section>


          {/* --- Symptoms Section --- */}
            <section className="mb-10 p-6 border border-gray-200 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Symptoms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Check if you experience any of these:</h3>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input id="chest_pain" name="chest_pain" type="checkbox" checked={!!form.chest_pain} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                                <label htmlFor="chest_pain" className="ml-3 block text-sm font-medium text-gray-700">Chest Pain</label>
                            </div>
                            <div className="flex items-center">
                                <input id="breathlessness" name="breathlessness" type="checkbox" checked={!!form.breathlessness} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                                <label htmlFor="breathlessness" className="ml-3 block text-sm font-medium text-gray-700">Breathlessness</label>
                            </div>
                            <div className="flex items-center">
                                <input id="fatigue" name="fatigue" type="checkbox" checked={!!form.fatigue} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                                <label htmlFor="fatigue" className="ml-3 block text-sm font-medium text-gray-700">Unusual Fatigue</label>
                            </div>
                        </div>
                    </div>
                     <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">General Wellbeing</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="sleep_quality" className="block text-sm font-medium text-gray-700 mb-1">Sleep Quality</label>
                                <input type="text" id="sleep_quality" placeholder="e.g., Good, Poor, 6 hours/night" name="sleep_quality" value={form.sleep_quality || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                             <div>
                                <label htmlFor="stress_level" className="block text-sm font-medium text-gray-700 mb-1">Stress Level</label>
                                <input type="text" id="stress_level" name="stress_level" placeholder="e.g., Low, Moderate, High" value={form.stress_level || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


          {/* --- Measurements & Preventive Care Section --- */}
            <section className="mb-10 p-6 border border-gray-200 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Measurements & Preventive Care</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div>
                        <label htmlFor="height_cm" className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                        <input type="number" id="height_cm" name="height_cm" value={form.height_cm || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div>
                        <label htmlFor="weight_kg" className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                        <input type="number" id="weight_kg" name="weight_kg" value={form.weight_kg || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                     <div>
                        <label htmlFor="bmi" className="block text-sm font-medium text-gray-700 mb-1">BMI (if known)</label>
                        <input type="number" id="bmi" name="bmi" value={form.bmi || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div>
                        <label htmlFor="blood_pressure" className="block text-sm font-medium text-gray-700 mb-1">Last Blood Pressure</label>
                        <input type="text" id="blood_pressure" name="blood_pressure" placeholder="e.g., 120/80" value={form.blood_pressure || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                     <div>
                        <label htmlFor="blood_sugar" className="block text-sm font-medium text-gray-700 mb-1">Last Blood Sugar</label>
                        <input type="text" id="blood_sugar" name="blood_sugar" placeholder="e.g., 5.5 mmol/L or 100 mg/dL" value={form.blood_sugar || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                     <div>
                        <label htmlFor="cholesterol" className="block text-sm font-medium text-gray-700 mb-1">Last Cholesterol</label>
                        <input type="text" id="cholesterol" name="cholesterol" placeholder="e.g., 5.0 mmol/L or 190 mg/dL" value={form.cholesterol || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                     <div className="md:col-span-1">
                         <label htmlFor="last_checkup" className="block text-sm font-medium text-gray-700 mb-1">Date of Last Check-up</label>
                        <input type="date" id="last_checkup" name="last_checkup" value={form.last_checkup || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                     <div className="md:col-span-2">
                        <label htmlFor="vaccinations" className="block text-sm font-medium text-gray-700 mb-1">Recent Vaccinations (e.g., Flu, COVID-19)</label>
                        <input type="text" id="vaccinations" name="vaccinations" value={form.vaccinations || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                </div>
            </section>

          {/* --- Submission Area --- */}
          <div className="mt-8 text-right">
            {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Questionnaire'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};