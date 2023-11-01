import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';

export const magic = new Magic("pk_live_3D41F6E1244081D3", {
    extensions: [new OAuthExtension()],
});

magic.preload().then(() => console.log('Magic <iframe> loaded.'));
