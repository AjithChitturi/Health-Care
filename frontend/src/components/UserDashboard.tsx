// src/components/UserDashboard.tsx

import React, { useEffect, useState } from 'react';
import { api } from '../api'; // Assuming your api object is correctly configured

// --- Style Objects (for inline styling) ---
const styles = {
  dashboardContainer: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    maxWidth: '900px',
    margin: '2rem auto',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #eee',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  card: {
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '20px',
    marginBottom: '20px',
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
  recommendationCard: {
    background: '#fffbe6',
    borderLeft: '5px solid #ffc107',
  },
  feedbackCard: {
      background: '#e6f7ff',
      borderLeft: '5px solid #0056b3',
  },
  error: {
    color: 'red',
    textAlign: 'center' as const,
  },
  downloadButton: {
      textDecoration: 'none',
      background: '#0056b3',
      color: 'white',
      padding: '10px 15px',
      borderRadius: '5px',
      display: 'inline-block',
  }
};


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
            // CHANGE THIS LINE:
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

  if (loading) return <div style={styles.dashboardContainer}>Loading your report...</div>;
  if (error) return <div style={{ ...styles.dashboardContainer, ...styles.error }}>{error}</div>;
  if (!questionnaire) {
    return <div style={styles.dashboardContainer}>You have not submitted a questionnaire yet. Please complete it to view your dashboard.</div>;
  }

  const hasRecommendations = questionnaire.recommendations?.length > 0 || questionnaire.suggestions?.length > 0;

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.header}>
        <h2>Your Health Report</h2>
        <a 
          href={`http://127.0.0.1:8000/questionnaire/${questionnaire.id}/download/`} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={styles.downloadButton}>
            Download Full Report
        </a>
      </div>
      
      {/* Section 1: Doctor's Feedback (Most Important) */}
      <div style={{...styles.card, ...styles.feedbackCard}}>
          <h3 style={styles.sectionTitle}>Doctor's Review</h3>
          <InfoField label="Review Status" value={questionnaire.status.charAt(0).toUpperCase() + questionnaire.status.slice(1)} />
          {questionnaire.admin_feedback ? (
              <div>
                  <p style={styles.fieldLabel}>Personalized Feedback:</p>
                  <div style={styles.feedbackBox}>
                      {questionnaire.admin_feedback}
                  </div>
              </div>
          ) : (
              <p>Your submission is pending review by a doctor.</p>
          )}
      </div>

      {/* Section 2: Automated Recommendations */}
      <div style={{ ...styles.card, ...styles.recommendationCard }}>
          <h3 style={styles.sectionTitle}>Automated Recommendations</h3>
          {hasRecommendations ? (
              <>
                  <h4>Recommended Health Screenings:</h4>
                  <ul>
                      {questionnaire.recommendations.map((rec, index) => (
                          <li key={`rec-${index}`}><strong>{rec.test_name} ({rec.category}):</strong> {rec.reason}</li>
                      ))}
                  </ul>
                  <hr style={{margin: '15px 0', borderTop: '1px solid #ffeeba'}} />
                  <h4>Lifestyle & Health Suggestions:</h4>
                  <ul>
                      {questionnaire.suggestions.map((sug, index) => (
                          <li key={`sug-${index}`}><strong>{sug.category}:</strong> {sug.suggestion_text}</li>
                      ))}
                  </ul>
              </>
          ) : (
              <p>No specific automated recommendations were generated based on your profile.</p>
          )}
      </div>
      
      {/* All remaining sections showing the data submitted by the user */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Submitted Information Overview</h3>
        <p>Submitted At: {new Date(questionnaire.submitted_at).toLocaleString()}</p>
        <details>
            <summary style={{cursor: 'pointer', fontWeight: 'bold', marginTop: '1rem'}}>Click to view your full submission</summary>
            
            <h4 style={styles.sectionTitle}>Personal Information</h4>
            <InfoField label="Age" value={questionnaire.personal_info.age} />
            <InfoField label="Gender" value={questionnaire.personal_info.gender} />
            
            <h4 style={styles.sectionTitle}>Measurements</h4>
            <InfoField label="Height (cm)" value={questionnaire.measurements.height_cm} />
            <InfoField label="Weight (kg)" value={questionnaire.measurements.weight_kg} />
            <InfoField label="BMI" value={questionnaire.measurements.bmi} />

            {/* Add all other InfoField components here for the rest of the data */}
        </details>
      </div>

    </div>
  );
};