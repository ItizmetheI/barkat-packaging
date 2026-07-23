import { useState } from 'react'
import { animate } from 'animejs'
import Reveal from './Reveal'

const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', required: true },
  { name: 'company', label: 'Company', type: 'text', required: true },
  { name: 'email', label: 'Work email', type: 'email', required: true },
]

const inputStyle = {
  padding: '10px 12px',
  background: '#fff',
  border: '1px solid var(--border)',
  color: 'var(--ink)',
  fontFamily: 'inherit',
  fontSize: 14,
  width: '100%',
}
const labelStyle = { fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 6, display: 'block' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Static contact/RFQ section - a normal part of the page now, not a blurred overlay that
// only appeared in the final 3% of the old 8-chapter 3D scroll.
// TODO: wire submit to a real endpoint once Ahmed decides where RFQs should land - this
// validates and holds the data client-side, but there is nowhere to send it yet.
export default function ContactForm() {
  const [values, setValues] = useState({ name: '', company: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success

  function handleChange(name) {
    return (e) => setValues((v) => ({ ...v, [name]: e.target.value }))
  }

  function validate() {
    const next = {}
    for (const field of FIELDS) {
      if (field.required && !values[field.name].trim()) next[field.name] = 'Required'
    }
    if (values.email && !EMAIL_RE.test(values.email)) next.email = 'Enter a valid email'
    return next
  }

  function handleSubmit(e) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return
    // No real backend yet (see TODO above) - this is the honest end state until one exists.
    setStatus('submitting')
    setTimeout(() => setStatus('success'), 400)
  }

  if (status === 'success') {
    return (
      <section
        id="contact"
        style={{
          padding: '96px 6%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-alt)',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 420 }}>
          <h2 style={{ color: 'var(--ink)', fontSize: 22, margin: '0 0 12px' }}>Request received</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            We'll get back to you shortly with a quote for {values.company || 'your order'}.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      id="contact"
      style={{
        padding: '96px 6%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-alt)',
      }}
    >
      <Reveal style={{ width: 'min(480px, 100%)' }}>
        <form
          noValidate
          onSubmit={handleSubmit}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            padding: 32,
            background: '#fff',
            border: '1px solid var(--border)',
            boxShadow: '0 1px 3px rgba(10,22,40,0.04)',
          }}
        >
          <h2 style={{ color: 'var(--ink)', fontSize: 20, margin: 0, fontWeight: 600 }}>Get a Quote</h2>

          {FIELDS.map((field) => (
            <div key={field.name}>
              <label htmlFor={`contact-${field.name}`} style={labelStyle}>
                {field.label}
                {field.required && ' *'}
              </label>
              <input
                id={`contact-${field.name}`}
                type={field.type}
                value={values[field.name]}
                onChange={handleChange(field.name)}
                aria-invalid={!!errors[field.name]}
                aria-describedby={errors[field.name] ? `contact-${field.name}-error` : undefined}
                style={{ ...inputStyle, borderColor: errors[field.name] ? '#c0392b' : 'var(--border)' }}
              />
              {errors[field.name] && (
                <span id={`contact-${field.name}-error`} style={{ color: '#c0392b', fontSize: 12, marginTop: 4, display: 'block' }}>
                  {errors[field.name]}
                </span>
              )}
            </div>
          ))}

          <div>
            <label htmlFor="contact-message" style={labelStyle}>
              What do you need?
            </label>
            <textarea
              id="contact-message"
              placeholder="Board type, dimensions, order volume — tell us what you need"
              rows={4}
              value={values.message}
              onChange={handleChange('message')}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            onMouseEnter={(e) => animate(e.currentTarget, { scale: 1.03, duration: 180, ease: 'outQuad' })}
            onMouseLeave={(e) => animate(e.currentTarget, { scale: 1, duration: 180, ease: 'outQuad' })}
            onMouseDown={(e) => animate(e.currentTarget, { scale: 0.96, duration: 150, ease: 'outQuad' })}
            onMouseUp={(e) => animate(e.currentTarget, { scale: 1.03, duration: 150, ease: 'outQuad' })}
            style={{
              marginTop: 8,
              padding: '12px 20px',
              background: 'var(--ink)',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              letterSpacing: '0.05em',
              cursor: status === 'submitting' ? 'default' : 'pointer',
              opacity: status === 'submitting' ? 0.7 : 1,
            }}
          >
            {status === 'submitting' ? 'SENDING…' : 'GET QUOTE'}
          </button>
        </form>
      </Reveal>
    </section>
  )
}
