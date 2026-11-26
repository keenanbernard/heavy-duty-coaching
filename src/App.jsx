import { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import coachWhiteCap from './assets/coach-white-cap.webp'
import program1 from './assets/program-1.webp'
import program2 from './assets/program-2.webp'
import program3 from './assets/program-3.webp'
import './App.css'
import { SALE, SALE_MESSAGE } from './settings.js'

const MONO = "'Geist Mono', monospace"
const ACCENT = '#D4AF37'

const BANKS = [
  { name: 'Atlantic Bank', holder: 'Keenan Bernard', account: '211774677' },
  { name: 'Belize Bank',   holder: 'Keenan Bernard', account: '265564010160000' },
]

const strive = [
  { n: '01', title: 'Maximum intensity', body: "Every working set taken to true failure and beyond. If it was easy, it didn't count." },
  { n: '02', title: 'Perfect execution', body: 'Controlled negatives, full range, no momentum. Form is what turns effort into growth.' },
  { n: '03', title: 'Long-term consistency', body: 'Short, brutal sessions and simple habits you can keep for years, not weeks.' },
]

const programs = [
  {
    src: program1, level: 'Gym', name: 'The Upper-Lower Program 2.0',
    body: 'The next step up. Upper/lower split, each muscle hit twice a week with 2–3 all-out sets plus rest-pause and partials.',
    days: 'Low volume training', weeks: 'Upper / Lower split', price: '$49.99', salePrice: '$29.99',
    details: {
      tagline: 'Low volume. Maximum effort.',
      intro: [
        'A 6-week, low-volume, high-intensity training plan built to push your limits and deliver real results.',
        'Train 4 days per week with focused sessions built around 2–3 hard sets per exercise. Every working set taken to true failure, or extended with rest-pause to squeeze out every last rep.',
        'No wasted volume. No junk sets. Just maximum effort on every single rep that counts.',
        'Built for lifters who are short on time, in a fat loss phase, or ready to stop leaving reps in the tank.',
      ],
      sections: [
        {
          label: 'What you get',
          paragraphs: [
            'Along with your Upper-Lower Program 2.0 PDF, you get a full workout tracker built into the program. Log your weight and reps for every set across all 6 weeks, every workout.',
            'Track your numbers. See your progress. Know exactly when to add weight.',
          ],
        },
        {
          label: 'What you need',
          paragraphs: [
            'This program is built around machine and cable exercises. They maximise muscle tension, protect your joints. Train hard without a spotter.',
            'Every exercise has a listed alternative so you can run the program no matter what your gym has available.',
            "A commercial gym with a full cable stack and standard machines is ideal. A bench, a pull-up bar, dumbbells will get you there too, as long as you're willing to make the swaps.",
          ],
        },
        {
          label: 'What makes this different',
          paragraphs: [
            "Most programs leave room in the tank. This one doesn't.",
            'Every set goes to true failure. Stable machine and cable movements get extended with rest-pause so you pull 2–4 extra reps past the point most people stop. Free weight movements go to failure and stop. No compromised positions, no form breakdown, no spotter needed.',
          ],
        },
      ],
      closing: ['Six weeks. Four days. Every rep earned.'],
    },
  },
  {
    src: program2, level: 'Gym', name: 'The Upper-Lower Program 1.0',
    body: 'Where the Heavy Duty approach starts. Learn to train to true failure on a simple upper/lower split.',
    days: 'Low volume training', weeks: 'Upper / Lower split', price: '$39.99', salePrice: '$23.99',
    details: {
      tagline: 'Train with intensity. Grow with purpose.',
      intro: [
        "Break away from the noise of high-volume tradition and step into an 8-week upper/lower split program inspired by Mike Mentzer's HIT (High Intensity Training) principles. This program focuses on low volume and high intensity, helping you achieve real progress in less time.",
        "Each session pushes you close to failure using compound and isolation lifts selected for maximum return. It's not about doing more, it's about doing it right.",
      ],
      sections: [
        {
          label: '8-Week Structure',
          paragraphs: [
            'Weeks 1–4 build the foundation. Dial in form, start your logbook. Week 5 is a strategic deload to reset and recover. Weeks 6–8 step up the intensity with optional advanced techniques.',
          ],
        },
        {
          label: "What's included",
          paragraphs: [
            'Four days per week on an upper/lower split with set-by-set training logs for all 8 weeks. An Exercise Alternatives Guide makes it easy to swap movements, with progression advice to push through plateaus.',
          ],
        },
        {
          label: 'Perfect for',
          paragraphs: [
            'Lifters sick of wasting time on ineffective high-volume routines. Beginner to intermediate trainees who want to train smarter, not longer. Anyone ready to challenge themselves and train with real intent.',
          ],
        },
      ],
      closing: [],
    },
  },
  {
    src: program3, level: 'At home', name: 'High Intensity Kettlebell Program',
    body: 'A beginner at-home program built around kettlebells. High intensity, low volume, minimal equipment.',
    days: 'Low volume training', weeks: 'Beginner friendly', price: '$39.99', salePrice: '$23.99',
    details: {
      tagline: 'Push past your limits without wasting hours in the gym.',
      intro: [
        "This isn't another high-volume routine that leaves you spinning your wheels. This is an 8-week kettlebell program built on true High Intensity Training (HIT) principles inspired by legends like Mike Mentzer. Low volume. Maximum effort. Results you can measure.",
        "Every session is stripped down to what matters most: smart compound lifts, focused isolation work. A progression plan that keeps you training hard, not endlessly.",
      ],
      sections: [
        {
          label: '8-Week Structure',
          paragraphs: [
            'Weeks 1–4 cover the basics. Nail your form, build your training log. Week 5 is a full deload to recharge before the final push. Weeks 6–8 raise the intensity with optional advanced techniques.',
          ],
        },
        {
          label: "What's included",
          paragraphs: [
            "Four days per week on an upper/lower split that works at home or in a gym with just a kettlebell or dumbbell. Set-by-set training sheets keep your progress on track. An Exercise Alternatives Guide lets you adapt to whatever equipment you have. Built-in progression and recovery keep you growing stronger, not just tired, with plateau-busting tips when you need them.",
          ],
        },
        {
          label: "Who it's for",
          paragraphs: [
            "Made for lifters done with high-volume fluff that drains energy and motivation. Beginners ready to train smarter, not longer. Anyone who wants to hit failure with purpose, recover right, actually grow.",
          ],
        },
      ],
      closing: ['Train intense. Recover fully. Repeat.', 'One kettlebell. Eight weeks. Real results.'],
    },
  },
]

const habits = [
  { n: '01', title: 'Protein first', body: 'Build every meal around a solid protein source. It drives recovery and keeps you full.' },
  { n: '02', title: 'Fiber next', body: 'Vegetables, fruit, beans and whole grains. Better digestion, steadier energy, fewer cravings.' },
  { n: '03', title: 'Make it easy', body: "No foods are banned. The best approach is the one you'll actually stick to long term." },
]

const coachingIncludes = [
  'Custom program built for you',
  'Weekly check-ins and adjustments',
  'Form review by video',
  'Access to me anytime',
  'In-person sessions when schedules align',
  'Cancel anytime. No lock-in contracts.',
]

const directLinks = [
  { label: 'Email', value: 'keenanbernard@outlook.com', href: 'mailto:keenanbernard@outlook.com' },
  { label: 'Phone', value: '+501 614 4297', href: 'tel:+5016144297' },
  { label: 'Instagram', value: '@k.a.bernard', href: 'https://instagram.com/k.a.bernard' },
  { label: 'YouTube', value: '@KeenanBernard', href: 'https://youtube.com/@KeenanBernard' },
]

const selectionGroups = [
  { key: 'interest', label: 'What are you interested in?', opts: ['1:1 Coaching', 'A program', 'Not sure yet'] },
  { key: 'exp', label: 'Training experience', opts: ['Under 1 year', '1–3 years', '3+ years'] },
  { key: 'goal', label: 'Main goal', opts: ['Build muscle', 'Get stronger', 'Lose fat', 'All of it'] },
]

export default function App() {
  const [page, setPage] = useState('home')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [details, setDetails] = useState('')
  const [sel, setSel] = useState({})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [honey, setHoney] = useState('')
  const [pageVisible, setPageVisible] = useState(true)
  const [buyProgram, setBuyProgram] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // #15 exit 220ms ease-in, entrance 280ms ease-out (~21% shorter exit)
  function navigate(newPage) {
    setMobileMenuOpen(false)
    if (page === newPage) return
    setPageVisible(false)
    setTimeout(() => { setPage(newPage); setPageVisible(true); window.scrollTo({ top: 0 }) }, 220)
  }

  function scrollTo(id) {
    setMobileMenuOpen(false)
    function go() {
      const el = document.getElementById(id)
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - (SALE ? 106 : 70), behavior: 'smooth' })
    }
    if (page !== 'home') {
      setPageVisible(false)
      setTimeout(() => { setPage('home'); setPageVisible(true); setTimeout(go, 60) }, 220)
    } else {
      go()
    }
  }

  function goHome() {
    if (page === 'home') { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    navigate('home')
  }
  function goContact() { navigate('contact') }
  function goPrivacy() { navigate('privacy') }
  function goTerms() { navigate('terms') }
  function goBuy(program) { setBuyProgram(program); navigate('buy') }

  async function submit() {
    if (honey) return // #18 honeypot — bots fill hidden fields, humans don't
    if (!name.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Add your name and a valid email.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '809a9a54-13a3-4881-812f-553eae3f1030',
          subject: `Training enquiry from ${name}`,
          name,
          email,
          message: [
            `Interested in: ${sel.interest || '-'}`,
            `Experience: ${sel.exp || '-'}`,
            `Goal: ${sel.goal || '-'}`,
            '',
            details,
          ].join('\n'),
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
      } else {
        setError(data.message || 'Something went wrong. Try again.')
      }
    } catch {
      setError('Could not send. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setSent(false)
    setName('')
    setEmail('')
    setDetails('')
    setSel({})
  }

  useEffect(() => {
    const titles = {
      home: 'Keenan Bernard · Heavy Duty Training',
      contact: 'Contact · Keenan Bernard',
      privacy: 'Privacy Policy · Keenan Bernard',
      terms: 'Terms of Use · Keenan Bernard',
      buy: `Buy ${buyProgram?.name ?? 'Program'} · Keenan Bernard`,
    }
    document.title = titles[page] || 'Keenan Bernard · Heavy Duty Training'
  }, [page, buyProgram])

  const firstName = name.trim().split(' ')[0] || 'there'

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>

      {SALE && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 51, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: ACCENT, color: '#111', fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em' }}>
          {SALE_MESSAGE}
        </div>
      )}

      {/* Fixed floating header */}
      <header style={{ position: 'fixed', top: SALE ? 50 : 14, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', gap: 8, padding: '0 16px', pointerEvents: 'none' }}>
        <button
          onClick={goHome}
          className="hvr-nav"
          style={{ pointerEvents: 'auto', height: 44, padding: '0 18px', borderRadius: 999, border: '1px solid rgba(244,244,240,0.14)', background: 'rgba(18,18,18,0.85)', backdropFilter: 'blur(20px) saturate(1.6)', WebkitBackdropFilter: 'blur(20px) saturate(1.6)', color: '#F4F4F0', fontWeight: 700, fontSize: 15, letterSpacing: '-0.02em', cursor: 'pointer' }}
        >KB</button>
        <nav className="nav-desktop" style={{ pointerEvents: 'auto', height: 44, alignItems: 'center', gap: 4, padding: '0 6px', borderRadius: 999, border: '1px solid rgba(244,244,240,0.14)', background: 'rgba(18,18,18,0.85)', backdropFilter: 'blur(20px) saturate(1.6)', WebkitBackdropFilter: 'blur(20px) saturate(1.6)' }}>
          <button onClick={() => scrollTo('method')} className="hvr-nav" style={{ background: 'none', border: 0, color: '#F4F4F0', fontSize: 13, fontWeight: 500, padding: '8px 12px', borderRadius: 999, cursor: 'pointer' }}>Method</button>
          <button onClick={() => scrollTo('programs')} className="hvr-nav" style={{ background: 'none', border: 0, color: '#F4F4F0', fontSize: 13, fontWeight: 500, padding: '8px 12px', borderRadius: 999, cursor: 'pointer' }}>Programs</button>
          <button onClick={() => scrollTo('coaching')} className="hvr-nav" style={{ background: 'none', border: 0, color: '#F4F4F0', fontSize: 13, fontWeight: 500, padding: '8px 12px', borderRadius: 999, cursor: 'pointer' }}>Coaching</button>
          <button onClick={goContact} className="hvr-accent" style={{ background: ACCENT, border: 0, color: '#111', fontSize: 13, fontWeight: 600, padding: '8px 14px', borderRadius: 999, cursor: 'pointer', marginLeft: 2 }}>Contact</button>
        </nav>
        <button
          className="nav-mobile-btn hvr-nav"
          onClick={() => setMobileMenuOpen(o => !o)}
          style={{ pointerEvents: 'auto', height: 44, width: 44, borderRadius: 999, border: '1px solid rgba(244,244,240,0.14)', background: 'rgba(18,18,18,0.85)', backdropFilter: 'blur(20px) saturate(1.6)', WebkitBackdropFilter: 'blur(20px) saturate(1.6)', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="1" y1="1" x2="13" y2="13" stroke="#F4F4F0" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="13" y1="1" x2="1" y2="13" stroke="#F4F4F0" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <line x1="0" y1="1" x2="18" y2="1" stroke="#F4F4F0" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="0" y1="6" x2="18" y2="6" stroke="#F4F4F0" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="0" y1="11" x2="18" y2="11" stroke="#F4F4F0" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </header>

      {mobileMenuOpen && (
        <>
          <div onClick={() => setMobileMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 48 }} />
          <div style={{ position: 'fixed', top: SALE ? 106 : 70, left: 16, right: 16, zIndex: 50, background: 'rgba(18,18,18,0.95)', backdropFilter: 'blur(20px) saturate(1.6)', WebkitBackdropFilter: 'blur(20px) saturate(1.6)', borderRadius: 20, border: '1px solid rgba(244,244,240,0.14)', padding: '8px', display: 'flex', flexDirection: 'column', gap: 2, animation: 'navSlideDown 180ms ease-out both' }}>
            <button onClick={() => scrollTo('method')} className="hvr-nav" style={{ background: 'none', border: 0, color: '#F4F4F0', fontSize: 16, fontWeight: 500, padding: '14px 16px', borderRadius: 14, cursor: 'pointer', textAlign: 'left' }}>Method</button>
            <button onClick={() => scrollTo('programs')} className="hvr-nav" style={{ background: 'none', border: 0, color: '#F4F4F0', fontSize: 16, fontWeight: 500, padding: '14px 16px', borderRadius: 14, cursor: 'pointer', textAlign: 'left' }}>Programs</button>
            <button onClick={() => scrollTo('coaching')} className="hvr-nav" style={{ background: 'none', border: 0, color: '#F4F4F0', fontSize: 16, fontWeight: 500, padding: '14px 16px', borderRadius: 14, cursor: 'pointer', textAlign: 'left' }}>Coaching</button>
            <button onClick={goContact} className="hvr-accent" style={{ background: ACCENT, border: 0, color: '#111', fontSize: 16, fontWeight: 600, padding: '14px 16px', borderRadius: 14, cursor: 'pointer', textAlign: 'left', marginTop: 4 }}>Contact</button>
          </div>
        </>
      )}

      {/* #16 overlap old/new: single div fades out then page swaps then fades in */}
      <div style={{ opacity: pageVisible ? 1 : 0, transition: pageVisible ? 'opacity 280ms ease-out' : 'opacity 220ms ease-in' }}>

      {/* ── HOME ── */}
      {page === 'home' && <>

        {/* Hero */}
        <section style={{ position: 'relative', background: '#000', color: '#fff', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <img src={coachWhiteCap} alt="Keenan Bernard" style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: 'min(62%, 900px)', objectFit: 'cover', objectPosition: 'center 30%' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg,#000 32%,rgba(0,0,0,0.6) 55%,rgba(0,0,0,0) 80%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 1240, margin: '0 auto', padding: `${SALE ? 156 : 120}px clamp(20px,5vw,48px) 80px` }}>
            {/* #3 / #6 stagger at 30ms+ intervals, ease-out (#1) */}
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#a3a3a3', marginBottom: 28, animation: 'slideUp 500ms ease-out both', animationDelay: '0ms' }}>Heavy Duty · High Intensity Training</div>
            <h1 style={{ margin: 0, fontSize: 'clamp(52px,8.4vw,120px)', lineHeight: 0.92, letterSpacing: '-0.055em', fontWeight: 800, maxWidth: '9ch', textWrap: 'balance', animation: 'slideUp 500ms ease-out both', animationDelay: '80ms' }}>Fewer sets. Harder sets.</h1>
            <p style={{ margin: '28px 0 0', fontSize: 'clamp(17px,1.6vw,21px)', lineHeight: 1.45, color: '#bdbdbd', maxWidth: 440, animation: 'slideUp 500ms ease-out both', animationDelay: '160ms' }}>Training built on the principles of Mike Mentzer and Dorian Yates. Every set taken to failure, every rep accounted for.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 40, animation: 'slideUp 500ms ease-out both', animationDelay: '240ms' }}>
              <button onClick={() => scrollTo('programs')} className="hvr-white" style={{ height: 52, padding: '0 28px', borderRadius: 999, border: 0, background: '#fff', color: '#111', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>View programs</button>
              {/* #10 / #11 — accent for the high-value CTA */}
              <button onClick={goContact} className="hvr-accent" style={{ height: 52, padding: '0 28px', borderRadius: 999, border: 0, background: ACCENT, color: '#111', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Apply for coaching</button>
            </div>
          </div>
        </section>

        {/* Method */}
        <section id="method" style={{ padding: 'clamp(80px,12vw,160px) clamp(20px,5vw,48px)', maxWidth: 1240, margin: '0 auto' }}>
          {/* #4 — section label doesn't need mono; plain uppercase tracked text reads the same */}
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: 20, fontWeight: 500 }}>The method</div>
          <h2 style={{ margin: 0, fontSize: 'clamp(40px,6vw,80px)', lineHeight: 0.98, letterSpacing: '-0.05em', fontWeight: 800, maxWidth: '14ch', textWrap: 'balance' }}>Intensity over volume. Always.</h2>
          <p style={{ margin: '28px 0 0', fontSize: 'clamp(17px,1.5vw,20px)', lineHeight: 1.55, color: '#6b6b6b', maxWidth: 620 }}>Muscle grows from the hardest reps, not the most reps. So we cut everything that isn't stimulus and push what's left past the point most people stop.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 16, marginTop: 64 }}>
            <div style={{ background: '#f5f5f7', borderRadius: 28, padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 300 }}>
              {/* #18 tabular-nums so digit widths don't shift between cards */}
              <div style={{ fontSize: 'clamp(56px,6vw,80px)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>2×</div>
              <div style={{ marginTop: 'auto', fontSize: 22, fontWeight: 700, letterSpacing: '-0.025em' }}>Per muscle, per week</div>
              <div style={{ fontSize: 16, lineHeight: 1.5, color: '#6b6b6b' }}>Each muscle is trained at least twice a week, so it's stimulated again as soon as it has recovered.</div>
            </div>
            <div style={{ background: '#121212', color: '#F4F4F0', borderRadius: 28, padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 300 }}>
              <div style={{ fontSize: 'clamp(56px,6vw,80px)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>2–3</div>
              <div style={{ marginTop: 'auto', fontSize: 22, fontWeight: 700, letterSpacing: '-0.025em' }}>Sets to absolute failure</div>
              <div style={{ fontSize: 16, lineHeight: 1.5, color: '#a3a3a3' }}>Not "close to" failure. The rep you can't complete is the one that does the work.</div>
            </div>
            <div style={{ background: '#f5f5f7', borderRadius: 28, padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 300 }}>
              <div style={{ fontSize: 'clamp(40px,4.4vw,56px)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1 }}>Rest-pause<br />+ partials</div>
              <div style={{ marginTop: 'auto', fontSize: 22, fontWeight: 700, letterSpacing: '-0.025em' }}>Past failure</div>
              <div style={{ fontSize: 16, lineHeight: 1.5, color: '#6b6b6b' }}>Short rests and partial reps extend a set beyond failure for more stimulus in less time.</div>
            </div>
          </div>
        </section>

        {/* Strive */}
        <section style={{ padding: '0 clamp(20px,5vw,48px) clamp(80px,12vw,160px)', maxWidth: 1240, margin: '0 auto' }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(40px,5.6vw,72px)', lineHeight: 1, letterSpacing: '-0.05em', fontWeight: 800, textWrap: 'balance' }}>Three things I strive for.</h2>
          <p style={{ margin: '24px 0 0', fontSize: 'clamp(17px,1.5vw,20px)', lineHeight: 1.55, color: '#6b6b6b', maxWidth: 600 }}>Training should be hard, honest and sustainable. These are the standards I hold myself and every client to.</p>
          <div style={{ height: 1, background: '#111', margin: '56px 0 36px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 40 }}>
            {strive.map(s => (
              <div key={s.n} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* #4 mono kept — these are sequence numbers, tabular data */}
                <div style={{ fontFamily: MONO, fontSize: 13, color: '#666' }}>{s.n}</div>
                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em' }}>{s.title}</div>
                <div style={{ fontSize: 16, lineHeight: 1.55, color: '#444' }}>{s.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Quote */}
        <section style={{ background: '#121212', color: '#F4F4F0', padding: 'clamp(56px,7vw,88px) clamp(20px,5vw,48px)' }}>
          <figure style={{ margin: '0 auto', maxWidth: 1100, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <blockquote style={{ margin: 0, fontSize: 'clamp(28px,3.6vw,48px)', lineHeight: 1.02, letterSpacing: '-0.045em', fontWeight: 800, textWrap: 'balance' }}>"It's not about how much time you spend in the gym. It's about how hard you train while you're there."</blockquote>
            {/* #4 mono kept — attribution/citation is a natural use for mono */}
            <figcaption style={{ fontFamily: MONO, fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a8a8a' }}>Dorian Yates · 6× Mr. Olympia</figcaption>
          </figure>
        </section>

        {/* Programs */}
        <section id="programs" style={{ background: '#f5f5f7', padding: 'clamp(80px,12vw,140px) clamp(20px,5vw,48px)' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20 }}>
              <div>
                {/* #2 "Training programs" label dropped — the new headline makes it obvious */}
                {/* #9 headline made specific */}
                <h2 style={{ margin: 0, fontSize: 'clamp(40px,5.6vw,72px)', lineHeight: 1, letterSpacing: '-0.05em', fontWeight: 800, textWrap: 'balance' }}>Three programs. Zero guesswork.</h2>
              </div>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: '#6b6b6b', maxWidth: 360 }}>Structured, self-guided programs you can run from the gym or at home.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 20, marginTop: 56 }}>
              {programs.map((p, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 28, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', aspectRatio: '1414/2000', background: '#111' }}>
                    <img src={p.src} alt={p.name} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 16, left: 16, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, background: '#fff', color: '#111', padding: '6px 10px', borderRadius: 999, pointerEvents: 'none' }}>{p.level}</div>
                    {SALE && <div style={{ position: 'absolute', top: 16, right: 16, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, background: ACCENT, color: '#111', padding: '6px 10px', borderRadius: 999, pointerEvents: 'none' }}>40% off</div>}
                  </div>
                  <div style={{ padding: '28px 28px 30px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                    <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em' }}>{p.name}</div>
                    <div style={{ fontSize: 15, lineHeight: 1.5, color: '#6b6b6b' }}>{p.body}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                      <span style={{ fontSize: 12, color: '#444', background: '#f2f2f4', padding: '6px 10px', borderRadius: 999 }}>{p.days}</span>
                      <span style={{ fontSize: 12, color: '#444', background: '#f2f2f4', padding: '6px 10px', borderRadius: 999 }}>{p.weeks}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 20 }}>
                      {SALE ? (
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                          <span style={{ fontSize: 22, fontWeight: 700, color: ACCENT, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{p.salePrice}</span>
                          <span style={{ fontSize: 15, color: '#aaa', textDecoration: 'line-through', fontVariantNumeric: 'tabular-nums' }}>{p.price}</span>
                        </div>
                      ) : (
                        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{p.price}</div>
                      )}
                      <button onClick={() => goBuy(p)} className="hvr-accent" style={{ height: 42, padding: '0 20px', borderRadius: 999, border: 0, background: ACCENT, color: '#111', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Buy program</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lifestyle / Nutrition */}
        <section style={{ padding: 'clamp(80px,12vw,160px) clamp(20px,5vw,48px)', maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}>
            <div>
              {/* #4 mono removed from section label */}
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: 20, fontWeight: 500 }}>Nutrition</div>
              <h2 style={{ margin: 0, fontSize: 'clamp(40px,5.6vw,72px)', lineHeight: 1, letterSpacing: '-0.05em', fontWeight: 800, textWrap: 'balance' }}>A lifestyle,<br />not a diet.</h2>
              <p style={{ margin: '28px 0 0', fontSize: 'clamp(17px,1.5vw,20px)', lineHeight: 1.55, color: '#6b6b6b', maxWidth: 480 }}>No meal plans you'll quit in three weeks. A few simple priorities, applied every day, that you can keep up for years.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {habits.map(h => (
                <div key={h.n} style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 16, padding: '28px 0', borderTop: '1px solid #e3e3e3' }}>
                  {/* #4 mono kept — ordered sequence number */}
                  <div style={{ fontFamily: MONO, fontSize: 13, color: '#666', paddingTop: 6 }}>{h.n}</div>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em' }}>{h.title}</div>
                    <div style={{ fontSize: 16, lineHeight: 1.55, color: '#555', marginTop: 8 }}>{h.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coaching */}
        <section id="coaching" style={{ padding: '0 clamp(12px,3vw,36px) clamp(80px,10vw,120px)' }}>
          <div style={{ maxWidth: 1320, margin: '0 auto', background: '#121212', color: '#F4F4F0', borderRadius: 36, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))' }}>
            <div style={{ padding: 'clamp(40px,6vw,80px)', display: 'flex', flexDirection: 'column' }}>
              {/* #2 "1:1 Coaching" label dropped — section content makes it obvious */}
              <h2 style={{ margin: 0, fontSize: 'clamp(44px,6vw,80px)', lineHeight: 0.96, letterSpacing: '-0.055em', fontWeight: 800 }}>Train with me.</h2>
              <p style={{ margin: '24px 0 0', fontSize: 18, lineHeight: 1.5, color: '#a3a3a3', maxWidth: 420 }}>Online coaching, with face-to-face sessions whenever possible.</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 40 }}>
                <span style={{ fontSize: 15, color: '#8a8a8a' }}>From</span>
                {/* #18 tabular-nums on price */}
                <span style={{ fontSize: 'clamp(48px,5vw,64px)', fontWeight: 800, letterSpacing: '-0.05em', fontVariantNumeric: 'tabular-nums' }}>$90</span>
                <span style={{ fontSize: 15, color: '#8a8a8a' }}>USD / month</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: 32 }}>
                {coachingIncludes.map(item => (
                  <div key={item} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 0', borderTop: '1px solid #262626', fontSize: 16, color: '#F4F4F0' }}>
                    {/* #11 accent dot ties this list to the brand colour */}
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, flex: 'none', display: 'inline-block' }} />
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 36 }}>
                {/* #10 / #11 accent CTA */}
                <button onClick={goContact} className="hvr-accent" style={{ height: 52, padding: '0 28px', borderRadius: 999, border: 0, background: ACCENT, color: '#111', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Apply for coaching</button>
              </div>
            </div>
            <div style={{ position: 'relative', minHeight: 520 }}>
              <img src={coachWhiteCap} alt="Keenan training" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%' }} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#121212', color: '#F4F4F0', textAlign: 'center', padding: 'clamp(100px,14vw,180px) clamp(20px,5vw,48px)' }}>
          <h2 style={{ margin: '0 auto', fontSize: 'clamp(48px,8vw,112px)', lineHeight: 0.95, letterSpacing: '-0.055em', fontWeight: 800, maxWidth: '11ch', textWrap: 'balance' }}>Ready to train to failure?</h2>
          <p style={{ margin: '28px auto 0', fontSize: 'clamp(17px,1.6vw,21px)', lineHeight: 1.5, color: '#a3a3a3', maxWidth: 520 }}>Tell me where you're at and what you want. I'll reply with next steps, usually the same day.</p>
          {/* #10 / #11 accent CTA */}
          <button onClick={goContact} className="hvr-accent" style={{ marginTop: 44, height: 56, padding: '0 32px', borderRadius: 999, border: 0, background: ACCENT, color: '#111', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Get in touch</button>
        </section>

      </>}

      {/* ── CONTACT ── */}
      {page === 'contact' && (
        <section style={{ padding: 'clamp(120px,14vw,170px) clamp(20px,5vw,48px) clamp(80px,10vw,120px)', maxWidth: 1240, margin: '0 auto' }}>
          {/* #4 mono removed from section label */}
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: 20, fontWeight: 500 }}>Contact</div>
          {/* #9 headline made specific to fitness context */}
          <h1 style={{ margin: 0, fontSize: 'clamp(48px,7.4vw,104px)', lineHeight: 0.94, letterSpacing: '-0.055em', fontWeight: 800, maxWidth: '12ch', textWrap: 'balance' }}>Let's talk training.</h1>
          <p style={{ margin: '28px 0 0', fontSize: 'clamp(17px,1.6vw,21px)', lineHeight: 1.5, color: '#6b6b6b', maxWidth: 600 }}>Coaching, a program question, or just figuring out where to start. Share a bit about yourself and I'll come back with a plan.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 'clamp(32px,5vw,64px)', marginTop: 64, alignItems: 'start' }}>

            {/* Form card – spans 2 of 3 columns on wide screens */}
            <div style={{ gridColumn: 'span 2', minWidth: 0, background: '#f5f5f7', borderRadius: 32, padding: 'clamp(28px,4vw,48px)' }}>
              {sent ? (
                <div style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', gap: 16, animation: 'pulseIn 500ms ease-out both' }}>
                  <div style={{ fontSize: 'clamp(32px,4vw,48px)', fontWeight: 800, letterSpacing: '-0.045em' }}>Thanks, {firstName}.</div>
                  <div style={{ fontSize: 18, lineHeight: 1.5, color: '#555', maxWidth: 440 }}>Got it. I'll reply within a day.</div>
                  <button onClick={resetForm} className="hvr-white" style={{ alignSelf: 'flex-start', marginTop: 12, height: 46, padding: '0 22px', borderRadius: 999, border: '1px solid #cfcfcf', background: '#fff', color: '#111', fontSize: 15, cursor: 'pointer' }}>Send another</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  {/* #18 honeypot — visually hidden, bots fill it, humans don't */}
                  <input tabIndex={-1} aria-hidden="true" value={honey} onChange={e => setHoney(e.target.value)} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }} />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 16 }}>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, fontWeight: 500 }}>
                      Name
                      <input value={name} onChange={e => setName(e.target.value)} placeholder="Who's writing?" className="focus-border" style={{ height: 52, borderRadius: 14, border: '1px solid #dadada', background: '#fff', padding: '0 16px', fontSize: 16, outline: 'none', color: '#111' }} />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, fontWeight: 500 }}>
                      Email
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Where I should reply" className="focus-border" style={{ height: 52, borderRadius: 14, border: '1px solid #dadada', background: '#fff', padding: '0 16px', fontSize: 16, outline: 'none', color: '#111' }} />
                    </label>
                  </div>

                  {selectionGroups.map(g => (
                    <div key={g.key} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{g.label}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {g.opts.map(o => {
                          const on = sel[g.key] === o
                          return (
                            <button
                              key={o}
                              onClick={() => setSel(s => ({ ...s, [g.key]: o }))}
                              // #11 accent for selected state so the choice registers with brand colour
                              style={{ height: 44, padding: '0 20px', borderRadius: 999, border: `1px solid ${on ? ACCENT : '#dadada'}`, background: on ? ACCENT : '#fff', color: '#111', fontSize: 15, cursor: 'pointer', transition: 'all 180ms ease-in-out' }}
                            >{o}</button>
                          )
                        })}
                      </div>
                    </div>
                  ))}

                  <label style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, fontWeight: 500 }}>
                    Details
                    <textarea value={details} onChange={e => setDetails(e.target.value)} rows={6} placeholder="Your goals, current training, injuries, schedule, anything I should know." className="focus-border" style={{ borderRadius: 14, border: '1px solid #dadada', background: '#fff', padding: '14px 16px', fontSize: 16, lineHeight: 1.5, outline: 'none', resize: 'vertical', color: '#111' }} />
                  </label>

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
                    <button onClick={submit} disabled={loading} className="hvr-accent" style={{ height: 54, padding: '0 30px', borderRadius: 999, border: 0, background: ACCENT, color: '#111', fontSize: 16, fontWeight: 600, cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1 }}>{loading ? 'Sending…' : 'Send details'}</button>
                    {error && <span style={{ fontSize: 14, color: '#b42318' }}>{error}</span>}
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: '#888', lineHeight: 1.5 }}>
                    Your details are delivered via <a href="https://web3forms.com" target="_blank" rel="noreferrer" style={{ color: '#888', textDecorationColor: '#ccc' }}>Web3Forms</a> to Keenan's inbox. We don't sell or share your data.{' '}
                    <button onClick={goPrivacy} style={{ background: 'none', border: 0, padding: 0, color: '#888', textDecoration: 'underline', textDecorationColor: '#ccc', cursor: 'pointer', fontSize: 13 }}>Privacy policy</button>
                  </p>
                </div>
              )}
            </div>

            {/* Direct contacts + quote */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* #4 mono removed — this is a heading, not data */}
              <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#666', fontWeight: 500, paddingBottom: 18, borderBottom: '1px solid #e3e3e3' }}>Or reach me directly</div>
              {directLinks.map(d => (
                <a key={d.value} href={d.href} target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '22px 0', borderBottom: '1px solid #e3e3e3', color: '#111' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                    {/* #15 #777 → #666 for contrast */}
                    <span style={{ fontSize: 13, color: '#666' }}>{d.label}</span>
                    <span style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.02em', overflowWrap: 'anywhere' }}>{d.value}</span>
                  </div>
                  <span style={{ fontSize: 16 }}>↗</span>
                </a>
              ))}
              <figure style={{ margin: '32px 0 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <blockquote style={{ margin: 0, fontSize: 17, lineHeight: 1.45, fontWeight: 500, letterSpacing: '-0.01em', color: '#111' }}>"Anything more than the least amount of exercise required to stimulate optimal gains is too much."</blockquote>
                {/* #4 mono kept — citation/attribution */}
                <figcaption style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#666' }}>Mike Mentzer</figcaption>
              </figure>
            </div>

          </div>
        </section>
      )}

      {/* ── PRIVACY ── */}
      {page === 'privacy' && (
        <section style={{ padding: 'clamp(120px,14vw,170px) clamp(20px,5vw,48px) clamp(80px,10vw,120px)', maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: 20, fontWeight: 500 }}>Legal</div>
          <h1 style={{ margin: 0, fontSize: 'clamp(40px,6vw,72px)', lineHeight: 0.96, letterSpacing: '-0.05em', fontWeight: 800 }}>Privacy policy</h1>
          <p style={{ margin: '16px 0 0', fontSize: 14, color: '#888' }}>Last updated: November 2026</p>

          {[
            {
              heading: 'What we collect',
              body: 'When you submit the contact form, we collect the name, email address, training preferences and any details you choose to share in the message field. This site also uses Vercel Analytics to collect anonymous, aggregated page-view data. No personally identifiable information is captured by analytics.',
            },
            {
              heading: 'How it is processed',
              body: 'Form submissions are routed through Web3Forms (web3forms.com), a third-party service that relays the contents to Keenan\'s email inbox. Web3Forms acts as a data processor; your submission passes through their infrastructure in transit. You can read their privacy policy at web3forms.com/privacy.',
            },
            {
              heading: 'How long we keep it',
              body: 'Enquiry emails are retained for as long as there is an active coaching relationship or ongoing conversation. If nothing comes of your enquiry, the email is deleted within 90 days.',
            },
            {
              heading: 'Your rights',
              body: 'You can request access to, correction of, or deletion of your personal data at any time by emailing keenanbernard@outlook.com. We will respond within 30 days.',
            },
            {
              heading: 'What we do not do',
              body: 'We do not sell your data, share it with advertisers, add you to any mailing list without your explicit consent, or use it for any purpose other than responding to your enquiry.',
            },
            {
              heading: 'Contact',
              body: 'Questions about this policy? Email keenanbernard@outlook.com.',
            },
          ].map(s => (
            <div key={s.heading} style={{ borderTop: '1px solid #e3e3e3', padding: '32px 0' }}>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>{s.heading}</div>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: '#444' }}>{s.body}</p>
            </div>
          ))}

          <div style={{ borderTop: '1px solid #e3e3e3', paddingTop: 32 }}>
            <button onClick={goHome} className="hvr-white" style={{ height: 46, padding: '0 22px', borderRadius: 999, border: '1px solid #cfcfcf', background: '#fff', color: '#111', fontSize: 15, cursor: 'pointer' }}>← Back to site</button>
          </div>
        </section>
      )}

      {/* ── TERMS ── */}
      {page === 'terms' && (
        <section style={{ padding: 'clamp(120px,14vw,170px) clamp(20px,5vw,48px) clamp(80px,10vw,120px)', maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: 20, fontWeight: 500 }}>Legal · Last updated November 2026</div>
          <h1 style={{ margin: 0, fontSize: 'clamp(40px,6vw,72px)', lineHeight: 0.96, letterSpacing: '-0.05em', fontWeight: 800 }}>Terms of Use</h1>
          <p style={{ margin: '24px 0 0', fontSize: 17, lineHeight: 1.6, color: '#444' }}>By using this website you agree to the following terms.</p>

          {[
            {
              heading: 'About this site',
              body: ['This website belongs to Keenan Bernard, a personal trainer and Heavy Duty coach based in Belize. It is provided for informational purposes and to allow potential clients to make contact.'],
            },
            {
              heading: 'Acceptable use',
              body: ['You may browse this site for personal and professional purposes. You may not use it to transmit spam, malicious content, or anything unlawful. The contact form is provided for genuine coaching and training enquiries only.'],
            },
            {
              heading: 'Intellectual property',
              body: [
                'All content on this site (text, design, code) is the property of Keenan Bernard unless stated otherwise. You may not reproduce or distribute it without permission.',
              ],
            },
            {
              heading: 'No warranties',
              body: ['This site is provided as-is. While every effort is made to keep information accurate, no guarantees are made regarding completeness or availability. Results may differ.'],
            },
            {
              heading: 'External links',
              body: ['Links to third-party websites (YouTube, Instagram, Web3Forms, etc.) are provided for convenience. I have no control over their content and accept no liability for them.'],
            },
            {
              heading: 'Changes',
              body: ['These terms may be updated at any time. The date at the top of this page reflects the most recent revision. Continued use of the site after a change constitutes acceptance.'],
            },
            {
              heading: 'Contact',
              body: ['Questions? keenanbernard@outlook.com'],
            },
          ].map(s => (
            <div key={s.heading} style={{ borderTop: '1px solid #e3e3e3', padding: '32px 0' }}>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>{s.heading}</div>
              {s.body.map((para, i) => (
                <p key={i} style={{ margin: i > 0 ? '12px 0 0' : 0, fontSize: 16, lineHeight: 1.65, color: '#444' }}>{para}</p>
              ))}
            </div>
          ))}

          <div style={{ borderTop: '1px solid #e3e3e3', paddingTop: 32 }}>
            <button onClick={goHome} className="hvr-white" style={{ height: 46, padding: '0 22px', borderRadius: 999, border: '1px solid #cfcfcf', background: '#fff', color: '#111', fontSize: 15, cursor: 'pointer' }}>← Back to site</button>
          </div>
        </section>
      )}

      {/* ── BUY ── */}
      {page === 'buy' && buyProgram && (
        <section style={{ padding: 'clamp(120px,14vw,170px) clamp(20px,5vw,48px) clamp(80px,10vw,120px)', maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: 20, fontWeight: 500 }}>Purchase</div>
          <h1 style={{ margin: 0, fontSize: 'clamp(32px,5vw,56px)', lineHeight: 0.96, letterSpacing: '-0.05em', fontWeight: 800 }}>{buyProgram.name}</h1>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            {SALE ? (
              <>
                <span style={{ fontSize: 'clamp(40px,5vw,56px)', fontWeight: 800, letterSpacing: '-0.05em', fontVariantNumeric: 'tabular-nums', color: ACCENT }}>{buyProgram.salePrice}</span>
                <span style={{ fontSize: 22, color: '#aaa', textDecoration: 'line-through', fontVariantNumeric: 'tabular-nums', alignSelf: 'center' }}>{buyProgram.price}</span>
              </>
            ) : (
              <span style={{ fontSize: 'clamp(40px,5vw,56px)', fontWeight: 800, letterSpacing: '-0.05em', fontVariantNumeric: 'tabular-nums' }}>{buyProgram.price}</span>
            )}
            <span style={{ fontSize: 16, color: '#888', alignSelf: 'center' }}>USD · one-time</span>
          </div>

          {buyProgram.details && (
            <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <p style={{ margin: 0, fontSize: 'clamp(20px,2.4vw,26px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.2 }}>{buyProgram.details.tagline}</p>
              {buyProgram.details.intro.map((para, i) => (
                <p key={i} style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: '#444' }}>{para}</p>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 8 }}>
                {buyProgram.details.sections ? (
                  buyProgram.details.sections.map((s, i) => (
                    <div key={i}>
                      <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', fontWeight: 500, marginBottom: 14 }}>{s.label}</div>
                      {s.paragraphs.map((para, j) => (
                        <p key={j} style={{ margin: j > 0 ? '12px 0 0' : 0, fontSize: 16, lineHeight: 1.65, color: '#444' }}>{para}</p>
                      ))}
                    </div>
                  ))
                ) : (<>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', fontWeight: 500, marginBottom: 14 }}>{buyProgram.details.structure.label}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {buyProgram.details.structure.items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, fontSize: 15, lineHeight: 1.5, color: '#333' }}>
                          <span style={{ color: '#aaa', flex: 'none' }}>–</span>{item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', fontWeight: 500, marginBottom: 14 }}>What's included</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {buyProgram.details.includes.map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, fontSize: 15, lineHeight: 1.5, color: '#333' }}>
                          <span style={{ color: ACCENT, flex: 'none', fontWeight: 700 }}>✓</span>{item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', fontWeight: 500, marginBottom: 14 }}>Who it's for</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {buyProgram.details.whoFor.map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, fontSize: 15, lineHeight: 1.5, color: '#333' }}>
                          <span style={{ color: '#aaa', flex: 'none' }}>–</span>{item}
                        </div>
                      ))}
                    </div>
                  </div>
                </>)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 4 }}>
                {buyProgram.details.closing.map((line, i) => (
                  <p key={i} style={{ margin: 0, fontSize: i === 0 ? 18 : 15, fontWeight: i === 0 ? 700 : 400, letterSpacing: i === 0 ? '-0.02em' : 0, color: i === 0 ? '#111' : '#666', lineHeight: 1.4 }}>{line}</p>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: 48 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 16, padding: '28px 0', borderTop: '1px solid #e3e3e3' }}>
              <div style={{ fontFamily: MONO, fontSize: 13, color: '#666', paddingTop: 4 }}>01</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.025em' }}>Send payment</div>
                <p style={{ margin: '8px 0 16px', fontSize: 15, color: '#666', lineHeight: 1.5 }}>Transfer the exact amount to either bank below.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {BANKS.map(b => (
                    <div key={b.name} style={{ background: '#f5f5f7', borderRadius: 16, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#888' }}>{b.name}</div>
                      {[['Account name', b.holder, false], ['Account number', b.account, true]].map(([label, value, mono]) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                          <span style={{ fontSize: 14, color: '#666' }}>{label}</span>
                          <span style={{ fontSize: 14, fontWeight: 600, fontFamily: mono ? MONO : 'inherit' }}>{value}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 16, padding: '28px 0', borderTop: '1px solid #e3e3e3' }}>
              <div style={{ fontFamily: MONO, fontSize: 13, color: '#666', paddingTop: 4 }}>02</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.025em' }}>Send your receipt</div>
                <p style={{ margin: '8px 0 0', fontSize: 16, lineHeight: 1.6, color: '#444' }}>Screenshot your payment confirmation and send it to <strong>keenanbernard@outlook.com</strong> or WhatsApp <strong>+501 614 4297</strong>.</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 16, padding: '28px 0', borderTop: '1px solid #e3e3e3' }}>
              <div style={{ fontFamily: MONO, fontSize: 13, color: '#666', paddingTop: 4 }}>03</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.025em' }}>Get your program</div>
                <p style={{ margin: '8px 0 0', fontSize: 16, lineHeight: 1.6, color: '#444' }}>Your program PDF will be emailed to you within 24 hours of receipt confirmation.</p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e3e3e3', paddingTop: 32 }}>
            <button onClick={() => scrollTo('programs')} className="hvr-white" style={{ height: 46, padding: '0 22px', borderRadius: 999, border: '1px solid #cfcfcf', background: '#fff', color: '#111', fontSize: 15, cursor: 'pointer' }}>← Back to programs</button>
          </div>
        </section>
      )}

      {/* ── 404 ── #15 */}
      {!['home','contact','privacy','terms','buy'].includes(page) && (
        <section style={{ padding: 'clamp(140px,16vw,200px) clamp(20px,5vw,48px) clamp(80px,10vw,120px)', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: 20, fontWeight: 500 }}>404</div>
          <h1 style={{ margin: 0, fontSize: 'clamp(40px,6vw,72px)', lineHeight: 0.96, letterSpacing: '-0.05em', fontWeight: 800 }}>Page not found.</h1>
          <p style={{ margin: '24px auto 0', fontSize: 17, lineHeight: 1.6, color: '#6b6b6b', maxWidth: 400 }}>The page you're looking for doesn't exist or has moved.</p>
          <button onClick={goHome} className="hvr-dark" style={{ marginTop: 36, height: 52, padding: '0 28px', borderRadius: 999, border: 0, background: '#111', color: '#F4F4F0', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Go home</button>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ background: '#121212', color: '#F4F4F0', borderTop: '1px solid #1f1f1f', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '64px clamp(20px,5vw,48px) 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em' }}>Keenan Bernard</div>
            <div style={{ fontSize: 14, color: '#8a8a8a', lineHeight: 1.5 }}>Heavy Duty training & coaching.</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15 }}>
            <div style={{ fontSize: 13, color: '#8a8a8a' }}>Train</div>
            <button onClick={() => scrollTo('programs')} style={{ background: 'none', border: 0, padding: 0, color: '#F4F4F0', fontSize: 15, textAlign: 'left', cursor: 'pointer' }}>Programs</button>
            <button onClick={() => scrollTo('coaching')} style={{ background: 'none', border: 0, padding: 0, color: '#F4F4F0', fontSize: 15, textAlign: 'left', cursor: 'pointer' }}>Coaching</button>
            <button onClick={goContact} style={{ background: 'none', border: 0, padding: 0, color: '#F4F4F0', fontSize: 15, textAlign: 'left', cursor: 'pointer' }}>Contact</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15 }}>
            <div style={{ fontSize: 13, color: '#8a8a8a' }}>Social</div>
            <a href="https://instagram.com/k.a.bernard" target="_blank" rel="noreferrer" style={{ color: '#F4F4F0' }}>Instagram</a>
            <a href="https://youtube.com/@KeenanBernard" target="_blank" rel="noreferrer" style={{ color: '#F4F4F0' }}>YouTube</a>
          </div>
        </div>
        <div style={{ fontSize: 'clamp(64px,13vw,200px)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.85, color: 'transparent', WebkitTextStroke: '1px #333', whiteSpace: 'nowrap', padding: '56px clamp(20px,5vw,48px) 0', userSelect: 'none' }}>To failure.</div>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '24px clamp(20px,5vw,48px) 32px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b6b' }}>
          <span>© 2026 Keenan Bernard</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <button onClick={goTerms} style={{ background: 'none', border: 0, padding: 0, color: '#6b6b6b', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>Terms</button>
            <button onClick={goPrivacy} style={{ background: 'none', border: 0, padding: 0, color: '#6b6b6b', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>Privacy</button>
            <span>All rights reserved</span>
          </div>
        </div>
      </footer>

      </div> {/* end fade wrapper */}

      <Analytics />
    </div>
  )
}
