import React from 'react';
import Link from '@docusaurus/Link';
import manualCatalog from '@site/manual.config';

const groups = {
  apps: manualCatalog.apps,
  developers: manualCatalog.developerDocs
};

const groupLabels = {
  apps: 'APP',
  developers: 'Developers'
};

const ui = {
  openDocumentLabel: '문서 열기',
  documentMetaLabel: 'Document',
  defaultConditionSectionTitle: '조건 선택',
  defaultLinkedDocsTitle: '기본 문서',
  defaultLinkedDocsDescription: '현재 문서 묶음에 포함된 공통 문서입니다.',
  ...manualCatalog.ui
};

const docsUrl = (path) => `/docs/${path}/`;

function getBundle(group, id) {
  return groups[group]?.find((item) => item.id === id);
}

function ManualCard({to, label, description, meta, variant, showAction = true}) {
  const className = ['manualCard', variant && `manualCard--${variant}`].filter(Boolean).join(' ');

  return (
    <Link className={className} to={to}>
      {meta && <span className="manualCardMeta">{meta}</span>}
      <span className="manualCardTitle">{label}</span>
      {description && <span className="manualCardText">{description}</span>}
      {showAction && <span className="manualCardAction">{ui.openDocumentLabel}</span>}
    </Link>
  );
}

export default function ManualEntry({group, id, showLinkedDocs = true}) {
  const bundle = getBundle(group, id);

  if (!bundle) {
    return (
      <div className="manualNotice">
        문서 설정을 찾을 수 없습니다. <code>manual.config.js</code>의 id 값을 확인하세요.
      </div>
    );
  }

  const linkedDocs = bundle.docs.filter((doc) => doc.id !== 'index');
  const conditions = bundle.conditions ?? [];
  const conditionSection = bundle.conditionSection ?? {};
  const linkedDocsSection = bundle.linkedDocsSection ?? {};
  const linkedDocsDescription =
    linkedDocsSection.description ?? ui.defaultLinkedDocsDescription;

  return (
    <div className="manualEntry">
      {bundle.summary && (
        <div className="manualEntryHeader">
          <span className="manualKicker">{groupLabels[group]}</span>
          <p className="manualLead">{bundle.summary}</p>
        </div>
      )}

      {conditions.length > 0 && (
        <section className="manualSection manualSection--conditionSelect">
          <div className="manualSectionHeader manualSectionHeader--compact">
            <h2>{conditionSection.title ?? ui.defaultConditionSectionTitle}</h2>
            {conditionSection.description && <p>{conditionSection.description}</p>}
          </div>
          <div className="manualCardGrid manualCardGrid--entry manualCardGrid--conditions">
            {conditions.map((condition) => (
              <ManualCard
                key={condition.id}
                label={condition.label}
                description={condition.description}
                to={docsUrl(`${bundle.path}/${condition.path}`)}
                variant="condition"
                showAction={false}
              />
            ))}
          </div>
        </section>
      )}

      {showLinkedDocs && linkedDocs.length > 0 && (
        <section className="manualSection">
          <div className="manualSectionHeader">
            <h2>{linkedDocsSection.title ?? ui.defaultLinkedDocsTitle}</h2>
            {linkedDocsDescription && <p>{linkedDocsDescription}</p>}
          </div>
          <div className="manualCardGrid manualCardGrid--entry">
            {linkedDocs.map((doc) => (
              <ManualCard
                key={doc.id}
                meta={doc.meta ?? ui.documentMetaLabel}
                label={doc.label}
                description={doc.description}
                to={docsUrl(`${bundle.path}/${doc.id}`)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
