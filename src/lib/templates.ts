import type { CookbookTemplate, CookbookType } from './types';

/**
 * Cookbook Type Metadata
 */
export const COOKBOOK_TYPES: Record<CookbookType, {
  label: string;
  description: string;
  icon: string;
  defaultItemCount?: number;
  examples: string[];
  structureHint: string;
}> = {
  'recipe-collection': {
    label: 'Recipe Collection',
    description: 'Curated collection of recipes around a theme',
    icon: 'BookOpen',
    defaultItemCount: 10,
    examples: [
      '30-Minute Weeknight Dinners',
      'Holiday Cookie Collection',
      'One-Pot Comfort Meals',
    ],
    structureHint: `Create a beautiful recipe collection with:
1. **Appetizing Introduction** - Set the theme
2. **Clear Recipe Cards** - Ingredients & steps
3. **Pro Tips** - Kitchen wisdom`,
  },
  'meal-plan': {
    label: 'Meal Plan',
    description: 'Weekly or monthly meal planning guide',
    icon: 'Calendar',
    defaultItemCount: 7,
    examples: ['7-Day Healthy Meal Plan', 'Budget-Friendly Weekly Menu'],
    structureHint: `Create a practical meal planning guide.`,
  },
  'cuisine-guide': {
    label: 'Cuisine Guide',
    description: 'Deep dive into a specific cuisine',
    icon: 'Globe',
    examples: ['Essential Thai Cooking', 'Italian Kitchen Basics'],
    structureHint: `Create an educational cuisine exploration.`,
  },
  'cooking-tips': {
    label: 'Cooking Tips',
    description: 'Pro tips and kitchen hacks',
    icon: 'Lightbulb',
    examples: ['Knife Skills 101', '25 Time-Saving Kitchen Hacks'],
    structureHint: `Create actionable cooking advice.`,
  },
  'ingredient-guide': {
    label: 'Ingredient Guide',
    description: 'Master a specific ingredient',
    icon: 'Leaf',
    examples: ['Everything About Garlic', 'Seasonal Produce Guide'],
    structureHint: `Create a comprehensive ingredient reference.`,
  },
  'diet-plan': {
    label: 'Diet Plan',
    description: 'Specialized dietary recipes',
    icon: 'Heart',
    examples: ['Keto Recipe Collection', 'Plant-Based Starter Guide'],
    structureHint: `Create diet-focused recipe content.`,
  },
  'baking-guide': {
    label: 'Baking Guide',
    description: 'Baking recipes and techniques',
    icon: 'Cake',
    examples: ['Sourdough for Beginners', 'Perfect Pie Crusts'],
    structureHint: `Create detailed baking instructions.`,
  },
};

/**
 * Pre-built Templates - Recipe Collections
 */
export const TEMPLATES: CookbookTemplate[] = [
  {
    id: 'weeknight-dinners',
    name: '30-Minute Weeknight Dinners',
    description: 'Quick and easy dinners for busy families',
    type: 'recipe-collection',
    category: 'Quick Meals',
    thumbnail: '/templates/weeknight-dinners.png',
    defaultTitle: '30-Minute Weeknight Dinners',
    defaultPrompt: 'Create a collection of quick, family-friendly dinner recipes that can be prepared in 30 minutes or less, using common pantry ingredients.',
    exampleContent: '',
    defaultDesign: {
      primaryColor: '#ea580c',
      template: 'modern-recipe',
    },
    popular: true,
    isPremium: false,
  },
  {
    id: 'healthy-meal-prep',
    name: 'Healthy Meal Prep Guide',
    description: 'Plan and prep your week in advance',
    type: 'meal-plan',
    category: 'Meal Planning',
    thumbnail: '/templates/meal-prep.png',
    defaultTitle: 'Weekly Healthy Meal Prep Guide',
    defaultPrompt: 'Create a comprehensive meal prep guide with recipes that can be prepared on Sunday and enjoyed throughout the week, focusing on balanced nutrition.',
    exampleContent: '',
    defaultDesign: {
      primaryColor: '#16a34a',
      template: 'clean-recipe',
    },
    popular: true,
    isPremium: false,
  },
  {
    id: 'comfort-food-classics',
    name: 'Comfort Food Classics',
    description: 'Cozy recipes for the soul',
    type: 'recipe-collection',
    category: 'Comfort Food',
    thumbnail: '/templates/comfort-food.png',
    defaultTitle: 'Comfort Food Classics Cookbook',
    defaultPrompt: 'Create a collection of heartwarming comfort food recipes including soups, casseroles, and classic dishes that bring warmth and nostalgia.',
    exampleContent: '',
    defaultDesign: {
      primaryColor: '#d97706',
      template: 'clean-recipe',
    },
    popular: true,
    isPremium: false,
  },
];

/**
 * Get templates by type
 */
export const getTemplatesByType = (type: CookbookType): CookbookTemplate[] => {
  return TEMPLATES.filter(t => t.type === type);
};

/**
 * Get popular templates
 */
export const getPopularTemplates = (): CookbookTemplate[] => {
  return TEMPLATES.filter(t => t.popular);
};

/**
 * Get free templates
 */
export const getFreeTemplates = (): CookbookTemplate[] => {
  return TEMPLATES.filter(t => !t.isPremium);
};

/**
 * Template categories
 */
export const TEMPLATE_CATEGORIES = [
  'Marketing',
  'Email Marketing',
  'Social Media',
  'Copywriting',
  'Business',
  'Content Marketing',
  'Productivity',
] as const;
