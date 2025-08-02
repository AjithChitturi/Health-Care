import React from 'react';

export const PersonalInfoForm: React.FC<{
  data: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
}> = ({ data, onChange, onNext }) => (
  <div>
    <h2>Personal Information</h2>
    <label>
      Age:
      <input type="number" name="age" value={data.age || ''} onChange={onChange} />
    </label>
    <label>
      Gender:
      <select name="gender" value={data.gender || ''} onChange={onChange}>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </label>
    <label>
      Contact:
      <input type="text" name="contact" value={data.contact || ''} onChange={onChange} />
    </label>
    <button onClick={onNext}>Next</button>
  </div>
);
