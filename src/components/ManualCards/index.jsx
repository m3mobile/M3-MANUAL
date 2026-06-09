import React from 'react';
import Link from '@docusaurus/Link';

export function ManualHomePage({
  children,
  title,
  lead
}) {
  return (
    <main className="manualHome">
      <section className="manualHomeHeader">
        <div className="container">
          {title && <h1>{title}</h1>}
          {lead && <p className="manualLead">{lead}</p>}
        </div>
      </section>

      {children}
    </main>
  );
}

export function ManualHomeSection({children, title, description}) {
  return (
    <section className="manualHomeSection">
      <div className="container">
        <div className="manualSectionHeader">
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <div className="manualCardGrid manualCardGrid--portal">{children}</div>
      </div>
    </section>
  );
}

export function ManualHomeCard({meta, title, description, to, action = 'More >'}) {
  return (
    <Link className="manualCard manualCard--home manualCard--portal" to={to}>
      {meta && <span className="manualCardMeta">{meta}</span>}
      <span className="manualCardTitle">{title}</span>
      {description && <span className="manualCardText">{description}</span>}
      <span className="manualCardAction">{action}</span>
    </Link>
  );
}

export function ManualAppPage({
  children,
  title,
  lead
}) {
  return (
    <main className="manualHome manualAppPortal">
      <section className="manualHomeHeader">
        <div className="container">
          {title && <h1>{title}</h1>}
          {lead && <p className="manualLead">{lead}</p>}
        </div>
      </section>

      <div className="container">{children}</div>
    </main>
  );
}

export function ManualSection({children, title}) {
  return (
    <section className="manualSection manualAppSection">
      <div className="manualSectionHeader manualSectionHeader--compact">
        <h2>{title}</h2>
      </div>
      <div className="manualCardGrid manualCardGrid--apps">{children}</div>
    </section>
  );
}

function CardIcon({icon, iconText}) {
  if (icon) {
    return (
      <span className="manualCardIcon">
        <img src={icon} alt="" loading="lazy" />
      </span>
    );
  }

  if (iconText) {
    return <span className="manualCardIcon manualCardIcon--text">{iconText}</span>;
  }

  return null;
}

export function ManualCard({label, to, action = 'More >', icon, iconText}) {
  const className = 'manualCard manualCard--appPortal';
  const content = (
    <>
      <CardIcon icon={icon} iconText={iconText} />
      <span className="manualCardTitle">{label}</span>
    </>
  );

  if (!to) {
    return (
      <div className={className} aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <Link className={className} to={to}>
      {content}
      <span className="manualCardAction">{action}</span>
    </Link>
  );
}
