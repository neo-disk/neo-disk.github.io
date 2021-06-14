import {ieFix} from './utils/ie-fix';
import {iosVhFix} from './utils/ios-vh-fix';

// import {initModals} from './modules/init-modals';
import {setHeaderScripts} from './modules/header';

// Utils
// ---------------------------------

ieFix();
iosVhFix();

// Modules
// ---------------------------------

// initModals();
setHeaderScripts();
import './modules/css-background';
import './modules/main-promo-slider';
import './modules/partners';
import './modules/contacts';
