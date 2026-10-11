import Link from "next/link";

const features = [
  { icon: "🌦️", title: "Advice that fits your place", text: "Start with your location, growing space, sunlight, and the plants you want to grow." },
  { icon: "🪴", title: "A plan, not another search", text: "Turn broad gardening advice into a small list of practical tasks for the week ahead." },
  { icon: "🧠", title: "A practical AI garden coach", text: "Ask about yellowing leaves, watering, possible pests, or getting started—and leave with a small action to try outdoors." }
];

export default function HomePage() {
  return (
    <>
      <section className="container hero">
        <div>
          <span className="eyebrow">✦ A little more green, every day</span>
          <h1>Grow a garden.<br /><span>Grow your way.</span></h1>
          <p>Gardening advice should fit your space, your season, and your life. GrowWise turns the big questions into simple next steps for your plants.</p>
          <div className="hero-actions">
            <Link href="/planner" className="btn btn-primary">Build my garden plan <span aria-hidden="true">↗</span></Link>
            <Link href="/plants" className="btn btn-secondary">Explore plants</Link>
            <Link href="/advisor" className="btn btn-secondary">Try AI Coach ✳</Link>
          </div>
          <div className="hero-note">🌱 Beginner-friendly · Practical weekly tasks · Designed for real gardens</div>
        </div>
        <div className="hero-art" aria-label="Illustration of a growing plant and garden task card" role="img">
          <div className="sun" />
          <div className="plant-stem" />
          <div className="leaf leaf-one" />
          <div className="leaf leaf-two" />
          <div className="leaf leaf-three" />
          <div className="hill" />
          <div className="hill-two" />
          <div className="art-card">
            <small>YOUR GARDEN · THIS WEEK</small>
            <strong>Small steps, happy plants</strong>
            <small>Check the top layer of soil before watering.</small>
            <div className="progress"><span /></div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Why GrowWise</span>
            <h2>Less guesswork.<br />More growing.</h2>
            <p>Gardening information is everywhere, but knowing what applies to your garden today is the hard part.</p>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon" aria-hidden="true">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
          <div className="feature-grid feature-grid-extra">
            <article className="feature-card"><div className="feature-icon" aria-hidden="true">🌿</div><h3>Touch Grass Missions</h3><p>Turn advice into small outdoor actions and track the time you spend learning from your garden.</p><Link className="feature-card-link" href="/missions">Explore missions ↗</Link></article>
            <article className="feature-card"><div className="feature-icon" aria-hidden="true">🔎</div><h3>Plant Health Investigator</h3><p>Use guided symptom checks to explore possible causes before choosing a treatment.</p><Link className="feature-card-link" href="/health-check">Investigate a plant ↗</Link></article>
            <article className="feature-card"><div className="feature-icon" aria-hidden="true">📔</div><h3>Garden Memory</h3><p>Keep observations in a plant timeline and export your notes so you can learn what works.</p><Link className="feature-card-link" href="/journal">Open your journal ↗</Link></article>
          </div>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Simple by design</span>
            <h2>Your garden, one step at a time.</h2>
            <p>No gardening degree required. Start with what you have and learn as you go.</p>
          </div>
          <div className="steps">
            <article className="step"><span className="step-number">01 / TELL US</span><h3>Describe your space</h3><p>Share your city, sunlight, available space, and gardening experience.</p></article>
            <article className="step"><span className="step-number">02 / GET A PLAN</span><h3>See your next steps</h3><p>Get a starter care plan that explains what to do and what to check first.</p></article>
            <article className="step"><span className="step-number">03 / GET GROWING</span><h3>Learn by doing</h3><p>Complete tasks, observe your plants, and adjust your routine as you learn.</p></article>
          </div>
          <div className="hero-actions"><Link href="/planner" className="btn btn-primary">Create a garden plan ↗</Link></div>
        </div>
      </section>
    </>
  );
}
