import React from 'react';

export const LifestyleForm: React.FC<{
  data: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
  onBack: () => void;
}> = ({ data, onChange, onNext, onBack }) => (
  <div>
    <h2>Lifestyle</h2>
    <label>
      Smoking Status:
      <select name="smoking_status" value={data.smoking_status || ''} onChange={onChange}>
        <option value="">Select</option>
        <option value="never">Never</option>
        <option value="former">Former</option>
        <option value="current">Current</option>
      </select>
    </label>
    <label>
      Alcohol Consumption:
      <input type="text" name="alcohol_consumption" value={data.alcohol_consumption || ''} onChange={onChange} />
    </label>
    <label>
      Physical Activity:
      <input type="text" name="physical_activity" value={data.physical_activity || ''} onChange={onChange} />
    </label>
    <label>
      Diet:
      <input type="text" name="diet" value={data.diet || ''} onChange={onChange} />
    </label>
    <button onClick={onBack}>Back</button>
    <button onClick={onNext}>Next</button>
  </div>
);
