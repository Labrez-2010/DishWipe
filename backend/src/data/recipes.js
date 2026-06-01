const recipes = [
  {
    id: "dish_001",
    title: "Garlic Pasta",
    ingredients: ["garlic", "pasta", "olive oil", "parmesan cheese", "parsley"],
    cookTime: 20,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80",
    description: "A simple and delicious garlic and olive oil pasta."
  },
  {
    id: "dish_002",
    title: "Spicy Tofu Stir-Fry",
    ingredients: ["tofu", "soy sauce", "chili flakes", "broccoli", "garlic", "green onions"],
    cookTime: 15,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1548943487-a2e4d43b4850?auto=format&fit=crop&w=800&q=80",
    description: "Crispy tofu tossed in a spicy soy sauce with vegetables."
  },
  {
    id: "dish_003",
    title: "Rustic Tomato Basil Soup",
    ingredients: ["tomato", "basil", "vegetable broth", "onion", "garlic"],
    cookTime: 30,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    description: "Warm and comforting tomato soup with fresh basil."
  },
  {
    id: "dish_004",
    title: "Chicken Curry",
    ingredients: ["chicken breast", "curry powder", "coconut milk", "onion", "garlic", "ginger"],
    cookTime: 40,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    description: "Rich and creamy chicken curry with Indian spices."
  },
  {
    id: "dish_005",
    title: "Caprese Salad",
    ingredients: ["tomato", "mozzarella", "basil", "balsamic vinegar", "olive oil"],
    cookTime: 10,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=800&q=80",
    description: "Classic Italian salad with fresh tomatoes and mozzarella."
  },
  {
    id: "dish_006",
    title: "Beef Stir-Fry",
    ingredients: ["beef strips", "soy sauce", "bell pepper", "onion", "garlic", "ginger"],
    cookTime: 25,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    description: "Quick and savory beef stir-fry with mixed vegetables."
  },
  {
    id: "dish_007",
    title: "Mushroom Risotto",
    ingredients: ["arborio rice", "mushrooms", "chicken broth", "onion", "parmesan cheese", "white wine"],
    cookTime: 45,
    difficulty: "Hard",
    image: "https://images.unsplash.com/photo-1476124369491-e9aa153ec352?auto=format&fit=crop&w=800&q=80",
    description: "Creamy Italian rice dish cooked with earthy mushrooms."
  },
  {
    id: "dish_008",
    title: "Avocado Toast",
    ingredients: ["bread", "avocado", "lemon juice", "salt", "black pepper", "chili flakes"],
    cookTime: 5,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=800&q=80",
    description: "Healthy and quick breakfast with mashed avocado on toast."
  },
  {
    id: "dish_009",
    title: "Pancakes",
    ingredients: ["flour", "milk", "egg", "sugar", "baking powder", "butter"],
    cookTime: 15,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1528207776546-384cb1119b4e?auto=format&fit=crop&w=800&q=80",
    description: "Fluffy and sweet classic morning pancakes."
  },
  {
    id: "dish_010",
    title: "Omelette",
    ingredients: ["egg", "milk", "cheese", "onion", "bell pepper", "spinach"],
    cookTime: 10,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80",
    description: "A fluffy omelette filled with fresh veggies and cheese."
  },
  {
    id: "dish_011",
    title: "Lemon Butter Salmon",
    ingredients: ["salmon", "lemon", "butter", "garlic", "parsley"],
    cookTime: 20,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    description: "Pan-seared salmon finished in a tangy lemon butter sauce."
  },
  {
    id: "dish_012",
    title: "Caesar Salad",
    ingredients: ["romaine lettuce", "croutons", "parmesan cheese", "caesar dressing", "chicken breast"],
    cookTime: 15,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80",
    description: "Crisp romaine lettuce with classic Caesar dressing and grilled chicken."
  },
  {
    id: "dish_013",
    title: "Shrimp Scampi",
    ingredients: ["shrimp", "pasta", "garlic", "butter", "white wine", "lemon juice", "parsley"],
    cookTime: 25,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80",
    description: "Succulent shrimp tossed in a garlic butter and wine sauce over pasta."
  },
  {
    id: "dish_014",
    title: "Vegetable Fried Rice",
    ingredients: ["rice", "egg", "soy sauce", "carrot", "peas", "onion", "garlic"],
    cookTime: 20,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    description: "Classic Chinese-style fried rice with mixed vegetables."
  },
  {
    id: "dish_015",
    title: "Chicken Fajitas",
    ingredients: ["chicken breast", "bell pepper", "onion", "fajita seasoning", "tortillas", "lime"],
    cookTime: 25,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=800&q=80",
    description: "Sizzling chicken and peppers served with warm tortillas."
  },
  {
    id: "dish_016",
    title: "Margherita Pizza",
    ingredients: ["pizza dough", "tomato sauce", "mozzarella", "basil", "olive oil"],
    cookTime: 30,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    description: "Authentic Neapolitan pizza with fresh basil and mozzarella."
  },
  {
    id: "dish_017",
    title: "Greek Salad",
    ingredients: ["cucumber", "tomato", "red onion", "feta cheese", "kalamata olives", "olive oil"],
    cookTime: 10,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80",
    description: "Fresh Mediterranean salad with feta and olives."
  },
  {
    id: "dish_018",
    title: "Lentil Soup",
    ingredients: ["lentils", "carrot", "celery", "onion", "vegetable broth", "garlic", "cumin"],
    cookTime: 40,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    description: "Hearty and healthy lentil soup packed with veggies."
  },
  {
    id: "dish_019",
    title: "Fish Tacos",
    ingredients: ["white fish", "tortillas", "cabbage", "lime", "sour cream", "cilantro"],
    cookTime: 20,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1512836573171-5183f3eeb11c?auto=format&fit=crop&w=800&q=80",
    description: "Baja-style fish tacos with a tangy cabbage slaw."
  },
  {
    id: "dish_020",
    title: "Macaroni and Cheese",
    ingredients: ["macaroni", "cheddar cheese", "milk", "butter", "flour"],
    cookTime: 30,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80",
    description: "Creamy, cheesy, and comforting homemade mac and cheese."
  },
  {
    id: "dish_021",
    title: "Teriyaki Chicken",
    ingredients: ["chicken thigh", "soy sauce", "sugar", "ginger", "garlic", "sesame seeds"],
    cookTime: 25,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=800&q=80",
    description: "Sweet and savory Japanese-style teriyaki chicken."
  },
  {
    id: "dish_022",
    title: "Minestrone Soup",
    ingredients: ["pasta", "kidney beans", "carrot", "celery", "tomato", "vegetable broth", "zucchini"],
    cookTime: 45,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    description: "Classic Italian vegetable soup with pasta and beans."
  },
  {
    id: "dish_023",
    title: "Bacon and Egg Sandwich",
    ingredients: ["bread", "egg", "bacon", "cheese", "butter"],
    cookTime: 15,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    description: "The perfect crispy bacon and fried egg breakfast sandwich."
  },
  {
    id: "dish_024",
    title: "Stuffed Bell Peppers",
    ingredients: ["bell pepper", "ground beef", "rice", "tomato sauce", "onion", "cheese"],
    cookTime: 50,
    difficulty: "Hard",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80",
    description: "Roasted bell peppers stuffed with a savory beef and rice mixture."
  },
  {
    id: "dish_025",
    title: "Chocolate Chip Cookies",
    ingredients: ["flour", "butter", "sugar", "brown sugar", "egg", "chocolate chips", "vanilla extract"],
    cookTime: 25,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
    description: "Classic, chewy, and gooey chocolate chip cookies."
  }
];

module.exports = recipes;
