import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import 'api-nav/api-nav.js';
import 'reddit-ui/reddit-ui.js';
import 'twitch-ui/twitch-ui.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-tabs/paper-tabs.js';

/**
 * @customElement
 * @polymer
 */
class FortniteUiApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        paper-radio-group, paper-input, paper-button {
          width: 100%;
          text-align: center;
          padding: 15px 0px 15px 0px;
          margin-left: 0;
          margin-right: 0;
        }

        paper-item {
          justify-content: center;
        }
        
        paper-tabs {
          color: var(--paper-blue-900);
          --paper-tabs-selection-bar-color: var(--paper-blue-900);
          --paper-tab-ink: var(--paper-blue-900);
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

        paper-card {
          width: 100%;
        }
        
        .flex-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          background: #edeef0;
        }

        .bg-container {
          background: #edeef0;
        }

        .twitch-col {
          flex: 1;
          order 3;
          padding: 0 15px 0 15px;
        }

        .search-col {
          flex: 1;
          order: 1;
        }

        .reddit-col {
          flex: 1;
          order: 2;
          padding: 0 15px 0 15px;
        }

        .display-none {
          display: none;
        }

        api-nav {
          padding: 15px;
        }
        
        @media (max-width: 480px) {
          .flex-container {
            display: flex;
            flex-direction: row;
          }

          .twitch-col {
            display: flex;
            flex-direction: row;
            order: 2;
            flex-grow: unset;
            flex-shrink: unset;
            flex-basis:unset;
            padding: 0 5px 0 5px;
          }

          .search-col {
            display: flex;
            flex-direction: column;
            order: 1;
            flex-grow: unset;
            flex-shrink: unset;
            flex-basis:unset;
            width: 100%;
            align-items: center;
            padding: 0 5px 0 5px;
          }

          .reddit-col {
            display: flex;
            flex-direction: row;
            order: 3;
            flex-grow: unset;
            flex-shrink: unset;
            flex-basis:unset;
            padding: 0;
            padding: 0 5px 0 5px;
          }
        }
      </style>
      <div class="bg-container">
        <api-nav></api-nav>
      </div>
      <div class="flex-container">
        <div class="twitch-col">
          <twitch-ui gamename="fortnite"></twitch-ui>
        </div>
        <div class="search-col">
          <paper-card>
            <paper-item>Platform</paper-item>
            <paper-radio-group id="platform" label="Platform" selected="pc">
              <paper-radio-button name="pc">pc</paper-radio-button>
              <paper-radio-button name="xbl">xbl</paper-radio-button>
              <paper-radio-button name="psn">psn</paper-radio-button>
            </paper-radio-group>
            <paper-input 
              always-float-label
              label="Epic Nick-name"
              id="epicNickName"
              required
              auto-validate
              error-message="Epic Nick-name is required"
              on-keydown="_checkForEnter"></paper-input>
            <paper-button toggles raised class="custom" on-tap="_invokeApi"><paper-spinner id="spinner" active=[[active]]></paper-spinner>Get Stats</paper-button>
            <div id="tabsDiv">
              <div class="filter display-none">
                <paper-tabs id="paperTabs">
                  <paper-tab id="tabZero" on-tap="_displayLifetimeStats">Lifetime Statistics</paper-tab>
                  <paper-tab on-tap="_displayRecentMatches">Recent Matches</paper-tab>
                </paper-tabs>
              </div>
            </paper-card>
          </div>
          <div id="searchResults">
            <div class="filter display-none">
              <paper-item>Epic User Handle: [[epicUserHandle]]</paper-item>
              <paper-item>Lifetime Wins: [[lifetimeWins]]</paper-item>
              <paper-item>Lifetime Kills: [[lifetimeKills]]</paper-item>
              <paper-item>Lifetime Kill/Death Ratio: [[lifetimeKd]]</paper-item>
              <paper-item>Lifetime Score: [[lifetimeScore]]</paper-item>
              <paper-item>Lifetime Matches Played: [[lifetimeMatchesPlayed]]</paper-item>
              <paper-item>Lifetime Win Percentage: [[lifetimeWinPercent]]</paper-item>
              <paper-item>Lifetime Top 3s: [[lifetimeTop3s]]</paper-item>
              <paper-item>Lifetime Top 5s: [[lifetimeTop5s]]</paper-item>
              <paper-item>Lifetime Top 6s: [[lifetimeTop6s]]</paper-item>
              <paper-item>Lifetime Top 10s: [[lifetimeTop10s]]</paper-item>
              <paper-item>Lifetime Top 12s: [[lifetimeTop12s]]</paper-item>
              <paper-item>Lifetime Top 25s: [[lifetimeTop25s]]</paper-item>
            </div>
          </div>
          <div id="recentMatches">
            <div class="filter display-none">
              <paper-item>Epic User Handle: [[epicUserHandle]]</paper-item>
              <template is="dom-repeat" items="[[recentMatchesRepeat]]">
                <paper-item>Match ID: [[item.id]]</paper-item>
                <paper-item>Kills: [[item.kills]]</paper-item>
                <paper-item>Minutes Played: [[item.minutesPlayed]]</paper-item>
                <paper-item>Date: [[item.dateCollected]]</paper-item>
                <paper-item>Result: [[item.result]]</paper-item>
                <hr/>
              </template>
            </div>
          </div>
          <div id="playerNotFound">
            <div class="filter display-none">
              <paper-item>Player Not found!</paper-item>
            </div>
          </div>
          <div id="generalError">
            <div class="filter display-none">
              <paper-item>Error processing request.</paper-item>
            </div>
          </div>
        </div>
        <div class="reddit-col">
          <reddit-ui game="Fortnite" displayname="Fortnite"></reddit-ui>
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
    this._hideElement(this.$.tabsDiv);
    this._hideElement(this.$.searchResults);
    this._hideElement(this.$.recentMatches);
    this.$.spinner.classList.add('active');
    const epicNNValidate = this.$.epicNickName.validate();
    if(epicNNValidate){
      var url = 'https://xupmhdl2g5.execute-api.us-east-1.amazonaws.com/api/fortnite-api?platform=' + this.$.platform.selected + '&epicNickname=' + this.$.epicNickName.value;
      let err = false;

      fetch(url, {
        method: 'GET',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => {
        this.$.spinner.active = false;
        this.$.spinner.classList.remove('active');
        console.error('Error:', error);
        this._hideElement(this.$.playerNotFound);
        this._hideElement(this.$.tabsDiv);
        this._hideElement(this.$.searchResults);
        this._hideElement(this.$.recentMatches);
        this._showElement(this.$.generalError);
        err = true;
      })
      .then(response => {
        if(err){
          return;
        }
        let res = JSON.parse(response);
        this._hideElement(this.$.generalError);
        this.$.spinner.active = false;
        this.$.spinner.classList.remove('active');
        if(res.error
          && res.error === 'Player Not Found'){
            this._showElement(this.$.playerNotFound);
            this._hideElement(this.$.tabsDiv);
            this._hideElement(this.$.searchResults);
            this._hideElement(this.$.recentMatches);
        } else {
          this._hideElement(this.$.playerNotFound);
          this._showElement(this.$.tabsDiv);
          this._showElement(this.$.searchResults);
          this.$.paperTabs._tabChanged(this.$.tabZero, null);
          this.$.tabZero.setAttribute("focused", "");
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
        }
      });
    }else{
      this.$.spinner.active = false;
      this.$.spinner.classList.remove('active');
    }
  }

  _showElement(element) {
    let divsShown = element.querySelectorAll("div");
    divsShown.forEach(function(divItem) {
      if(divItem.classList.contains('filter')){
        divItem.classList.remove('display-none');
      }
    });
  }

  _hideElement(element) {
    let divsShown = element.querySelectorAll("div");
    divsShown.forEach(function(divItem) {
      if(divItem.classList.contains('filter')){
        divItem.classList.add('display-none');
      }
    });
  }

  _checkForEnter(key) {
    if (key.keyCode === 13) {
      this._invokeApi();
    }
  }

  _displayLifetimeStats() {
    this._hideElement(this.$.recentMatches);
    this._showElement(this.$.searchResults);
  }

  _displayRecentMatches() {
    this._hideElement(this.$.searchResults);
    this._showElement(this.$.recentMatches);
  }
}

window.customElements.define('fortnite-ui-app', FortniteUiApp);
