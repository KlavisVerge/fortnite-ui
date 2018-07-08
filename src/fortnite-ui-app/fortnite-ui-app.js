import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class FortniteUiApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        paper-dropdown-menu, paper-listbox, paper-input, paper-button {
          width: 250px;
          margin: auto;
          display: block;
          text-align: center;
          padding-bottom: 5px;
        }
  
        paper-button.custom:hover {
          background-color: var(--paper-light-blue-50);
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
      <paper-dropdown-menu label="Platform">
        <paper-listbox slot="dropdown-content">
          <paper-item>pc</paper-item>
          <paper-item>xbl</paper-item>
          <paper-item>psn</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
      <paper-input always-float-label label="Epic Nick-name"></paper-input>
      <paper-button toggles raised class="custom" on-tap="_invokeApi">Get Stats</paper-button>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'fortnite-ui-app'
      }
    };
  }

  _invokeApi() {
    console.log('hit function');
  }
}

window.customElements.define('fortnite-ui-app', FortniteUiApp);
