import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


type TraitKey = 'eman' | 'doya' | 'dhorjo' | 'kritoggota' | 'binoy';
type AllKeys = TraitKey | 'ohongkar';

type ValuesType = Record<AllKeys, number>;

const traits: { key: TraitKey; label: string }[] = [
  { key: 'eman', label: 'ঈমান' },
  { key: 'doya', label: 'দয়া' },
  { key: 'dhorjo', label: 'ধৈর্য' },
  { key: 'kritoggota', label: 'কৃতজ্ঞতা' },
  { key: 'binoy', label: 'বিনয়' }
];

export default function App() {
  const [values, setValues] = useState<ValuesType>({
    ohongkar: 0,
    eman: 100,
    doya: 100,
    dhorjo: 100,
    kritoggota: 100,
    binoy: 100
  });

  const handleChange = (key: AllKeys, value: number) => {
    if (key === 'ohongkar') {
      const difference = value - values.ohongkar;
      const newValues: ValuesType = { ...values, ohongkar: value };

      if (difference > 0) {
        traits.forEach(trait => {
          newValues[trait.key] = Math.max(0, values[trait.key] - difference);
        });
      } else if (difference < 0) {
        traits.forEach(trait => {
          newValues[trait.key] = Math.min(100, values[trait.key] - difference);
        });
      }

      setValues(newValues);
    } else {
      const max = 100 - values.ohongkar;
      value = Math.min(value, max);
      setValues(prev => ({ ...prev, [key]: value }));
    }
  };

  const getRangeColor = (value: number): string => {
    const hue = Math.round((value / 100) * 120);
    return `hsl(${hue}, 100%, 50%)`;
  };

  const glowingStyle = (): React.CSSProperties => {
    if (values.ohongkar > 50) {
      return {
        borderRadius: '10px',
        transition: 'box-shadow 0.1s ease-in-out',
      }; // Red glow handled by class animation
    }
  
    const intensity = (100 - values.ohongkar) * 0.3;
    const glowColor = '0, 255, 255';
  
    return {
      boxShadow: `0 0 ${intensity}px rgba(${glowColor}, 0.8), 0 0 ${intensity * 2}px rgba(${glowColor}, 0.5)`,
      borderRadius: '10px',
      transition: 'box-shadow 0.3s ease-in-out',
    };
  };
  

  return (
    <div className="app bg-black">
      <header className="app-bar text-white[]">অহংকার নয়, বিনয়ই সফলতার চাবিকাঠি</header>

      <div className="ranges">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 py-4">
          {traits.slice(0, 3).map((trait) => (
            <div key={trait.key} className="range-wrapper">
              <label className='text-white'>{trait.label}</label>
              <input
  type="range"
  min="0"
  max="100"
  value={values[trait.key]}
  onChange={e => handleChange(trait.key, Number(e.target.value))}
  className={values.ohongkar > 50 ? 'glow-pulse' : ''}
  style={{
    background: getRangeColor(values[trait.key]),
    ...glowingStyle()
  }}
/>

            </div>
          ))}
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-4 py-4">
          {traits.slice(3).map((trait) => (
            <div key={trait.key} className="range-wrapper">
              <label className='text-white'>{trait.label}</label>
              <input
  type="range"
  min="0"
  max="100"
  value={values[trait.key]}
  onChange={e => handleChange(trait.key, Number(e.target.value))}
  className={values.ohongkar > 50 ? 'glow-pulse' : ''}
  style={{
    background: getRangeColor(values[trait.key]),
    ...glowingStyle()
  }}
/>

            </div>
          ))}
        </div>

        <div className="range-wrapper ohongkar-range">
          <label className='text-white'>অহংকার</label>
          <input
            type="range"
            min="0"
            max="100"
            value={values.ohongkar}
            onChange={e => handleChange('ohongkar', Number(e.target.value))}
            style={{
              background: 'linear-gradient(90deg, red, cyan)',
              boxShadow: `0 0 ${values.ohongkar * 2}px rgba(255,0,0,0.8), 0 0 ${values.ohongkar * 4}px rgba(255,0,0,0.5)`,
              borderRadius: '12px'
            }}
          />
        </div>
      </div>

      <footer className="footer text-white[]">
  <span>Developed by </span>
  <span className=" footer-effect typewriter-loop">Washim Akram, Software Engineer</span>
</footer>


    </div>
  );
}
