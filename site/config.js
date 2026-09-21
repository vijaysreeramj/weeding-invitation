/* =========================================================================
   THE ONLY FILE YOU NEED TO EDIT TO REUSE THIS INVITATION

   Change the values below and the whole page follows — names, families,
   dates, times, venue, map, calendar links, countdown, time capsule, music.
   Nothing in index.html needs touching.
   ========================================================================= */

window.INVITE = {

  /* ---- the couple ---------------------------------------------------- */
  groom: {
    name: 'Vijaysreeram',
    family: 'Jeyakumar · Sasikala · Nilesh',
    familyLabel: 'Groom’s Family'
  },
  bride: {
    name: 'Suganthini',
    family: 'Krishnakishor · Renuka · Dharanees',
    familyLabel: 'Bride’s Family'
  },

  /* Shown together as "Groom & Bride" throughout. Swap the order here if the
     bride's name should come first. */
  order: ['groom', 'bride'],

  hashtag: '#VijaysreeramWedsSuganthini',

  /* ---- where ---------------------------------------------------------- */
  venue: {
    name: 'Sri Rudhram Mahal',
    area: 'Kurunjeri',                          // short form, used on the seal
    areaLong: 'Kurunjeri, Tamil Nadu',          // under the venue name
    address: 'Sri Rudhram Mahal, Pethappampati Rd, Kurunjeri, Tamil Nadu 642154',
    nearestTown: 'Udumalpet',                   // start of the little route map
    road: 'Pethappampati Rd'                    // the road on the route map
  },

  /* ---- when ----------------------------------------------------------- */
  /* start / end are local wall-clock, formatted for Google Calendar.
     Keep the two events in the order they happen. */
  events: [
    {
      name: 'Reception',
      date: '14 Nov 2026',
      time: '6:00 PM onwards',
      day: '14', monthYear: 'Nov 2026',
      start: '20261114T180000', end: '20261114T220000'
    },
    {
      name: 'Muhurtham',
      date: '15 Nov 2026',
      time: '6:00 AM – 7:00 AM',
      day: '15', monthYear: 'Nov 2026',
      start: '20261115T060000', end: '20261115T070000'
    }
  ],

  /* what the seal reveals, and what the countdown counts to */
  sealDates: '14 & 15<br>November 2026',
  sealDatesPlain: '14 and 15 November 2026',
  countdownTo: '2026-11-15T06:00:00+05:30',     // the muhurtham
  timezone: 'Asia/Kolkata',

  /* ---- the time capsule ------------------------------------------------ */
  capsule: {
    opensAt: '2036-11-15T06:00:00+05:30',       // ten years on
    opensLabel: '15 November 2036',
    years: 'ten',
    /* Apps Script web app URL. See apps-script/README.md to make your own. */
    url: 'https://script.google.com/macros/s/AKfycbyh1_AXaKBT5-TMqx9KqDBTiKcT6PubiiBlI1OIfvw1KAMSs8LZODGfsWQi7reL2rBF/exec'
  },

  /* ---- odds and ends --------------------------------------------------- */
  musicVideoId: 'x84OUIVai3Y',                  // YouTube id, played softly
  photoAlbumUrl: 'https://photos.app.goo.gl/WAvGtWFo3XSmVW618',  // shared album, collaborate on

  /* What people see when the link is pasted into WhatsApp. Deliberately
     free of dates and venue, so the invitation itself does the telling. */
  share: {
    title: 'Vijaysreeram & Suganthini',
    description: 'We are getting married — tap to open our invitation.'
  }
};
