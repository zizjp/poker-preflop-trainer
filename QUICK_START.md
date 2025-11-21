# ⚡ クイックスタートガイド

## 📦 1分でGitHub Pagesにデプロイ！

### ステップ1: GitHubリポジトリ作成

1. [GitHub](https://github.com/new) で新しいリポジトリを作成
   - リポジトリ名: `poker-preflop-trainer`
   - Visibility: **Public** （GitHub Pages無料利用のため）
   - ✅ "Add a README file" はチェック**しない**

### ステップ2: コードをプッシュ

```bash
# 自動セットアップスクリプトを実行（GitHubユーザー名を指定）
./GITHUB_SETUP.sh your-github-username

# コードをプッシュ
git push -u origin main
```

### ステップ3: GitHub Pages 有効化

1. GitHubリポジトリページを開く
2. **Settings** タブをクリック
3. 左サイドバーの **Pages** をクリック
4. **Source** を **GitHub Actions** に変更
5. 保存

### ステップ4: デプロイ完了を待つ

- **Actions** タブでビルド状況を確認
- 緑のチェックマーク ✅ が表示されたら完了！
- 通常3-5分程度かかります

### ステップ5: アクセス

```
https://your-github-username.github.io/poker-preflop-trainer/
```

---

## 🎉 完了！

アプリが公開されました！
友達とシェアして、一緒にポーカースキルを向上させましょう！

---

## 🔧 ローカル開発

```bash
# 依存関係をインストール
npm install

# 開発サーバー起動
npm run dev

# ブラウザで http://localhost:3000 を開く
```

---

## 📝 更新方法

コードを変更したら：

```bash
git add .
git commit -m "説明文"
git push
```

GitHub Actionsが自動的に再デプロイします！

---

## ⚠️ トラブルシューティング

### ページが404エラー

1. Settings → Pages で Source が "GitHub Actions" になっているか確認
2. Actions タブでビルドが成功しているか確認
3. 数分待ってから再度アクセス

### スタイルが崩れる

1. ブラウザのキャッシュをクリア（Ctrl+Shift+R）
2. next.config.js の basePath が正しいか確認

### ビルドエラー

1. Actions タブでエラーログを確認
2. ローカルで `npm run build` を実行して確認
3. Issue を作成してサポートを求める

---

## 📚 詳細ドキュメント

- [完全なデプロイガイド](./DEPLOYMENT.md)
- [README](./README.md)
- [貢献ガイド](./CONTRIBUTING.md)

---

**Happy Deploying! 🚀**