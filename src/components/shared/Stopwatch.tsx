import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

interface StopwatchProps {
  onTimeUpdate?: (time: number) => void;
  onStart?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onReset?: () => void;
  initialTime?: number;
  autoStart?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showControls?: boolean;
  className?: string;
}

export const Stopwatch: React.FC<StopwatchProps> = ({
  onTimeUpdate,
  onStart,
  onPause,
  onStop,
  onReset,
  initialTime = 0,
  autoStart = false,
  size = 'md',
  showControls = true,
  className = ''
}) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          onTimeUpdate?.(newTime);
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, onTimeUpdate]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    onStart?.();
  };

  const handlePause = () => {
    setIsRunning(false);
    onPause?.();
  };

  const handleStop = () => {
    setIsRunning(false);
    onStop?.();
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(initialTime);
    onReset?.();
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'text-sm',
          time: 'text-lg font-mono',
          button: 'w-6 h-6 text-xs',
          icon: 'w-3 h-3'
        };
      case 'lg':
        return {
          container: 'text-lg',
          time: 'text-3xl font-mono',
          button: 'w-10 h-10 text-base',
          icon: 'w-5 h-5'
        };
      default:
        return {
          container: 'text-base',
          time: 'text-xl font-mono',
          button: 'w-8 h-8 text-sm',
          icon: 'w-4 h-4'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div className={`flex items-center gap-3 ${sizeClasses.container} ${className}`}>
      {/* Time Display */}
      <div className={`${sizeClasses.time} font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg border`}>
        {formatTime(time)}
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex items-center gap-1">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className={`${sizeClasses.button} bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors`}
              title="Iniciar"
            >
              <Icon icon="solar:play-bold" className={sizeClasses.icon} />
            </button>
          ) : (
            <button
              onClick={handlePause}
              className={`${sizeClasses.button} bg-yellow-500 hover:bg-yellow-600 text-white rounded-full flex items-center justify-center transition-colors`}
              title="Pausar"
            >
              <Icon icon="solar:pause-bold" className={sizeClasses.icon} />
            </button>
          )}

          <button
            onClick={handleStop}
            className={`${sizeClasses.button} bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors`}
            title="Parar"
          >
            <Icon icon="solar:stop-bold" className={sizeClasses.icon} />
          </button>

          <button
            onClick={handleReset}
            className={`${sizeClasses.button} bg-gray-500 hover:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors`}
            title="Resetar"
          >
            <Icon icon="solar:restart-bold" className={sizeClasses.icon} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;