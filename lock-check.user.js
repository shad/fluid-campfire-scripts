// ==UserScript==
// @name        lock-check
// @namespace   http://shad.github.com
// @description Make it clear that a repository is locked.  Just type "LOCK"
//              and UNLOCK and it will be clear what the state of the
//              repository is.
// @include     *
// @author      Shad Reynolds
// ==/UserScript==

(function () {

  // TODO: Need to hook into the campfire events instead of rerunning this
  // every second.
  

  function checkForLock() {
    var divs = $$('div.body'),
        length = divs.length,
        row, text, i = 0, locked=false,
        red='#B47878',
        green='#6DA85D';

    while (i < length) {

      row = divs[i].up();
      text = divs[i].innerText;

      if (text.match(/\bLOCK\b/)) {
        formatRow(row, red);
        locked = true;
      } else if (text.match(/\bUNLOCK\b/)) {
        formatRow(row, green);
        locked = false;
      } else if (locked) {
        row.style.borderLeftColor=red;
        row.style.borderLeftWidth='3px';
      } else {
        row.style.borderLeftColor=green;
        row.style.borderLeftWidth='3px';
      }
      i = i + 1;
    }
    setTimeout(checkForLock, 1000);
  }

  function formatRow(row, color) {
    row.style.background=color;
    row.style.borderLeftColor=color;
    row.style.borderLeftWidth='3px';
    row.style.color='white';
    row.style.fontWeight='bold';
    row.style.textAlign='center';
    row.style.fontSize='0.9em';
    row.style.fontFamily="monospace";
  }


  if (window.fluid) {
    checkForLock();
  }
})();
