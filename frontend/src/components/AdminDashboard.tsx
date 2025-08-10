// components/AdminDashboard.tsx (Create this new file)

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api'; 

interface QuestionnaireSummary {
    id: number;
    user: { username: string };
    status: string;
    submitted_at: string;
}

export const AdminDashboard: React.FC = () => {
    const [pending, setPending] = useState<QuestionnaireSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPending = async () => {
            try {
                // CHANGE THIS LINE:
                const res = await api.getPendingReviews();
                // ... (rest of the function is the same)
                const summaryData = res.data.map((q: any) => ({
                    id: q.id,
                    user: { username: q.personal_info.contact || `User ${q.id}` }, 
                    status: q.status,
                    submitted_at: q.submitted_at
                }));
                setPending(summaryData);
            } catch (err) {
                setError('Failed to fetch pending reviews. You may not have admin privileges.');
            } finally {
                setLoading(false);
            }
        };

        fetchPending();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1rem' }}>
            <h1>Admin Dashboard</h1>
            <h2>Pending Reviews</h2>
            {pending.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>User</th>
                            <th style={tableHeaderStyle}>Submitted At</th>
                            <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pending.map((q) => (
                            <tr key={q.id}>
                                <td style={tableCellStyle}>{q.user.username}</td>
                                <td style={tableCellStyle}>{new Date(q.submitted_at).toLocaleString()}</td>
                                <td style={tableCellStyle}>
                                    <Link to={`/admin/review/${q.id}`}>Review</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No submissions are currently pending review.</p>
            )}
        </div>
    );
};

const tableHeaderStyle: React.CSSProperties = {
  borderBottom: '2px solid #ddd',
  padding: '8px',
  textAlign: 'left'
};
const tableCellStyle: React.CSSProperties = {
  borderBottom: '1px solid #eee',
  padding: '8px'
};