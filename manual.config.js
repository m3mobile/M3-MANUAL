const manualCatalog = {
  ui: {
    openDocumentLabel: 'More >',
    documentMetaLabel: 'Document',
    defaultConditionSectionTitle: '조건 선택',
    defaultLinkedDocsTitle: '기본 문서',
    defaultLinkedDocsDescription: '현재 문서 묶음에 포함된 공통 문서입니다.'
  },
  apps: [
    {
      id: 'scanemul',
      label: 'ScanEmul',
      path: 'app/scanemul',
      sidebarId: 'scanEmul',
      summary: '',
      docs: [
        {id: 'index', label: '진입 페이지'},
        {id: 'basic-usage', label: '기본 사용'}
      ],
      conditionSection: {
        title: '스캐너 종류'
      },
      conditions: [
        {
          id: 'zebra-1d',
          label: 'ZEBRA 1D',
          path: 'zebra-1d',
          sidebarId: 'scanEmulZebra1d'
        },
        {
          id: 'zebra-2d',
          label: 'ZEBRA 2D',
          path: 'zebra-2d',
          sidebarId: 'scanEmulZebra2d'
        },
        {
          id: 'honeywell-2d',
          label: 'HONEYWELL 2D',
          path: 'honeywell-2d',
          sidebarId: 'scanEmulHoneywell2d'
        },
        {
          id: 'e4-e5',
          label: 'E4/E5',
          path: 'e4-e5',
          sidebarId: 'scanEmulE4E5'
        },
        {
          id: 'cm60e',
          label: 'CM60E',
          path: 'cm60e',
          sidebarId: 'scanEmulCm60e'
        }
      ]
    },
    {
      id: 'app-b',
      label: '앱 B',
      path: 'app/app-b',
      sidebarId: 'appB',
      summary: '앱 B 매뉴얼입니다.',
      docs: [
        {id: 'index', label: '시작하기'},
        {id: 'operation', label: '운영 가이드'}
      ],
      conditions: []
    },
    {
      id: 'app-c',
      label: '앱 C',
      path: 'app/app-c',
      sidebarId: 'appC',
      summary: '앱 C 매뉴얼입니다.',
      docs: [
        {id: 'index', label: '시작하기'},
        {id: 'settings', label: '설정'}
      ],
      conditions: []
    }
  ],
  developerDocs: [
    {
      id: 'sdk-a',
      label: 'SDK 문서 A',
      path: 'developers/sdk-a',
      sidebarId: 'sdkA',
      summary: 'SDK 문서 A 개발자 가이드입니다.',
      docs: [
        {id: 'index', label: '소개'},
        {id: 'quickstart', label: '빠른 시작'},
        {id: 'api-reference', label: 'API Reference'}
      ]
    },
    {
      id: 'sdk-b',
      label: 'SDK 문서 B',
      path: 'developers/sdk-b',
      sidebarId: 'sdkB',
      summary: 'SDK 문서 B 개발자 가이드입니다.',
      docs: [
        {id: 'index', label: '소개'},
        {id: 'integration', label: '연동'},
        {id: 'release-notes', label: '릴리스 노트'}
      ]
    },
    {
      id: 'misc',
      label: '기타 개발자 문서',
      path: 'developers/misc',
      sidebarId: 'developerMisc',
      summary: 'SDK 외 개발자 참고 문서입니다.',
      docs: [
        {id: 'index', label: '소개'},
        {id: 'deployment', label: '배포'},
        {id: 'troubleshooting', label: '문제 해결'}
      ]
    }
  ]
};

module.exports = manualCatalog;
