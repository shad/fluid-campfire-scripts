(function () {
  var locked = false;
  var red='#B47878', green='#6DA85D';

  function formatRow(row, color) {
    row.style.background=color;
    row.style.borderLeftColor=color;
    row.style.borderLeftWidth='3px';
    row.style.color='white';
    row.style.fontWeight='bold';
    row.style.textAlign='center';
    row.style.fontSize='1em';
    row.style.letterSpacing='4px';
    row.style.fontFamily="Gil Sans";
  }

  function formatLockMessage(body) {
    var row = body.up();

    if (body.innerText.match(/\bLOCK\b/)) {
      formatRow(row, red);
      locked = true;
    } else if (body.innerText.match(/\bUNLOCK\b/)) {
      formatRow(row, green);
      locked = false;
    } else if (locked) {
      row.style.borderLeftColor=red;
      row.style.borderLeftWidth='3px';
    } else {
      row.style.borderLeftColor=green;
      row.style.borderLeftWidth='3px';
    }
  }

  function checkForLock() {
    var divs = $$('div.body'),
        length = divs.length,
        i = 0;

    while (i < length) {
      formatLockMessage(divs[i]);
      i = i + 1;
    }
    setTimeout(checkForLock, 1000);
  }

  checkForLock();
})();
