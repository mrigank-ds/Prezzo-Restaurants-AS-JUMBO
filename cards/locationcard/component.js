{{> cards/card_component componentName='locationcard' }}

class locationcardCardComponent extends BaseCard['locationcard'] {
  constructor(config = {}, systemConfig = {}) {
    super(config, systemConfig);
  }

  onMount() {
    const onVerticalFullPageMap = !!document.querySelector('.js-answersVerticalFullPageMap');
    onVerticalFullPageMap && registerVerticalFullPageMapCardListeners(this);
    super.onMount();


    const self = this;
    const tabLinks = self._container.querySelectorAll(".tablinks");

    // var tabLinks = document.querySelectorAll(".tablinks");  

    tabLinks.forEach(function(elTab) {
      
      var tabLinksTabsId = elTab.dataset.tabsid;
      
      elTab.addEventListener("click", function (el) {

        var tabsId = el.currentTarget.dataset.tabsid;           
        if( tabLinksTabsId === tabsId ){
                    
          var element = document.getElementById(tabsId);
          if(element.classList.contains("active")){
            element.classList.remove("active");
            document.getElementById("tabs-"+tabsId).classList.remove("active");
          }else{ 
            
            const tabcontent = document.querySelectorAll(".tabcontent");           
            tabcontent.forEach(function(tc) {
              tc.classList.remove("active");
            });

            const tabLinks1 = document.querySelectorAll(".tablinks");     
            tabLinks1.forEach(function(tl) {        
                tl.classList.remove("active");        
            });

            document.getElementById("tabs-"+tabsId).classList.add("active");                     
            element.classList.add("active");

          }
        }
        
          
      });

    });  
  }

  /**
   * This returns an object that will be called `card`
   * in the template. Put all mapping logic here.
   *
   * @param {Object} profile of the entity in the card
   */
  dataForRender(profile) {
    const linkTarget = AnswersExperience.runtimeConfig.get('linkTarget') || '_top';

    return {
      title: profile.name, // The header text of the card
      url: profile.website || profile.landingPageUrl, // If the card title is a clickable link, set URL here
      target: linkTarget, // If the title's URL should open in a new tab, etc.
      titleEventOptions: profile.c_addressLine1, // The event options for title click analytics
      // subtitle: profile.c_currentPitches, // The sub-header text of the card
      hours: Formatter.openStatus(profile),
      uid : profile.uid,
      // services: [], // Used for a comma delimited list of services for the location
      address: Formatter.address(profile) || profile.locationString || '', // The address for the card
      phoneurl: Formatter.phoneLink(profile),
      phone: Formatter.phoneLink(profile),
      countyN : profile.c_county,
      // countyN = profile.c_currentPitches,
      currentPitches : profile.c_currentPitches ? profile.c_currentPitches :null,
      nearestTown : profile.c_nearestTown,
      milesFrom   : profile.c_milesFromTown + ' Miles',
      settingN    : profile.c_setting,
      //url: Formatter.phoneLink(profile), // The phone number for the card
      phone: Formatter.nationalizedPhoneDisplay(profile), // The phone number for the card
      phoneEventOptions: this.addDefaultEventOptions(), // The analytics event options for phone clicks
      distance: Formatter.toLocalizedDistance(profile), // Distance from the user’s or inputted location
       details: profile.c_sublocality, // The description for the card, displays below the address and phone
      // altText: '', // The alt-text of the displayed image
      // image: '', // The URL of the image to display on the card
      showOrdinal: false, // Show the map pin number on the card. Only supported for universal search
      CTA1: { // The primary call to action for the card
        label:profile.c_cTA2ShowMore.label, // The label of the CTA
        iconName: 'chevron', // The icon to use for the CTA
        url: profile.c_cTA2ShowMore.link, // The URL a user will be directed to when clicking
        target: '_blank', // If the URL will be opened in a new tab, etc.
        //eventType: 'TAP_TO_CALL', // Type of Analytics event fired when clicking the CTA
        eventOptions: this.addDefaultEventOptions(), // The analytics event options for CTA clicks
        // ariaLabel: '', // Accessible text providing a descriptive label for the CTA
      },
      CTA2: { // The secondary call to action for the card
        label: profile.c_cTA1GetDirectionLabel ? profile.c_cTA1GetDirectionLabel.label : 'Get Direction',
        iconName: 'directions',
        url: 'https://www.google.com/maps/dir/?api=1&destination='+(profile.address.line1),
        target: '_blank',
        eventType: 'DRIVING_DIRECTIONS',
        eventOptions: this.addDefaultEventOptions(),
        // ariaLabel: '',
      },
      feedback: false, // Shows thumbs up/down buttons to provide feedback on the result card
      feedbackTextOnSubmission: 'Thanks!', // Text to display after a thumbs up/down is clicked
      positiveFeedbackSrText: 'This answered my question', // Screen reader only text for thumbs-up
      negativeFeedbackSrText: 'This did not answer my question' // Screen reader only text for thumbs-down
    };
  }

  /**
   * The template to render
   * @returns {string}
   * @override
   */
  static defaultTemplateName (config) {
    return 'cards/locationcard';
  }
}

ANSWERS.registerTemplate(
  'cards/locationcard',
  {{{stringifyPartial (read 'cards/locationcard/template') }}}
);
ANSWERS.registerComponentType(locationcardCardComponent);
