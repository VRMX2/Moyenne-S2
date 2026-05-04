import { useState, useEffect } from 'react'
import './App.css'

const MODULES = [
  { id: 'multimedia', name: 'Multimedia', coef: 2 },
  { id: 'verif_formelle', name: 'Vérification Formelle', coef: 3 },
  { id: 'tech_optimisation', name: 'Technique Optimisation', coef: 2 },
  { id: 'anglais', name: 'Anglais', coef: 2 },
  { id: 'algo', name: 'Algorithmique', coef: 3 },
  { id: 'admin', name: 'Administration', coef: 3 },
  { id: 'securite', name: 'Sécurité', coef: 3 },
];

function App() {
  const [grades, setGrades] = useState(
    MODULES.reduce((acc, mod) => ({ ...acc, [mod.id]: '' }), {})
  );

  const [average, setAverage] = useState(0);
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    let totalScore = 0;
    const totalPossibleCoef = MODULES.reduce((sum, m) => sum + m.coef, 0);

    MODULES.forEach((mod) => {
      const val = parseFloat(grades[mod.id]);
      if (!isNaN(val)) {
        totalScore += val * mod.coef;
      }
    });

    if (totalPossibleCoef > 0) {
      const avg = totalScore / totalPossibleCoef;
      setAverage(avg);
      setIsPassed(avg >= 10);
    }
  }, [grades]);

  const handleChange = (id, value) => {
    if (value === '') {
      setGrades({ ...grades, [id]: '' });
      return;
    }
    
    // Replace comma with dot for French locales
    const normalizedValue = value.replace(',', '.');
    const num = parseFloat(normalizedValue);
    
    // Allow typing decimals like "10."
    if (normalizedValue.endsWith('.') && !isNaN(parseFloat(normalizedValue.slice(0, -1)))) {
        setGrades({ ...grades, [id]: normalizedValue });
        return;
    }

    if (!isNaN(num) && num >= 0 && num <= 20) {
      // Limit to 2 decimal places to avoid visual bugs
      if (normalizedValue.split('.')[1]?.length > 2) return;
      setGrades({ ...grades, [id]: normalizedValue });
    }
  };

  return (
    <div className="app-container">
      <div className="glass-panel">
        <h1 className="title">Calculateur de Moyenne</h1>
        <p className="subtitle">Semestre 2</p>

        <div className="modules-grid">
          {MODULES.map((mod) => (
            <div key={mod.id} className="module-input-group">
              <label htmlFor={mod.id}>
                {mod.name} <span className="coef-badge">Coef: {mod.coef}</span>
              </label>
              <input
                type="text"
                id={mod.id}
                inputMode="decimal"
                placeholder="0.00"
                value={grades[mod.id]}
                onChange={(e) => handleChange(mod.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className={`result-container ${isPassed ? 'passed' : 'failed'}`}>
          <h2>Moyenne Générale</h2>
          <div className="average-display">
            {average.toFixed(2)} <span>/ 20</span>
          </div>
          <div className="status-message">
            {average >= 10 ? 'Admis 🎉' : 'Ajourné 😢'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
