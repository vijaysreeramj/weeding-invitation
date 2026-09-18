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
 * The page asks who has sealed a note — names and dates only, never the text,
 * so the capsule stays sealed even if someone pokes at this URL.
 * Served as JSONP because Apps Script does not send CORS headers.
 */
function doGet(e) {
  var cb = (e && e.parameter && e.parameter.callback) || '';
  var payload;
  try {
    var sh = sheet(), last = sh.getLastRow(), list = [];
    if (last > 1) {
      var rows = sh.getRange(2, 1, last - 1, 2).getValues();
      for (var i = rows.length - 1; i >= 0; i--) {
        list.push({ when: String(rows[i][0]), name: String(rows[i][1]) });
      }
    }
    payload = { ok: true, notes: list };
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
