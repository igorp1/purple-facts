export const GA_TRACKING_ID = 'UA-123365196-1'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const gPageview = url => {
  window.gtag('config', GA_TRACKING_ID, {
    page_location: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const gEvent = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}