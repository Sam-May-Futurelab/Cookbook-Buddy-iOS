import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cookbook } from '@/lib/types';

interface CookbookState {
  // Current cookbook being created/edited
  current: Partial<Cookbook> | null;

  // Generation state
  isGenerating: boolean;
  generationProgress: number;
  generationMessage: string;

  // User's cookbooks (persisted locally)
  cookbooks: Cookbook[];
  isLoading: boolean;

  // Actions
  setCurrent: (cookbook: Partial<Cookbook> | null) => void;
  updateCurrent: (updates: Partial<Cookbook>) => void;
  setGenerating: (isGenerating: boolean, message?: string) => void;
  setProgress: (progress: number) => void;
  setCookbooks: (cookbooks: Cookbook[]) => void;
  addCookbook: (cookbook: Cookbook) => void;
  updateCookbook: (id: string, updates: Partial<Cookbook>) => void;
  removeCookbook: (id: string) => void;
  reset: () => void;
}

const initialState = {
  current: null,
  isGenerating: false,
  generationProgress: 0,
  generationMessage: '',
  cookbooks: [],
  isLoading: false,
};

export const useCookbookStore = create<CookbookState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrent: (cookbook) => set({ current: cookbook }),

      updateCurrent: (updates) => set((state) => ({
        current: state.current ? { ...state.current, ...updates } : updates,
      })),

      setGenerating: (isGenerating, message = '') => set({
        isGenerating,
        generationMessage: message,
        generationProgress: isGenerating ? 0 : get().generationProgress,
      }),

      setProgress: (progress) => set({ generationProgress: progress }),

      setCookbooks: (cookbooks) => set({ cookbooks, isLoading: false }),

      addCookbook: (cookbook) => set((state) => ({
        cookbooks: [cookbook, ...state.cookbooks],
      })),

      updateCookbook: (id, updates) => set((state) => ({
        cookbooks: state.cookbooks.map((cb) =>
          cb.id === id ? { ...cb, ...updates, updatedAt: new Date() } : cb
        ),
      })),

      removeCookbook: (id) => set((state) => ({
        cookbooks: state.cookbooks.filter((cb) => cb.id !== id),
      })),

      reset: () => set(initialState),
    }),
    {
      name: 'cookbook-storage',
      partialize: (state) => ({
        cookbooks: state.cookbooks,
      }),
    }
  )
);

// Legacy alias for compatibility
export const useLeadMagnetStore = useCookbookStore;

// Selector hooks for specific parts of state
export const useCurrentCookbook = () => useCookbookStore((s) => s.current);
export const useCurrentLeadMagnet = useCurrentCookbook; // Legacy alias
export const useIsGenerating = () => useCookbookStore((s) => s.isGenerating);
export const useGenerationProgress = () => useCookbookStore((s) => ({
  progress: s.generationProgress,
  message: s.generationMessage,
}));
