
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  HeartHandshake,
  Network,
  Activity,
  X,
} from 'lucide-react';

import {
  HeroVisual,
  InteractiveJourney,
} from '@/components/OmbreExperience';

import DynamicIcon from '@/components/Icons';
import FaqExplorer from '@/components/FaqExplorer';

import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from '@/components/ScrollReveal';

import MagneticButton from '@/components/MagneticButton';
import HeroOrgans from '@/components/HeroOrgans';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const h = t.home;

  const [activeService, setActiveService] = useState(null);

  const selectedService =
    activeService === null
      ? null
      : t.services.list[activeService];

  return (
    <>
      {/* HERO */}
      <section className="og-hero-v2">
        <div className="og-hero-bg-container">
          <Image
            src="/hero-bg.jpg"
            alt="SUSALI Healthcare Background"
            fill
            priority
            quality={90}
            className="og-hero-bg-image"
          />
          <div className="og-hero-bg-overlay" />
        </div>

        <div className="container og-hero-inner-v2">
          <div className="og-hero-grid-v2">
            <div className="og-hero-content-left">
              <ScrollReveal delay={0.1}>
                <div className="og-hero-badge-v2">
                  <span className="og-badge-check">
                    <CheckCircle2 size={15} />
                  </span>
                  {h.badge}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <h1 className="og-hero-title-v2">
                  <span className="gradient-text-purple">
                    {h.heroTitle1}
                  </span>

                  <br />

                  <span className="gradient-text-violet">
                    {h.heroTitle2}
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.35}>
                <p className="og-hero-desc-v2">
                  {h.heroDesc}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <div className="og-hero-actions-v2">
                  <MagneticButton>
                    <Link
                      href="/services"
                      className="og-pill-button og-pill-dark"
                    >
                      {h.btnPrimary}
                      <ArrowUpRight size={18} />
                    </Link>
                  </MagneticButton>

                  <MagneticButton>
                    <Link
                      href="#about-preview"
                      className="og-pill-button og-pill-glass"
                    >
                      {h.btnSecondary}
                      <ArrowRight size={18} />
                    </Link>
                  </MagneticButton>
                </div>
              </ScrollReveal>
            </div>

            {/* NEW: ANIMATED 3D ORGANS */}
            <div className="og-hero-visual-space">
              <HeroOrgans />
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      {/* INTRO */}
      <section
        className="og-intro section-space"
        id="about-preview"
      >
        <div className="container og-intro-layout">
          <ScrollReveal direction="left">
            <div
              className="og-intro-art"
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '32px',
                minHeight: '440px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow:
                  '0 20px 50px rgba(6,62,52,0.08)',
              }}
            >
              <Image
                src="/about-intro.jpg"
                alt="SUSALI Healthcare Services"
                width={600}
                height={520}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '32px',
                }}
                priority
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg,rgba(255,255,255,0.1) 0%,rgba(6,62,52,0.25) 100%)',
                  borderRadius: '32px',
                  pointerEvents: 'none',
                }}
              />

              <div className="og-intro-floating">
                <span className="og-mini-icon mint">
                  <CheckCircle2 size={19} />
                </span>

                <div>
                  <strong>SUSALI</strong>
                  <small>
                    {t.heroVisual.careClarityConnection}
                  </small>
                </div>
              </div>

              <span className="og-intro-bottom-pill">
                <Sparkles size={15} />
                {t.heroVisual.careClarityConnection}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="og-intro-copy">
              <span className="og-kicker">
                {h.welcomeKicker}
              </span>

              <h2>
                {h.welcomeTitle1}{' '}
                <em>{h.welcomeTitle2}</em>
              </h2>

              <p className="og-lead">
                {h.welcomeLead}
              </p>

              <p>{h.welcomeP1}</p>
              <p>{h.welcomeP2}</p>

              <Link
                href="/about"
                className="og-text-link"
              >
                {h.welcomeBtn}
                <ArrowUpRight size={19} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="og-services section-space">
        <div className="container">
          <ScrollReveal>
            <div className="og-section-heading">
              <div>
                <span className="og-kicker">
                  {h.servicesKicker}
                </span>

                <h2>
                  {h.servicesTitle1}{' '}
                  <em>{h.servicesTitle2}</em>
                </h2>
              </div>

              <p>{h.servicesDesc}</p>
            </div>
          </ScrollReveal>

          <StaggerContainer
            className="svc-grid"
            stagger={0.08}
          >
            {t.services.list.map((service, i) => (
              <StaggerItem
                key={service.id}
                className="svc-item"
              >
                <div
                  onClick={() => setActiveService(i)}
                  className={`svc-card svc-${i}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (
                      e.key === 'Enter' ||
                      e.key === ' '
                    ) {
                      e.preventDefault();
                      setActiveService(i);
                    }
                  }}
                >
                  <div className="svc-card-top">
                    <span className="svc-icon">
                      <DynamicIcon
                        name={
                          service.icon ||
                          'HeartPulse'
                        }
                        size={24}
                      />
                    </span>
                  </div>

                  {service.image && (
                    <div className="svc-image">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width:768px) 100vw,33vw"
                      />
                    </div>
                  )}

                  <div className="svc-body">
                    <h3>{service.title}</h3>

                    <p className="svc-desc">
                      {service.desc}
                    </p>

                    <div className="svc-foot">
                      <span className="svc-foot-label">
                        {t.ui.viewDetails}
                      </span>

                      <span className="svc-arrow">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.2}>
            <div className="og-section-bottom">
              <span>{t.ui.oneEcosystem}</span>

              <Link
                href="/services"
                className="og-text-link"
              >
                {h.servicesBtn}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* INTERACTIVE JOURNEY */}
      <ScrollReveal>
        <section className="og-journey-section section-space">
          <div className="container">
            <div className="og-section-heading og-section-heading-center">
              <span className="og-kicker">
                {h.journeyKicker}
              </span>

              <h2>
                {h.journeyTitle1}{' '}
                <em>{h.journeyTitle2}</em>
              </h2>

              <p>{h.journeyDesc}</p>
            </div>

            <InteractiveJourney />
          </div>
        </section>
      </ScrollReveal>

      {/* HEALTHCARE NETWORK */}
      <section className="og-network-section section-space">
        <div className="container og-network-layout">
          <ScrollReveal
            direction="left"
            style={{ minWidth: 0 }}
          >
            <div>
              <span className="og-kicker">
                {h.networkKicker}
              </span>

              <h2>
                {h.networkTitle1}{' '}
                <em>{h.networkTitle2}</em>
              </h2>

              <p className="og-lead">
                {h.networkDesc}
              </p>

              <div style={{ marginTop: 24 }}>
                <MagneticButton>
                  <Link
                    href="/healthcare-network"
                    className="og-pill-button og-pill-primary"
                  >
                    {h.networkBtn}
                    <ArrowUpRight size={18} />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal
            direction="right"
            style={{ minWidth: 0 }}
          >
            <div className="og-network-art">
              <div className="og-network-ring ring-a" />
              <div className="og-network-ring ring-b" />

              <div className="og-network-core">
                <Network size={48} />
                <strong>SUSALI</strong>

                <small>
                  {t.heroVisual.ecosystem}
                </small>
              </div>

              <span className="og-network-node nn1">
                <HeartHandshake size={25} />
                <small>
                  {t.heroVisual.networkSupport}
                </small>
              </span>

              <span className="og-network-node nn2">
                <Network size={25} />
                <small>
                  {t.heroVisual.networkTeams}
                </small>
              </span>

              <span className="og-network-node nn3">
                <Activity size={25} />
                <small>
                  {t.heroVisual.networkCare}
                </small>
              </span>

              <span className="og-network-node nn4">
                <ShieldCheck size={25} />
                <small>
                  {t.heroVisual.networkTrust}
                </small>
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="og-faq-section section-space">
        <div className="container og-faq-layout">
          <ScrollReveal>
            <div>
              <span className="og-kicker">
                {h.faqsKicker}
              </span>

              <h2>
                {h.faqsTitle1}{' '}
                <em>{h.faqsTitle2}</em>
              </h2>

              <Link
                href="/faqs"
                className="og-text-link"
              >
                {h.faqsBtn}
                <ArrowUpRight size={19} />
              </Link>
            </div>
          </ScrollReveal>

          <FaqExplorer limit={4} />
        </div>
      </section>

      {/* FINAL CTA */}
      <ScrollReveal>
        <section className="og-final-section">
          <div className="container">
            <div className="og-final-card">
              <span className="og-kicker">
                SUSALI
              </span>

              <h2>
                {h.ctaTitle1}
                <br />
                <em>{h.ctaTitle2}</em>
              </h2>

              <p>{h.ctaDesc}</p>

              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <MagneticButton>
                  <Link
                    href="/services"
                    className="og-pill-button og-pill-primary"
                  >
                    {h.ctaBtnPrimary}
                    <ArrowUpRight size={18} />
                  </Link>
                </MagneticButton>

                <MagneticButton>
                  <Link
                    href="/contact"
                    className="og-pill-button og-pill-primary"
                    style={{
                      background:
                        'rgba(255,255,255,0.1)',
                    }}
                  >
                    {h.ctaBtnSecondary}
                    <ArrowRight size={18} />
                  </Link>
                </MagneticButton>
              </div>

              <div className="og-final-orb" />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SERVICE DETAIL POPUP */}
      {selectedService && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
          style={{
            backgroundColor:
              'rgba(20,24,38,0.55)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          onClick={() => setActiveService(null)}
        >
          <div
            className="relative w-full max-w-2xl p-6 sm:p-8 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={selectedService.title}
            style={{
              background:
                'rgba(255,255,255,0.96)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: '32px',
              border:
                '1px solid rgba(255,255,255,0.95)',
              boxShadow:
                '0 30px 60px rgba(30,25,45,0.35)',
              maxHeight: '90vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveService(null)}
              className="absolute top-5 right-5 z-10 p-2 rounded-full hover:bg-black/10 bg-white/80 backdrop-blur-md"
              style={{
                color: '#374151',
                border:
                  '1px solid rgba(0,0,0,0.1)',
              }}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {selectedService.image && (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  marginBottom: '24px',
                  background: '#F3EEF8',
                  border:
                    '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <Image
                  src={selectedService.image}
                  alt={selectedService.title}
                  fill
                  sizes="(max-width:768px) 100vw,670px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <span
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  background:
                    'linear-gradient(140deg,#F4E8F7,#E8E5FB)',
                  color: '#8D79A2',
                  border: '1px solid #fff',
                }}
              >
                <DynamicIcon
                  name={
                    selectedService.icon ||
                    'HeartPulse'
                  }
                  size={26}
                />
              </span>
            </div>

            <h2
              style={{
                fontSize: '1.85rem',
                fontWeight: 850,
                lineHeight: 1.5,
                marginBottom: '1rem',
                color: '#2B303C',
                letterSpacing: 'normal',
              }}
            >
              {selectedService.title}
            </h2>

            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.85,
                color: '#546481',
                marginBottom: '1.75rem',
              }}
            >
              {selectedService.desc}
            </p>

            {selectedService.detail && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding:
                    '0.875rem 1.25rem',
                  background: '#F8F6FC',
                  borderRadius: '16px',
                  border:
                    '1px solid #E9E5EE',
                  color: '#34394A',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                <CheckCircle2
                  size={20}
                  style={{
                    color: '#8F73A0',
                    flexShrink: 0,
                  }}
                />

                <span>
                  {selectedService.detail}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
