# Mirror

Mirror は、アクセシビリティと機能性を重視したヘッドレスUIコンポーネントライブラリです。デザインツールとの連携機能を備え、効率的なUI開発を実現します。

## 特徴

- ヘッドレスUIコンポーネント
- デザインツール（Figmaなど）との連携
- アクセシビリティ対応
- TypeScript対応
- モノレポ構成

## ディレクトリ構造

```
mirror/
├── .github/          # GitHub Actions ワークフローの設定
├── packages/         # 各パッケージのソースコード
│   ├── mirror-design-compiler/        # デザインツールの違いを吸収し、統一されたインターフェースを提供
│   ├── mirror-design-generator/       # コンパイラを利用し、指定したコードを元に実際のツールを生成
│   ├── mirror-frontend-compiler/      # 様々なフロントライブラリの違いを吸収し、統一されたインターフェースを提供
│   ├── mirror-frontend-generator/     # コンパイラを利用し、指定したデザインを元に実際のコードを生成
│   ├── mirror-ui/                    # 独自の記法でコンポーネントを作成する中核パッケージ
│   ├── mirror-ui-animation/          # アニメーション特化コンポーネント
│   ├── mirror-ui-base/               # 基盤となる必須コンポーネント
│   ├── mirror-ui-design-generator/   # UIコンポーネントのデザインツール生成
│   ├── mirror-ui-frontend-generator/ # UIコンポーネントのフロントエンド生成
│   └── mirror-ui-table/             # テーブル特化コンポーネント
├── scripts/         # ビルド、テスト、デプロイ用スクリプト
├── .gitignore      # Git除外設定
├── lerna.json      # Lerna設定
├── package.json    # プロジェクト設定
└── README.md       # このファイル
```

## 必要要件

- Node.js >= 18.0.0
- npm >= 8.0.0

## インストール

```bash
# リポジトリのクローン
git clone https://github.com/Fandhe-Partner/fandhe-mirror.git
cd fandhe-mirror

# 依存関係のインストール
npm install
```

## 開発

```bash
# すべてのパッケージをビルド
npm run build

# テストの実行
npm run test

# リントの実行
npm run lint
```

## パッケージの説明

各パッケージの詳細な説明は以下の通りです：

### Core Packages

- **mirror-ui**: 独自の記法でコンポーネントを作成する中核パッケージ
- **mirror-ui-base**: アクセシビリティに配慮した基盤コンポーネント
- **mirror-ui-animation**: アニメーション特化コンポーネント
- **mirror-ui-table**: テーブル特化コンポーネント

### Compiler Packages

- **mirror-design-compiler**: デザインツールの違いを吸収し、統一されたインターフェースを提供
- **mirror-frontend-compiler**: フロントエンドライブラリの違いを吸収し、統一されたインターフェースを提供

### Generator Packages

- **mirror-design-generator**: コンパイラを利用し、指定したコードを元に実際のツールを生成
- **mirror-frontend-generator**: コンパイラを利用し、指定したデザインを元に実際のコードを生成
- **mirror-ui-design-generator**: UIコンポーネントのデザインツール生成機能を提供
- **mirror-ui-frontend-generator**: UIコンポーネントのフロントエンドコード生成機能を提供

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。
