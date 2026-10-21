
'use client';

import { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

import MagneticButton from '@/components/MagneticButton';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactForm() {
  const { t, lang } = useLanguage();
  const c = t.contact;

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website: '',
  });

  const [topicIndex, setTopicIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const isTelugu = lang === 'te';

  const messages = isTelugu
    ? {
        sending: 'సందేశాన్ని పంపుతున్నాము...',
        submit: 'సందేశాన్ని పంపండి',
        success:
          'మీ సందేశం విజయవంతంగా పంపబడింది. SUSALI బృందం మిమ్మల్ని సంప్రదిస్తుంది.',
        acknowledgement:
          'మీ ఈమెయిల్‌కు ధృవీకరణ సందేశం కూడా పంపబడింది.',
        noAcknowledgement:
          'మీ సందేశం అందింది. అయితే ధృవీకరణ ఈమెయిల్ పంపడంలో సమస్య ఏర్పడింది.',
        error:
          'సందేశం పంపడంలో సమస్య ఏర్పడింది. దయచేసి మళ్లీ ప్రయత్నించండి.',
      }
    : {
        sending: 'Sending your enquiry...',
        submit: 'Send Enquiry',
        success:
          'Your enquiry has been submitted successfully. The SUSALI team will contact you.',
        acknowledgement:
          'A confirmation email has also been sent to your address.',
        noAcknowledgement:
          'Your enquiry was received, but the confirmation email could not be sent.',
        error:
          'Something went wrong. Please try again.',
      };

  function updateField(field, value) {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (status) {
      setStatus(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          topic: c.topics[topicIndex] || c.topics[0],
          lang,
        }),
      });

      const result = await response.json();

      
if (!response.ok || !result.success) {
  console.error('SUSALI form validation:', {
    status: response.status,
    field: result.field || 'unknown',
    message: result.message,
  });

  setStatus({
    type: 'error',
    message: result.message || messages.error,
  });

  return;
}


      setStatus({
        type: 'success',
        message:
          messages.success +
          ' ' +
          (result.autoReplySent
            ? messages.acknowledgement
            : messages.noAcknowledgement),
      });

      setValues({
        name: '',
        email: '',
        phone: '',
        message: '',
        website: '',
      });

      setTopicIndex(0);
    } catch (error) {
      console.error('Contact form submission failed:', error);

      setStatus({
        type: 'error',
        message: messages.error,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
    >
      <div className="form-grid">
        {/* Full name */}
        <label>
          {c.labels.name}
          <span> *</span>

          <input
            type="text"
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            value={values.name}
            onChange={(e) =>
              updateField('name', e.target.value)
            }
            placeholder={c.labels.name}
            disabled={loading}
          />
        </label>

        {/* Email address */}
        <label>
          {c.labels.email}
          <span> *</span>

          <input
            type="email"
            name="email"
            required
            maxLength={254}
            autoComplete="email"
            value={values.email}
            onChange={(e) =>
              updateField('email', e.target.value)
            }
            placeholder="you@example.com"
            disabled={loading}
          />
        </label>
      </div>

      {/* Phone number */}
      <label>
        {c.labels.phone}

        <input
          type="tel"
          name="phone"
          maxLength={30}
          autoComplete="tel"
          value={values.phone}
          onChange={(e) =>
            updateField('phone', e.target.value)
          }
          placeholder="+91..."
          disabled={loading}
        />
      </label>

      {/* Enquiry topic */}
      <label>
        {c.labels.topic}

        <select
          name="topic"
          value={topicIndex}
          onChange={(e) => {
            setTopicIndex(Number(e.target.value));
            setStatus(null);
          }}
          disabled={loading}
        >
          {c.topics.map((topic, index) => (
            <option
              key={index}
              value={index}
            >
              {topic}
            </option>
          ))}
        </select>
      </label>

      {/* Message */}
      <label>
        {c.labels.message}
        <span> *</span>

        <textarea
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={5000}
          value={values.message}
          onChange={(e) =>
            updateField('message', e.target.value)
          }
          placeholder={c.labels.message}
          disabled={loading}
        />
      </label>

      {/* Hidden anti-spam field */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      >
        <label htmlFor="susali-website-field">
          Website
        </label>

        <input
          id="susali-website-field"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) =>
            updateField('website', e.target.value)
          }
        />
      </div>

      {/* Submit button */}
      <MagneticButton>
        <button
          className="btn btn-primary submit-btn"
          type="submit"
          disabled={loading}
          aria-busy={loading}
          style={{
            opacity: loading ? 0.75 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading
            ? messages.sending
            : messages.submit}

          {loading ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            <ArrowUpRight size={18} />
          )}
        </button>
      </MagneticButton>

      {/* Success or error */}
      {status && (
        <div
          role={status.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            marginTop: '18px',
            padding: '16px',
            borderRadius: '12px',
            background:
              status.type === 'success'
                ? '#edf8f2'
                : '#fff0ef',
            color:
              status.type === 'success'
                ? '#17603c'
                : '#a12a25',
            lineHeight: 1.7,
            fontSize: '14px',
          }}
        >
          {status.type === 'success' ? (
            <CheckCircle2
              size={21}
              style={{ flexShrink: 0 }}
            />
          ) : (
            <AlertCircle
              size={21}
              style={{ flexShrink: 0 }}
            />
          )}

          <span>{status.message}</span>
        </div>
      )}

      {/* Privacy disclaimer */}
      <p className="form-disclaimer">
        {c.privacyDisclaimer}
      </p>
    </form>
  );
}
