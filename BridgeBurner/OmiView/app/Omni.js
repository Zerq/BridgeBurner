import { OmniBind } from './OmniBind.js';
import { OmniView } from './OmniView.js';
export class Omni {
    static run() {
        const customElements = window.customElements;
        customElements.define('o-view', OmniView);
        customElements.define('o-bind', OmniBind);
    }
}
