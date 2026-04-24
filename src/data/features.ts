export interface Feature {
  id: string;
  title: string;
  description: string;
  icon:
    | 'users'
    | 'shield'
    | 'chart'
    | 'workflow'
    | 'document'
    | 'spark'
    | 'dashboard'
    | 'dollar'
    | 'inbox'
    | 'scales'
    | 'package'
    | 'calculator'
    | 'brain';
}

export interface Capability extends Feature {
  bullets: string[];
}

export interface FeatureCategory {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  features: Capability[];
}

export const FEATURES_PREVIEW: Feature[] = [
  {
    id: 'dashboard',
    title: 'Client & policy dashboard',
    description:
      'Your entire book in one real-time view — clients, renewals, and policy status without switching screens.',
    icon: 'dashboard',
  },
  {
    id: 'aegis-ai',
    title: 'Aegis AI',
    description:
      'Drop in a document and Aegis extracts the data, spots the gaps, and queues the follow-up — automatically.',
    icon: 'brain',
  },
  {
    id: 'automation',
    title: 'Automation engine',
    description:
      'AI-powered follow-up, renewal triggers, and workflow automation that runs without manual intervention.',
    icon: 'spark',
  },
  {
    id: 'underwriting',
    title: 'Underwriting suite',
    description:
      'Submission intake, configurable rules, a product builder, and a rating engine — all in one place.',
    icon: 'scales',
  },
];

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    id: 'client-ops',
    eyebrow: 'Client & Policy Operations',
    title: 'The foundation of a well-run agency.',
    description:
      'Give your team a single place to manage every client relationship, policy, and document — without bouncing between tools.',
    features: [
      {
        id: 'dashboard',
        title: 'Client / Policy Dashboard',
        description:
          'A real-time view of your entire book — clients, policies, renewals, and status — all on one screen.',
        icon: 'dashboard',
        bullets: [
          'Portfolio-wide view across all active and expiring policies',
          'Renewal signals and coverage gaps surfaced automatically',
          'Drill down to any client or policy in one click',
        ],
      },
      {
        id: 'crm',
        title: 'Basic CRM',
        description:
          'Client and policy records designed for producers, not generic sales teams.',
        icon: 'users',
        bullets: [
          'Contact and account records linked to every policy',
          'Activity history, notes, and communications in one place',
          'Producer ownership and service team visibility built in',
        ],
      },
      {
        id: 'document-storage',
        title: 'Document Storage',
        description:
          'Every file attached to the right client or policy, always findable.',
        icon: 'document',
        bullets: [
          'Attach documents directly to clients, policies, and submissions',
          'Tag, search, and retrieve any file in seconds',
          'Secure, structured storage — no more shared drives or email chains',
        ],
      },
    ],
  },
  {
    id: 'analytics-automation',
    eyebrow: 'AI, Automation & Finance',
    title: 'Work smarter. Close faster. Do more with less.',
    description:
      'Aegis AI, configurable workflows, and a full automation engine keep your book moving forward — with less manual effort from your team.',
    features: [
      {
        id: 'aegis-ai',
        title: 'Aegis AI',
        description:
          'Your AI-powered teammate that reads documents, surfaces insights, and executes follow-up tasks without being asked.',
        icon: 'brain',
        bullets: [
          'Extract risk data and coverage details from uploaded PDFs instantly',
          'Spot coverage gaps, renewal opportunities, and upsell signals automatically',
          'Schedule and send emails, texts, and tasks — no manual trigger required',
        ],
      },
      {
        id: 'workflow-engine',
        title: 'Workflow Engine',
        description:
          'Define how work moves through your agency so nothing falls through the cracks.',
        icon: 'workflow',
        bullets: [
          'Configurable stages and triggers for every workflow type',
          'Shared visibility on who owns what and what\'s next',
          'Clean handoffs between producers and service teams',
        ],
      },
      {
        id: 'automation-engine',
        title: 'Automation Engine',
        description:
          'Trigger the right action at the right time — emails, texts, tasks, reminders, and more.',
        icon: 'spark',
        bullets: [
          'AI-powered renewals, cross-sell, and follow-up automation',
          'Schedule recurring workflows across your entire book',
          'Event-driven triggers that fire without manual intervention',
        ],
      },
      {
        id: 'accounting',
        title: 'Accounting',
        description:
          'Commission tracking and financial reconciliation tied directly to your policy records.',
        icon: 'dollar',
        bullets: [
          'Commission tracking linked to every policy and carrier',
          'Billing, invoicing, and payment reconciliation in one place',
          'Reports built for producers, managers, and finance teams',
        ],
      },
    ],
  },
  {
    id: 'underwriting',
    eyebrow: 'Underwriting & Product Suite',
    title: 'Rate, build, and bind — in one platform.',
    description:
      'From intake to rate to bind, the underwriting suite handles commercial complexity without custom code.',
    features: [
      {
        id: 'submission-intake',
        title: 'Submission Intake',
        description:
          'Structured intake that captures the right data up front and routes it where it needs to go.',
        icon: 'inbox',
        bullets: [
          'Structured forms for new business and renewal submissions',
          'AI-assisted risk data extraction from uploaded documents',
          'Automatic routing to the right underwriter or market',
        ],
      },
      {
        id: 'underwriting-logic',
        title: 'Underwriting Logic',
        description:
          'Configurable rules your team can set up, update, and audit — without developer help.',
        icon: 'scales',
        bullets: [
          'Define eligibility and underwriting guidelines by line of business',
          'Supports multi-line and commercial lines complexity',
          'Approve, decline, or refer with a full audit trail',
        ],
      },
      {
        id: 'product-builder',
        title: 'Product Builder',
        description:
          'Create and manage insurance products for any line of business — no code required.',
        icon: 'package',
        bullets: [
          'Build coverage options, limits, and exclusion rules visually',
          'Launch new products and update existing ones instantly',
          'Supports mono-line and package policy structures',
        ],
      },
      {
        id: 'rating-engine',
        title: 'Rating Engine',
        description:
          'Real-time rates computed against your configured products the moment a risk is entered.',
        icon: 'calculator',
        bullets: [
          'Factor-based, tiered, and custom rating logic supported',
          'Real-time rating during submission or mid-term change',
          'Rate versioning and full audit history built in',
        ],
      },
    ],
  },
];
