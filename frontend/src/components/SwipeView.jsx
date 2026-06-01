import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X as XIcon, Heart, Search } from 'lucide-react';
import SwipeCard from './SwipeCard';

export default function SwipeView({ recipes, onBack }) {
  const [cards, setCards] = useState(recipes);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSwipeLeft = (recipe) => {
    setCards(prev => prev.filter(r => r.id !== recipe.id));
  };

  const handleSwipeRight = (recipe) => {
    setSavedRecipes(prev => [...prev, recipe]);
    setCards(prev => prev.filter(r => r.id !== recipe.id));
  };

  const handleManualAction = (recipe, isSave) => {
    if (isSave) {
      handleSwipeRight(recipe);
    } else {
      handleSwipeLeft(recipe);
    }
  };

  if (cards.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="w-full max-w-md mx-auto text-center z-10 glass-card p-10 rounded-3xl"
      >
        <div className="mb-6 inline-flex p-4 rounded-full bg-slate-800">
          <Search size={48} className="text-violet-400" />
        </div>
        <h2 className="text-2xl font-bold mb-4">No more recipes!</h2>
        <p className="text-slate-400 mb-8">You've swiped through all your matches.</p>
        <button 
          onClick={onBack}
          className="px-6 py-3 bg-violet-600 rounded-xl text-white font-semibold hover:bg-violet-500 transition-colors"
        >
          Try New Ingredients
        </button>
      </motion.div>
    );
  }

  // Active card is the last one in the array (rendered on top)
  const activeCard = cards[cards.length - 1];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full h-full max-w-md mx-auto relative z-10 flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBack}
          className="p-3 bg-slate-800/50 hover:bg-slate-700 rounded-full border border-slate-700 text-slate-300 transition-all backdrop-blur-md"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700 backdrop-blur-md text-sm font-semibold">
          {savedRecipes.length} Saved
        </div>
      </div>

      <div className="flex-1 relative w-full h-[600px] mb-8">
        <AnimatePresence>
          {cards.map((recipe, index) => {
            // Only render top 3 cards for performance
            if (index < cards.length - 3) return null;
            
            return (
              <SwipeCard 
                key={recipe.id}
                recipe={recipe}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                onOpenDetails={setSelectedRecipe}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Manual Action Buttons */}
      <div className="flex justify-center gap-6 mb-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleManualAction(activeCard, false)}
          className="w-16 h-16 rounded-full bg-slate-800 border-2 border-red-500/50 flex items-center justify-center text-red-500 shadow-lg hover:bg-red-500 hover:text-white transition-colors"
        >
          <XIcon size={32} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleManualAction(activeCard, true)}
          className="w-16 h-16 rounded-full bg-slate-800 border-2 border-green-500/50 flex items-center justify-center text-green-500 shadow-lg hover:bg-green-500 hover:text-white transition-colors"
        >
          <Heart size={32} />
        </motion.button>
      </div>

      {/* Recipe Details Modal Placeholder */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-slate-900 overflow-y-auto"
          >
            <div className="h-64 relative">
              <img src={selectedRecipe.image} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              <button 
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-6 left-6 p-3 bg-black/50 rounded-full backdrop-blur text-white"
              >
                <ArrowLeft size={24} />
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-2">{selectedRecipe.title}</h2>
              <div className="flex gap-4 mb-8 text-slate-400">
                <span>{selectedRecipe.cookTime}</span>
                <span>•</span>
                <span>{selectedRecipe.calories}</span>
                <span>•</span>
                <span className="text-violet-400 font-semibold">{selectedRecipe.difficulty}</span>
              </div>
              
              <h3 className="text-xl font-bold mb-4">Instructions</h3>
              <ul className="space-y-4">
                {selectedRecipe.steps.map((step, i) => (
                  <li key={i} className="flex gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="pt-1">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
