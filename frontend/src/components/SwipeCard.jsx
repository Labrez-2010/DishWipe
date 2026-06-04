import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Clock, Flame, Info, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function SwipeCard({ recipe, onSwipeLeft, onSwipeRight, onOpenDetails }) {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  
  // Color overlays based on swipe direction
  const likeOpacity = useTransform(x, [0, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [0, -150], [0, 1]);

  const [showMatchDetails, setShowMatchDetails] = useState(false);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      onSwipeRight(recipe);
    } else if (info.offset.x < -100) {
      onSwipeLeft(recipe);
    }
  };

  return (
    <motion.div
      style={{ x, opacity, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
      className="absolute inset-0 cursor-grab origin-bottom shadow-2xl rounded-3xl"
    >
      <div className="relative w-full h-full bg-slate-800 rounded-3xl overflow-hidden border border-slate-700">
        
        {/* Swipe Overlays */}
        <motion.div 
          style={{ opacity: likeOpacity }} 
          className="absolute inset-0 bg-green-500/20 z-20 pointer-events-none flex items-center justify-center"
        >
          <div className="border-4 border-green-500 text-green-500 text-6xl font-bold uppercase tracking-widest px-8 py-4 rounded-xl rotate-[-15deg]">
            SAVE
          </div>
        </motion.div>
        
        <motion.div 
          style={{ opacity: nopeOpacity }} 
          className="absolute inset-0 bg-red-500/20 z-20 pointer-events-none flex items-center justify-center"
        >
          <div className="border-4 border-red-500 text-red-500 text-6xl font-bold uppercase tracking-widest px-8 py-4 rounded-xl rotate-[15deg]">
            SKIP
          </div>
        </motion.div>

        {/* Hero Image */}
        <div className="absolute inset-0 h-[60%]">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        {/* Top Badges */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10 pointer-events-none">
          <div className="bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700/50 flex items-center gap-2">
            <Sparkles size={16} className="text-yellow-400" />
            <span className="font-bold text-white">{recipe.matchPercentage}% Match</span>
          </div>
          
          <button 
            onPointerDown={(e) => { e.stopPropagation(); setShowMatchDetails(true); }}
            onPointerUp={(e) => { e.stopPropagation(); setShowMatchDetails(false); }}
            onPointerLeave={() => setShowMatchDetails(false)}
            className="p-3 bg-slate-900/60 backdrop-blur-md rounded-full border border-slate-700/50 text-slate-300 pointer-events-auto active:scale-95 transition-transform"
          >
            <Info size={20} />
          </button>
        </div>

        {/* Match Details Overlay (Hold to show) */}
        <AnimatePresence>
          {showMatchDetails && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 bg-slate-900/90 backdrop-blur-sm p-8 flex flex-col justify-center items-center pointer-events-none"
            >
              <h3 className="text-2xl font-bold mb-6 text-white text-center">Missing Ingredients</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {recipe.missingIngredients.map(ing => (
                  <span key={ing} className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-200 rounded-full font-medium">
                    {ing}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Section */}
        <div className="absolute bottom-0 inset-x-0 h-[50%] p-6 md:p-8 flex flex-col justify-end pointer-events-none">
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
              ${recipe.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                recipe.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 
                'bg-red-500/20 text-red-400 border border-red-500/30'}`}
            >
              {recipe.difficulty}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight pointer-events-auto cursor-pointer hover:text-violet-300 transition-colors"
              onClick={() => onOpenDetails(recipe)}>
            {recipe.title}
          </h2>

          <div className="flex gap-6 mb-6">
            <div className="flex items-center gap-2 text-slate-300">
              <Clock size={18} className="text-violet-400" />
              <span className="font-medium">{recipe.cookTime}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Flame size={18} className="text-orange-400" />
              <span className="font-medium">{recipe.calories}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
