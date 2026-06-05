import React from 'react';
import {useLocation} from '@docusaurus/router';

const docImages = require.context('@site/docs', true, /\.(png|jpe?g|gif|webp|svg)$/);

function normalizePath(path) {
  const parts = [];

  for (const part of path.replace(/\\/g, '/').split('/')) {
    if (!part || part === '.') {
      continue;
    }

    if (part === '..') {
      parts.pop();
      continue;
    }

    parts.push(part);
  }

  return parts.join('/');
}

function getDocRoutePath(pathname) {
  return pathname
    .replace(/^\/+/, '')
    .replace(/^docs\/?/, '')
    .replace(/\/+$/, '');
}

function getRouteBases(pathname) {
  const docRoutePath = getDocRoutePath(pathname);

  if (!docRoutePath) {
    return [''];
  }

  const parts = docRoutePath.split('/');
  const parent = parts.slice(0, -1).join('/');

  return pathname.endsWith('/') ? [docRoutePath, parent] : [parent, docRoutePath];
}

function resolveDocImage(src, pathname) {
  if (!src || /^(?:https?:|data:|blob:|\/)/.test(src)) {
    return src;
  }

  const candidates = getRouteBases(pathname).map((base) => normalizePath(`${base}/${src}`));

  for (const candidate of candidates) {
    const key = `./${candidate}`;

    try {
      const image = docImages(key);
      return image.default ?? image;
    } catch {
      // Try the next route-based candidate.
    }
  }

  return src;
}

function getAlignStyle(align = 'left') {
  if (align === 'center') {
    return {
      marginLeft: 'auto',
      marginRight: 'auto'
    };
  }

  if (align === 'right') {
    return {
      marginLeft: 'auto',
      marginRight: 0
    };
  }

  return {
    marginLeft: 0,
    marginRight: 'auto'
  };
}

function getBorderStyle(border = 'default') {
  if (border === 'none') {
    return {
      border: 'none',
      borderRadius: 0
    };
  }

  return {
    border: '1px solid var(--manual-border)',
    borderRadius: 8,
    background: 'var(--manual-surface)'
  };
}

export default function Image({
  src,
  alt = '',
  width,
  maxWidth,
  align = 'left',
  border = 'default',
  style,
  ...props
}) {
  const location = useLocation();
  const resolvedSrc = resolveDocImage(src, location.pathname);

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      style={{
        display: 'block',
        width,
        maxWidth,
        height: 'auto',
        ...getAlignStyle(align),
        ...getBorderStyle(border),
        ...style
      }}
      {...props}
    />
  );
}
