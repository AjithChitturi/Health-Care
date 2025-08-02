import React from 'react';

export const SymptomsForm: React.FC<{
  data: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
  onBack: () => void;
}> = ({ data, onChange, onNext, onBack }) => (
  <div>
    <h2>Symptoms</h2>
    <label>
      Chest Pain:
      <input type="checkbox" name="chest_pain" checked={!!data.chest_pain} onChange={onChange} />
    </label>
    <label>
      Breathlessness:
      <input type="checkbox" name="breathlessness" checked={!!data.breathlessness} onChange={onChange} />
    </label>
    <label>
      Fatigue:
      <input type="checkbox" name="fatigue" checked={!!data.fatigue} onChange={onChange} />
    </label>
    <label>
      Sleep Quality:
      <input type="text" name="sleep_quality" value={data.sleep_quality || ''} onChange={onChange} />
    </label>
    <label>
      Stress Level:
      <input type="text" name="stress_level" value={data.stress_level || ''} onChange={onChange} />
    </label>
    <button onClick={onBack}>Back</button>
    <button onClick={onNext}>Next</button>
  </div>
);
