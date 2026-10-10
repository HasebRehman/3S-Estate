'use client';

import { useRef, useState } from 'react';

// Zoho WebToLead values (from the published embed code, do not change)
const ZOHO_ACTION = 'https://crm.zoho.com/crm/WebToLeadForm';
const HIDDEN = {
  xnQsjsdp: '70fea2afd8f62e67595657ae00e74d0e2aa2ea4cb92a17d8cc67b9b0ed875c4c',
  xmIwtLD:
    '5898b36aaba46aee9d40bf0b0c8bca73ac6760cbaf445a111b124fc7a5f6c7afd05c38620ad8e0dd1adb377f63f127c8',
  actionType: 'TGVhZHM=',
  returnURL: 'null',
  'Lead Source': 'Website',
};

const SOCIETIES = [
  'DHA', 'Bahria Town', 'Gulberg', 'Johar Town', 'Model Town', 'Wapda Town',
  'Valencia Town', 'Askari', 'Lake City', 'Park View City', 'Eden',
];
const UNITS = ['Marla', 'Kanal', 'Sq Ft'];

// Accepts 03XXXXXXXXX, 3XXXXXXXXX, +923XXXXXXXXX, 00923XXXXXXXXX -> +923XXXXXXXXX
function normalizePkMobile(raw: string): string | null {
  let d = raw.replace(/[^\d+]/g, '');
  if (d.startsWith('+')) d = d.slice(1);
  if (d.startsWith('0092')) d = d.slice(2);
  if (d.startsWith('92')) d = d.slice(2);
  if (d.startsWith('0')) d = d.slice(1);
  return /^3\d{9}$/.test(d) ? `+92${d}` : null;
}

export default function EnquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('Last Name') || '').trim();
    const phone = normalizePkMobile(String(fd.get('Phone') || ''));

    if (!name) {
      e.preventDefault();
      return setError('Please enter your name.');
    }
    if (!phone) {
      e.preventDefault();
      return setError('Please enter a valid Pakistani mobile number (e.g. 0300 1234567).');
    }
    // honeypot: bots fill this, humans never see it
    if (String(fd.get('aG9uZXlwb3Q') || '')) {
      e.preventDefault();
      return;
    }
    (form.elements.namedItem('Phone') as HTMLInputElement).value = phone;
    setError('');
    setSending(true); // native POST continues into the hidden iframe
  }

  if (submitted) {
    return (
      <div className="rounded-xl border p-6 text-center">
        <h3 className="text-xl font-semibold">Thank you!</h3>
        <p className="mt-2">Our team will contact you shortly.</p>
      </div>
    );
  }

  const input = 'w-full rounded-lg border px-3 py-2';

  return (
    <>
      <iframe
        name="zoho_target"
        title="zoho"
        className="hidden"
        onLoad={() => {
          if (sending) {
            setSending(false);
            setSubmitted(true);
          }
        }}
      />
      <form
        ref={formRef}
        action={ZOHO_ACTION}
        method="POST"
        target="zoho_target"
        acceptCharset="UTF-8"
        onSubmit={onSubmit}
        className="mx-auto grid max-w-xl gap-4"
      >
        {Object.entries(HIDDEN).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} />
        ))}
        <input type="hidden" name="zc_gad" value="" />
        {/* honeypot */}
        <input type="text" name="aG9uZXlwb3Q" defaultValue="" tabIndex={-1}
          autoComplete="off" style={{ display: 'none' }} />

        <div className="grid grid-cols-2 gap-4">
          <input className={input} name="First Name" placeholder="First name" maxLength={40} />
          <input className={input} name="Last Name" placeholder="Last name *" maxLength={80} required />
        </div>
        <input className={input} name="Phone" type="tel" placeholder="Mobile (03XX XXXXXXX) *" maxLength={30} required />
        <input className={input} name="Email" type="email" placeholder="Email (optional)" maxLength={100} />

        <select className={input} name="LEADCF3" defaultValue="-None-">
          <option value="-None-">Preferred society</option>
          {SOCIETIES.map((s) => <option key={s}>{s}</option>)}
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input className={input} name="LEADCF67" inputMode="decimal" pattern="[0-9.]*" placeholder="Plot size" maxLength={16} />
          <select className={input} name="LEADCF4" defaultValue="-None-">
            <option value="-None-">Unit</option>
            {UNITS.map((u) => <option key={u}>{u}</option>)}
          </select>
        </div>
        <input className={input} name="LEADCF66" inputMode="decimal" pattern="[0-9.]*" placeholder="Budget (PKR)" maxLength={16} />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={sending}
          className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white disabled:opacity-60">
          {sending ? 'Sending...' : 'Submit enquiry'}
        </button>
      </form>
    </>
  );
}
