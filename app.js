import React, { useState } from 'react';
import { ChefHat, Sparkles, UtensilsCrossed, Wine, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';

const AIChefRecipeGenerator = () => {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({
    cuisine: '',
    dietary: '',
    allergies: [],
    ingredients: ['', '', ''],
    wine: ''
  });
  const [generatedRecipes, setGeneratedRecipes] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const cuisines = [
    'Indian', 'Italian', 'Chinese', 'Mexican', 'Thai', 'Japanese', 
    'French', 'Greek', 'American', 'Korean', 'Spanish', 'Mediterranean',
    'Vietnamese', 'Lebanese', 'Turkish', 'Brazilian', 'Caribbean', 'Moroccan'
  ];

  const dietaryPreferences = [
    'None', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 
    'Keto', 'Paleo', 'Low-Carb', 'Low-Fat', 'Pescatarian', 
    'Halal', 'Kosher', 'Nut-Free', 'Soy-Free'
  ];

  const commonAllergies = [
    'Peanuts', 'Tree Nuts', 'Milk', 'Eggs', 'Fish', 'Shellfish',
    'Soy', 'Wheat', 'Sesame', 'Mustard', 'Celery', 'Sulfites'
  ];

  const commonIngredients = [
    'Chicken', 'Beef', 'Pork', 'Lamb', 'Shrimp', 'Salmon', 'Tuna', 'Tofu',
    'Rice', 'Pasta', 'Potato', 'Tomato', 'Onion', 'Garlic', 'Ginger',
    'Bell Pepper', 'Broccoli', 'Carrot', 'Spinach', 'Mushroom', 'Eggplant',
    'Cheese', 'Butter', 'Cream', 'Yogurt', 'Eggs', 'Milk',
    'Olive Oil', 'Soy Sauce', 'Coconut Milk', 'Lemon', 'Lime',
    'Basil', 'Cilantro', 'Parsley', 'Thyme', 'Rosemary', 'Cumin',
    'Paprika', 'Chili', 'Cinnamon', 'Turmeric', 'Garam Masala'
  ];

  const wineOptions = ['Red', 'White', 'Rosé', 'Sparkling', 'None'];

  const handleAllergyToggle = (allergy) => {
    setPreferences(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...preferences.ingredients];
    newIngredients[index] = value;
    setPreferences(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const generateRecipes = async () => {
    setIsGenerating(true);
    
    // Simulate recipe generation with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const recipes = [
      {
        id: 1,
        name: generateRecipeName(),
        cuisine: preferences.cuisine,
        prepTime: Math.floor(Math.random() * 40) + 20,
        cookTime: Math.floor(Math.random() * 60) + 15,
        servings: Math.floor(Math.random() * 4) + 2,
        difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
        rating: (Math.random() * 1 + 4).toFixed(1),
        calories: Math.floor(Math.random() * 400) + 200,
        ingredients: generateIngredients(),
        instructions: generateInstructions(),
        winePairing: preferences.wine !== 'None' ? preferences.wine : null,
        dietaryInfo: preferences.dietary !== 'None' ? preferences.dietary : null
      },
      {
        id: 2,
        name: generateRecipeName(),
        cuisine: preferences.cuisine,
        prepTime: Math.floor(Math.random() * 40) + 20,
        cookTime: Math.floor(Math.random() * 60) + 15,
        servings: Math.floor(Math.random() * 4) + 2,
        difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
        rating: (Math.random() * 1 + 4).toFixed(1),
        calories: Math.floor(Math.random() * 400) + 200,
        ingredients: generateIngredients(),
        instructions: generateInstructions(),
        winePairing: preferences.wine !== 'None' ? preferences.wine : null,
        dietaryInfo: preferences.dietary !== 'None' ? preferences.dietary : null
      },
      {
        id: 3,
        name: generateRecipeName(),
        cuisine: preferences.cuisine,
        prepTime: Math.floor(Math.random() * 40) + 20,
        cookTime: Math.floor(Math.random() * 60) + 15,
        servings: Math.floor(Math.random() * 4) + 2,
        difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
        rating: (Math.random() * 1 + 4).toFixed(1),
        calories: Math.floor(Math.random() * 400) + 200,
        ingredients: generateIngredients(),
        instructions: generateInstructions(),
        winePairing: preferences.wine !== 'None' ? preferences.wine : null,
        dietaryInfo: preferences.dietary !== 'None' ? preferences.dietary : null
      }
    ];
    
    setGeneratedRecipes(recipes);
    setIsGenerating(false);
    setStep(6);
  };

  const generateRecipeName = () => {
    const userIngredients = preferences.ingredients.filter(i => i.trim());
    const mainIngredient = userIngredients[0] || 'Special';
    const cuisineStyles = {
      'Indian': ['Curry', 'Masala', 'Biryani', 'Tandoori', 'Korma'],
      'Italian': ['Pasta', 'Risotto', 'Pizza', 'Parmesan', 'al Forno'],
      'Chinese': ['Stir-Fry', 'Szechuan', 'Sweet & Sour', 'Chow Mein', 'Fried Rice'],
      'Mexican': ['Tacos', 'Burrito Bowl', 'Enchiladas', 'Quesadilla', 'Fajitas'],
      'Thai': ['Pad Thai', 'Curry', 'Tom Yum', 'Basil Stir-Fry', 'Coconut Soup'],
      'Japanese': ['Teriyaki', 'Tempura', 'Ramen Bowl', 'Donburi', 'Yakitori'],
      'French': ['au Vin', 'Provençal', 'Gratin', 'Ratatouille', 'Blanquette'],
      'Greek': ['Moussaka', 'Souvlaki', 'with Tzatziki', 'Gyros', 'Spanakopita']
    };
    
    const styles = cuisineStyles[preferences.cuisine] || ['Delight', 'Special', 'Supreme', 'Fusion', 'Classic'];
    const style = styles[Math.floor(Math.random() * styles.length)];
    
    return `${mainIngredient} ${style}`;
  };

  const generateIngredients = () => {
    const userIngredients = preferences.ingredients.filter(i => i.trim());
    const baseIngredients = [...userIngredients];
    
    const commonItems = ['Salt', 'Pepper', 'Olive oil', 'Garlic', 'Onion'];
    const randomCommon = commonIngredients.slice(0, 5);
    
    return [...baseIngredients, ...commonItems, ...randomCommon].slice(0, 12);
  };

  const generateInstructions = () => {
    return [
      'Prepare all ingredients by washing and chopping as needed.',
      'Heat a large pan or wok over medium-high heat with oil.',
      `Cook the main ingredients (${preferences.ingredients.filter(i => i).join(', ')}) until properly done.`,
      'Add aromatics like garlic, ginger, and onions. Sauté until fragrant.',
      'Incorporate spices and seasonings according to taste.',
      'Combine all ingredients and cook for specified time.',
      'Adjust seasoning and consistency as needed.',
      'Garnish and serve hot with recommended sides.'
    ];
  };

  const resetForm = () => {
    setStep(0);
    setPreferences({
      cuisine: '',
      dietary: '',
      allergies: [],
      ingredients: ['', '', ''],
      wine: ''
    });
    setGeneratedRecipes([]);
  };

  const canProceed = () => {
    switch(step) {
      case 0: return preferences.cuisine !== '';
      case 1: return preferences.dietary !== '';
      case 2: return true;
      case 3: return preferences.ingredients[0].trim() !== '';
      case 4: return preferences.ingredients[1].trim() !== '';
      case 5: return preferences.ingredients[2].trim() !== '';
      default: return true;
    }
  };

  if (step === 6) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ChefHat size={48} className="text-orange-600" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Your Personalized Recipes
              </h1>
            </div>
            <p className="text-xl text-gray-600">Based on your preferences: {preferences.cuisine} cuisine</p>
            {preferences.dietary !== 'None' && (
              <p className="text-lg text-gray-500">{preferences.dietary} • {preferences.allergies.length > 0 ? `Avoiding: ${preferences.allergies.join(', ')}` : 'No allergies'}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {generatedRecipes.map(recipe => (
              <div key={recipe.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">{recipe.name}</h2>
                  <div className="flex items-center gap-2 text-sm">
                    <span>⭐ {recipe.rating}</span>
                    <span>•</span>
                    <span>{recipe.difficulty}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div>
                      <p className="text-2xl font-bold text-orange-600">{recipe.prepTime}</p>
                      <p className="text-xs text-gray-600">Prep Time</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-pink-600">{recipe.cookTime}</p>
                      <p className="text-xs text-gray-600">Cook Time</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">{recipe.servings}</p>
                      <p className="text-xs text-gray-600">Servings</p>
                    </div>
                  </div>

                  {recipe.dietaryInfo && (
                    <div className="mb-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-semibold text-green-700">✓ {recipe.dietaryInfo}</p>
                    </div>
                  )}

                  {recipe.winePairing && (
                    <div className="mb-4 p-3 bg-purple-50 rounded-lg flex items-center gap-2">
                      <Wine size={18} className="text-purple-600" />
                      <p className="text-sm font-semibold text-purple-700">Pairs with {recipe.winePairing} Wine</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="font-bold text-gray-800 mb-2">Ingredients:</h3>
                    <div className="space-y-1">
                      {recipe.ingredients.slice(0, 6).map((ing, idx) => (
                        <p key={idx} className="text-sm text-gray-600">• {ing}</p>
                      ))}
                      {recipe.ingredients.length > 6 && (
                        <p className="text-sm text-orange-600 font-medium">+ {recipe.ingredients.length - 6} more</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-bold text-gray-800 mb-2">Instructions:</h3>
                    <div className="space-y-2">
                      {recipe.instructions.slice(0, 3).map((inst, idx) => (
                        <p key={idx} className="text-sm text-gray-600">
                          <span className="font-semibold text-orange-600">{idx + 1}.</span> {inst}
                        </p>
                      ))}
                      <p className="text-sm text-orange-600 font-medium">+ {recipe.instructions.length - 3} more steps</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm text-gray-500">{recipe.calories} calories</span>
                    <span className="text-sm font-semibold text-orange-600">{recipe.cuisine}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={resetForm}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-semibold text-lg hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={20} />
              Generate New Recipes
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 border-8 border-orange-200 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
            <ChefHat className="absolute inset-0 m-auto text-orange-600" size={48} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Generating Your Recipes...</h2>
          <p className="text-gray-600">Our AI Chef is creating personalized recipes just for you!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat size={56} className="text-orange-600" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              AI Chef
            </h1>
          </div>
          <p className="text-xl text-gray-600">Let's create your perfect recipe!</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step + 1} of 6</span>
            <span className="text-sm font-medium text-orange-600">{Math.round(((step + 1) / 6) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Step 0: Cuisine */}
          {step === 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <UtensilsCrossed className="text-orange-600" size={32} />
                <h2 className="text-3xl font-bold text-gray-800">What cuisine do you desire?</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {cuisines.map(cuisine => (
                  <button
                    key={cuisine}
                    onClick={() => setPreferences(prev => ({ ...prev, cuisine }))}
                    className={`p-4 rounded-xl font-semibold transition-all ${
                      preferences.cuisine === cuisine
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Dietary Preferences */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-pink-600" size={32} />
                <h2 className="text-3xl font-bold text-gray-800">Do you have any dietary preferences?</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dietaryPreferences.map(diet => (
                  <button
                    key={diet}
                    onClick={() => setPreferences(prev => ({ ...prev, dietary: diet }))}
                    className={`p-4 rounded-xl font-semibold transition-all ${
                      preferences.dietary === diet
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {diet}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Allergies */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">⚠️</span>
                <h2 className="text-3xl font-bold text-gray-800">Select your food allergies:</h2>
              </div>
              <p className="text-gray-600 mb-6">Select all that apply (or skip if none)</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {commonAllergies.map(allergy => (
                  <button
                    key={allergy}
                    onClick={() => handleAllergyToggle(allergy)}
                    className={`p-4 rounded-xl font-semibold transition-all ${
                      preferences.allergies.includes(allergy)
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {allergy}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Steps 3-5: Ingredients */}
          {[3, 4, 5].includes(step) && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🥘</span>
                <h2 className="text-3xl font-bold text-gray-800">
                  Enter your {['first', 'second', 'third'][step - 3]} ingredient:
                </h2>
              </div>
              
              {/* Custom Input */}
              <div className="mb-6">
                <input
                  type="text"
                  value={preferences.ingredients[step - 3]}
                  onChange={(e) => handleIngredientChange(step - 3, e.target.value)}
                  placeholder="Type any ingredient..."
                  className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Quick Select */}
              <p className="text-gray-600 mb-4">Or choose from common ingredients:</p>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 max-h-96 overflow-y-auto">
                {commonIngredients.map(ingredient => (
                  <button
                    key={ingredient}
                    onClick={() => handleIngredientChange(step - 3, ingredient)}
                    className={`p-3 rounded-lg font-medium text-sm transition-all ${
                      preferences.ingredients[step - 3] === ingredient
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-8 border-t">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-all flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
                <ArrowRight size={20} />
              </button>
            ) : (
              <button
                onClick={generateRecipes}
                disabled={!canProceed()}
                className={`px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ChefHat size={20} />
                Generate Recipes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChefRecipeGenerator;
