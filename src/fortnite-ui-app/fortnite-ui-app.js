import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

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
          width: 320px;
          margin: auto;
          display: block;
          text-align: center;
          padding-bottom: 15px;
          padding-top: 15px;
        }

        paper-tabs {
          width: 400px;
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

        .flex-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }

        .display-none {
          display: none;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
      <paper-dropdown-menu label="Platform" id="platform" required auto-validate error-message="Platform is required" on-iron-select="_itemSelected">
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
        error-message="Epic Nick-name is required"
        on-keydown="_checkForEnter"></paper-input>
      <paper-button toggles raised class="custom" on-tap="_invokeApi"><paper-spinner id="spinner" active=[[active]]></paper-spinner>Get Stats</paper-button>
      <div id="tabsDiv" class="flex-container">
        <div class="filter display-none">
          <paper-tabs id="paperTabs" scrollable>
            <paper-tab id="tabZero" on-tap="_displayLifetimeStats">Lifetime Statistics</paper-tab>
            <paper-tab on-tap="_displayRecentMatches">Recent Matches</paper-tab>
          </paper-tabs>
        </div>
      </div>
      <div id="searchResults">
        <div class="flex-container">
          <div class="filter display-none">
            <span>Epic User Handle: </span>
            <span>[[epicUserHandle]]</span>
          </div>
        </div>
        <div class="flex-container">
          <div class="filter display-none">
            <span>Lifetime Wins: </span>
            <span>[[lifetimeWins]]</span>
          </div>
        </div>
        <div class="flex-container">
          <div class="filter display-none">
            <span>Lifetime Kills: </span>
            <span>[[lifetimeKills]]</span>
          </div>
        </div>
        <div class="flex-container">
          <div class="filter display-none">
            <span>Lifetime Kill/Death Ratio: </span>
            <span>[[lifetimeKd]]</span>
          </div>
        </div>
        <div class="flex-container">
          <div class="filter display-none">
            <span>Lifetime Score: </span>
            <span>[[lifetimeScore]]</span>
          </div>
        </div>
        <div class="flex-container">
          <div class="filter display-none">
            <span>Lifetime Matches Played: </span>
            <span>[[lifetimeMatchesPlayed]]</span>
          </div>
        </div>
        <div class="flex-container">
          <div class="filter display-none">
            <span>Lifetime Win Percentage: </span>
            <span>[[lifetimeWinPercent]]</span>
          </div>
        </div>
        <div class="flex-container">
          <div class="filter display-none">
            <span>Lifetime Top 3s: </span>
            <span>[[lifetimeTop3s]]</span>
          </div>
        </div>
        <div class="flex-container">
          <div class="filter display-none">
            <span>Lifetime Top 5s: </span>
            <span>[[lifetimeTop5s]]</span>
          </div>
        </div>
        <div class="flex-container">
          <div class="filter display-none">
            <span>Lifetime Top 6s: </span>
            <span>[[lifetimeTop6s]]</span>
          </div>
        </div>
        <div class="flex-container">
          <div class="filter display-none">
            <span>Lifetime Top 10s: </span>
            <span>[[lifetimeTop10s]]</span>
          </div>
        </div>
        <div class="flex-container">
          <div class="filter display-none">
            <span>Lifetime Top 12s: </span>
            <span>[[lifetimeTop12s]]</span>
          </div>
        </div>
        <div class="flex-container">
          <div class="filter display-none">
            <span>Lifetime Top 25s: </span>
            <span>[[lifetimeTop25s]]</span>
          </div>
        </div>
      </div>
      <div id="recentMatches">
        <div class="flex-container">
          <div class="filter display-none">
            <span>Epic User Handle: </span>
            <span>[[epicUserHandle]]</span>
          </div>
        </div>
        <div class="filter display-none">
          <template is="dom-repeat" items="[[recentMatchesRepeat]]">
            <div class="flex-container">
              <span>Match ID: </span>
              <span>[[item.id]]</span>
            </div>
            <div class="flex-container">
              <span>Kills: </span>
              <span>[[item.kills]]</span>
            </div>
            <div class="flex-container">
              <span>Minutes Played: </span>
              <span>[[item.minutesPlayed]]</span>
            </div>
            <div class="flex-container">
              <span>Match ID: </span>
              <span>[[item.id]]</span>
            </div>
            <div class="flex-container">
              <span>Result: </span>
              <span>[[item.result]]</span>
            </div>
          </template>
        </div>
      </div>
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
      },
      epicUserHandle: {
        type: String
      },
      lifetimeWins: {
        type: String
      },
      lifetimeTop5s: {
        type: String
      },
      lifetimeTop3s: {
        type: String
      },
      lifetimeTop6s: {
        type: String
      },
      lifetimeTop10s: {
        type: String
      },
      lifetimeTop12s: {
        type: String
      },
      lifetimeTop25s: {
        type: String
      },
      lifetimeScore: {
        type: String
      },
      lifetimeMatchesPlayed: {
        type: String
      },
      lifetimeWinPercent: {
        type: String
      },
      lifetimeKills: {
        type: String
      },
      lifetimeKd: {
        type: String
      },
      recentMatchesRepeat: {
        type: Array
      }
    };
  }

  _invokeApi() {
    this.$.spinner.active = true;
    this._hideTabs();
    this._hideSearch();
    this._hideRecentMatches();
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
        this._showTabs();
        this._showSearch();
        this.$.paperTabs._tabChanged(this.$.tabZero, null);
        this.$.tabZero.setAttribute("focused", "");
        this.$.spinner.active = false;
        this.$.spinner.classList.remove('active');
        let res = JSON.parse(response);
        this.epicUserHandle = res.epicUserHandle;
        for(var i = 0; i < res.lifeTimeStats.length; i++){
          if(res.lifeTimeStats[i].key === 'Wins'){
            this.lifetimeWins = res.lifeTimeStats[i].value;
          } else if(res.lifeTimeStats[i].key === 'Top 5s'){
            this.lifetimeTop5s = res.lifeTimeStats[i].value;
          } else if(res.lifeTimeStats[i].key === 'Top 3s'){
            this.lifetimeTop3s = res.lifeTimeStats[i].value;
          } else if(res.lifeTimeStats[i].key === 'Top 6s'){
            this.lifetimeTop6s = res.lifeTimeStats[i].value;
          } else if(res.lifeTimeStats[i].key === 'Top 10'){
            this.lifetimeTop10s = res.lifeTimeStats[i].value;
          } else if(res.lifeTimeStats[i].key === 'Top 12s'){
            this.lifetimeTop12s = res.lifeTimeStats[i].value;
          } else if(res.lifeTimeStats[i].key === 'Top 25s'){
            this.lifetimeTop25s = res.lifeTimeStats[i].value;
          } else if(res.lifeTimeStats[i].key === 'Score'){
            this.lifetimeScore = res.lifeTimeStats[i].value;
          } else if(res.lifeTimeStats[i].key === 'Matches Played'){
            this.lifetimeMatchesPlayed = res.lifeTimeStats[i].value;
          } else if(res.lifeTimeStats[i].key === 'Win%'){
            this.lifetimeWinPercent = res.lifeTimeStats[i].value;
          } else if(res.lifeTimeStats[i].key === 'Kills'){
            this.lifetimeKills = res.lifeTimeStats[i].value;
          } else if(res.lifeTimeStats[i].key === 'K/d'){
            this.lifetimeKd = res.lifeTimeStats[i].value;
          }
        }
        this.recentMatchesRepeat = res.recentMatches;
        this.recentMatchesRepeat.sort(function(a, b) {
          return a.id - b.id;
        });
        for(var i = 0; i < this.recentMatchesRepeat.length; i++){
          if(this.recentMatchesRepeat[i].top1 === 1){
            this.recentMatchesRepeat[i].result = "Victory!"
          } else if(this.recentMatchesRepeat[i].top3 === 1){
            this.recentMatchesRepeat[i].result = "Top 3 finish"
          } else if(this.recentMatchesRepeat[i].top5 === 1){
            this.recentMatchesRepeat[i].result = "Top 5 finish"
          } else if(this.recentMatchesRepeat[i].top6 === 1){
            this.recentMatchesRepeat[i].result = "Sixth place finish"
          } else if(this.recentMatchesRepeat[i].top10 === 1){
            this.recentMatchesRepeat[i].result = "Top 10 finish"
          } else if(this.recentMatchesRepeat[i].top12 === 1){
            this.recentMatchesRepeat[i].result = "Top 12 finish"
          } else if(this.recentMatchesRepeat[i].top25 === 1){
            this.recentMatchesRepeat[i].result = "Top 25 finish"
          } else {
            this.recentMatchesRepeat[i].result = "Outside of the top 25"
          }
          this.recentMatchesRepeat.dateCollected = new Date(this.recentMatchesRepeat[i].dateCollected);
        }
      });
    }else{
      this.$.spinner.active = false;
      this.$.spinner.classList.remove('active');
    }
  }

  _showSearch() {
    let divs = this.$.searchResults.querySelectorAll("div");
    divs.forEach(function(divItem) {
      if(divItem.classList.contains('filter')){
        divItem.classList.remove('display-none');
      }
    });
  }

  _hideSearch() {
    let divsShown = this.$.searchResults.querySelectorAll("div");
    divsShown.forEach(function(divItem) {
      if(divItem.classList.contains('filter')){
        divItem.classList.add('display-none');
      }
    });
  }

  _showTabs() {
    let divs = this.$.tabsDiv.querySelectorAll("div");
    divs.forEach(function(divItem) {
      if(divItem.classList.contains('filter')){
        divItem.classList.remove('display-none');
      }
    });
  }

  _hideTabs() {
    let divsShown = this.$.tabsDiv.querySelectorAll("div");
    divsShown.forEach(function(divItem) {
      if(divItem.classList.contains('filter')){
        divItem.classList.add('display-none');
      }
    });
  }

  _showRecentMatches() {
    let divsShown = this.$.recentMatches.querySelectorAll("div");
    divsShown.forEach(function(divItem) {
      if(divItem.classList.contains('filter')){
        divItem.classList.remove('display-none');
      }
    });
  }

  _hideRecentMatches() {
    let divsShown = this.$.recentMatches.querySelectorAll("div");
    divsShown.forEach(function(divItem) {
      if(divItem.classList.contains('filter')){
        divItem.classList.add('display-none');
      }
    });
  }

  _itemSelected() {
    this.$.platform.validate();
  }

  _checkForEnter(key) {
    if (key.keyCode === 13) {
      this._invokeApi();
    }
  }

  _displayLifetimeStats() {
    this._hideRecentMatches();
    this._showSearch();
  }

  _displayRecentMatches() {
    this._hideSearch();
    this._showRecentMatches();
  }
}

window.customElements.define('fortnite-ui-app', FortniteUiApp);
