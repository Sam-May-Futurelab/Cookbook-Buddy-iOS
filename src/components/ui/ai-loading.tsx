import { motion, AnimatePresence } from 'framer-motion';
import { Sparkle, MagicWand, Brain, BookOpen, Lightbulb, CheckCircle, PencilLine, FileText, CookingPot, Carrot, Fish, Pizza } from '@phosphor-icons/react';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect, useMemo } from 'react';

interface AILoadingProps {
  progress?: number;
  currentMessage?: string;
  messages?: string[];
  variant?: 'default' | 'magic' | 'brain' | 'book';
  currentOperation?: string;
  /** Expected duration in seconds - adjusts progress speed */
  expectedDuration?: number;
}

const variantConfig = {
  default: {
    icon: Sparkle,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  magic: {
    icon: MagicWand,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  brain: {
    icon: Brain,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  book: {
    icon: BookOpen,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
};

// Generation steps with icons - cooking themed
const generationSteps = [
  { label: 'Understanding your recipe request', icon: Brain, duration: 8 },
  { label: 'Researching ingredients & techniques', icon: BookOpen, duration: 15 },
  { label: 'Writing your recipes', icon: PencilLine, duration: 60 },
  { label: 'Adding cooking tips & variations', icon: CookingPot, duration: 30 },
  { label: 'Formatting & organizing', icon: FileText, duration: 20 },
  { label: 'Final taste test', icon: CheckCircle, duration: 10 },
];

// Fun facts to show during generation - cooking themed
const funFacts = [
  'Did you know? Honey is the only food that never spoils.',
  'Pro tip: Salt your pasta water until it tastes like the ocean.',
  'Fun fact: Apples belong to the rose family, just like pears and plums.',
  'Chef secret: A dull knife is more dangerous than a sharp one.',
  'Did you know? Cranberries bounce when they are ripe.',
  'Cooking tip: Let your meat rest to keep those juices locked in!',
  'Fun fact: Wasabi is technically a member of the cabbage family.',
  'Pound cake got its name because it originally used a pound of every ingredient.',
];

export function AILoading({
  progress = 0,
  variant = 'default',
  currentOperation,
  expectedDuration = 90,
}: AILoadingProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;
  const [fakeProgress, setFakeProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [factIndex, setFactIndex] = useState(() => Math.floor(Math.random() * funFacts.length));

  // Calculate total duration from steps
  const totalStepDuration = useMemo(() =>
    generationSteps.reduce((acc, step) => acc + step.duration, 0),
    []);

  // Smart progress animation based on expected duration
  useEffect(() => {
    if (progress === 0) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setElapsedTime(elapsed);

        // Use logarithmic curve that slows down as it approaches 95%
        // This ensures we never "complete" before actual completion
        const targetProgress = Math.min(95, (1 - Math.exp(-elapsed / (expectedDuration * 0.4))) * 100);

        setFakeProgress(targetProgress);

        // Update current step based on progress
        let cumulativePercent = 0;
        for (let i = 0; i < generationSteps.length; i++) {
          cumulativePercent += (generationSteps[i].duration / totalStepDuration) * 100;
          if (targetProgress < cumulativePercent) {
            setCurrentStepIndex(i);
            break;
          }
        }
      }, 200);
      return () => clearInterval(interval);
    } else {
      setFakeProgress(progress);
    }
  }, [progress, expectedDuration, totalStepDuration]);

  // Cycle through fun facts
  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const displayProgress = Math.round(fakeProgress);
  const currentStep = generationSteps[currentStepIndex];
  const StepIcon = currentStep.icon;

  // Format elapsed time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div className="space-y-6">
      {/* Animated Icon */}
      <div className="relative flex items-center justify-center h-32">
        {/* Background glow */}
        <motion.div
          className={`absolute w-24 h-24 rounded-full ${config.bgColor} blur-xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Icon container */}
        <motion.div
          className={`relative z-10 p-6 rounded-2xl ${config.bgColor} border-2 border-primary/20`}
          animate={{
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Icon size={32} className={config.color} weight="fill" />
        </motion.div>

        {/* Orbiting ingredients */}
        {[Carrot, Fish, Pizza].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-primary"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              // Orbit around the center content
              transformOrigin: 'center center',
              // Initial offset radius
              width: '100px', 
              height: '100px',
              position: 'absolute',
            }}
          >
             <div className="absolute top-0 left-1/2 -translate-x-1/2">
               <Icon size={24} weight="fill" />
             </div>
          </motion.div>
        ))}
      </div>

      {/* Current Step Indicator */}
      <div className="text-center space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <StepIcon size={20} className={config.color} weight="bold" />
            </motion.div>
            <span className="text-lg font-medium">{currentStep.label}</span>
          </motion.div>
        </AnimatePresence>

        {currentOperation && (
          <p className="text-sm text-muted-foreground">
            {currentOperation}
          </p>
        )}
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center gap-1.5">
        {generationSteps.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${index < currentStepIndex
                ? 'bg-primary w-6'
                : index === currentStepIndex
                  ? 'bg-primary/60 w-8'
                  : 'bg-muted w-4'
              }`}
            animate={index === currentStepIndex ? { opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {elapsedTime > 0 ? `${formatTime(elapsedTime)} elapsed` : 'Starting...'}
          </span>
          <span className={config.color}>{displayProgress}%</span>
        </div>
        <Progress value={displayProgress} className="h-2" />
        {displayProgress >= 90 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-center text-muted-foreground"
          >
            Detailed recipes take a bit more time - hang tight!
          </motion.p>
        )}
      </div>

      {/* Rotating Fun Fact */}
      <AnimatePresence mode="wait">
        <motion.div
          key={factIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`text-center p-4 rounded-xl ${config.bgColor} border border-primary/10`}
        >
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Lightbulb size={16} className="text-primary flex-shrink-0" weight="fill" />
            <span>{funFacts[factIndex]}</span>
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
