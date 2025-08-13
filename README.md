# 歯科衛生士コミュニティプラットフォーム

歯科衛生士のための学習・交流プラットフォーム。毎日1分で役立つ実践知識を提供。

## 🎯 コンセプト

- **毎日1分で学べる**: 忙しい歯科衛生士でも続けられる短時間学習
- **実践的な内容**: 給与・税金・対人スキル・キャリアの実用情報
- **安心の匿名性**: 匿名で相談・共有できる心理的安全性
- **楽しく継続**: ゲーミフィケーションで学習習慣を定着

## 🚀 主要機能

### コア機能 (MVP)
- ✅ **今日の一枚カード**: 属性別パーソナライズされた実践Tips
- ✅ **1問クイズ**: 3択問題で楽しく知識定着
- ✅ **相談要約**: 前日の相談TOP3を要点整理
- ✅ **ミッション**: 1分で完了できる実践課題
- ✅ **あるある投稿**: 140字の共感コンテンツ
- ✅ **ストリーク**: 連続ログインで特典解放

### 開発中の機能
- 🚧 フォーラム（匿名相談）
- 🚧 通知システム（FCM）
- 🚧 OGP画像自動生成
- 🚧 LINE ログイン

## 🛠 技術スタック

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Functions, Storage)
- **State**: Zustand, React Query
- **UI Components**: Radix UI
- **Analytics**: Google Analytics 4

## 📦 セットアップ

### 必要要件
- Node.js 18.0.0以上
- npm 9.0.0以上
- Firebase プロジェクト

### インストール

```bash
# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.local.example .env.local
# .env.localにFirebaseの認証情報を設定

# 開発サーバーの起動
npm run dev
```

### Firebase設定

```bash
# Firebase CLIのインストール
npm install -g firebase-tools

# ログイン
firebase login

# プロジェクトの初期化
firebase init

# デプロイ
firebase deploy
```

## 📁 プロジェクト構造

```
src/
├── app/              # Next.js App Router
├── components/       # Reactコンポーネント
│   ├── cards/       # カード関連
│   ├── quiz/        # クイズ機能
│   ├── forum/       # フォーラム機能
│   ├── missions/    # ミッション機能
│   ├── arareru/     # あるある機能
│   └── ui/          # 共通UIコンポーネント
├── hooks/           # カスタムフック
├── lib/             # ユーティリティ
├── types/           # TypeScript型定義
└── styles/          # グローバルスタイル
```

## 🔒 セキュリティ

- Firestore Security Rules による厳格なアクセス制御
- PII（個人情報）の自動マスキング
- NGワード検出とモデレーション
- 匿名投稿のサポート

## 📊 KPI

- 初回7日リテンション: 目標25%以上
- 週次アクティブ率: 目標35%以上  
- ストリーク7日継続者: 目標10%以上
- 保存率: 目標20%以上

## 🚀 デプロイ

```bash
# ビルド
npm run build

# Firebaseへデプロイ
npm run firebase:deploy
```

## 📝 ライセンス

MIT

## 🤝 コントリビューション

プルリクエストは歓迎します。大きな変更の場合は、まずissueを開いて変更内容を議論してください。