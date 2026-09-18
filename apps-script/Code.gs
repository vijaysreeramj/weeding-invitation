/**
 * Wedding Time Capsule — Google Apps Script backend
 *
 * Paste this into your "Wedding Time Capsule" Sheet:
 *   Extensions → Apps Script → replace everything → Save
 *   Deploy → New deployment → Web app
 *     Execute as:      Me
 *     Who has access:  Anyone
 *   Copy the /exec URL it gives you.
 *
 * The Sheet itself stays private. This script runs as you, so it can write
 * into it without anyone else ever having access.
 */

var SHEET_NAME = 'Notes';

/** The capsule opens on the tenth anniversary. Enforced here, on the server,
 *  so the note text is never sent to a browser before this moment. */
var OPEN_DATE = new Date('2036-11-15T06:00:00+05:30');

/** A guest seals a note. */
function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.hp) return ok();                       // honeypot: silently ignore bots

    var name = String(d.name || '').trim().slice(0, 120);
    var note = String(d.note || '').trim().slice(0, 8000);
    if (!name || !note) return fail('empty');

    sheet().appendRow([new Date(), name, note]);
    return ok();
  } catch (err) {
    return fail(String(err));
  }
}

/**
 * The page asks what is in the capsule.
 * Before OPEN_DATE: names and dates only — the text never leaves the Sheet.
 * From OPEN_DATE:   the notes themselves.
 * Served as JSONP because Apps Script does not send CORS headers.
 */
function doGet(e) {
  var cb = (e && e.parameter && e.parameter.callback) || '';
  var payload;
  try {
    var open = new Date() >= OPEN_DATE;
    var sh = sheet(), last = sh.getLastRow(), list = [];
    if (last > 1) {
      var rows = sh.getRange(2, 1, last - 1, 3).getValues();
      for (var i = rows.length - 1; i >= 0; i--) {
        var item = { when: String(rows[i][0]), name: String(rows[i][1]) };
        if (open) item.note = String(rows[i][2]);
        list.push(item);
      }
    }
    payload = { ok: true, open: open, notes: list };
  } catch (err) {
    payload = { ok: false, error: String(err) };
  }
  var body = JSON.stringify(payload);
  if (cb) {
    return ContentService.createTextOutput(cb + '(' + body + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(body)
    .setMimeType(ContentService.MimeType.JSON);
}

function sheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['Sealed at', 'Name', 'Note']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function ok()        { return json({ ok: true }); }
function fail(msg)   { return json({ ok: false, error: msg }); }
function json(obj)   {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
