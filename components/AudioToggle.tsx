'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { soundFx } from '@/lib/sound';

export default function AudioToggle() {
  const [muted, setMuted] = useState(false);

  const toggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    soundFx.setMuted(nextMuted);
    if (!nextMuted) {
      soundFx.playHoverTick();
    }
  };

  return (
    <button
      type="button"
      onClick={toggleSound}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-amber/20 bg-amber/[0.08] text-amber transition hover:border-amber hover:bg-amber/20"
      aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
      data-cursor={muted ? 'UNMUTE' : 'MUTE'}
    >
      {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
    </button>
  );
}
