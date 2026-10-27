-- ============================================================================
-- Tirngan admin console — seed data
-- ----------------------------------------------------------------------------
-- The same sample records that currently ship inside the front end
-- (src/data/site.js and the SAMPLE_ arrays in src/pages/Admin.jsx), so the
-- console looks identical once it is reading from Neon.
--
-- Safe to re-run: rows are inserted with ON CONFLICT DO NOTHING.
-- Replace these rows with real, consented content before launch.
-- ============================================================================


-- ---------------------------------------------------------------------------
-- STORIES
-- ---------------------------------------------------------------------------
insert into stories (slug, placeholder, category, title, name, role, quote, body, art, tone) values
  ('placeholder-patient-1', true, 'Patients', 'Sample story — a patient’s own words', 'REPLACE Name, age', 'Living with HbSS', 'REPLACE with a real, consented quote. When I finally met other people with sickle cell, I stopped feeling like the only one.', 'REPLACE: 2–3 short paragraphs in the person’s own words, with their written consent.', 'cells', 'red'),
  ('placeholder-patient-2', true, 'Patients', 'Sample story — screening changed our plans', 'REPLACE Name', 'Living with HbSC', 'REPLACE with a real, consented quote. Knowing our genotypes let us plan our family with clear information instead of fear.', 'REPLACE: 2–3 short paragraphs with consent.', 'dna', 'teal'),
  ('placeholder-caregiver-1', true, 'Caregivers', 'Sample story — a mother’s perspective', 'REPLACE Name', 'Parent and caregiver', 'REPLACE with a real, consented quote. The first year was the hardest. The support circle taught me what to watch for.', 'REPLACE: 2–3 short paragraphs with consent.', 'support', 'gold'),
  ('placeholder-caregiver-2', true, 'Caregivers', 'Sample story — caring for a sibling', 'REPLACE Name', 'Sibling and caregiver', 'REPLACE with a real, consented quote. I learned to give medicine and to stay calm, and I learned to ask for help too.', 'REPLACE: 2–3 short paragraphs with consent.', 'care', 'coral'),
  ('placeholder-volunteer-1', true, 'Volunteers', 'Sample story — why I volunteer', 'REPLACE Name', 'Screening volunteer', 'REPLACE with a real, consented quote. Giving someone their genotype result and explaining it in their own language takes ten minutes. It can change a family’s whole life.', 'REPLACE: 2–3 short paragraphs with consent.', 'screening', 'teal'),
  ('placeholder-volunteer-2', true, 'Volunteers', 'Sample story — a student advocate', 'REPLACE Name', 'Campus ambassador', 'REPLACE with a real, consented quote. We ran a campus drive and 300 students learned their genotype in a single afternoon.', 'REPLACE: 2–3 short paragraphs with consent.', 'school', 'charcoal')
on conflict (slug) do nothing;


-- ---------------------------------------------------------------------------
-- NEWS
-- ---------------------------------------------------------------------------
insert into news (slug, placeholder, title, category, date, author, author_role, read_time, excerpt, body, art, tone, featured) values
  (
    'hydroxyurea-access-expanded', true,
    'Sample article: hydroxyurea access expanded to two more hospitals', 'Programmes', '2026-10-12',
    'REPLACE Author', 'Programmes team', '4 min read',
    'REPLACE with the article summary. Two additional teaching hospitals will now supply subsidised hydroxyurea to children enrolled in our assistance programme.',
    array[
      'REPLACE with the full article. This paragraph introduces the announcement and why it matters for families.',
      'REPLACE with a paragraph of supporting detail — numbers, partners, and what changes for patients.',
      'REPLACE with a closing paragraph, including a quote from a named member of staff and a call to action.'
    ], 'care', 'teal', true
  ),
  (
    'world-sickle-cell-day-recap', true,
    'Sample article: World Sickle Cell Day — how Kaduna showed up', 'Events', '2026-06-24',
    'REPLACE Author', 'Communications', '3 min read',
    'REPLACE with the article summary. Screenings, radio interviews and a community celebration across three local government areas.',
    array[
      'REPLACE with the full article text.',
      'REPLACE with a second paragraph of detail.'
    ], 'media', 'gold', false
  ),
  (
    'know-your-genotype-campaign', true,
    'Sample article: “Know your genotype” campaign reaches 5,000 students', 'Awareness', '2026-09-02',
    'REPLACE Author', 'Outreach team', '5 min read',
    'REPLACE with the article summary. Campus clubs delivered peer-led sessions on trait, testing and family planning.',
    array[
      'REPLACE with the full article text.',
      'REPLACE with a second paragraph of detail.'
    ], 'school', 'red', false
  ),
  (
    'pain-management-advocacy', true,
    'Sample article: our submission on emergency pain management', 'Advocacy', '2026-08-19',
    'REPLACE Author', 'Policy lead', '6 min read',
    'REPLACE with the article summary. We asked for a standard protocol so that nobody in a pain crisis is left waiting.',
    array[
      'REPLACE with the full article text.',
      'REPLACE with a second paragraph of detail.'
    ], 'advocacy', 'charcoal', false
  ),
  (
    'nutrition-guide-launch', true,
    'Sample article: new nutrition and hydration guide for families', 'Living Well', '2026-07-08',
    'REPLACE Author', 'Medical adviser', '3 min read',
    'REPLACE with the article summary. A practical, plain-language guide reviewed by our clinical team.',
    array[
      'REPLACE with the full article text.',
      'REPLACE with a second paragraph of detail.'
    ], 'nutrition', 'teal', false
  ),
  (
    'volunteer-spotlight', true,
    'Sample article: volunteer spotlight — 300 tests in one afternoon', 'Volunteers', '2026-05-30',
    'REPLACE Author', 'Volunteer coordinator', '4 min read',
    'REPLACE with the article summary. Meet the students who turned a campus event into a screening drive.',
    array[
      'REPLACE with the full article text.',
      'REPLACE with a second paragraph of detail.'
    ], 'screening', 'coral', false
  )
on conflict (slug) do nothing;


-- ---------------------------------------------------------------------------
-- EVENTS
-- ---------------------------------------------------------------------------
insert into events (id, title, date, time, location, type, summary, spots) values
  ('screening-nov-26', 'Free genotype screening drive', '2026-11-14', '09:00 – 15:00', 'REPLACE venue, Kaduna North', 'Screening', 'Free finger-prick genotype tests with private counselling for every result. No appointment needed.', 'Walk-in'),
  ('walk-nov-26', 'Community awareness walk', '2026-11-28', '07:00 – 10:00', 'REPLACE route, Kaduna', 'Awareness', 'A family-friendly walk to open the conversation about sickle cell disease in our communities.', 'Open to all'),
  ('caregivers-dec-26', 'Caregivers’ support circle', '2026-12-05', '16:00 – 17:30', 'Online (WhatsApp video)', 'Support', 'A facilitated space for parents and guardians. This month: managing pain at home.', '40 places'),
  ('schools-jan-27', 'School outreach: secondary schools', '2027-01-16', '10:00 – 13:00', 'REPLACE school, Kaduna South', 'Outreach', 'Assembly talk and classroom workshop, with free teacher packs on supporting pupils.', 'Registered schools'),
  ('gala-mar-27', 'Annual fundraising gala', '2027-03-20', '18:00 – 22:00', 'REPLACE hotel, Kaduna', 'Fundraiser', 'An evening of storytelling and giving, raising funds for the medical assistance fund.', 'Ticketed'),
  ('wscd-2027', 'World Sickle Cell Day 2027', '2027-06-19', 'All day', 'REPLACE locations across Kaduna State', 'Awareness', 'Our biggest day of the year: screenings, awareness, media and a community celebration.', 'Open to all')
on conflict (id) do nothing;


-- ---------------------------------------------------------------------------
-- ENQUIRIES
-- ---------------------------------------------------------------------------
insert into enquiries (id, name, email, topic, date, status) values
  ('ENQ-1042', 'Amina Bello', 'amina.b@example.com', 'Genotype counselling', '2026-10-24', 'New'),
  ('ENQ-1041', 'Chidi Okoro', 'chidi@example.com', 'Treatment assistance', '2026-10-23', 'New'),
  ('ENQ-1039', 'Fatima Yusuf', 'fatima.y@example.com', 'Corporate partnership', '2026-10-21', 'Replied'),
  ('ENQ-1036', 'Grace Adeyemi', 'grace@example.com', 'Volunteering', '2026-10-19', 'Replied'),
  ('ENQ-1033', 'Musa Ibrahim', 'musa.i@example.com', 'Media & press', '2026-10-17', 'New')
on conflict (id) do nothing;


-- ---------------------------------------------------------------------------
-- DONATIONS
-- ---------------------------------------------------------------------------
insert into donations (id, donor, amount, type, date, status) values
  ('DON-3091', 'Anonymous', 15000, 'Monthly', '2026-10-22', 'Settled'),
  ('DON-3090', 'A. Okafor', 150000, 'One-off', '2026-10-21', 'Settled'),
  ('DON-3088', 'Kaduna Staff Co-op', 500000, 'One-off', '2026-10-18', 'Pending'),
  ('DON-3085', 'Anonymous', 5000, 'Monthly', '2026-10-15', 'Settled'),
  ('DON-3081', 'B. Danladi', 40000, 'One-off', '2026-10-12', 'Failed')
on conflict (id) do nothing;


-- ---------------------------------------------------------------------------
-- SETTINGS  (organisation details; edited in the console, read by the site)
-- ---------------------------------------------------------------------------
insert into settings (key, value) values (
  'organisation',
  '{
    "name": "Tirngan Sickle Cell Foundation",
    "shortName": "Tirngan",
    "url": "https://www.tirngan.org",
    "email": "info@tirngan.org",
    "emailDonations": "donate@tirngan.org",
    "emailSupport": "support@tirngan.org",
    "phoneDisplay": "+234 800 000 0000",
    "phoneHref": "+2348000000000",
    "whatsappDisplay": "+234 800 000 0000",
    "whatsappHref": "2348000000000",
    "instagramUrl": "https://www.instagram.com/tirngan_sickel_cell_foundation/",
    "addressLine1": "12 Sultan Road",
    "addressLine2": "Kaduna, Kaduna State 800001",
    "addressCountry": "Nigeria",
    "emergencyNumber": "112"
  }'::jsonb
)
on conflict (key) do nothing;
