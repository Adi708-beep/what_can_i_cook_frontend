import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Plus } from 'lucide-react';
import { Button } from '../common/Button';

export function TimerWidget({ initialMinutes = 10, title = 'Step Timer' }) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setSecondsLeft(initialMinutes * 60);
    setIsActive(false);
  }, [initialMinutes]);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(initialMinutes * 60);
  };
  const addMinutes = (mins) => {
    setSecondsLeft((prev) => prev + mins * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="bg-stone-900 text-white p-4 rounded-2xl shadow-elevated border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-[#2F7D4A] text-white">
          <Clock className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <span className="text-xs uppercase font-bold text-stone-400 block tracking-wider">{title}</span>
          <span className="font-mono text-3xl font-extrabold tracking-widest text-[#F3B562]">
            {formattedTime}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant={isActive ? 'danger' : 'primary'}
          onClick={toggleTimer}
          className="font-bold min-w-[100px]"
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4 mr-1" /> Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-1" /> Start
            </>
          )}
        </Button>

        <Button size="icon" variant="outline" onClick={resetTimer} className="text-white border-stone-700 hover:bg-stone-800">
          <RotateCcw className="w-4 h-4" />
        </Button>

        <Button size="sm" variant="ghost" onClick={() => addMinutes(1)} className="text-stone-300 hover:text-white text-xs">
          <Plus className="w-3.5 h-3.5 mr-1" /> +1m
        </Button>
      </div>
    </div>
  );
}
