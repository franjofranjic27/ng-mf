import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'address',
  exposes: {
    './Routes': 'apps/address/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
