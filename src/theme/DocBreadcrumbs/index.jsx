import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useHomePageRoute} from '@docusaurus/theme-common/internal';
import {useDoc, useSidebarBreadcrumbs} from '@docusaurus/plugin-content-docs/client';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';
import manualCatalog from '@site/manual.config';

const docsUrl = (path) => `/docs/${path}/`;

function normalizeDocId(id) {
  return id.endsWith('/index') ? id.slice(0, -'/index'.length) : id;
}

function breadcrumb(label, href) {
  return {
    type: 'link',
    label,
    href
  };
}

function findAppBundle(docId) {
  return manualCatalog.apps.find(
    (app) => docId === app.path || docId.startsWith(`${app.path}/`)
  );
}

function findDeveloperBundle(docId) {
  return manualCatalog.developerDocs.find(
    (doc) => docId === doc.path || docId.startsWith(`${doc.path}/`)
  );
}

function findCondition(app, docId) {
  return app.conditions?.find((condition) => {
    const conditionPath = `${app.path}/${condition.path}`;
    return docId === conditionPath || docId.startsWith(`${conditionPath}/`);
  });
}

function withoutLeadingDuplicate(items, itemToDrop) {
  const [first, ...rest] = items;

  if (first?.label === itemToDrop.label && first?.href === itemToDrop.href) {
    return rest;
  }

  return items;
}

function buildManualBreadcrumbs(metadata, sidebarBreadcrumbs) {
  const normalizedId = normalizeDocId(metadata.id);
  const app = findAppBundle(normalizedId);

  if (app) {
    const condition = findCondition(app, normalizedId);
    const base = [breadcrumb('APP', '/app/')];

    if (condition || normalizedId !== app.path) {
      base.push(breadcrumb(app.label, docsUrl(app.path)));
    }

    if (condition) {
      const conditionBreadcrumb = breadcrumb(
        condition.label,
        docsUrl(`${app.path}/${condition.path}`)
      );

      return [
        ...base,
        conditionBreadcrumb,
        ...withoutLeadingDuplicate(sidebarBreadcrumbs, conditionBreadcrumb)
      ];
    }

    return [...base, ...sidebarBreadcrumbs];
  }

  const developerDoc = findDeveloperBundle(normalizedId);

  if (developerDoc) {
    const base = [breadcrumb('Developers')];

    if (normalizedId !== developerDoc.path) {
      base.push(breadcrumb(developerDoc.label, docsUrl(developerDoc.path)));
    }

    return [...base, ...sidebarBreadcrumbs];
  }

  return sidebarBreadcrumbs;
}

function dedupeAdjacentBreadcrumbs(items) {
  return items.filter((item, index) => {
    const previous = items[index - 1];
    return !previous || previous.label !== item.label || previous.href !== item.href;
  });
}

function BreadcrumbsItemLink({children, href, isLast}) {
  const className = 'breadcrumbs__link';

  if (isLast) {
    return <span className={className}>{children}</span>;
  }

  return href ? (
    <Link className={className} to={href}>
      <span>{children}</span>
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}

function BreadcrumbsItem({children, active}) {
  return (
    <li
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active
      })}>
      {children}
    </li>
  );
}

export default function DocBreadcrumbs() {
  const sidebarBreadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();
  const {metadata} = useDoc();

  if (!sidebarBreadcrumbs) {
    return null;
  }

  const breadcrumbs = dedupeAdjacentBreadcrumbs(
    buildManualBreadcrumbs(metadata, sidebarBreadcrumbs)
  );

  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={breadcrumbs} />
      <nav
        className={ThemeClassNames.docs.docBreadcrumbs}
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.navAriaLabel',
          message: 'Breadcrumbs',
          description: 'The ARIA label for the breadcrumbs'
        })}>
        <ul className="breadcrumbs">
          {homePageRoute && <HomeBreadcrumbItem />}
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const href =
              item.type === 'category' && item.linkUnlisted ? undefined : item.href;

            return (
              <BreadcrumbsItem key={`${item.label}-${index}`} active={isLast}>
                <BreadcrumbsItemLink href={href} isLast={isLast}>
                  {item.label}
                </BreadcrumbsItemLink>
              </BreadcrumbsItem>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
