import React, { useEffect, useState } from 'react';
import { api } from '../api';

type QuestionnaireSummary = {
  id: number;
  status: string;
  admin_feedback: string;
  submitted_at: string;
};

export const UserDashboard: React.FC = () => {
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireSummary | null>(null);
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
        setError('Failed to load your questionnaire');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;
  if (!questionnaire) return <div>No questionnaire submitted yet.</div>;

  return (
    <div>
      <h2>Your Health Questionnaire</h2>
      <p><b>Status:</b> {questionnaire.status}</p>
      <p><b>Submitted At:</b> {new Date(questionnaire.submitted_at).toLocaleString()}</p>
      {questionnaire.admin_feedback && (
        <div>
          <b>Doctor Feedback:</b>
          <div style={{whiteSpace:'pre-line', border:'1px solid #ccc', padding:'8px', marginTop:'4px'}}>
            {questionnaire.admin_feedback}
          </div>
        </div>
      )}
    </div>
  );
};
