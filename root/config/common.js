( function(){
  'use strict';

  module.exports = {
    port: process.env.PORT || 3000,
    mongo: {
      connectionString: (process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/{%= mongo_db_name %}')
    },
    sessionSecret: "waySecretDude",
    scriptsToMinify: [
      "public/js/libraries/bootstrap/transition.js",
      "public/js/libraries/bootstrap/alert.js",
      "public/js/libraries/bootstrap/button.js",
      "public/js/libraries/bootstrap/carousel.js",
      "public/js/libraries/bootstrap/collapse.js",
      "public/js/libraries/bootstrap/dropdown.js",
      "public/js/libraries/bootstrap/modal.js",
      "public/js/libraries/bootstrap/tooltip.js",
      "public/js/libraries/bootstrap/popover.js",
      "public/js/libraries/bootstrap/scrollspy.js",
      "public/js/libraries/bootstrap/tab.js",
      "public/js/libraries/bootstrap/affix.js",
      "public/js/utils.js",
      "public/js/common.js",
      "public/js/home.js"
    ]
  };
  
})();