import React from 'react';

export const MeasurementsForm: React.FC<{
  data: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onBack: () => void;
}> = ({ data, onChange, onNext, onBack }) => (
  <div>
    <h2>Measurements</h2>
    <label>
      Height (cm):
      <input type="number" name="height_cm" value={data.height_cm || ''} onChange={onChange} />
    </label>
    <label>
      Weight (kg):
      <input type="number" name="weight_kg" value={data.weight_kg || ''} onChange={onChange} />
    </label>
    <label>
      BMI:
      <input type="number" name="bmi" value={data.bmi || ''} onChange={onChange} />
    </label>
    <label>
      Blood Pressure:
      <input type="text" name="blood_pressure" value={data.blood_pressure || ''} onChange={onChange} />
    </label>
    <label>
      Blood Sugar:
      <input type="text" name="blood_sugar" value={data.blood_sugar || ''} onChange={onChange} />
    </label>
    <label>
      Cholesterol:
      <input type="text" name="cholesterol" value={data.cholesterol || ''} onChange={onChange} />
    </label>
    <button onClick={onBack}>Back</button>
    <button onClick={onNext}>Next</button>
  </div>
);
