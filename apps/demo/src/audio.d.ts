/**
 * Configure once — use everywhere.
 * In a real project these paths would point to your actual audio files.
 */
export declare const audio: {
    useAudioStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<import("@sm4ckdev/audio-react").AudioStoreState>, "setState" | "persist"> & {
        setState(partial: import("@sm4ckdev/audio-react").AudioStoreState | Partial<import("@sm4ckdev/audio-react").AudioStoreState> | ((state: import("@sm4ckdev/audio-react").AudioStoreState) => import("@sm4ckdev/audio-react").AudioStoreState | Partial<import("@sm4ckdev/audio-react").AudioStoreState>), replace?: false | undefined): unknown;
        setState(state: import("@sm4ckdev/audio-react").AudioStoreState | ((state: import("@sm4ckdev/audio-react").AudioStoreState) => import("@sm4ckdev/audio-react").AudioStoreState), replace: true): unknown;
        persist: {
            setOptions: (options: Partial<import("zustand/middleware").PersistOptions<import("@sm4ckdev/audio-react").AudioStoreState, unknown, unknown>>) => void;
            clearStorage: () => void;
            rehydrate: () => Promise<void> | void;
            hasHydrated: () => boolean;
            onHydrate: (fn: (state: import("@sm4ckdev/audio-react").AudioStoreState) => void) => () => void;
            onFinishHydration: (fn: (state: import("@sm4ckdev/audio-react").AudioStoreState) => void) => () => void;
            getOptions: () => Partial<import("zustand/middleware").PersistOptions<import("@sm4ckdev/audio-react").AudioStoreState, unknown, unknown>>;
        };
    }>;
    useAudioControls: () => {
        musicVolume: number;
        interfaceVolume: number;
        effectsVolume: number;
        isMuted: boolean;
        setMusicVolume: (v: number) => void;
        setInterfaceVolume: (v: number) => void;
        setEffectsVolume: (v: number) => void;
        toggleMute: () => void;
        setMuted: (muted: boolean) => void;
    };
    useBackgroundMusic: () => {
        playTrack: (key: "main" | "battle" | "menu") => void;
        stopMusic: () => void;
        pauseMusic: () => void;
        resumeMusic: () => void;
    };
    usePreloadMusic: () => () => void;
    useHoverSound: () => () => void;
    useClickSound: () => () => void;
    useModalSound: () => void;
    useAudioEvents: (connector: import("@sm4ckdev/audio-connectors").AudioEventConnector, eventMap: Record<string, string>) => void;
};
//# sourceMappingURL=audio.d.ts.map