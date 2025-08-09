import React, { useEffect, useState } from 'react';
import { api } from '../api'; // Assuming your api object is correctly configured

// --- Style Objects ---
const styles = {
  dashboardContainer: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  card: {
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '20px',
    marginBottom: '20px',
  },
  header: {
    borderBottom: '2px solid #eee',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  section: {
    marginBottom: '25px',
  },
  sectionTitle: {
    color: '#0056b3',
    borderBottom: '1px solid #ddd',
    paddingBottom: '5px',
    marginBottom: '15px',
  },
  field: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  fieldLabel: {
    fontWeight: 'bold',
    color: '#555',
  },
  feedbackBox: {
    whiteSpace: 'pre-line' as const,
    border: '1px solid #ccc',
    padding: '12px',
    marginTop: '8px',
    borderRadius: '4px',
    background: '#f9f9f9',
  },
  error: {
    color: 'red',
  },
};


// --- Type Definitions for the Questionnaire ---
interface PersonalInfo {
  age?: number;
  gender?: string;
  contact?: string;
}

interface Lifestyle {
  smoking_status?: string;
  alcohol_consumption?: string;
  physical_activity?: string;
  diet?: string;
}

interface MedicalHistory {
  diabetes?: boolean;
  hypertension?: boolean;
  heart_disease?: boolean;
  other_conditions?: string;
  medications?: string;
  allergies?: string;
}

interface FamilyHistory {
  diabetes?: boolean;
  heart_disease?: boolean;
  cancer?: boolean;
  other?: string;
}

interface Measurements {
  height_cm?: number;
  weight_kg?: number;
  bmi?: number;
  blood_pressure?: string;
  blood_sugar?: string;
  cholesterol?: string;
}

interface Symptoms {
  chest_pain?: boolean;
  breathlessness?: boolean;
  fatigue?: boolean;
  sleep_quality?: string;
  stress_level?: string;
}

interface PreventiveCare {
  last_checkup?: string;
  vaccinations?: string;
}

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
}

// --- Helper Component to display each field ---
const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => {
  if (value === null || value === undefined || value === '') {
    return null; // Don't render empty fields
  }
  
  let displayValue = value;
  if (typeof value === 'boolean') {
    displayValue = value ? 'Yes' : 'No';
  } else if (label === 'Last Check-up' && value) {
     displayValue = new Date(value).toLocaleDateString();
  }
  
  return (
    <div style={styles.field}>
      <span style={styles.fieldLabel}>{label}</span>
      <span>{displayValue}</span>
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
        // Your API returns an array, we get the first (and only) item for the user
        const res = await api.getQuestionnaire(); 
        setQuestionnaire(res.data[0] || null);
      } catch (err) {
        setError('Failed to load your questionnaire. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div style={styles.dashboardContainer}>Loading...</div>;
  if (error) return <div style={{ ...styles.dashboardContainer, ...styles.error }}>{error}</div>;
  if (!questionnaire) {
    return <div style={styles.dashboardContainer}>No questionnaire has been submitted yet.</div>;
  }

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.header}>
        <h2>Your Health Questionnaire</h2>
      </div>

      <div style={styles.card}>
        <h3>Submission Status</h3>
        <InfoField label="Status" value={questionnaire.status.charAt(0).toUpperCase() + questionnaire.status.slice(1)} />
        <InfoField label="Submitted At" value={new Date(questionnaire.submitted_at).toLocaleString()} />
        {questionnaire.admin_feedback && (
          <div>
            <p style={styles.fieldLabel}>Doctor's Feedback:</p>
            <div style={styles.feedbackBox}>
              {questionnaire.admin_feedback}
            </div>
          </div>
        )}
      </div>

      <div style={{ ...styles.card, ...styles.section }}>
        <h3 style={styles.sectionTitle}>Personal Information</h3>
        <InfoField label="Age" value={questionnaire.personal_info.age} />
        <InfoField label="Gender" value={questionnaire.personal_info.gender} />
        <InfoField label="Contact" value={questionnaire.personal_info.contact} />
      </div>

      <div style={{ ...styles.card, ...styles.section }}>
        <h3 style={styles.sectionTitle}>Measurements</h3>
        <InfoField label="Height (cm)" value={questionnaire.measurements.height_cm} />
        <InfoField label="Weight (kg)" value={questionnaire.measurements.weight_kg} />
        <InfoField label="BMI" value={questionnaire.measurements.bmi} />
        <InfoField label="Blood Pressure" value={questionnaire.measurements.blood_pressure} />
        <InfoField label="Blood Sugar" value={questionnaire.measurements.blood_sugar} />
        <InfoField label="Cholesterol" value={questionnaire.measurements.cholesterol} />
      </div>

      <div style={{ ...styles.card, ...styles.section }}>
        <h3 style={styles.sectionTitle}>Lifestyle</h3>
        <InfoField label="Smoking Status" value={questionnaire.lifestyle.smoking_status} />
        <InfoField label="Alcohol Consumption" value={questionnaire.lifestyle.alcohol_consumption} />
        <InfoField label="Physical Activity" value={questionnaire.lifestyle.physical_activity} />
        <InfoField label="Diet" value={questionnaire.lifestyle.diet} />
      </div>

      <div style={{ ...styles.card, ...styles.section }}>
        <h3 style={styles.sectionTitle}>Symptoms</h3>
        <InfoField label="Chest Pain" value={questionnaire.symptoms.chest_pain} />
        <InfoField label="Breathlessness" value={questionnaire.symptoms.breathlessness} />
        <InfoField label="Fatigue" value={questionnaire.symptoms.fatigue} />
        <InfoField label="Sleep Quality" value={questionnaire.symptoms.sleep_quality} />
        <InfoField label="Stress Level" value={questionnaire.symptoms.stress_level} />
      </div>

      <div style={{ ...styles.card, ...styles.section }}>
        <h3 style={styles.sectionTitle}>Medical History</h3>
        <InfoField label="Diabetes" value={questionnaire.medical_history.diabetes} />
        <InfoField label="Hypertension" value={questionnaire.medical_history.hypertension} />
        <InfoField label="Heart Disease" value={questionnaire.medical_history.heart_disease} />
        <InfoField label="Other Conditions" value={questionnaire.medical_history.other_conditions} />
        <InfoField label="Medications" value={questionnaire.medical_history.medications} />
        <InfoField label="Allergies" value={questionnaire.medical_history.allergies} />
      </div>

      <div style={{ ...styles.card, ...styles.section }}>
        <h3 style={styles.sectionTitle}>Family History</h3>
        <InfoField label="Diabetes in Family" value={questionnaire.family_history.diabetes} />
        <InfoField label="Heart Disease in Family" value={questionnaire.family_history.heart_disease} />
        <InfoField label="Cancer in Family" value={questionnaire.family_history.cancer} />
        <InfoField label="Other Family History" value={questionnaire.family_history.other} />
      </div>

      <div style={{ ...styles.card, ...styles.section }}>
        <h3 style={styles.sectionTitle}>Preventive Care</h3>
        <InfoField label="Last Check-up" value={questionnaire.preventive_care.last_checkup} />
        <InfoField label="Vaccinations" value={questionnaire.preventive_care.vaccinations} />
      </div>
    </div>
  );
};