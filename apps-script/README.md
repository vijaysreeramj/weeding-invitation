# Time capsule backend

`Code.gs` goes in the **Wedding Time Capsule** Google Sheet, not in this site.

## Setup

1. Open the Sheet → **Extensions → Apps Script**
2. Delete whatever is there, paste in `Code.gs`, save
3. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Authorise when Google asks. The "unverified app" warning is expected — it is
   your own script. Advanced → Go to project → Allow.
5. Copy the deployment URL (ends in `/exec`) and paste it into `site/index.html`
   as `CAPSULE_URL`.

## What stays private

The Sheet stays **restricted**. Nobody but you can open it.

The web app is public, but it only ever accepts a note, and only ever returns
**names and dates** — never the text of anyone's note. Someone who found the URL
could see that a note was sealed, not what it says.

## Reading the capsule

Open the Sheet. Every note is a row: when it was sealed, who wrote it, what they
said. Delete a row to remove a note, edit a cell to fix a typo.

## Re-deploying

If you change `Code.gs`, use **Deploy → Manage deployments → edit → New version**,
which keeps the same URL. A brand new deployment gives a different URL and the
site would need updating.
