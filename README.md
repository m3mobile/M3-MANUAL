# Manual Site

Docusaurus classic 기반의 APP 매뉴얼 / Developers 문서 사이트입니다.

## 실행

```bash
npm install
npm run start
```

PowerShell 실행 정책 때문에 `npm` 명령이 막히면 Windows 명령 래퍼를 사용합니다.

```powershell
npm.cmd install
npm.cmd run start
```

## 문서 묶음 추가

앱, 개발자 문서, 앱 내부 조건은 `manual.config.js`에서 관리합니다.

- `apps`: APP dropdown에 표시되는 앱 묶음
- `developerDocs`: Developers dropdown에 표시되는 개발자 문서 묶음
- `conditions`: APP navbar에는 노출하지 않고, 앱 진입 페이지에서만 선택하는 조건별 문서 묶음
- `sidebarId`: 각 문서 묶음의 독립 sidebar id
- `path`: `docs/` 아래 문서 폴더 경로

루트 앱/개발자 문서 sidebar는 `docs` 배열에 명시된 문서만 표시합니다.
sidebar 항목명은 `manual.config.js`의 `label`이 아니라 각 MDX 파일의 frontmatter `title`을 사용합니다.
조건별 sidebar는 해당 조건 폴더만 자동 생성합니다.

## 매뉴얼 작성 규칙

기존 문서 묶음 안에서 내용을 작성하거나 페이지를 추가할 때는 기본적으로 `docs/` 아래의 MDX 파일만 수정합니다.

- ScanEmul 공통 진입 페이지: `docs/app/scanemul/index.mdx`
- ZEBRA 2D 진입 페이지: `docs/app/scanemul/zebra-2d/index.mdx`
- ZEBRA 2D 하위 문서: `docs/app/scanemul/zebra-2d/{단락명}/{문서명}.mdx`

조건별 문서는 항상 `조건폴더/index.mdx`를 진입 페이지로 둡니다.
`slug`나 `displayed_sidebar`로 라우트와 sidebar를 맞추지 않습니다.

sidebar 단락을 만들려면 조건 폴더 아래에 하위 폴더를 만들고 `_category_.json`을 둡니다.

```text
docs/app/scanemul/zebra-2d/
  index.mdx
  scanner-settings/
    _category_.json
    code-type-settings.mdx
    code-type-params.mdx
```

새 앱, 새 SDK 문서 묶음, 새 조건 카드를 추가할 때만 `manual.config.js`를 수정합니다.
`manual.config.js`에 등록한 문서 파일이나 조건 `index.mdx`가 없으면 빌드가 실패하도록 되어 있습니다.
