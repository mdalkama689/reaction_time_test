// Audio contexts for different action types
const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

export const playSound = (type: 'ready' | 'click' | 'result' | 'error') => {
  // Create a new oscillator for each sound
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Configure sound based on type
  switch (type) {
    case 'ready':
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
      break;
      
    case 'click':
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(660, audioContext.currentTime); // E5
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.15);
      break;
      
    case 'result':
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.stop(audioContext.currentTime + 0.3);
      break;
      
    case 'error':
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      oscillator.start();
      oscillator.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 0.2);
      oscillator.stop(audioContext.currentTime + 0.2);
      break;
  }
};

// Resume audio context on user interaction (needed for browsers that suspend audio contexts)
export const initAudioContext = () => {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
};