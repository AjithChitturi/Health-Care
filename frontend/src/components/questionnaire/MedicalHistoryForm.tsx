import React from 'react';

export const MedicalHistoryForm: React.FC<{
  data: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onBack: () => void;
}> = ({ data, onChange, onNext, onBack }) => (
  <div>
    <h2>Medical History</h2>
    <label>
      Diabetes:
      <input type="checkbox" name="diabetes" checked={!!data.diabetes} onChange={onChange} />
    </label>
    <label>
      Hypertension:
      <input type="checkbox" name="hypertension" checked={!!data.hypertension} onChange={onChange} />
    </label>
    <label>
      Heart Disease:
      <input type="checkbox" name="heart_disease" checked={!!data.heart_disease} onChange={onChange} />
    </label>
    <label>
      Other Conditions:
      <input type="text" name="other_conditions" value={data.other_conditions || ''} onChange={onChange} />
    </label>
    <label>
      Medications:
      <input type="text" name="medications" value={data.medications || ''} onChange={onChange} />
    </label>
    <label>
      Allergies:
      <input type="text" name="allergies" value={data.allergies || ''} onChange={onChange} />
    </label>
    <button onClick={onBack}>Back</button>
    <button onClick={onNext}>Next</button>
  </div>
);
