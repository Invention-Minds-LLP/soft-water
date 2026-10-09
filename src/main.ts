import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { SoftWater } from './app/softwater';

// Starts the site. (The old app.config.ts is merged in here.)
bootstrapApplication(SoftWater, { providers: [provideBrowserGlobalErrorListeners()] }).catch((err) => console.error(err));
