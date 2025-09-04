'use client';

import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

// Types pour l'état du mixer
export interface Channel {
  id: number;
  name: string;
  type: 'input' | 'aux' | 'group' | 'master';
  level: number; // 0-100
  gain: number; // -40 to +40 dB
  mute: boolean;
  solo: boolean;
  pan: number; // -100 to +100 (L/R)
  lowCut: boolean;
  phantom: boolean; // Pour les canaux micro
  
  // EQ 4 bandes
  eq: {
    highGain: number; // ±15dB
    highMidGain: number;
    lowMidGain: number;
    lowGain: number;
    highFreq: number; // 10kHz par défaut
    highMidFreq: number; // 2.5kHz par défaut
    lowMidFreq: number; // 500Hz par défaut
    lowFreq: number; // 100Hz par défaut
  };
  
  // Compresseur
  compressor: {
    enabled: boolean;
    threshold: number; // -40 to 0 dB
    ratio: number; // 1:1 to 20:1
    attack: number; // 0.1 to 300ms
    release: number; // 10ms to 5s
    gain: number; // 0 to 20dB
  };
  
  // Gate
  gate: {
    enabled: boolean;
    threshold: number; // -80 to 0 dB
    hold: number; // 0 to 2000ms
    release: number; // 10ms to 5s
  };
  
  // Envois aux effets
  sends: {
    reverb: number; // 0-100
    delay: number; // 0-100
    chorus: number; // 0-100
  };
  
  // Métadonnées
  color: string;
  notes: string;
  
  // Meters temps réel
  meters: {
    level: number; // -60 to +10 dB
    clip: boolean;
    gate: boolean;
    comp: number; // Réduction compresseur
  };
}

export interface EffectUnit {
  id: string;
  name: string;
  type: 'reverb' | 'delay' | 'chorus' | 'compressor';
  enabled: boolean;
  parameters: Record<string, number>;
  preset: string;
}

export interface ConsoleConnection {
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  ipAddress: string | null;
  firmwareVersion: string | null;
  lastHeartbeat: number | null;
  autoReconnect: boolean;
  latency: number; // ms
}

export interface MixerState {
  // Canaux
  channels: Channel[];
  currentLayer: 'inputs' | 'aux' | 'groups';
  selectedChannels: number[];
  
  // Effets
  effects: EffectUnit[];
  
  // Master section
  masterVolume: number;
  masterMute: boolean;
  
  // Player USB
  player: {
    status: 'stopped' | 'playing' | 'paused';
    currentTrack: string | null;
    position: number; // secondes
    duration: number; // secondes
    volume: number; // 0-100
    playlist: string[];
  };
  
  // RTA (Real-Time Analyzer)
  rta: {
    enabled: boolean;
    bands: number[]; // 31 bandes 1/3 octave
    overlay: boolean; // Superposition sur faders
    source: number; // Canal source
  };
  
  // Connexion console
  connection: ConsoleConnection;
  
  // Interface utilisateur
  ui: {
    theme: 'light' | 'dark' | 'auto';
    view: 'mixer' | 'layers' | 'edit' | 'effects' | 'player' | 'rta' | 'settings';
    selectedChannel: number | null;
    showMeters: boolean;
    faderSize: 'small' | 'medium' | 'large';
    customLayout: boolean;
    sidebarOpen: boolean;
  };
  
  // Presets et shows
  presets: {
    current: string | null;
    list: Array<{
      id: string;
      name: string;
      description: string;
      channels: Partial<Channel>[];
      effects: EffectUnit[];
      masterVolume: number;
      createdAt: number;
    }>;
  };
}

export interface MixerActions {
  // Actions canaux
  setChannelLevel: (channelId: number, level: number) => void;
  setChannelMute: (channelId: number, mute: boolean) => void;
  setChannelSolo: (channelId: number, solo: boolean) => void;
  setChannelPan: (channelId: number, pan: number) => void;
  setChannelName: (channelId: number, name: string) => void;
  setChannelColor: (channelId: number, color: string) => void;
  
  // EQ
  setChannelEQ: (channelId: number, band: keyof Channel['eq'], value: number) => void;
  
  // Compresseur
  setChannelCompressor: (channelId: number, param: keyof Channel['compressor'], value: number | boolean) => void;
  
  // Gate
  setChannelGate: (channelId: number, param: keyof Channel['gate'], value: number | boolean) => void;
  
  // Envois
  setChannelSend: (channelId: number, send: keyof Channel['sends'], value: number) => void;
  
  // Layers
  setCurrentLayer: (layer: MixerState['currentLayer']) => void;
  
  // Sélection
  selectChannel: (channelId: number) => void;
  selectMultipleChannels: (channelIds: number[]) => void;
  clearSelection: () => void;
  
  // Master
  setMasterVolume: (volume: number) => void;
  setMasterMute: (mute: boolean) => void;
  
  // Player
  playTrack: () => void;
  pauseTrack: () => void;
  stopTrack: () => void;
  setPlayerVolume: (volume: number) => void;
  setPlayerPosition: (position: number) => void;
  
  // RTA
  toggleRTA: () => void;
  setRTASource: (channelId: number) => void;
  toggleRTAOverlay: () => void;
  
  // Connexion
  connect: (ipAddress: string) => Promise<boolean>;
  disconnect: () => void;
  setAutoReconnect: (enabled: boolean) => void;
  updateConnectionStatus: (status: ConsoleConnection['status']) => void;
  
  // UI
  setTheme: (theme: MixerState['ui']['theme']) => void;
  setView: (view: MixerState['ui']['view']) => void;
  setFaderSize: (size: MixerState['ui']['faderSize']) => void;
  toggleSidebar: () => void;
  toggleMeters: () => void;
  
  // Presets
  savePreset: (name: string, description: string) => void;
  loadPreset: (presetId: string) => void;
  deletePreset: (presetId: string) => void;
  exportShow: () => string;
  importShow: (showData: string) => boolean;
  
  // Utilitaires
  resetChannel: (channelId: number) => void;
  resetAllChannels: () => void;
  initializeStore: () => void;
}

// Création des canaux par défaut (24 inputs + 6 aux + 4 groupes + master)
function createDefaultChannels(): Channel[] {
  const channels: Channel[] = [];
  
  // 24 canaux d'entrée
  for (let i = 1; i <= 24; i++) {
    channels.push({
      id: i,
      name: `Ch ${i.toString().padStart(2, '0')}`,
      type: 'input',
      level: 0,
      gain: 0,
      mute: false,
      solo: false,
      pan: 0,
      lowCut: false,
      phantom: false,
      eq: {
        highGain: 0,
        highMidGain: 0,
        lowMidGain: 0,
        lowGain: 0,
        highFreq: 10000,
        highMidFreq: 2500,
        lowMidFreq: 500,
        lowFreq: 100,
      },
      compressor: {
        enabled: false,
        threshold: -20,
        ratio: 2,
        attack: 10,
        release: 100,
        gain: 0,
      },
      gate: {
        enabled: false,
        threshold: -40,
        hold: 10,
        release: 100,
      },
      sends: {
        reverb: 0,
        delay: 0,
        chorus: 0,
      },
      color: '#6750A4',
      notes: '',
      meters: {
        level: -60,
        clip: false,
        gate: false,
        comp: 0,
      },
    });
  }
  
  // 6 canaux Aux
  for (let i = 1; i <= 6; i++) {
    channels.push({
      ...channels[0],
      id: 24 + i,
      name: `Aux ${i}`,
      type: 'aux',
      color: '#FF9800',
    });
  }
  
  // 4 groupes
  for (let i = 1; i <= 4; i++) {
    channels.push({
      ...channels[0],
      id: 30 + i,
      name: `Group ${i}`,
      type: 'group',
      color: '#4CAF50',
    });
  }
  
  return channels;
}

// Store principal avec Zustand
export const useMixerStore = create<MixerState & MixerActions>()(
  devtools(
    persist(
      subscribeWithSelector((set, get) => ({
        // État initial
        channels: createDefaultChannels(),
        currentLayer: 'inputs',
        selectedChannels: [],
        
        effects: [
          {
            id: 'lexicon_reverb',
            name: 'Lexicon Reverb',
            type: 'reverb',
            enabled: true,
            parameters: {
              roomSize: 50,
              decay: 30,
              damping: 40,
              predelay: 15,
              mix: 25,
            },
            preset: 'Hall Medium',
          },
          {
            id: 'delay_stereo',
            name: 'Stereo Delay',
            type: 'delay',
            enabled: false,
            parameters: {
              time: 250,
              feedback: 35,
              highCut: 8000,
              mix: 20,
            },
            preset: 'Default',
          },
        ],
        
        masterVolume: 0,
        masterMute: false,
        
        player: {
          status: 'stopped',
          currentTrack: null,
          position: 0,
          duration: 0,
          volume: 75,
          playlist: [],
        },
        
        rta: {
          enabled: false,
          bands: new Array(31).fill(-60),
          overlay: false,
          source: 1,
        },
        
        connection: {
          status: 'disconnected',
          ipAddress: null,
          firmwareVersion: null,
          lastHeartbeat: null,
          autoReconnect: true,
          latency: 0,
        },
        
        ui: {
          theme: 'auto',
          view: 'mixer',
          selectedChannel: null,
          showMeters: true,
          faderSize: 'medium',
          customLayout: false,
          sidebarOpen: false,
        },
        
        presets: {
          current: null,
          list: [],
        },
        
        // Actions
        setChannelLevel: (channelId, level) => set((state) => ({
          channels: state.channels.map(ch => 
            ch.id === channelId ? { ...ch, level } : ch
          ),
        })),
        
        setChannelMute: (channelId, mute) => set((state) => ({
          channels: state.channels.map(ch => 
            ch.id === channelId ? { ...ch, mute } : ch
          ),
        })),
        
        setChannelSolo: (channelId, solo) => set((state) => ({
          channels: state.channels.map(ch => 
            ch.id === channelId ? { ...ch, solo } : ch
          ),
        })),
        
        setChannelPan: (channelId, pan) => set((state) => ({
          channels: state.channels.map(ch => 
            ch.id === channelId ? { ...ch, pan } : ch
          ),
        })),
        
        setChannelName: (channelId, name) => set((state) => ({
          channels: state.channels.map(ch => 
            ch.id === channelId ? { ...ch, name } : ch
          ),
        })),
        
        setChannelColor: (channelId, color) => set((state) => ({
          channels: state.channels.map(ch => 
            ch.id === channelId ? { ...ch, color } : ch
          ),
        })),
        
        setChannelEQ: (channelId, band, value) => set((state) => ({
          channels: state.channels.map(ch => 
            ch.id === channelId 
              ? { ...ch, eq: { ...ch.eq, [band]: value } }
              : ch
          ),
        })),
        
        setChannelCompressor: (channelId, param, value) => set((state) => ({
          channels: state.channels.map(ch => 
            ch.id === channelId 
              ? { ...ch, compressor: { ...ch.compressor, [param]: value } }
              : ch
          ),
        })),
        
        setChannelGate: (channelId, param, value) => set((state) => ({
          channels: state.channels.map(ch => 
            ch.id === channelId 
              ? { ...ch, gate: { ...ch.gate, [param]: value } }
              : ch
          ),
        })),
        
        setChannelSend: (channelId, send, value) => set((state) => ({
          channels: state.channels.map(ch => 
            ch.id === channelId 
              ? { ...ch, sends: { ...ch.sends, [send]: value } }
              : ch
          ),
        })),
        
        setCurrentLayer: (layer) => set({ currentLayer: layer }),
        
        selectChannel: (channelId) => set({ 
          selectedChannels: [channelId],
          ui: { ...get().ui, selectedChannel: channelId }
        }),
        
        selectMultipleChannels: (channelIds) => set({ 
          selectedChannels: channelIds 
        }),
        
        clearSelection: () => set({ 
          selectedChannels: [],
          ui: { ...get().ui, selectedChannel: null }
        }),
        
        setMasterVolume: (volume) => set({ masterVolume: volume }),
        setMasterMute: (mute) => set({ masterMute: mute }),
        
        playTrack: () => set((state) => ({
          player: { ...state.player, status: 'playing' }
        })),
        
        pauseTrack: () => set((state) => ({
          player: { ...state.player, status: 'paused' }
        })),
        
        stopTrack: () => set((state) => ({
          player: { ...state.player, status: 'stopped', position: 0 }
        })),
        
        setPlayerVolume: (volume) => set((state) => ({
          player: { ...state.player, volume }
        })),
        
        setPlayerPosition: (position) => set((state) => ({
          player: { ...state.player, position }
        })),
        
        toggleRTA: () => set((state) => ({
          rta: { ...state.rta, enabled: !state.rta.enabled }
        })),
        
        setRTASource: (channelId) => set((state) => ({
          rta: { ...state.rta, source: channelId }
        })),
        
        toggleRTAOverlay: () => set((state) => ({
          rta: { ...state.rta, overlay: !state.rta.overlay }
        })),
        
        connect: async (ipAddress) => {
          set((state) => ({
            connection: { ...state.connection, status: 'connecting', ipAddress }
          }));
          
          // Simulation de connexion
          try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            set((state) => ({
              connection: { 
                ...state.connection, 
                status: 'connected',
                firmwareVersion: 'v3.6.8043',
                lastHeartbeat: Date.now(),
                latency: Math.random() * 50 + 10
              }
            }));
            return true;
          } catch {
            set((state) => ({
              connection: { ...state.connection, status: 'error' }
            }));
            return false;
          }
        },
        
        disconnect: () => set((state) => ({
          connection: { 
            ...state.connection, 
            status: 'disconnected',
            ipAddress: null,
            firmwareVersion: null,
            lastHeartbeat: null
          }
        })),
        
        setAutoReconnect: (enabled) => set((state) => ({
          connection: { ...state.connection, autoReconnect: enabled }
        })),
        
        updateConnectionStatus: (status) => set((state) => ({
          connection: { ...state.connection, status }
        })),
        
        setTheme: (theme) => set((state) => ({
          ui: { ...state.ui, theme }
        })),
        
        setView: (view) => set((state) => ({
          ui: { ...state.ui, view }
        })),
        
        setFaderSize: (size) => set((state) => ({
          ui: { ...state.ui, faderSize: size }
        })),
        
        toggleSidebar: () => set((state) => ({
          ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen }
        })),
        
        toggleMeters: () => set((state) => ({
          ui: { ...state.ui, showMeters: !state.ui.showMeters }
        })),
        
        savePreset: (name, description) => {
          const state = get();
          const preset = {
            id: Date.now().toString(),
            name,
            description,
            channels: state.channels,
            effects: state.effects,
            masterVolume: state.masterVolume,
            createdAt: Date.now(),
          };
          
          set((state) => ({
            presets: {
              ...state.presets,
              list: [...state.presets.list, preset]
            }
          }));
        },
        
        loadPreset: (presetId) => {
          const state = get();
          const preset = state.presets.list.find(p => p.id === presetId);
          if (preset) {
            set({
              channels: preset.channels as Channel[],
              effects: preset.effects,
              masterVolume: preset.masterVolume,
              presets: { ...state.presets, current: presetId }
            });
          }
        },
        
        deletePreset: (presetId) => set((state) => ({
          presets: {
            ...state.presets,
            list: state.presets.list.filter(p => p.id !== presetId),
            current: state.presets.current === presetId ? null : state.presets.current
          }
        })),
        
        exportShow: () => {
          const state = get();
          return JSON.stringify({
            channels: state.channels,
            effects: state.effects,
            masterVolume: state.masterVolume,
            presets: state.presets,
            version: '1.0'
          });
        },
        
        importShow: (showData) => {
          try {
            const data = JSON.parse(showData);
            set({
              channels: data.channels,
              effects: data.effects,
              masterVolume: data.masterVolume,
              presets: data.presets
            });
            return true;
          } catch {
            return false;
          }
        },
        
        resetChannel: (channelId) => {
          const defaultChannels = createDefaultChannels();
          const defaultChannel = defaultChannels.find(ch => ch.id === channelId);
          if (defaultChannel) {
            set((state) => ({
              channels: state.channels.map(ch => 
                ch.id === channelId ? { ...defaultChannel, name: ch.name } : ch
              ),
            }));
          }
        },
        
        resetAllChannels: () => set({
          channels: createDefaultChannels(),
        }),
        
        initializeStore: () => {
          // Initialisation des données par défaut si nécessaire
          const state = get();
          if (state.channels.length === 0) {
            set({
              channels: createDefaultChannels(),
            });
          }
        },
      })),
      {
        name: 'soundcraft-ui24r-store',
        partialize: (state) => ({
          channels: state.channels,
          effects: state.effects,
          presets: state.presets,
          ui: state.ui,
          connection: {
            ...state.connection,
            status: 'disconnected', // Reset connection on reload
            lastHeartbeat: null
          }
        }),
      }
    ),
    {
      name: 'Soundcraft UI24R Store',
    }
  )
);