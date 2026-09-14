/*
 * Campaign field relay for AI Consulting SA lead forms.
 *
 * Populates hidden utm_* inputs on forms marked with data-campaign-fields, and
 * preserves the most recent validly tagged campaign for the rest of the browser
 * session so an untagged internal click does not erase it.
 *
 * Rules this file exists to enforce:
 *   - A campaign is stored and applied as one complete group, never merged, so
 *     two campaigns cannot blend into a third that never existed.
 *   - Only [a-z0-9_-]{1,80} survives. That structurally excludes names, email
 *     addresses, phone numbers and free text.
 *   - sessionStorage failure must never break the form. The hidden service
 *     intent is static HTML and does not depend on this script.
 *   - This file records nothing and sends nothing. There is no analytics here.
 */
(function () {
  'use strict';

  var FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  var STORAGE_KEY = 'aicsa.campaign.v1';
  var ALLOWED = /^[a-z0-9_-]{1,80}$/;

  function clean(value) {
    if (typeof value !== 'string') return '';
    var candidate = value.trim().toLowerCase();
    return ALLOWED.test(candidate) ? candidate : '';
  }

  /* Returns a complete group, or null when nothing in the source was tagged. */
  function groupFrom(lookup) {
    var group = {};
    var tagged = false;
    for (var index = 0; index < FIELDS.length; index += 1) {
      var value = clean(lookup(FIELDS[index]));
      group[FIELDS[index]] = value;
      if (value) tagged = true;
    }
    return tagged ? group : null;
  }

  function fromLocation() {
    if (typeof window.URLSearchParams !== 'function') return null;
    var params = new window.URLSearchParams(window.location.search);
    return groupFrom(function (name) {
      return params.get(name);
    });
  }

  function fromStorage() {
    try {
      var raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var stored = JSON.parse(raw);
      if (!stored || typeof stored !== 'object') return null;
      return groupFrom(function (name) {
        return stored[name];
      });
    } catch {
      return null;
    }
  }

  function remember(group) {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(group));
    } catch {
      /* Private mode or a full quota. The form still works without this. */
    }
  }

  function apply() {
    var campaign = fromLocation();
    if (campaign) remember(campaign);
    else campaign = fromStorage();

    var forms = document.querySelectorAll('form[data-campaign-fields]');
    for (var f = 0; f < forms.length; f += 1) {
      var form = forms[f];

      if (campaign) {
        for (var index = 0; index < FIELDS.length; index += 1) {
          var input = form.querySelector('input[name="' + FIELDS[index] + '"]');
          if (input) input.value = campaign[FIELDS[index]];
        }
      }

      /*
       * Only a form that ships a response_mode input opts into the redirect
       * response. Without this script it stays on the static value and the
       * server renders its own confirmation page, which is what keeps a
       * no-JavaScript submission usable.
       */
      var mode = form.querySelector('input[name="response_mode"]');
      if (mode) mode.value = 'redirect';
    }

    /*
     * Reveal the post-redirect confirmation. The flag proves the server
     * redirected here after accepting the batch; it is not a lead record and
     * nothing is counted from it.
     */
    if (typeof window.URLSearchParams === 'function') {
      var flag = new window.URLSearchParams(window.location.search).get('submitted');
      var note = document.getElementById('phone-submitted');
      if (flag === 'true' && note) {
        note.removeAttribute('hidden');
        /*
         * The redirect lands on #phone-fit, which puts the section heading at
         * the top and can leave the confirmation below the fold on a phone.
         * After submitting, the confirmation is the thing worth reading, so
         * bring that into view instead of the heading above it.
         *
         * Jump rather than animate: the stylesheet sets scroll-behavior
         * smooth, and smooth-scrolling several thousand pixels flies the
         * whole page past the reader before settling.
         */
        if (typeof note.scrollIntoView === 'function') {
          note.scrollIntoView({ block: 'center', behavior: 'instant' });
        }
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
