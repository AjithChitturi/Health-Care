import React, { useState } from 'react';
import { api } from '../api';
import { PersonalInfoForm } from './questionnaire/PersonalInfoForm';
import { LifestyleForm } from './questionnaire/LifestyleForm';
import { MedicalHistoryForm } from './questionnaire/MedicalHistoryForm';
import { FamilyHistoryForm } from './questionnaire/FamilyHistoryForm';
import { MeasurementsForm } from './questionnaire/MeasurementsForm';
import { SymptomsForm } from './questionnaire/SymptomsForm';
import { PreventiveCareForm } from './questionnaire/PreventiveCareForm';

const steps = [
  'personal',
  'lifestyle',
  'medical',
  'family',
  'measurements',
  'symptoms',
  'preventive',
];


type QuestionnaireForm = {
  age?: number;
  gender?: string;
  contact?: string;
  smoking_status?: string;
  alcohol_consumption?: string;
  physical_activity?: string;
  diet?: string;
  diabetes?: boolean;
  hypertension?: boolean;
  heart_disease?: boolean;
  other_conditions?: string;
  medications?: string;
  allergies?: string;
  cancer?: boolean;
  other?: string;
  height_cm?: number;
  weight_kg?: number;
  bmi?: number;
  blood_pressure?: string;
  blood_sugar?: string;
  cholesterol?: string;
  chest_pain?: boolean;
  breathlessness?: boolean;
  fatigue?: boolean;
  sleep_quality?: string;
  stress_level?: string;
  last_checkup?: string;
  vaccinations?: string;
};

export const Questionnaire: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [form, setForm] = useState<QuestionnaireForm>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    let newValue: string | number | boolean = value;
    if (type === 'checkbox') {
      newValue = (target as HTMLInputElement).checked;
    } else if (type === 'number') {
      newValue = value === '' ? '' : Number(value);
    }
    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await api.savePersonalInfo(form);
      await api.saveLifestyle(form);
      await api.saveMedicalHistory(form);
      await api.saveFamilyHistory(form);
      await api.saveMeasurements(form);
      await api.saveSymptoms(form);
      await api.savePreventiveCare(form);
      await api.submitQuestionnaire(form);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) return <div>Thank you! Your health questionnaire has been submitted.</div>;

  switch (steps[step]) {
    case 'personal':
      return <PersonalInfoForm data={form} onChange={handleChange} onNext={next} />;
    case 'lifestyle':
      return <LifestyleForm data={form} onChange={handleChange} onNext={next} onBack={back} />;
    case 'medical':
      return <MedicalHistoryForm data={form} onChange={handleChange} onNext={next} onBack={back} />;
    case 'family':
      return <FamilyHistoryForm data={form} onChange={handleChange} onNext={next} onBack={back} />;
    case 'measurements':
      return <MeasurementsForm data={form} onChange={handleChange} onNext={next} onBack={back} />;
    case 'symptoms':
      return <SymptomsForm data={form} onChange={handleChange} onNext={next} onBack={back} />;
    case 'preventive':
      return (
        <div>
          <PreventiveCareForm data={form} onChange={handleChange} onNext={handleSubmit} onBack={back} />
          {loading && <div>Submitting...</div>}
          {error && <div style={{color:'red'}}>{error}</div>}
        </div>
      );
    default:
      return <div>Done</div>;
  }
}
