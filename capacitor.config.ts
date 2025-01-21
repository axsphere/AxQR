import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'AxQR',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Permissions: {
      camera: true
    }
  }
};

export default config;
