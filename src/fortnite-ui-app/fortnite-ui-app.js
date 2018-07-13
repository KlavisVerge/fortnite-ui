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
          padding-bottom: 15px;
        }
  
        paper-button.custom:hover {
          background-color: var(--paper-light-blue-50);
        }

        paper-spinner {
          padding: 0;
          max-width: 0;
          max-height: 0;
        }

        paper-spinner.active {
          max-width: initial;
          max-height: initial;
          height: 15px;
          width: 15px;
          margin: 0px 0px 0px -15px
        }

        paper-input-error {
          padding: 5 0 5 0;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
      <paper-dropdown-menu label="Platform" id="platform" required auto-validate error-message="Platform is required">
        <paper-listbox slot="dropdown-content">
          <paper-item>pc</paper-item>
          <paper-item>xbl</paper-item>
          <paper-item>psn</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
      <paper-input 
        always-float-label
        label="Epic Nick-name"
        id="epicNickName"
        required
        auto-validate
        error-message="Epic Nick-name is required"></paper-input>
      <paper-button toggles raised class="custom" on-tap="_invokeApi"><paper-spinner id="spinner" active=[[active]]></paper-spinner>Get Stats</paper-button>
      <div id='whatever'></div>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'fortnite-ui-app'
      },
      active: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      }
    };
  }

  _invokeApi() {
    this.$.spinner.active = true;
    this.$.spinner.classList.add('active');
    const platValidate = this.$.platform.validate();
    const epicNNValidate = this.$.epicNickName.validate();
    if(platValidate && epicNNValidate){
      var url = 'https://3oemw4weak.execute-api.us-east-1.amazonaws.com/api/fortnite-api';
      var data = {platform: this.$.platform.value, epicNickname: this.$.epicNickName.value};

      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => {
        this.$.spinner.active = false;
        this.$.spinner.classList.remove('active');
        console.error('Error:', error)
      })
      .then(response => {
        console.log('Success:', response);
        this.$.spinner.active = false;
        this.$.spinner.classList.remove('active');
        this.$.whatever.innerHTML = response;
      });
    }else{
      this.$.spinner.active = false;
      this.$.spinner.classList.remove('active');
    }
  }
}

window.customElements.define('fortnite-ui-app', FortniteUiApp);
