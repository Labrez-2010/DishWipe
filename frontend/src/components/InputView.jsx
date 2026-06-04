import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Plus, X, Search, Sparkles, Wand2 } from 'lucide-react';

const MOCK_SUGGESTIONS = [
  'Add garlic for extra flavor!',
  'A splash of soy sauce would go great here.',
  'Consider adding some fresh herbs like basil.',
  'Try adding an egg for extra protein.',
  'A squeeze of lemon would brighten this up!',
];

const pickSuggestion = () =>
  MOCK_SUGGESTIONS[Math.floor(Math.random() * MOCK_SUGGESTIONS.length)];

export default function InputView({ onFindRecipes }) {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const val = inputValue.trim().toLowerCase();
    if (val && !ingredients.includes(val)) {
      setIngredients([...ingredients, val]);
      setAiSuggestion(pickSuggestion());
      setInputValue('');
    }
  };

  const removeIngredient = (ing) => {
    const nextIngredients = ingredients.filter((i) => i !== ing);
    setIngredients(nextIngredients);
    if (nextIngredients.length === 0) {
      setAiSuggestion('');
    }
  };

  const handleFindDishes = async () => {
    if (ingredients.length === 0) return;
    setIsSearching(true);
    await onFindRecipes(ingredients);
    setIsSearching(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
      className="w-full max-w-2xl relative z-10"
    >
      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="inline-flex items-center justify-center p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 mb-6 glass-card shadow-lg"
        >
          <ChefHat size={48} className="text-violet-400" />
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          Dish<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Wipe</span> AI
        </h1>
        <p className="text-slate-400 text-lg md:text-xl">
          What's in your kitchen? Let's cook something amazing.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 pointer-events-none" />
        
        <form onSubmit={handleAddIngredient} className="relative mb-6 z-10">
          <div className="relative flex items-center">
            <Search className="absolute left-4 text-slate-400" size={20} />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type an ingredient (e.g., chicken, rice, onion)..."
              className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-16 text-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-2 p-2 bg-violet-600 text-white rounded-xl hover:bg-violet-500 disabled:opacity-50 disabled:hover:bg-violet-600 transition-all shadow-md active:scale-95"
            >
              <Plus size={24} />
            </button>
          </div>
        </form>

        <div className="min-h-[100px] mb-6 z-10 relative">
          {ingredients.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 text-center border-2 border-dashed border-slate-700/50 rounded-xl p-8 bg-slate-800/20">
              Add some ingredients above to get started
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              <AnimatePresence>
                {ingredients.map((ing) => (
                  <motion.span
                    key={ing}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    layout
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-600 rounded-full text-slate-200 shadow-sm"
                  >
                    {ing}
                    <button
                      onClick={() => removeIngredient(ing)}
                      className="p-0.5 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <AnimatePresence>
          {aiSuggestion && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex gap-3 text-indigo-300">
                <Wand2 size={20} className="shrink-0 mt-0.5" />
                <p className="text-sm"><strong className="font-semibold text-indigo-200">AI Suggestion:</strong> {aiSuggestion}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleFindDishes}
          disabled={ingredients.length === 0 || isSearching}
          className="relative z-10 w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-violet-500/50"
        >
          {isSearching ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <ChefHat size={24} />
            </motion.div>
          ) : (
            <>
              <Sparkles size={24} />
              Find Magic Recipes
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
