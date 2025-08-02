import React from 'react';

export const FamilyHistoryForm: React.FC<{
  data: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onBack: () => void;
}> = ({ data, onChange, onNext, onBack }) => (
  <div>
    <h2>Family History</h2>
    <label>
      Diabetes:
      <input type="checkbox" name="diabetes" checked={!!data.diabetes} onChange={onChange} />
    </label>
    <label>
      Heart Disease:
      <input type="checkbox" name="heart_disease" checked={!!data.heart_disease} onChange={onChange} />
    </label>
    <label>
      Cancer:
      <input type="checkbox" name="cancer" checked={!!data.cancer} onChange={onChange} />
    </label>
    <label>
      Other:
      <input type="text" name="other" value={data.other || ''} onChange={onChange} />
    </label>
    <button onClick={onBack}>Back</button>
    <button onClick={onNext}>Next</button>
  </div>
);
