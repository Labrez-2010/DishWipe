import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import InputView from './components/InputView';
import SwipeView from './components/SwipeView';
import { apiUrl } from './config/api';

function App() {
  const [currentView, setCurrentView] = useState('input');
  const [recipes, setRecipes] = useState([]);

  const handleFindRecipes = async (ingredients) => {
    try {
      const response = await fetch(apiUrl('/api/recipes/recommend'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server Error:', errorText);
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      console.log('API Response:', data);

      if (data.recipes && data.recipes.length > 0) {
        setRecipes(data.recipes);
        setCurrentView('swipe');
      } else {
        alert('No recipes found for these ingredients.');
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      alert(`Request failed: ${error.message}`);
    }
  };

  const handleBackToInput = () => {
    setCurrentView('input');
    setRecipes([]);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-6 bg-slate-900 text-slate-100">
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

      <AnimatePresence mode="wait">
        {currentView === 'input' ? (
          <InputView
            key="input"
            onFindRecipes={handleFindRecipes}
          />
        ) : (
          <SwipeView
            key="swipe"
            recipes={recipes}
            onBack={handleBackToInput}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;