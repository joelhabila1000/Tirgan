/**
 * ============================================================================
 * TIRNGAN SICKLE CELL FOUNDATION — SINGLE SOURCE OF CONTENT
 * ============================================================================
 * Every piece of copy, name, number and link on the site lives here.
 *
 * HOW TO EDIT
 *   Anything marked  REPLACE  is a placeholder that you must supply.
 *   Change the value in this file only — no page markup needs touching.
 *
 * NEVER PUBLISH UNVERIFIED FIGURES OR INVENTED TESTIMONIALS.
 *   Statistics in `research` are widely cited public estimates and are
 *   attributed to their source. Confirm them against the source before launch.
 * ============================================================================
 */

/* ---------------------------------------------------------------------------
   ORGANISATION IDENTITY
   --------------------------------------------------------------------------- */
export const site = {
  name: 'Tirngan Sickle Cell Foundation',
  shortName: 'Tirngan',
  initials: 'TF',
  tagline: 'Breaking Cycles',
  url: 'https://www.tirngan.org', // REPLACE with your live domain (used for SEO + share links)
  mission:
    'To educate, support and empower people affected by sickle cell disease, while promoting genotype awareness and informed relationship decisions.',
  vision:
    'A future where every young person understands their genotype, every person living with sickle cell is supported, and fewer families face preventable complications.',
  city: 'Kaduna',
  state: 'Kaduna State',
  country: 'Nigeria',
  founded: 2015, // REPLACE: year the foundation was established

  /* --- Contact details — REPLACE ALL OF THESE --------------------------- */
  phoneDisplay: '+234 800 000 0000',
  phoneHref: '+2348000000000',
  whatsappDisplay: '+234 800 000 0000',
  whatsappHref: '2348000000000',
  email: 'info@tirngan.org',
  emailDonations: 'donate@tirngan.org',
  emailSupport: 'support@tirngan.org',
  addressLine1: '12 Sultan Road', // REPLACE
  addressLine2: 'Kaduna, Kaduna State 800001', // REPLACE
  addressCountry: 'Nigeria',
  mapQuery: 'Kaduna, Kaduna State, Nigeria', // REPLACE with full street address

  /* Nigeria's national emergency number is 112. Confirm locally. */
  emergencyNumber: '112', // REPLACE if you publish a local number
  hospitalNote: 'your nearest general hospital',

  /* --- Registration & compliance — REPLACE ----------------------------- */
  registrationLabel: 'Registered charity',
  registrationNumber: 'CAC/IT/NO 0000000', // REPLACE: CAC registration number
  taxNote: 'Donations may be tax-deductible. Confirm your local rules.',

  /* --- Currency used across the donation flow --------------------------- */
  currency: 'NGN',
  currencySymbol: '₦',
  currencyCode: 'NGN',

  /* --- Social profiles ---------------------------------------------------
     Instagram is confirmed. REPLACE the rest with your real profile URLs. */
  instagramHandle: '@tirngan_sickel_cell_foundation',
  instagramUrl: 'https://www.instagram.com/tirngan_sickel_cell_foundation/',
  socials: [
    { key: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/tirngan_sickel_cell_foundation/' },
    { key: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/' }, // REPLACE
    { key: 'x', label: 'X (Twitter)', href: 'https://x.com/' }, // REPLACE
    { key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/' }, // REPLACE
    { key: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/' }, // REPLACE
  ],
}

/* ---------------------------------------------------------------------------
   MISSION, VISION, VALUES
   --------------------------------------------------------------------------- */
export const values = [
  {
    icon: 'heart',
    title: 'Empathy',
    text: 'We recognise the lived experiences of people affected by sickle cell and their families.',
  },
  {
    icon: 'book',
    title: 'Impact',
    text: 'We focus our efforts on meaningful change for people and communities affected by sickle cell.',
  },
  {
    icon: 'book',
    title: 'Education',
    text: 'We believe accurate knowledge is an important step toward informed decisions and prevention.',
  },
  {
    icon: 'shield',
    title: 'Integrity',
    text: 'We aim to act with honesty, transparency and compassion in our work.',
  },
  {
    icon: 'megaphone',
    title: 'Awareness',
    text: 'We encourage open conversations about sickle cell disease and genotype compatibility.',
  },
  {
    icon: 'heart',
    title: 'Support',
    text: 'We stand with individuals and families affected by sickle cell disease.',
  },
]

/* ---------------------------------------------------------------------------
   IMPACT COUNTERS  (home page animated stats)
   REPLACE every figure with your audited numbers before launch.
   --------------------------------------------------------------------------- */
export const impactStats = [
  {
    icon: 'users',
    value: 12480,
    suffix: '+',
    label: 'People supported',
    note: 'Counselling, care navigation and welfare support',
  },
  {
    icon: 'droplet',
    value: 34600,
    suffix: '+',
    label: 'Genotype screenings',
    note: 'Free tests delivered in community drives',
  },
  {
    icon: 'megaphone',
    value: 218,
    suffix: '',
    label: 'Awareness events',
    note: 'Schools, markets, faith centres and workplaces',
  },
  {
    icon: 'handshake',
    value: 640,
    suffix: '+',
    label: 'Active volunteers',
    note: 'Across 9 local government areas',
  },
]

/* ---------------------------------------------------------------------------
   PROGRAMS & SERVICES
   --------------------------------------------------------------------------- */
export const programs = [
  {
    slug: 'screening',
    icon: 'droplet',
    tone: 'red',
    title: 'Free screening & testing drives',
    short:
      'Free genotype testing in markets, schools, campuses and faith centres, with same-day counselling for everyone who tests.',
    what: [
      'Free genotype (Hb) testing using a finger-prick sample',
      'Private, on-the-spot counselling for every result',
      'Referral to a haematologist where a result needs follow-up',
      'Interpreters available in Hausa and English',
    ],
    stat: { value: '34,600+', label: 'tests delivered to date' },
  },
  {
    slug: 'financial-assistance',
    icon: 'syringe',
    tone: 'teal',
    title: 'Medical & treatment financial assistance',
    short:
      'Direct help with the costs that push families into debt — medicines, transfusions, consultations and emergency transport.',
    what: [
      'Hydroxyurea and folic acid for children whose families cannot afford it',
      'Contributions toward blood transfusion and hospital admission costs',
      'Emergency transport grants during a severe pain crisis',
      'Help navigating NHIS and state health insurance enrolment',
    ],
    stat: { value: '₦0', label: 'REPLACE: total disbursed to families' },
  },
  {
    slug: 'awareness',
    icon: 'school',
    tone: 'gold',
    title: 'Awareness & school outreach',
    short:
      'Age-appropriate lessons and assemblies that teach young people what sickle cell disease is, what the trait means, and how to find out their genotype.',
    what: [
      'School assembly talks and classroom workshops',
      'Teacher training packs on supporting a pupil with sickle cell disease',
      'Campus clubs for students who want to advocate',
      'Community radio and market outreach in local languages',
    ],
    stat: { value: '218', label: 'events and school visits' },
  },
  {
    slug: 'peer-support',
    icon: 'users',
    tone: 'coral',
    title: 'Peer support & mentoring',
    short:
      'Monthly circles where people living with sickle cell disease, and the people who care for them, are heard by someone who understands.',
    what: [
      'Young adult peer network led by people living with sickle cell disease',
      'Caregivers circle for parents and guardians',
      'One-to-one mentoring for teenagers navigating school and hospital',
      'WhatsApp support rooms moderated by trained volunteers',
    ],
    stat: { value: '14', label: 'support groups meeting monthly' },
  },
  {
    slug: 'research',
    icon: 'microscope',
    tone: 'teal',
    title: 'Research & advocacy',
    short:
      'We collect the data that decision-makers ignore, then use it to push for newborn screening, affordable medicines and pain relief that works.',
    what: [
      'Community prevalence surveys published openly',
      'Policy submissions on newborn screening and drug pricing',
      'Partnership with university teaching hospitals on local research',
      'Advocacy for pain management protocols in emergency rooms',
    ],
    stat: { value: '6', label: 'policy submissions made' },
  },
  {
    slug: 'education-support',
    icon: 'book',
    tone: 'charcoal',
    title: 'Education & welfare support',
    short:
      'The non-medical things that keep a child in school and a family steady — fees, nutrition, bedding and transport.',
    what: [
      'School fee and exam fee support for children in crisis',
      'Nutrition packs for children with faltering growth',
      'Warm bedding and mosquito nets for families at risk of malaria triggers',
      'Transport stipends for repeated hospital appointments',
    ],
    stat: { value: '312', label: 'children supported to stay in school' },
  },
]

/* ---------------------------------------------------------------------------
   GENOTYPES — used by the explainer and the Punnett square tool
   --------------------------------------------------------------------------- */
export const genotypes = [
  {
    code: 'AA',
    key: 'aa',
    name: 'Normal haemoglobin',
    summary: 'Two normal haemoglobin genes. No sickle cell trait, no disease.',
    note: 'Around 1 in 4 children born to two carrier (AS) parents.',
  },
  {
    code: 'AS',
    key: 'as',
    name: 'Sickle cell trait (carrier)',
    summary:
      'One normal gene and one sickle gene. The person is a carrier and is generally healthy.',
    note: 'Carriers can pass the sickle gene to their children. Most people with trait do not know they have it.',
  },
  {
    code: 'SS',
    key: 'ss',
    name: 'Sickle cell disease (HbSS)',
    summary:
      'Two sickle genes. This is the most common form of sickle cell disease.',
    note: 'Requires lifelong care, regular check-ups and prompt treatment of pain crises.',
  },
  {
    code: 'AC',
    key: 'ac',
    name: 'Haemoglobin C trait',
    summary:
      'One normal gene and one HbC gene. A carrier state, generally without symptoms.',
    note: 'People with AC can pass the HbC gene on, and with an S partner can have a child with SC disease.',
  },
  {
    code: 'SC',
    key: 'sc',
    name: 'Sickle-haemoglobin C disease (HbSC)',
    summary:
      'One sickle gene and one HbC gene. This is a form of sickle cell disease.',
    note: 'Often milder than HbSS but still needs monitoring and treatment.',
  },
  {
    code: 'CC',
    key: 'cc',
    name: 'Haemoglobin C disease (HbCC)',
    summary:
      'Two HbC genes. A separate haemoglobin disorder, usually milder than sickle cell disease.',
    note: 'Can cause anaemia and an enlarged spleen. Needs a doctor’s monitoring.',
  },
]

/* ---------------------------------------------------------------------------
   SYMPTOMS & COMPLICATIONS (icon grid)
   --------------------------------------------------------------------------- */
export const symptoms = [
  {
    icon: 'activity',
    title: 'Pain crises',
    text: 'Sudden, severe pain in the bones, chest, back, arms or legs. It is the most common reason people living with sickle cell disease go to hospital.',
  },
  {
    icon: 'heart',
    title: 'Anaemia',
    text: 'Sickled cells break down faster than normal ones, so the body runs short of red blood cells. This causes tiredness, pallor and breathlessness.',
  },
  {
    icon: 'shield',
    title: 'Infections',
    text: 'The spleen can be damaged by sickling, which weakens the body’s defence against certain bacteria — especially in young children.',
  },
  {
    icon: 'globe',
    title: 'Stroke',
    text: 'Blocked blood flow in the brain can cause a stroke. Children are screened with a transcranial Doppler scan to catch the warning signs.',
  },
  {
    icon: 'sun',
    title: 'Acute chest syndrome',
    text: 'Fever, chest pain and difficulty breathing. This is a medical emergency and needs hospital treatment straight away.',
  },
  {
    icon: 'drop',
    title: 'Delayed growth & puberty',
    text: 'The body spends energy replacing damaged red blood cells, so some children grow and mature more slowly than their peers.',
  },
  {
    icon: 'eye',
    title: 'Vision problems',
    text: 'Sickled cells can damage the blood vessels at the back of the eye. Annual eye checks are recommended for adults.',
  },
  {
    icon: 'brain',
    title: 'Silent organ damage',
    text: 'Repeated episodes can gradually affect the kidneys, lungs, spleen and bones — often without obvious symptoms at first.',
  },
]

/* ---------------------------------------------------------------------------
   PAIN CRISIS: TRIGGERS & WHAT TO DO
   --------------------------------------------------------------------------- */
export const crisisTriggers = [
  { icon: 'droplet', label: 'Dehydration' },
  { icon: 'moon', label: 'Cold weather or cold water' },
  { icon: 'activity', label: 'Over-exertion or stress' },
  { icon: 'shield', label: 'Infection or fever' },
  { icon: 'wind', label: 'Low oxygen (altitude, poor ventilation)' },
  { icon: 'apple', label: 'Skipped meals and poor nutrition' },
]

export const crisisSteps = [
  {
    title: 'Start fluids and warmth immediately',
    text: 'Give water or oral rehydration solution and keep the person warm. Wrap painful limbs in a warm cloth — never apply direct heat such as a hot water bottle to bare skin.',
  },
  {
    title: 'Give pain relief as prescribed',
    text: 'If a doctor has prescribed pain medicine, give it early. Pain is easier to control when treated quickly than when allowed to build.',
  },
  {
    title: 'Try gentle movement and distraction',
    text: 'Slow breathing, a warm bath if the person is comfortable, and quiet distraction help some people. Rest the painful area.',
  },
  {
    title: 'Watch for the red-flag signs',
    text: 'Fever, chest pain, difficulty breathing, sudden weakness or confusion, a severe headache, or pain that will not settle. Any of these means hospital now.',
  },
  {
    title: 'Know when to go to hospital',
    text: 'If pain is not controlled at home within about an hour, if there is any fever, or if the person is drowsy or struggling to breathe, go to hospital. Do not wait until morning.',
  },
]

/* ---------------------------------------------------------------------------
   TREATMENTS (plain language)
   --------------------------------------------------------------------------- */
export const treatments = [
  {
    icon: 'pill',
    title: 'Hydroxyurea',
    text: 'A daily tablet that helps the body make more of a healthier type of haemoglobin. Studies show it reduces the number of pain crises and hospital admissions. It needs regular blood tests and a doctor’s supervision.',
    tone: 'teal',
  },
  {
    icon: 'syringe',
    title: 'Blood transfusion',
    text: 'Healthy donor blood replaces sickled cells. It is used for severe anaemia, acute chest syndrome, stroke prevention and before some surgeries. Iron levels must be monitored because transfusions add iron to the body.',
    tone: 'red',
  },
  {
    icon: 'heart',
    title: 'Bone marrow (stem cell) transplant',
    text: 'The only currently established cure. It replaces the bone marrow that makes sickle cells with marrow from a matched donor, usually a sibling. It carries serious risks and is not suitable for everyone.',
    tone: 'gold',
  },
  {
    icon: 'microscope',
    title: 'Newer therapies',
    text: 'Gene therapies and newer medicines are now approved in some countries and continue to be studied. Access and cost remain major barriers, particularly in Africa. Ask a haematologist about eligibility.',
    tone: 'coral',
  },
  {
    icon: 'drop',
    title: 'Folic acid & penicillin',
    text: 'Daily folic acid supports red blood cell production. Daily penicillin, started in infancy, protects young children from dangerous infections.',
    tone: 'charcoal',
  },
  {
    icon: 'activity',
    title: 'Hydration, warmth & vaccination',
    text: 'The everyday management that prevents crises: plenty of water, staying warm, avoiding exhaustion, and keeping up with routine and additional vaccinations.',
    tone: 'teal',
  },
]

/* ---------------------------------------------------------------------------
   MYTHS VS FACTS (flip cards)
   --------------------------------------------------------------------------- */
export const myths = [
  {
    myth: '“Sickle cell disease is contagious.”',
    fact: 'It is not. Sickle cell disease is inherited — passed through genes from both parents. You cannot catch it by touching, sharing food or being near someone.',
  },
  {
    myth: '“If I have the trait, I am sick.”',
    fact: 'Sickle cell trait (AS) is a carrier state. Most people with trait live healthy, active lives. What matters is knowing your genotype before starting a family.',
  },
  {
    myth: '“Two carriers will always have a child with the disease.”',
    fact: 'Two carriers (AS and AS) have a 1 in 4 chance in each pregnancy of a child with sickle cell disease — and a 1 in 4 chance of a child with no trait at all. It is a chance, not a certainty.',
  },
  {
    myth: '“A genotype test is only for women.”',
    fact: 'Everyone should know their genotype, regardless of gender. Both parents contribute a gene, so both need to know.',
  },
  {
    myth: '“There is a cure, and it works for everyone.”',
    fact: 'Bone marrow transplant and newer gene therapies can cure some people, but they are not available, affordable or safe for everyone. Most care focuses on managing the disease well.',
  },
  {
    myth: '“Traditional herbs can replace treatment.”',
    fact: 'Some remedies may be harmless, others interact with medicines or cause harm. Tell your doctor about everything you take, and never stop prescribed treatment without medical advice.',
  },
]

/* ---------------------------------------------------------------------------
   LIVING WELL
   --------------------------------------------------------------------------- */
export const careChecklist = [
  {
    icon: 'droplet',
    title: 'Drink water all day',
    text: 'Aim for at least 8 glasses (about 2 litres) daily, and more in hot weather or during sport. Dehydration is the most common crisis trigger.',
  },
  {
    icon: 'pill',
    title: 'Take folic acid daily',
    text: 'Folic acid helps your body build red blood cells. Take it at the same time every day so it becomes routine.',
  },
  {
    icon: 'syringe',
    title: 'Stay up to date with vaccines',
    text: 'This includes routine childhood vaccines, plus pneumococcal, meningococcal, Haemophilus influenzae type b, hepatitis B and yearly influenza.',
  },
  {
    icon: 'moon',
    title: 'Avoid your known triggers',
    text: 'Keep warm in cold weather, avoid sudden temperature changes, pace your activity, and get enough sleep.',
  },
  {
    icon: 'stethoscope',
    title: 'Keep every check-up',
    text: 'Regular reviews catch organ changes early. Your team will usually check blood counts, kidney and lung function, and your eyes.',
  },
  {
    icon: 'basket',
    title: 'Eat well and take iron only if advised',
    text: 'Balance meals with protein, fruit and vegetables. Never take iron supplements unless a doctor prescribes them — they can build up in the body.',
  },
]

export const nutritionTips = [
  {
    icon: 'droplet',
    title: 'Hydration',
    text: 'Water first. Fruit, soup and vegetables also count. Keep a bottle with you and sip throughout the day.',
    tone: 'teal',
  },
  {
    icon: 'apple',
    title: 'Iron-rich foods, with care',
    text: 'Beans, liver, fish and dark leafy greens support red blood cell production. If you have had many transfusions, ask your doctor before adding iron supplements.',
    tone: 'red',
  },
  {
    icon: 'sparkle',
    title: 'Folate & B12',
    text: 'Eggs, fish, dairy, green vegetables and fortified cereals help the body make new red blood cells.',
    tone: 'gold',
  },
  {
    icon: 'shield',
    title: 'Vitamin D & calcium',
    text: 'Important for bone strength. Safely get some sunlight, and include milk, cheese, small fish and fortified foods.',
    tone: 'teal',
  },
  {
    icon: 'activity',
    title: 'Gentle, regular movement',
    text: 'Walking, swimming and light cycling build strength. Hydrate before, during and after, and build up gradually.',
    tone: 'coral',
  },
  {
    icon: 'wind',
    title: 'Avoid smoke and poor air',
    text: 'Tobacco smoke and indoor cooking smoke lower oxygen levels. Cook with ventilation and avoid smoky rooms.',
    tone: 'charcoal',
  },
]

export const redFlags = [
  'Fever of 38°C (100.4°F) or above — especially in a child',
  'Chest pain, difficulty breathing, or a cough with fever',
  'Pain that is not controlled within an hour of taking medicine at home',
  'Sudden weakness, numbness, confusion, headache or trouble speaking',
  'A painful, swollen or pale limb, or a swollen, hard abdomen',
  'Drowsiness, fainting, or a child who is hard to wake',
  'Sudden severe pallor, dizziness or a racing heartbeat',
  'Priapism (a painful erection lasting more than 2 hours)',
]

export const mentalHealth = {
  intro:
    'Living with a long-term condition affects more than the body. Anxiety, low mood, exhaustion and fear are common and understandable — and they are treatable.',
  points: [
    {
      icon: 'users',
      title: 'You are not alone',
      text: 'Peer support circles connect you with people who live with the same condition. Sometimes that is the most useful medicine.',
    },
    {
      icon: 'brain',
      title: 'Ask for psychological support',
      text: 'Counselling is not a sign of weakness. Ask your hospital for referral to a clinical psychologist or counsellor.',
    },
    {
      icon: 'moon',
      title: 'Protect your sleep',
      text: 'Pain disturbs sleep, and poor sleep lowers pain tolerance. A regular bedtime and a warm, dark room help break the cycle.',
    },
    {
      icon: 'megaphone',
      title: 'Talk about it',
      text: 'Share your diagnosis with people you trust — school, workplace or friends. Hiding it delays help when a crisis starts.',
    },
  ],
}

/* ---------------------------------------------------------------------------
   RESOURCES & DOWNLOADS (placeholder PDFs)
   --------------------------------------------------------------------------- */
export const downloads = [
  {
    title: 'Living Well daily care checklist',
    meta: 'PDF · 2 pages · English',
    icon: 'file',
  },
  {
    title: 'When to go to hospital (wall chart)',
    meta: 'PDF · 1 page · English & Hausa',
    icon: 'alert',
  },
  {
    title: 'Teachers’ guide: supporting a pupil with sickle cell',
    meta: 'PDF · 6 pages · English',
    icon: 'school',
  },
  {
    title: 'Employers’ guide: reasonable adjustments',
    meta: 'PDF · 4 pages · English',
    icon: 'briefcase',
  },
  {
    title: 'Nutrition and hydration guide',
    meta: 'PDF · 3 pages · English',
    icon: 'apple',
  },
  {
    title: 'Genetic counselling: questions to ask',
    meta: 'PDF · 2 pages · English',
    icon: 'dna',
  },
]

export const supportGroups = [
  {
    name: 'Kaduna Young Adults Circle',
    when: '2nd Saturday, 10:00–12:00',
    where: 'Kaduna Central LGA — REPLACE venue',
    for: 'People living with sickle cell disease, aged 18–35',
  },
  {
    name: 'Caregivers & Parents Circle',
    when: 'Last Thursday, 16:00–17:30',
    where: 'Online (WhatsApp video)',
    for: 'Parents, guardians and caregivers',
  },
  {
    name: 'Teen Connect',
    when: '1st Sunday, 14:00–15:30',
    where: 'Kaduna North LGA — REPLACE venue',
    for: 'Young people aged 13–17',
  },
  {
    name: 'Newly Diagnosed Families',
    when: 'On request, within 2 weeks',
    where: 'Home visit or clinic',
    for: 'Families who have just received a diagnosis',
  },
]

/* ---------------------------------------------------------------------------
   TEAM & LEADERSHIP
   REPLACE every name, role and short biography.  The initials-only avatars
   stand in for portrait photographs.
   --------------------------------------------------------------------------- */
export const team = [
  {
    name: 'Full Name', // REPLACE
    role: 'Founder & Executive Director',
    bio: 'REPLACE: one sentence on their background and why they started this work.',
    group: 'leadership',
  },
  {
    name: 'Full Name', // REPLACE
    role: 'Board Chair',
    bio: 'REPLACE: one sentence on their governance experience.',
    group: 'leadership',
  },
  {
    name: 'Full Name', // REPLACE
    role: 'Programmes Director',
    bio: 'REPLACE: one sentence on programme delivery experience.',
    group: 'leadership',
  },
  {
    name: 'Full Name', // REPLACE
    role: 'Medical Adviser (Haematology)',
    bio: 'REPLACE: consultant haematologist who reviews our medical content.',
    group: 'leadership',
  },
  {
    name: 'Full Name', // REPLACE
    role: 'Community Outreach Lead',
    bio: 'REPLACE: one sentence on outreach and volunteer coordination.',
    group: 'team',
  },
  {
    name: 'Full Name', // REPLACE
    role: 'Genetic Counsellor',
    bio: 'REPLACE: one sentence on counselling qualifications.',
    group: 'team',
  },
  {
    name: 'Full Name', // REPLACE
    role: 'Finance & Compliance Officer',
    bio: 'REPLACE: one sentence on finance and accountability.',
    group: 'team',
  },
  {
    name: 'Full Name', // REPLACE
    role: 'Volunteer Coordinator',
    bio: 'REPLACE: one sentence on volunteer management.',
    group: 'team',
  },
]

export const partners = [
  { name: 'Partner Hospital Name', kind: 'Referral partner' }, // REPLACE
  { name: 'Teaching Hospital Name', kind: 'Research partner' },
  { name: 'State Ministry of Health', kind: 'Government partner' },
  { name: 'Corporate Sponsor Name', kind: 'Corporate sponsor' },
  { name: 'Diagnostics Laboratory', kind: 'Screening partner' },
  { name: 'Community Foundation', kind: 'Funding partner' },
  { name: 'University Partner', kind: 'Academic partner' },
  { name: 'Media Partner Name', kind: 'Media partner' },
]

/* ---------------------------------------------------------------------------
   OUR STORY TIMELINE
   REPLACE the years and milestones with your real history.
   --------------------------------------------------------------------------- */
export const timeline = [
  {
    year: '2015',
    title: 'A family starts meeting in a living room',
    text: 'Founded by a REPLACE: founder name and their family, after a diagnosis changed their own plans. The first meetings were five families in one sitting room.',
  },
  {
    year: '2017',
    title: 'Our first screening drive',
    text: 'REPLACE: number of people tested at the first community genotype screening, held at a market in Kaduna.',
  },
  {
    year: '2019',
    title: 'Registered as a charity',
    text: 'Formally registered with the Corporate Affairs Commission and began publishing annual accounts.',
  },
  {
    year: '2021',
    title: 'Hydroxyurea access programme',
    text: 'Partnered with a teaching hospital to supply hydroxyurea to children whose families could not afford it.',
  },
  {
    year: '2023',
    title: 'School outreach goes statewide',
    text: 'Awareness lessons moved into REPLACE: number of schools, with teacher training packs in English and Hausa.',
  },
  {
    year: '2026',
    title: 'Advocacy and research',
    text: 'Published community prevalence data and submitted policy recommendations on newborn screening and pain management.',
  },
]

/* ---------------------------------------------------------------------------
   EVENTS
   Dates are placeholders. World Sickle Cell Day (19 June) is fixed and
   celebrated every year — the countdown computes it automatically.
   --------------------------------------------------------------------------- */
export const events = [
  {
    id: 'screening-nov-26',
    title: 'Free genotype screening drive',
    date: '2026-11-14',
    time: '09:00 – 15:00',
    location: 'REPLACE venue, Kaduna North',
    type: 'Screening',
    summary:
      'Free finger-prick genotype tests with private counselling for every result. No appointment needed.',
    spots: 'Walk-in',
  },
  {
    id: 'walk-nov-26',
    title: 'Community awareness walk',
    date: '2026-11-28',
    time: '07:00 – 10:00',
    location: 'REPLACE route, Kaduna',
    type: 'Awareness',
    summary:
      'A family-friendly walk to open the conversation about sickle cell disease in our communities.',
    spots: 'Open to all',
  },
  {
    id: 'caregivers-dec-26',
    title: 'Caregivers’ support circle',
    date: '2026-12-05',
    time: '16:00 – 17:30',
    location: 'Online (WhatsApp video)',
    type: 'Support',
    summary:
      'A facilitated space for parents and guardians. This month: managing pain at home.',
    spots: '40 places',
  },
  {
    id: 'schools-jan-27',
    title: 'School outreach: secondary schools',
    date: '2027-01-16',
    time: '10:00 – 13:00',
    location: 'REPLACE school, Kaduna South',
    type: 'Outreach',
    summary:
      'Assembly talk and classroom workshop, with free teacher packs on supporting pupils.',
    spots: 'Registered schools',
  },
  {
    id: 'gala-mar-27',
    title: 'Annual fundraising gala',
    date: '2027-03-20',
    time: '18:00 – 22:00',
    location: 'REPLACE hotel, Kaduna',
    type: 'Fundraiser',
    summary:
      'An evening of storytelling and giving, raising funds for the medical assistance fund.',
    spots: 'Ticketed',
  },
  {
    id: 'wscd-2027',
    title: 'World Sickle Cell Day 2027',
    date: '2027-06-19',
    time: 'All day',
    location: 'REPLACE locations across Kaduna State',
    type: 'Awareness',
    summary:
      'Our biggest day of the year: screenings, awareness, media and a community celebration.',
    spots: 'Open to all',
  },
]

export const pastEvents = [
  { title: 'World Sickle Cell Day 2026', meta: 'June 2026 · Kaduna', art: 'cells' },
  { title: 'Market screening drive', meta: 'August 2026 · Kaduna', art: 'screening' },
  { title: 'Campus advocate training', meta: 'May 2026 · Zaria', art: 'school' },
  { title: 'Caregivers’ retreat', meta: 'March 2026 · Kaduna', art: 'support' },
  { title: 'Radio awareness month', meta: 'September 2026 · Statewide', art: 'media' },
  { title: 'Hydroxyurea access launch', meta: 'January 2026 · Teaching hospital', art: 'care' },
]

/* ---------------------------------------------------------------------------
   STORIES  (SAMPLE CONTENT — every story, name and quote is invented for
   layout purposes and MUST be replaced with real, consented stories.)
   `placeholder: true` renders a "Sample" chip so nothing ships by accident.
   --------------------------------------------------------------------------- */
export const stories = [
  {
    slug: 'placeholder-patient-1',
    placeholder: true,
    category: 'Patients',
    title: 'Sample story — a patient’s own words',
    name: 'REPLACE Name, age',
    role: 'Living with HbSS',
    quote:
      'REPLACE with a real, consented quote. When I finally met other people with sickle cell, I stopped feeling like the only one.',
    body: 'REPLACE: 2–3 short paragraphs in the person’s own words, with their written consent.',
    art: 'cells',
    tone: 'red',
  },
  {
    slug: 'placeholder-patient-2',
    placeholder: true,
    category: 'Patients',
    title: 'Sample story — screening changed our plans',
    name: 'REPLACE Name',
    role: 'Living with HbSC',
    quote:
      'REPLACE with a real, consented quote. Knowing our genotypes let us plan our family with clear information instead of fear.',
    body: 'REPLACE: 2–3 short paragraphs with consent.',
    art: 'dna',
    tone: 'teal',
  },
  {
    slug: 'placeholder-caregiver-1',
    placeholder: true,
    category: 'Caregivers',
    title: 'Sample story — a mother’s perspective',
    name: 'REPLACE Name',
    role: 'Parent and caregiver',
    quote:
      'REPLACE with a real, consented quote. The first year was the hardest. The support circle taught me what to watch for.',
    body: 'REPLACE: 2–3 short paragraphs with consent.',
    art: 'support',
    tone: 'gold',
  },
  {
    slug: 'placeholder-caregiver-2',
    placeholder: true,
    category: 'Caregivers',
    title: 'Sample story — caring for a sibling',
    name: 'REPLACE Name',
    role: 'Sibling and caregiver',
    quote:
      'REPLACE with a real, consented quote. I learned to give medicine and to stay calm, and I learned to ask for help too.',
    body: 'REPLACE: 2–3 short paragraphs with consent.',
    art: 'care',
    tone: 'coral',
  },
  {
    slug: 'placeholder-volunteer-1',
    placeholder: true,
    category: 'Volunteers',
    title: 'Sample story — why I volunteer',
    name: 'REPLACE Name',
    role: 'Screening volunteer',
    quote:
      'REPLACE with a real, consented quote. Giving someone their genotype result and explaining it in their own language takes ten minutes. It can change a family’s whole life.',
    body: 'REPLACE: 2–3 short paragraphs with consent.',
    art: 'screening',
    tone: 'teal',
  },
  {
    slug: 'placeholder-volunteer-2',
    placeholder: true,
    category: 'Volunteers',
    title: 'Sample story — a student advocate',
    name: 'REPLACE Name',
    role: 'Campus ambassador',
    quote:
      'REPLACE with a real, consented quote. We ran a campus drive and 300 students learned their genotype in a single afternoon.',
    body: 'REPLACE: 2–3 short paragraphs with consent.',
    art: 'school',
    tone: 'charcoal',
  },
]

export const storyCategories = ['All', 'Patients', 'Caregivers', 'Volunteers']

/* ---------------------------------------------------------------------------
   NEWS & BLOG  (sample articles)
   --------------------------------------------------------------------------- */
export const news = [
  {
    slug: 'hydroxyurea-access-expanded',
    placeholder: true,
    title: 'Sample article: hydroxyurea access expanded to two more hospitals',
    category: 'Programmes',
    date: '2026-10-12',
    author: 'REPLACE Author',
    authorRole: 'Programmes team',
    readTime: '4 min read',
    excerpt:
      'REPLACE with the article summary. Two additional teaching hospitals will now supply subsidised hydroxyurea to children enrolled in our assistance programme.',
    body: [
      'REPLACE with the full article. This paragraph introduces the announcement and why it matters for families.',
      'REPLACE with a paragraph of supporting detail — numbers, partners, and what changes for patients.',
      'REPLACE with a closing paragraph, including a quote from a named member of staff and a call to action.',
    ],
    art: 'care',
    tone: 'teal',
    featured: true,
  },
  {
    slug: 'world-sickle-cell-day-recap',
    placeholder: true,
    title: 'Sample article: World Sickle Cell Day — how Kaduna showed up',
    category: 'Events',
    date: '2026-06-24',
    author: 'REPLACE Author',
    authorRole: 'Communications',
    readTime: '3 min read',
    excerpt:
      'REPLACE with the article summary. Screenings, radio interviews and a community celebration across three local government areas.',
    body: [
      'REPLACE with the full article text.',
      'REPLACE with a second paragraph of detail.',
    ],
    art: 'media',
    tone: 'gold',
  },
  {
    slug: 'know-your-genotype-campaign',
    placeholder: true,
    title: 'Sample article: “Know your genotype” campaign reaches 5,000 students',
    category: 'Awareness',
    date: '2026-09-02',
    author: 'REPLACE Author',
    authorRole: 'Outreach team',
    readTime: '5 min read',
    excerpt:
      'REPLACE with the article summary. Campus clubs delivered peer-led sessions on trait, testing and family planning.',
    body: [
      'REPLACE with the full article text.',
      'REPLACE with a second paragraph of detail.',
    ],
    art: 'school',
    tone: 'red',
  },
  {
    slug: 'pain-management-advocacy',
    placeholder: true,
    title: 'Sample article: our submission on emergency pain management',
    category: 'Advocacy',
    date: '2026-08-19',
    author: 'REPLACE Author',
    authorRole: 'Policy lead',
    readTime: '6 min read',
    excerpt:
      'REPLACE with the article summary. We asked for a standard protocol so that nobody in a pain crisis is left waiting.',
    body: [
      'REPLACE with the full article text.',
      'REPLACE with a second paragraph of detail.',
    ],
    art: 'advocacy',
    tone: 'charcoal',
  },
  {
    slug: 'nutrition-guide-launch',
    placeholder: true,
    title: 'Sample article: new nutrition and hydration guide for families',
    category: 'Living Well',
    date: '2026-07-08',
    author: 'REPLACE Author',
    authorRole: 'Medical adviser',
    readTime: '3 min read',
    excerpt:
      'REPLACE with the article summary. A practical, plain-language guide reviewed by our clinical team.',
    body: [
      'REPLACE with the full article text.',
      'REPLACE with a second paragraph of detail.',
    ],
    art: 'nutrition',
    tone: 'teal',
  },
  {
    slug: 'volunteer-spotlight',
    placeholder: true,
    title: 'Sample article: volunteer spotlight — 300 tests in one afternoon',
    category: 'Volunteers',
    date: '2026-05-30',
    author: 'REPLACE Author',
    authorRole: 'Volunteer coordinator',
    readTime: '4 min read',
    excerpt:
      'REPLACE with the article summary. Meet the students who turned a campus event into a screening drive.',
    body: [
      'REPLACE with the full article text.',
      'REPLACE with a second paragraph of detail.',
    ],
    art: 'screening',
    tone: 'coral',
  },
]

export const newsCategories = [
  'All',
  'Programmes',
  'Events',
  'Awareness',
  'Advocacy',
  'Living Well',
  'Volunteers',
]

/* ---------------------------------------------------------------------------
   FAQ — grouped
   --------------------------------------------------------------------------- */
export const faqGroups = [
  {
    id: 'patients',
    icon: 'heart',
    title: 'For people living with sickle cell disease',
    items: [
      {
        q: 'What exactly is sickle cell disease?',
        a: 'It is an inherited blood disorder. Red blood cells that should be round and flexible become stiff and crescent-shaped. Those cells can block blood flow, which causes severe pain and damages organs over time. It is present from birth.',
      },
      {
        q: 'Can I live a full life with sickle cell disease?',
        a: 'Yes. With regular medical care, hydration, vaccination, and treatment when needed — including hydroxyurea where suitable — many people live full, productive lives. Care quality matters enormously, and we help people get it.',
      },
      {
        q: 'Is there a cure?',
        a: 'A bone marrow transplant can cure sickle cell disease, and newer gene therapies have been approved in some countries. Both carry serious risks, are expensive, and are not suitable or available for everyone. For most people, the focus is on excellent ongoing management.',
      },
      {
        q: 'What should I do during a pain crisis?',
        a: 'Drink fluids, keep warm, take prescribed pain medicine early, and use the red-flag checklist on our Living Well page. If there is fever, chest pain, difficulty breathing, or pain that medicine does not control within about an hour, go to hospital. Do not wait.',
      },
      {
        q: 'Can I get support with treatment costs?',
        a: 'We run a medical and treatment financial assistance programme for families who cannot meet the cost of medicines, transfusions or transport. Apply through our Programs & Services page or call the office.',
      },
    ],
  },
  {
    id: 'parents',
    icon: 'users',
    title: 'For parents and families',
    items: [
      {
        q: 'How will I know if my child has sickle cell disease?',
        a: 'A blood test called haemoglobin genotype testing will tell you. In Nigeria it is often done shortly after birth or at a first clinic visit. If your child has not been tested, a free screening drive or any laboratory can do it.',
      },
      {
        q: 'If we both have the trait, what are the chances for our children?',
        a: 'If both parents are carriers (AS), each pregnancy carries a 1 in 4 chance of the child having sickle cell disease, a 1 in 2 chance of the child being a carrier, and a 1 in 4 chance of the child having no trait at all. Our interactive Punnett square on the Understanding Sickle Cell page shows this for any pairing.',
      },
      {
        q: 'My child is always in pain. What can we do?',
        a: 'Speak to a haematologist about a written pain plan, hydroxyurea where appropriate, and how to use pain medicine early. Keep a diary of triggers and episodes to bring to appointments — patterns help the clinical team.',
      },
      {
        q: 'Can my child go to school normally?',
        a: 'Yes. Most children with sickle cell disease attend school fully. Give the school our teachers’ guide, make sure staff know the red-flag signs, and keep water available and the classroom warm.',
      },
    ],
  },
  {
    id: 'donors',
    icon: 'gift',
    title: 'For donors and sponsors',
    items: [
      {
        q: 'Where does my donation go?',
        a: 'Our fund allocation is published on the Donate page: the largest share goes to screening and direct patient support, with smaller proportions for awareness, research and administration. Full annual accounts are available on request.',
      },
      {
        q: 'How much does a screening cost?',
        a: 'Donation amounts in our impact breakdown are illustrative estimates based on our actual unit costs. We publish the current figure each year — REPLACE with your verified unit cost.',
      },
      {
        q: 'Can I give monthly?',
        a: 'Yes. Monthly giving is the most useful kind, because it lets us plan screening drives and medicine supply in advance. Choose the monthly option on the Donate page.',
      },
      {
        q: 'Is my donation tax-deductible?',
        a: 'REPLACE with your jurisdiction’s rules and your registration number. Confirm with your tax adviser.',
      },
      {
        q: 'Can my company sponsor a programme?',
        a: 'Yes. We offer programme sponsorship, event sponsorship and in-kind support. Use the corporate partnership form on the Get Involved page and we will respond within five working days.',
      },
    ],
  },
  {
    id: 'volunteers',
    icon: 'handshake',
    title: 'For volunteers',
    items: [
      {
        q: 'What can volunteers actually do?',
        a: 'Screening drives need registration and crowd-flow helpers, counsellors, interpreters and logistics support. We also need drivers, photographers, social media volunteers, campus ambassadors and people to help at events.',
      },
      {
        q: 'Do I need medical training?',
        a: 'No. Most roles need no clinical background. Any role involving counselling or testing is supervised by qualified clinicians and requires training, which we provide free.',
      },
      {
        q: 'How much time is expected?',
        a: 'As much or as little as you can give. Some volunteers help at one drive a year; others give a few hours a month. Tell us your availability in the application form.',
      },
      {
        q: 'Will I get a reference or certificate?',
        a: 'Yes. After a set number of hours we provide a written reference and a certificate of service. Ask the volunteer coordinator for details.',
      },
    ],
  },
]

/* ---------------------------------------------------------------------------
   DONATIONS — presets, impact, allocation
   REPLACE all amounts and allocation percentages with your audited figures.
   --------------------------------------------------------------------------- */
export const donationPresets = [5000, 15000, 40000, 75000, 150000]

export const donationImpact = [
  { amount: 5000, icon: 'droplet', text: 'funds one genotype screening test, from sample to counselling' },
  { amount: 15000, icon: 'pill', text: 'supplies a month of folic acid and vitamins for a child' },
  { amount: 40000, icon: 'syringe', text: 'covers emergency transport to hospital during a pain crisis' },
  { amount: 75000, icon: 'users', text: 'provides a family counselling and genotype session' },
  { amount: 150000, icon: 'school', text: 'delivers a full awareness day in a secondary school' },
  { amount: 500000, icon: 'megaphone', text: 'funds a community screening drive with 100 free tests' },
]

export const fundAllocation = [
  { label: 'Screening & testing', value: 30, color: '#B3202A' },
  { label: 'Direct patient support', value: 26, color: '#E8705A' },
  { label: 'Awareness & school outreach', value: 18, color: '#E9A93C' },
  { label: 'Research & advocacy', value: 12, color: '#127C6E' },
  { label: 'Peer support & counselling', value: 9, color: '#7A5CB8' },
  { label: 'Administration & governance', value: 5, color: '#5C554F' },
]

export const bankDetails = {
  accountName: 'Tirngan Sickle Cell Foundation', // REPLACE if different
  accountNumber: '0000000000', // REPLACE
  bankName: 'REPLACE Bank name',
  sortOrBranch: 'REPLACE branch',
  reference: 'Your name + “Donation”',
}

/* ---------------------------------------------------------------------------
   RESEARCH & DATA
   All figures are widely cited public estimates. Each carries its source.
   VERIFY AGAINST THE SOURCE BEFORE PUBLISHING and replace with your own
   programme data where relevant.
   --------------------------------------------------------------------------- */
export const researchFigures = [
  {
    value: '300,000+',
    label: 'Babies born with sickle cell disease each year worldwide',
    source: 'WHO estimate',
  },
  {
    value: '~5%',
    label: 'Of the world’s population carries a sickle cell gene',
    source: 'WHO estimate',
  },
  {
    value: 'Largest',
    label: 'Nigeria carries the largest burden of sickle cell disease globally',
    source: 'WHO / national estimates',
  },
  {
    value: '50–90%',
    label: 'Of children with sickle cell disease in Africa die before age 5 without early diagnosis and care',
    source: 'Published estimates — verify current figure',
  },
]

/* Country burden, illustrative ranking based on published estimates. */
export const prevalenceByCountry = [
  { country: 'Nigeria', value: 150, note: 'REPLACE/verify annual births (thousands)' },
  { country: 'DR Congo', value: 40, note: 'REPLACE/verify' },
  { country: 'India', value: 30, note: 'REPLACE/verify' },
  { country: 'Tanzania', value: 11, note: 'REPLACE/verify' },
  { country: 'Uganda', value: 10, note: 'REPLACE/verify' },
]

/* Our own programme delivery, by year — REPLACE with audited numbers. */
export const impactOverTime = [
  { year: '2019', screenings: 800, supported: 300 },
  { year: '2020', screenings: 1200, supported: 620 },
  { year: '2021', screenings: 2600, supported: 1450 },
  { year: '2022', screenings: 3800, supported: 2200 },
  { year: '2023', screenings: 5200, supported: 3100 },
  { year: '2024', screenings: 6400, supported: 3800 },
  { year: '2025', screenings: 7100, supported: 4400 },
  { year: '2026', screenings: 7500, supported: 4800 },
]

export const researchSources = [
  {
    org: 'WHO',
    title: 'Sickle cell disease — fact sheet',
    href: 'https://www.who.int/news-room/fact-sheets/detail/sickle-cell-disease',
    note: 'Global burden, trait prevalence and the WHO response.',
  },
  {
    org: 'NIH',
    title: 'Sickle cell disease — NHLBI',
    href: 'https://www.nhlbi.nih.gov/health/sickle-cell-disease',
    note: 'Symptoms, diagnosis, treatments and living well.',
  },
  {
    org: 'CDC',
    title: 'Sickle cell disease — data and statistics',
    href: 'https://www.cdc.gov/sickle-cell/',
    note: 'Surveillance data and newborn screening information.',
  },
  {
    org: 'NICE',
    title: 'Sickle cell disease: management guidance',
    href: 'https://www.nice.org.uk/guidance/ng243',
    note: 'Clinical management recommendations. UK-based.',
  },
  {
    org: 'REPLACE',
    title: 'Your own published study or report',
    href: '#',
    note: 'Add your own research outputs here with a link.',
  },
]

/* ---------------------------------------------------------------------------
   NAVIGATION
   --------------------------------------------------------------------------- */
export const navigation = [
  { label: 'Home', to: '/' },
  {
    label: 'About',
    to: '/about',
    children: [
      { label: 'About us', to: '/about', desc: 'Mission, story, leadership and partners' },
      { label: 'Leadership & team', to: '/about#team', desc: 'Who runs the foundation' },
      { label: 'Partners & sponsors', to: '/about#partners', desc: 'Organisations we work with' },
      { label: 'Contact', to: '/contact', desc: 'Reach the office directly' },
    ],
  },
  {
    label: 'Sickle cell',
    to: '/understanding-sickle-cell',
    children: [
      {
        label: 'Understanding sickle cell',
        to: '/understanding-sickle-cell',
        desc: 'What it is, symptoms, treatments',
      },
      {
        label: 'Trait & genetic counselling',
        to: '/trait-and-counselling',
        desc: 'Know your genotype and plan ahead',
      },
      { label: 'Research & data', to: '/research', desc: 'Prevalence, studies and sources' },
      { label: 'FAQ', to: '/faq', desc: 'Answers by audience' },
    ],
  },
  {
    label: 'Support',
    to: '/living-well',
    children: [
      { label: 'Living well', to: '/living-well', desc: 'Daily care and emergency guide' },
      { label: 'Programs & services', to: '/programs', desc: 'What we can do for you' },
      { label: 'Resources & downloads', to: '/living-well#resources', desc: 'Guides for home and school' },
      { label: 'Support groups', to: '/living-well#groups', desc: 'Meet others who understand' },
    ],
  },
  {
    label: 'Community',
    to: '/stories',
    children: [
      { label: 'Stories', to: '/stories', desc: 'In their own words' },
      { label: 'News & blog', to: '/news', desc: 'Updates and announcements' },
      { label: 'Events & awareness', to: '/events', desc: 'Calendar and World Sickle Cell Day' },
    ],
  },
  {
    label: 'Get involved',
    to: '/get-involved',
    children: [
      { label: 'Ways to help', to: '/get-involved', desc: 'Volunteer, partner, fundraise' },
      { label: 'Volunteer', to: '/get-involved#volunteer', desc: 'Apply to join the team' },
      { label: 'Corporate partnership', to: '/get-involved#partner', desc: 'Sponsor a programme' },
      { label: 'Donate', to: '/donate', desc: 'Give once or monthly' },
    ],
  },
]

export const legalPages = [
  { label: 'Privacy policy', to: '/privacy' },
  { label: 'Terms of use', to: '/terms' },
  { label: 'Donation & refund policy', to: '/refund-policy' },
  { label: 'Cookie notice', to: '/cookies' },
  { label: 'Accessibility statement', to: '/accessibility' },
]

/* Footer quick links */
export const footerLinks = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About us', to: '/about' },
      { label: 'Stories', to: '/stories' },
      { label: 'News & blog', to: '/news' },
      { label: 'Events', to: '/events' },
    ],
  },
  {
    title: 'Get support',
    links: [
      { label: 'Understanding sickle cell', to: '/understanding-sickle-cell' },
      { label: 'Living well', to: '/living-well' },
      { label: 'Trait & genetic counselling', to: '/trait-and-counselling' },
      { label: 'Programs & services', to: '/programs' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    title: 'Take action',
    links: [
      { label: 'Donate', to: '/donate' },
      { label: 'Volunteer', to: '/get-involved' },
      { label: 'Partner with us', to: '/get-involved' },
      { label: 'Research & data', to: '/research' },
      { label: 'Contact us', to: '/contact' },
    ],
  },
]

/* ---------------------------------------------------------------------------
   CRISIS / DISCLAIMER COPY — reviewed wording, edit with clinical advice
   --------------------------------------------------------------------------- */
export const medicalDisclaimer =
  'The information on this website is educational and is not a substitute for professional medical advice, diagnosis or treatment. Always seek the advice of a qualified health professional about a medical condition, and never delay seeking it because of something you have read here.'

export const emergencyDisclaimer = `For medical emergencies, call ${site.emergencyNumber} or go to ${site.hospitalNote} immediately.`
