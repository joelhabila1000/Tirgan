/**
 * Field definitions for the admin record forms, plus the mapping between a
 * record and the form's flat string values (news `body` is an array of
 * paragraphs; dates and numbers are strings while editing).
 */
const TONES = ['red', 'teal', 'gold', 'coral', 'charcoal']
const ART = ['cells', 'dna', 'support', 'care', 'screening', 'school', 'media', 'advocacy', 'nutrition']

export const PK_FIELD = { stories: 'slug', news: 'slug', events: 'id', enquiries: 'id', donations: 'id' }

export const RECORD_FIELDS = {
  stories: [
    { name: 'slug', label: 'Slug', kind: 'text', help: 'URL id, e.g. patient-1' },
    { name: 'title', label: 'Title', kind: 'text' },
    { name: 'category', label: 'Category', kind: 'select', options: ['Patients', 'Caregivers', 'Volunteers'] },
    { name: 'name', label: 'Name', kind: 'text' },
    { name: 'role', label: 'Role', kind: 'text' },
    { name: 'quote', label: 'Quote', kind: 'textarea' },
    { name: 'body', label: 'Body', kind: 'textarea' },
    { name: 'art', label: 'Artwork', kind: 'select', options: ART },
    { name: 'tone', label: 'Tone', kind: 'select', options: TONES },
    { name: 'placeholder', label: 'Mark as sample (placeholder)', kind: 'checkbox' },
  ],
  news: [
    { name: 'slug', label: 'Slug', kind: 'text' },
    { name: 'title', label: 'Title', kind: 'text' },
    { name: 'category', label: 'Category', kind: 'select', options: ['Programmes', 'Events', 'Awareness', 'Advocacy', 'Living Well', 'Volunteers'] },
    { name: 'date', label: 'Date', kind: 'date' },
    { name: 'author', label: 'Author', kind: 'text' },
    { name: 'authorRole', label: 'Author role', kind: 'text' },
    { name: 'readTime', label: 'Read time', kind: 'text', help: 'e.g. 4 min read' },
    { name: 'excerpt', label: 'Excerpt', kind: 'textarea' },
    { name: 'body', label: 'Body', kind: 'textarea', help: 'Separate paragraphs with a blank line' },
    { name: 'art', label: 'Artwork', kind: 'select', options: ART },
    { name: 'tone', label: 'Tone', kind: 'select', options: TONES },
    { name: 'featured', label: 'Feature on the news page', kind: 'checkbox' },
    { name: 'placeholder', label: 'Mark as sample (placeholder)', kind: 'checkbox' },
  ],
  events: [
    { name: 'id', label: 'Reference', kind: 'text', help: 'e.g. screening-nov-26' },
    { name: 'title', label: 'Title', kind: 'text' },
    { name: 'date', label: 'Date', kind: 'date' },
    { name: 'time', label: 'Time', kind: 'text', help: 'e.g. 09:00 – 15:00' },
    { name: 'location', label: 'Location', kind: 'text' },
    { name: 'type', label: 'Type', kind: 'select', options: ['Screening', 'Awareness', 'Support', 'Outreach', 'Fundraiser'] },
    { name: 'summary', label: 'Summary', kind: 'textarea' },
    { name: 'spots', label: 'Places', kind: 'text', help: 'e.g. Walk-in, 40 places' },
  ],
  enquiries: [
    { name: 'name', label: 'Name', kind: 'text' },
    { name: 'email', label: 'Email', kind: 'email' },
    { name: 'topic', label: 'Topic', kind: 'text' },
    { name: 'date', label: 'Date', kind: 'date' },
    { name: 'status', label: 'Status', kind: 'select', options: ['New', 'Replied'] },
  ],
  donations: [
    { name: 'donor', label: 'Donor', kind: 'text' },
    { name: 'amount', label: 'Amount (₦)', kind: 'number' },
    { name: 'type', label: 'Type', kind: 'select', options: ['One-off', 'Monthly'] },
    { name: 'date', label: 'Date', kind: 'date' },
    { name: 'status', label: 'Status', kind: 'select', options: ['Settled', 'Pending', 'Failed', 'Refunded'] },
  ],
}

export const SETTINGS_FIELDS = [
  { name: 'name', label: 'Organisation name', kind: 'text' },
  { name: 'url', label: 'Website URL', kind: 'text' },
  { name: 'email', label: 'Public email', kind: 'email' },
  { name: 'emailDonations', label: 'Donations email', kind: 'email' },
  { name: 'phoneDisplay', label: 'Phone', kind: 'text' },
  { name: 'whatsappDisplay', label: 'WhatsApp', kind: 'text' },
  { name: 'instagramUrl', label: 'Instagram URL', kind: 'text' },
  { name: 'addressLine1', label: 'Address line 1', kind: 'text' },
  { name: 'addressLine2', label: 'Address line 2', kind: 'text' },
]

/** Record -> flat form values. */
export function recordToForm(type, record = {}) {
  const values = {}
  for (const field of RECORD_FIELDS[type]) {
    const value = record[field.name]
    if (field.kind === 'checkbox') values[field.name] = Boolean(value)
    else if (type === 'news' && field.name === 'body') values[field.name] = Array.isArray(value) ? value.join('\n\n') : value ?? ''
    else values[field.name] = value ?? ''
  }
  return values
}

/** Flat form values -> record payload. */
export function formToRecord(type, values) {
  const record = {}
  for (const field of RECORD_FIELDS[type]) {
    const value = values[field.name]
    if (field.kind === 'checkbox') record[field.name] = Boolean(value)
    else if (type === 'news' && field.name === 'body')
      record[field.name] = String(value ?? '').split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean)
    else if (field.kind === 'number') record[field.name] = value === '' || value == null ? 0 : Number(value)
    else if (field.kind === 'date') record[field.name] = value || null
    else record[field.name] = value ?? ''
  }
  return record
}
