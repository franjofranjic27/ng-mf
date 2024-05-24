import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run address:serve:development',
        production: 'nx run address:serve:production',
      },
      ciWebServerCommand: 'nx run address:serve-static',
    }),
    baseUrl: 'http://localhost:4203',
  },
});
