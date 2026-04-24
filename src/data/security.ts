export interface SecurityPoint {
  title: string;
  description: string;
}

export const SECURITY_INTRO = {
  eyebrow: 'Security at Sure Companion',
  title: 'Built with trust at the center.',
  description:
    'We treat the security of agency and client information as a core part of the product — not a checkbox. Our approach focuses on responsible access, responsible data handling, and a roadmap for the controls that mature platforms need.',
};

export const SECURITY_SECTIONS: { id: string; title: string; description: string; points: SecurityPoint[] }[] = [
  {
    id: 'access',
    title: 'Secure access direction',
    description:
      'Authentication and account handling follow a clear path toward the modern controls agencies expect.',
    points: [
      { title: 'Strong, modern sign-in', description: 'Designed to support strong credentials and future MFA options.' },
      { title: 'Session awareness', description: 'Sessions are scoped so producers only see what they should.' },
      { title: 'Recovery that respects trust', description: 'Account recovery flows take identity assurance seriously.' },
    ],
  },
  {
    id: 'roles',
    title: 'Role-aware platform',
    description:
      'Access should match the job. Sure Companion is built around role-aware access so producers, service teams, and leadership each see what they need.',
    points: [
      { title: 'Clear role boundaries', description: 'Least-privilege as a default posture, not an afterthought.' },
      { title: 'Configurable over time', description: 'Roles will evolve with the needs of real agencies using the platform.' },
      { title: 'Auditable by design', description: 'Key actions are captured so the answers to “who did what” are available.' },
    ],
  },
  {
    id: 'data',
    title: 'Data handling philosophy',
    description:
      'We aim to hold only what we need, protect it in transit and at rest, and be clear about how it is used.',
    points: [
      { title: 'Encryption in transit', description: 'Traffic is served over HTTPS with modern TLS defaults.' },
      { title: 'Thoughtful retention', description: 'We hold data only as long as it serves the agency using it.' },
      { title: 'Responsible third parties', description: 'Integrations are evaluated for how they treat your data.' },
    ],
  },
  {
    id: 'roadmap',
    title: 'A roadmap you can plan around',
    description:
      'We publish our direction so agencies can plan. These are near-term focus areas, not guarantees of specific dates.',
    points: [
      { title: 'Formalized admin controls', description: 'Expanded administrative settings and granular role tooling.' },
      { title: 'Stronger audit and reporting', description: 'Deeper activity logs tuned for security reviews.' },
      { title: 'Third-party security reviews', description: 'External review and attestations as the platform matures.' },
    ],
  },
];
