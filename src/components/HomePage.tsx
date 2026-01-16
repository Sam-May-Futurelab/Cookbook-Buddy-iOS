import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkle,
  ChefHat,
  CookingPot,
  BookBookmark,
  BookOpen,
  Calendar,
  Globe,
  Lightbulb,
  Leaf,
  Heart,
  Cake,
  Carrot,
  Fish,
  Pizza
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { COOKBOOK_TYPES } from '@/lib/templates';
import { getPopularTemplates } from '@/lib/templates';
import type { CookbookType } from '@/lib/types';
import { triggerImpactHaptic } from '@/lib/haptics';

interface HomePageProps {
  onAuthClick: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Calendar,
  Globe,
  Lightbulb,
  Leaf,
  Heart,
  Cake
};

export function HomePage({ onAuthClick }: HomePageProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const popularTemplates = getPopularTemplates().slice(0, 4);

  const handleGetStarted = () => {
    triggerImpactHaptic('medium');
    if (user) {
      navigate('/create');
    } else {
      onAuthClick();
    }
  };

  const handleTypeSelect = (type: CookbookType) => {
    triggerImpactHaptic('light');
    if (user) {
      navigate(`/create?type=${type}`);
    } else {
      onAuthClick();
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4">
        {/* Background gradient & decorations */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-20 left-[10%] opacity-10 rotate-12 text-primary select-none">
          <Carrot size={64} weight="fill" />
        </div>
        <div className="absolute top-40 right-[15%] opacity-10 -rotate-12 text-primary select-none">
          <CookingPot size={64} weight="fill" />
        </div>
        <div className="absolute bottom-10 left-[20%] opacity-10 rotate-45 text-primary select-none">
          <Fish size={56} weight="fill" />
        </div>
        <div className="absolute bottom-20 right-[10%] opacity-10 -rotate-12 text-primary select-none hidden sm:block">
           <Pizza size={64} weight="fill" />
        </div>

        <div className="container relative mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-white/50 backdrop-blur-sm border-primary/20 text-primary-foreground shadow-sm">
              <ChefHat size={16} className="mr-2 text-primary" weight="fill" />
              Your Personal AI Sous Chef
            </Badge>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 font-serif text-foreground">
              Cook. Create. <br className="hidden sm:block" />
              <span className="text-primary italic">Preserve.</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform your scattered recipes into a beautifully designed cookbook. 
              From grandma's secret sauce to your own culinary experiments.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="xl"
                variant="default"
                onClick={handleGetStarted}
                className="gap-2 h-14 px-8 text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-full"
              >
                <BookBookmark size={22} weight="fill" />
                Start Your Cookbook
              </Button>

              <p className="text-sm font-medium text-muted-foreground/80 flex items-center gap-1.5 mt-4 sm:mt-0">
                <Sparkle size={14} className="text-primary" weight="fill" />
                Powered by Taste-Tested AI
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cookbook Types */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Cookbook Type</h2>
            <p className="text-muted-foreground">
              Select a format that fits your culinary vision
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(Object.entries(COOKBOOK_TYPES) as [CookbookType, typeof COOKBOOK_TYPES[CookbookType]][]).map(([type, info]) => {
              const IconComponent = iconMap[info.icon] || BookOpen;
              return (
                <motion.div
                  key={type}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className="cursor-pointer hover:border-primary/50 transition-colors h-full"
                    onClick={() => handleTypeSelect(type)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary">
                        <IconComponent size={28} weight="duotone" />
                      </div>
                      <h3 className="font-semibold mb-1 font-serif text-lg">{info.label}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {info.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Templates */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Templates</h2>
            <p className="text-muted-foreground">
              Start with a proven template and customize it
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTemplates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="cursor-pointer hover:border-primary/50 transition-colors h-full"
                  onClick={() => {
                    triggerImpactHaptic('light');
                    if (user) {
                      navigate(`/create?template=${template.id}`);
                    } else {
                      onAuthClick();
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-3 text-xs">
                      {COOKBOOK_TYPES[template.type].label}
                    </Badge>
                    <h3 className="font-semibold mb-2">{template.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {template.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Cookbook Buddy?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Generate professional cookbooks in under 60 seconds',
              },
              {
                icon: '🍳',
                title: 'Recipe Perfect',
                description: 'AI-crafted recipes with clear instructions and tips',
              },
              {
                icon: '📥',
                title: 'Ready to Cook',
                description: 'Export as PDF and start cooking immediately',
              },
            ].map((feature, i) => (
              <Card key={i} className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your Cookbook?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of home cooks using AI to create their recipes
          </p>
          <Button
            size="xl"
            variant="gradient"
            onClick={handleGetStarted}
            className="gap-2"
          >
            <Sparkle size={20} weight="fill" />
            Get Started Free
          </Button>
        </div>
      </section>
    </div>
  );
}
