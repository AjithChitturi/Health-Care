import React from 'react';

export const PreventiveCareForm: React.FC<{
  data: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onBack: () => void;
}> = ({ data, onChange, onNext, onBack }) => (
  <div>
    <h2>Preventive Care</h2>
    <label>
      Last Checkup:
      <input type="date" name="last_checkup" value={data.last_checkup || ''} onChange={onChange} />
    </label>
    <label>
      Vaccinations:
      <input type="text" name="vaccinations" value={data.vaccinations || ''} onChange={onChange} />
    </label>
    <button onClick={onBack}>Back</button>
    <button onClick={onNext}>Next</button>
  </div>
);
