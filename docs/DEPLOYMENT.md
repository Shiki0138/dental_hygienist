# デプロイメントガイド

## Vercelへのデプロイ手順

### 1. 前提条件
- GitHubアカウント
- Vercelアカウント（GitHubでサインイン可能）
- このリポジトリ: https://github.com/Shiki0138/dental_hygienist.git

### 2. Vercelでのデプロイ

#### ステップ1: Vercelにアクセス
1. https://vercel.com にアクセス
2. GitHubアカウントでサインイン

#### ステップ2: プロジェクトをインポート
1. ダッシュボードで「Add New」→「Project」をクリック
2. GitHubリポジトリ一覧から `dental_hygienist` を選択
3. 「Import」をクリック

#### ステップ3: プロジェクト設定
1. **Framework Preset**: Next.js（自動検出される）
2. **Root Directory**: そのまま（変更不要）
3. **Build and Output Settings**: デフォルトのまま

#### ステップ4: 環境変数の設定
Vercelの環境変数設定画面で以下を追加：

```
# デモモード用（Firebase未設定時）
NEXT_PUBLIC_FIREBASE_API_KEY=DEMO_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=demo.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=demo-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=demo-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=demo-app-id
```

**本番環境用（Firebaseプロジェクト作成後）**:
```
# 実際のFirebase設定値に置き換える
NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

#### ステップ5: デプロイ実行
1. 「Deploy」ボタンをクリック
2. 自動的にビルドとデプロイが開始
3. 完了後、プロジェクトURLが発行される

### 3. デプロイ後の確認

#### アクセスURL
- Vercelが自動的に生成: `https://dental-hygienist-xxxxx.vercel.app`
- カスタムドメインも設定可能

#### デモモードの確認
1. サイトにアクセス
2. 「デモユーザーでログイン」が表示される
3. 各機能がモックデータで動作することを確認

### 4. 更新とCI/CD

#### 自動デプロイ
GitHubのmainブランチにプッシュすると自動的に再デプロイされます：

```bash
git add .
git commit -m "Update features"
git push origin main
```

#### プレビューデプロイ
プルリクエストを作成すると、自動的にプレビュー環境が作成されます。

### 5. Firebaseセットアップ（本番移行時）

#### Firebase プロジェクト作成
1. https://console.firebase.google.com にアクセス
2. 新規プロジェクト作成
3. Authentication、Firestore、Storageを有効化

#### Firebase設定の取得
1. プロジェクト設定 → 全般
2. 「マイアプリ」セクションでWebアプリを追加
3. Firebase SDK設定値をコピー

#### Vercel環境変数の更新
1. Vercelダッシュボード → Settings → Environment Variables
2. デモ値を実際のFirebase設定値に更新
3. 再デプロイ実行

### 6. トラブルシューティング

#### ビルドエラーが発生した場合
- `next.config.js`で一時的にタイプチェックを無効化済み
- 本番環境では修正推奨

#### 環境変数が反映されない
- Vercelダッシュボードで環境変数を確認
- 再デプロイを実行

#### Firebase認証エラー
- デモモードで動作確認
- Firebase設定値の正確性を確認

### 7. 監視とメンテナンス

#### パフォーマンス監視
- Vercel Analyticsで自動監視
- Core Web Vitalsの確認

#### エラー監視
- Vercel Functions Logs
- ブラウザコンソールエラー

### 8. コスト最適化

#### 無料プランの制限
- 100GB帯域幅/月
- 100時間ビルド時間/月
- 商用利用不可

#### 最適化のヒント
- 画像の最適化（Next.js Image使用）
- 静的生成の活用
- キャッシュ戦略の設定

## サポート

問題が発生した場合：
1. Vercelのデプロイログを確認
2. GitHubのIssuesで報告
3. デモモードで動作確認

---

最終更新: 2025-01-13