import React, { useState } from 'react';

const TrainerForm = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 這裡可以處理表單提交的邏輯，例如保存數據或傳送到父元件
    console.log('Trainer Name:', name);
    console.log('Gender:', gender);
    console.log('Region:', region);
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '300px', margin: '0 auto' }}>
      <h2>訓練師資料</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            名稱:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            性別:
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">選擇性別</option>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            地區:
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  );
};

export default TrainerForm;
