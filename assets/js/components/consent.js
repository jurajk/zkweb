/*
* Cookie consent (vanilla-cookieconsent, loaded as js/cookieconsent.umd.js)
*
* Categories: necessary (cc_cookie), analytics (HubSpot cookies on the signup
* form page, see the "Prihlás sa" handler in main.js) and ads (Google Ads).
* Nothing from Google loads before "Reklamné" is accepted, or while ZK_ADS_ID is empty.
*/

var ZK_ADS_ID = 'AW-946515347';                    // from Data manager → Google tag
var ZK_CONVERSION_LABEL = 'qzxVCMrf77AdEJPbqsMD';  // from the "Klik na prihlášku" conversion action

window.dataLayer = window.dataLayer || [];
window.gtag = function () { window.dataLayer.push(arguments); };

function loadGoogleTag() {
  if (!ZK_ADS_ID || window.zkGtagLoaded) return;
  window.zkGtagLoaded = true;
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
  gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
  gtag('js', new Date());
  gtag('config', ZK_ADS_ID);
  CookieConsent.loadScript('https://www.googletagmanager.com/gtag/js?id=' + ZK_ADS_ID);
}

// Puts the buttons in plusko.net's order (Chcem vedieť viac. · Odmietnuť · Súhlasím, and
// Odmietnuť · Uložiť · Súhlasím in the modal) in the DOM itself, so Tab follows what is seen.
// The button groups are `display: contents` (see _cookieconsent.scss), so one group holds them all.
function orderButtons(p) {
  var group = p.modal.querySelector('.cm__btn-group, .pm__btn-group');
  ['show', 'necessary', 'save', 'all'].forEach(function (role) {
    var btn = p.modal.querySelector('[data-role="' + role + '"]');
    if (group && btn) group.appendChild(btn);
  });
}

function applyConsent() {
  if (CookieConsent.acceptedCategory('ads')) loadGoogleTag();
  var btn = document.querySelector('.cc-revisit');
  if (btn) btn.hidden = !CookieConsent.validConsent();
}

if (window.CookieConsent) {
  CookieConsent.run({
    cookie: { name: 'cc_cookie', expiresAfterDays: 182 },
    guiOptions: {
      consentModal: { layout: 'bar inline', position: 'bottom', equalWeightButtons: true, flipButtons: false },
      preferencesModal: { layout: 'box', equalWeightButtons: true, flipButtons: false }
    },
    categories: {
      necessary: { enabled: true, readOnly: true },
      analytics: {},           // HubSpot sets these on its own domain; nothing to load or clear here
      ads: { autoClear: { cookies: [{ name: /^_gcl_/ }], reloadPage: true } }
    },
    onModalReady: orderButtons,
    onConsent: applyConsent,   // first choice, and every later page load with a valid choice
    onChange: function (p) {
      if (p.changedCategories.indexOf('ads') > -1 && !CookieConsent.acceptedCategory('ads')) {
        gtag('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      }
      applyConsent();          // loads the tag if Reklamné was just accepted
      // withdrawing Reklamné triggers autoClear, which deletes _gcl_* and reloads the page
    },
    language: {
      default: 'sk',
      translations: {
        sk: {
          consentModal: {
            title: 'Záleží nám na tvojom súkromí',
            description: 'Ak súhlasíš, použijeme cookies Google Ads a formulár prihlášky (HubSpot) si uloží svoje analytické cookies. Vďaka nim vieme, koľko ľudí klikne na „Prihlás sa“ a ako funguje naša reklama. Bez súhlasu ich nepoužijeme a web funguje rovnako. Prihlásiť sa môžeš aj e-mailom.',
            acceptAllBtn: 'Súhlasím',
            acceptNecessaryBtn: 'Odmietnuť',
            showPreferencesBtn: 'Chcem vedieť viac.'
          },
          preferencesModal: {
            title: 'Prehľad o ochrane osobných údajov',
            acceptAllBtn: 'Súhlasím',
            acceptNecessaryBtn: 'Odmietnuť',
            savePreferencesBtn: 'Uložiť',
            closeIconLabel: 'Zavrieť',
            sections: [
              {
                description: 'Web zimnykurz.sk prevádzkuje Plusko. Prihláška je vo formulári HubSpot na stránke share-eu1.hsforms.com. Nevyhnutné cookies používame vždy, analytické a reklamné len s tvojím súhlasom. Voľbu môžeš kedykoľvek zmeniť alebo súhlas odvolať cez okrúhle tlačidlo v ľavom dolnom rohu stránky. Viac nájdeš v <a href="https://plusko.net/privacy-policy/" target="_blank" rel="noopener">Zásadách ochrany osobných údajov</a>.'
              },
              {
                title: 'Nevyhnutné',
                description: 'Potrebné na to, aby web a formulár prihlášky fungovali a web si pamätal tvoju voľbu. Nedajú sa vypnúť.',
                linkedCategory: 'necessary',
                cookieTable: {
                  headers: { name: 'Cookie', duration: 'Trvanie', description: 'Popis' },
                  body: [
                    { name: 'cc_cookie', duration: '6 mesiacov', description: 'Uchováva tvoju voľbu (kategórie, dátum a náhodné ID súhlasu). Nastavuje zimnykurz.sk.' },
                    { name: '__cf_bm', duration: '30 minút', description: 'HubSpot: chráni formulár prihlášky pred botmi. Nastaví sa na doménach HubSpot, keď formulár otvoríš.' }
                  ]
                }
              },
              {
                title: 'Analytické',
                description: 'Nastavuje ich HubSpot na stránke formulára prihlášky, keď ju otvoríš cez „Prihlás sa“. Merajú návštevy formulára a priradia ich k odoslanej prihláške. Poskytovateľ: HubSpot Ireland Limited. Sú uložené na doméne HubSpot, takže ich tento web nevie zmazať. Ak súhlas odvoláš, zmaž cookies domény hsforms.com v nastaveniach prehliadača.',
                linkedCategory: 'analytics',
                cookieTable: {
                  headers: { name: 'Cookie', duration: 'Trvanie', description: 'Popis' },
                  body: [
                    { name: '__hstc', duration: '6 mesiacov', description: 'HubSpot: sleduje návštevy (prvú, poslednú a aktuálnu).' },
                    { name: 'hubspotutk', duration: '6 mesiacov', description: 'HubSpot: rozpozná návštevníka a priradí jeho návštevy k odoslanej prihláške.' },
                    { name: '__hssc', duration: '30 minút', description: 'HubSpot: sleduje aktuálnu reláciu.' },
                    { name: '__hssrc', duration: 'relácia', description: 'HubSpot: zistí, či ide o novú reláciu prehliadača.' }
                  ]
                }
              },
              {
                title: 'Reklamné',
                description: 'Merajú, koľko ľudí klikne na „Prihlás sa“ po príchode z reklamy Google. Poskytovateľ: Google Ireland Limited. Google môže údaje prenášať aj do USA (EU-US Data Privacy Framework).',
                linkedCategory: 'ads',
                cookieTable: {
                  headers: { name: 'Cookie', duration: 'Trvanie', description: 'Popis' },
                  body: [
                    { name: '_gcl_au', duration: '90 dní', description: 'Google Ads: priradí kliknutie na „Prihlás sa“ k reklame.' },
                    { name: '_gcl_aw', duration: '90 dní', description: 'Google Ads: uloží identifikátor kliknutia na reklamu, ak si prišiel/prišla z reklamy.' },
                    { name: 'Cookies Google na google.com a doubleclick.net (napr. IDE)', duration: 'do 13 mesiacov', description: 'Nastavuje ich Google podľa svojich <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener">zásad</a>.' }
                  ]
                }
              }
            ]
          }
        }
      }
    }
  });
}
