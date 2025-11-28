export interface AppConfig {
  pageTitle: string;
  pageDescription: string;
  companyName: string;

  supportsChatInput: boolean;
  supportsVideoInput: boolean;
  supportsScreenShare: boolean;
  isPreConnectBufferEnabled: boolean;

  logo: string;
  startButtonText: string;
  accent?: string;
  logoDark?: string;
  accentDark?: string;

  // for LiveKit Cloud Sandbox
  sandboxId?: string;
  agentName?: string;
}

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'QuickMart Express',
  pageTitle: 'QuickMart Express - Voice Ordering',
  pageDescription: 'Order groceries and food with our AI voice assistant',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/quickmart-logo.svg',
  accent: '#ff6b35',
  logoDark: '/quickmart-logo-dark.svg',
  accentDark: '#ff8c42',
  startButtonText: 'Start Ordering',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: undefined,
};
