/*
  Logger must be imported first in order to log any uncaught exception
  thrown during the modules initialization

  Logger is supposed to be imported here and in gatsby-browser.js
  The logger is imported here in case gatsby-browser.js is not loaded
*/
import '../../logic/app-internals/logging/logger';

export { _RootFrameImpl as RootFrame } from './root-frame-impl';
