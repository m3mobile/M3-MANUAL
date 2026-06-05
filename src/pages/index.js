import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import manualCatalog from '@site/manual.config';

const docsUrl = (path) => `/docs/${path}/`;

const groups = {
  apps: manualCatalog.apps,
  developers: manualCatalog.developerDocs
};

function resolveHomeCard(card) {
  if (card.to) {
    return card;
  }

  const target = groups[card.group]?.find((item) => item.id === card.targetId);

  if (!target) {
    throw new Error(
      `[manual.config.js] homeCards.${card.id} references missing target: ${card.group}.${card.targetId}`
    );
  }

  return {
    ...card,
    to: docsUrl(target.path)
  };
}

const homeCards = manualCatalog.homeCards.map(resolveHomeCard);

function LinkGrid({items}) {
  return (
    <div className="manualCardGrid manualCardGrid--portal">
      {items.map((item) => (
        <Link className="manualCard manualCard--home manualCard--portal" key={item.id} to={item.to}>
          <span className="manualCardMeta">{item.meta}</span>
          <span className="manualCardTitle">{item.title}</span>
          <span className="manualCardText">{item.description}</span>
          <span className="manualCardAction">{manualCatalog.ui.openDocumentLabel}</span>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <Layout title="M3 MOBILE" description="M3 MOBILE app and SDK manuals">
      <main className="manualHome">
        <section className="manualHomeHeader">
          <div className="container">
            <span className="manualKicker">M3 MOBILE</span>
            <h1>M3 MOBILE 매뉴얼 센터</h1>
            <p className="manualLead">
              앱 사용자 매뉴얼과 SDK 개발자 문서를 한 곳에서 관리합니다. 상단 dropdown은 기존처럼 문서 묶음별 이동을 유지하고,
              메인 화면은 대표 진입점만 간결하게 보여줍니다.
            </p>
          </div>
        </section>

        <section className="manualHomeSection">
          <div className="container">
            <div className="manualSectionHeader">
              <h2>Manuals</h2>
              <p>자주 쓰는 두 가지 문서 영역으로 바로 이동합니다.</p>
            </div>
            <LinkGrid items={homeCards} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
