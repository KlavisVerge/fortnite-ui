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
      <div id='whatever'></div>
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
    var url = 'https://3oemw4weak.execute-api.us-east-1.amazonaws.com/api/fortnite-api';
    var data = {platform: 'pc', epicNickname: 'KlavisVerge'};

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {console.log('Success:', response); this.$.whatever.innerHTML = response;});
  }
}

window.customElements.define('fortnite-ui-app', FortniteUiApp);
