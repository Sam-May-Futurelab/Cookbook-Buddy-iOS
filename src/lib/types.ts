// ============================================
// COOKBOOK DATA MODELS
// ============================================

/**
 * Cookbook Type
 */
export type CookbookType = 'recipe-collection' | 'meal-plan' | 'cuisine-guide' | 'cooking-tips' | 'ingredient-guide' | 'diet-plan' | 'baking-guide';

/**
 * Generation tone options
 */
export type Tone = 'professional' | 'friendly' | 'educational' | 'persuasive';

/**
 * Content length options
 */
export type Length = 'short' | 'standard' | 'detailed';

/**
 * Cookbook status
 */
export type CookbookStatus = 'draft' | 'generating' | 'complete' | 'error';

/**
 * Core Cookbook Entity
 * This is the main data structure
 */
export interface Cookbook {
  id: string;
  userId: string;

  // Content
  title: string;
  subtitle?: string;
  description?: string;
  type: CookbookType;
  content: string;           // Generated HTML content
  rawContent?: string;       // Plain text version

  // Targeting
  targetAudience?: string;
  problemSolved?: string;
  niche?: string;

  // Generation settings
  tone: Tone;
  length: Length;
  prompt?: string;           // Original user prompt

  // Design
  design: CookbookDesign;

  // Metadata
  status: CookbookStatus;
  wordCount: number;
  itemCount?: number;        // For recipe counts
  createdAt: Date;
  updatedAt: Date;
  generatedAt?: Date;

  // Export tracking
  exportedFormats?: ('pdf' | 'png' | 'html')[];
  downloadCount: number;
}

/**
 * Cookbook Design Settings
 */
export interface CookbookDesign {
  // Colors
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;

  // Typography
  fontFamily: string;
  titleSize: 'small' | 'medium' | 'large';

  // Layout
  template: string;          // Template ID
  showLogo: boolean;
  logoUrl?: string;

  // Branding
  companyName?: string;
  websiteUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
}

/**
 * Cookbook Template
 */
export interface CookbookTemplate {
  id: string;
  name: string;
  description: string;
  type: CookbookType;
  category: string;
  thumbnail: string;

  // Pre-filled content
  defaultTitle: string;
  defaultPrompt: string;
  exampleContent: string;

  // Design defaults
  defaultDesign: Partial<CookbookDesign>;

  // Metadata
  popular: boolean;
  isPremium: boolean;
}

/**
 * User Profile
 */
export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;

  // Subscription
  plan: 'free' | 'pro' | 'unlimited';
  subscriptionStatus?: 'active' | 'cancelled' | 'expired' | 'lifetime';
  subscriptionEndDate?: Date;
  purchaseDate?: Date;

  // Usage
  cookbooksCreated: number;

  // Preferences
  defaultTone?: Tone;
  defaultDesign?: Partial<CookbookDesign>;

  createdAt: Date;
  updatedAt: Date;
}

/**
 * Usage Limits by Plan
 */
export interface UsageLimits {
  maxCookbooks: number;
  exportFormats: ('pdf' | 'html')[];
  premiumTemplates: boolean;
  priorityGeneration: boolean;
}

export const PLAN_LIMITS: Record<UserProfile['plan'], UsageLimits> = {
  free: {
    maxCookbooks: 1,
    exportFormats: ['pdf'],
    premiumTemplates: false,
    priorityGeneration: false,
  },
  pro: {
    maxCookbooks: -1, // Unlimited (monthly subscription)
    exportFormats: ['pdf', 'html'],
    premiumTemplates: true,
    priorityGeneration: true,
  },
  unlimited: {
    maxCookbooks: -1, // Unlimited (one-time purchase)
    exportFormats: ['pdf', 'html'],
    premiumTemplates: true,
    priorityGeneration: true,
  },
};

/**
 * AI Generation Request
 */
export interface GenerationRequest {
  type: CookbookType;
  title: string;
  prompt: string;
  targetAudience?: string;
  niche?: string;
  tone: Tone;
  length: Length;
  itemCount?: number;        // For recipe counts
  userId?: string;           // For rate limiting
}

/**
 * AI Generation Response
 */
export interface GenerationResponse {
  success: boolean;
  content: string;
  rawContent: string;
  wordCount: number;
  itemCount?: number;
  error?: string;
}

// ============================================
// COMPARISON: Cookbook vs EbookProject
// ============================================
/**
 * EbookProject (Inkfluence) has:
 * - chapters: Chapter[] (array of chapter content)
 * - coverDesign: CoverDesign (complex cover settings)
 * - brandConfig: BrandConfig
 * - category, targetAudience
 * - Multiple export formats
 * - Writing analytics
 * 
 * Cookbook (this app) has:
 * - Single content block (no chapters)
 * - Simpler design settings
 * - Type-specific templates
 * - Focus on recipe collections
 * - Quick generation & export
 */

// Legacy aliases for compatibility
export type LeadMagnetType = CookbookType;
export type LeadMagnetStatus = CookbookStatus;
export type LeadMagnet = Cookbook;
export type LeadMagnetDesign = CookbookDesign;
export type LeadMagnetTemplate = CookbookTemplate;
