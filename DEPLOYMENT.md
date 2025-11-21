# 🚀 GitHub Pages デプロイガイド

このプロジェクトをGitHub Pagesで公開する手順です。

## 📋 前提条件

- GitHubアカウント
- Gitがインストールされていること

## 🔧 デプロイ手順

### 1. GitHubリポジトリの作成

1. GitHubにログイン
2. 新しいリポジトリを作成
   - リポジトリ名: `poker-preflop-trainer`
   - Public/Private: Public（GitHub Pages無料利用のため）
   - README, .gitignore, licenseは追加しない（すでに存在するため）

### 2. ローカルリポジトリの初期化

```bash
cd poker-trainer

# Gitリポジトリを初期化
git init

# ファイルを追加
git add .

# 初回コミット
git commit -m "Initial commit: Poker Preflop Trainer"

# リモートリポジトリを追加（your-usernameを自分のユーザー名に変更）
git remote add origin https://github.com/your-username/poker-preflop-trainer.git

# メインブランチにプッシュ
git branch -M main
git push -u origin main
```

### 3. GitHub Pages の設定

#### 方法A: GitHub Actionsを使用（推奨）

1. GitHubリポジトリページにアクセス
2. **Settings** → **Pages** に移動
3. **Source** を **GitHub Actions** に変更
4. コードをプッシュすると自動的にデプロイされます

```bash
# 変更をプッシュすると自動デプロイ
git add .
git commit -m "Update"
git push
```

5. デプロイ完了後、以下のURLでアクセス可能：
   ```
   https://zizjp.github.io/poker-preflop-trainer/
   ```

#### 方法B: 手動ビルド＆デプロイ

```bash
# 1. 静的ファイルをビルド
npm run build

# 2. outディレクトリに移動
cd out

# 3. gh-pagesブランチにデプロイ
git init
git add .
git commit -m "Deploy to GitHub Pages"
git branch -M gh-pages
git remote add origin https://github.com/zizjp/poker-preflop-trainer.git
git push -f origin gh-pages

# 4. GitHub Settings → Pages で Source を "gh-pages" ブランチに設定
```

### 4. デプロイの確認

デプロイが完了すると（数分かかります）：
- GitHub Actions タブでビルド状況を確認
- `https://your-username.github.io/poker-preflop-trainer/` でアクセス

## 🔄 更新方法

### コードを更新してデプロイ

```bash
# 変更を加える
# ...

# コミット＆プッシュ
git add .
git commit -m "Update: 新機能追加"
git push

# GitHub Actionsが自動的にビルド＆デプロイ
```

## 📝 注意事項

### basePath の設定

`next.config.js` で `basePath` を設定しています：

```javascript
basePath: '/poker-preflop-trainer',
```

これにより、`https://username.github.io/poker-preflop-trainer/` でアクセス可能になります。

### カスタムドメインを使用する場合

1. `public/CNAME` ファイルを作成：
   ```
   your-domain.com
   ```

2. `next.config.js` の `basePath` を削除または空文字に：
   ```javascript
   basePath: '',
   ```

3. DNSでCNAMEレコードを設定：
   ```
   CNAME @ your-username.github.io
   ```

## 🐛 トラブルシューティング

### ページが表示されない

1. **404エラー**
   - Settings → Pages で正しいブランチが選択されているか確認
   - `.nojekyll` ファイルが存在するか確認

2. **スタイルが崩れる**
   - `next.config.js` の `basePath` が正しいか確認
   - ブラウザのキャッシュをクリア

3. **ビルドエラー**
   - GitHub Actions タブでエラーログを確認
   - ローカルで `npm run build` が成功するか確認

### LocalStorageの動作

GitHub Pagesは静的ホスティングなので、LocalStorageは正常に動作します。
ユーザーのブラウザにデータが保存されます。

## 📊 アナリティクス追加（オプション）

Google Analyticsを追加する場合：

1. `app/layout.tsx` に Google Analytics スクリプトを追加
2. トラッキングIDを環境変数で管理

## 🔒 セキュリティ

- このアプリはクライアントサイドのみで動作
- ユーザーデータは全てローカル（LocalStorage）に保存
- サーバーにデータは送信されません

## 📱 PWA対応（今後の拡張）

PWA対応する場合：
1. `next-pwa` パッケージをインストール
2. `manifest.json` を作成
3. Service Workerを設定

## 🎉 完了！

デプロイが完了したら、以下のURLでアクセス：
```
https://your-username.github.io/poker-preflop-trainer/
```

友達にシェアして、一緒にポーカーのスキルを向上させましょう！🃏