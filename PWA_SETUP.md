# 📱 PWA化によるiPhoneオフラインプレイガイド

## 🌟 PWA (Progressive Web App) とは？

Webアプリをネイティブアプリのように使える技術です。

### メリット
- ✅ ホーム画面にアイコン追加
- ✅ フルスクリーンで動作
- ✅ オフラインで使用可能
- ✅ App Storeの審査不要
- ✅ 自動更新

---

## 🚀 セットアップ手順

### 1. アイコン画像の準備

以下のサイズのアイコンを作成してください：

```bash
cd /home/user/poker-trainer/public

# 192x192pxのアイコン
# icon-192.png

# 512x512pxのアイコン
# icon-512.png
```

#### アイコン作成方法

**オプションA: オンラインツールで作成**
1. [Canva](https://www.canva.com/) や [Figma](https://www.figma.com/) を使用
2. 192x192px と 512x512px のキャンバスを作成
3. ポーカーカードのデザインを配置
4. PNG形式でエクスポート

**オプションB: 簡易的なアイコン生成**
```bash
# ImageMagickがある場合
convert -size 192x192 xc:#0D5C3D -pointsize 80 -fill white -gravity center -annotate +0+0 "🃏" icon-192.png
convert -size 512x512 xc:#0D5C3D -pointsize 200 -fill white -gravity center -annotate +0+0 "🃏" icon-512.png
```

**オプションC: 既存の画像から生成**
- 既存の画像をリサイズしてアイコンとして使用
- [Real Favicon Generator](https://realfavicongenerator.net/) で自動生成

### 2. デプロイ

```bash
# ビルド
npm run build

# GitHubにプッシュ
git add .
git commit -m "Add PWA support"
git push
```

---

## 📲 iPhone 15 Proでの使い方

### ステップ1: Safariでアクセス

```
https://your-username.github.io/poker-preflop-trainer/
```

### ステップ2: ホーム画面に追加

1. **共有ボタン**（画面下部中央の□↑アイコン）をタップ
2. **ホーム画面に追加** を選択
3. アプリ名を確認（編集可能）
4. **追加** をタップ

### ステップ3: アプリとして起動

- ホーム画面のアイコンから起動
- フルスクリーンで表示
- ブラウザのUIなし

### ステップ4: オフラインで使用

- 一度アクセスすれば、オフラインでも使用可能
- データはLocalStorageに保存
- 学習履歴も保持

---

## 🔧 PWAの動作確認

### オンライン状態で確認

1. アプリを開く
2. 数ページ閲覧（キャッシュに保存される）
3. デベロッパーツールで確認：
   - Safari → 開発 → Service Workers

### オフライン状態で確認

1. 機内モードをON
2. アプリを起動
3. 正常に動作することを確認

---

## 📊 キャッシュ戦略

### Network First, Fallback to Cache

```javascript
// sw.jsの戦略
1. まずネットワークから取得を試みる
2. 成功したらキャッシュに保存
3. 失敗したらキャッシュから返す
4. キャッシュにもなければホームページを返す
```

### キャッシュされるもの

- ✅ HTML（全ページ）
- ✅ CSS（スタイル）
- ✅ JavaScript（ロジック）
- ✅ 画像（アイコン等）
- ✅ フォント

### キャッシュされないもの

- ❌ LocalStorageのデータ（別途保存）
- ❌ 外部APIのレスポンス

---

## 🎯 LocalStorageについて

### データの保存場所

```
Safari → 設定 → プライバシーとセキュリティ → サイトデータ
```

### 保存されるデータ

- 学習統計
- セッション履歴
- 間違えたハンド
- 連続学習日数

### データのバックアップ

PWAではデータのエクスポート機能が重要です：

```typescript
// 将来の実装予定
export function exportData() {
  const data = {
    statistics: getStatistics(),
    sessions: getSessions(),
  };
  const json = JSON.stringify(data, null, 2);
  // JSONファイルとしてダウンロード
}
```

---

## 🔄 アップデート方法

### 自動更新

1. Service Workerが新バージョンを検知
2. バックグラウンドで新しいキャッシュを作成
3. 次回起動時に新バージョンが適用

### 手動更新

```javascript
// アプリ内に「更新」ボタンを追加可能
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.update();
    });
  });
}
```

---

## 📱 iOSでの制限事項

### 注意点

1. **ストレージ制限**
   - LocalStorage: 5-10MB程度
   - キャッシュ: 50MB程度
   - データが削除される可能性あり

2. **バックグラウンド処理**
   - バックグラウンド同期は非対応
   - プッシュ通知は非対応（iOS 16.4以降は部分対応）

3. **Service Worker**
   - 一部機能が制限される
   - 定期的な再キャッシュが推奨

### 対策

- 定期的にアクセスしてキャッシュを更新
- 重要なデータはエクスポート機能で保存
- 連続学習日数の記録を確認

---

## 🐛 トラブルシューティング

### アイコンが表示されない

1. manifest.jsonのパスを確認
2. アイコンファイルが存在するか確認
3. Safariのキャッシュをクリア

### オフラインで動作しない

1. Service Workerが登録されているか確認
2. 一度オンラインでアクセスしてキャッシュ
3. デベロッパーツールでエラー確認

### データが消える

1. Safariの設定で「サイトデータを削除」を確認
2. 定期的にエクスポート機能を使用（実装予定）
3. iCloudバックアップを有効化

### 更新が反映されない

1. ホーム画面からアプリを削除
2. Safariのキャッシュをクリア
3. 再度「ホーム画面に追加」

---

## 🎨 カスタマイズ

### スプラッシュスクリーン

```html
<!-- public/index.htmlに追加 -->
<link rel="apple-touch-startup-image" href="/splash-1170x2532.png">
```

### ステータスバーの色

```json
// manifest.jsonで設定済み
"theme_color": "#0D5C3D"
```

### フルスクリーン

```json
// manifest.jsonで設定済み
"display": "standalone"
```

---

## 📈 PWAのメリット vs ネイティブアプリ

| 機能 | PWA | ネイティブアプ |
|------|-----|--------------|
| インストール | ✅ 即座 | ❌ App Store審査 |
| オフライン | ✅ 可能 | ✅ 可能 |
| アップデート | ✅ 自動 | ❌ 手動承認必要 |
| ストレージ | ⚠️ 制限あり | ✅ 無制限 |
| プッシュ通知 | ⚠️ 制限あり | ✅ 完全対応 |
| パフォーマンス | ✅ 良好 | ✅ 最高 |
| 開発コスト | ✅ 低い | ❌ 高い |

---

## 🔮 将来の機能拡張

### Phase 2で実装予定

1. **データエクスポート**
   - JSON形式でダウンロード
   - バックアップ＆復元

2. **オフライン検知**
   - ネットワーク状態の表示
   - 同期待ちデータの表示

3. **アップデート通知**
   - 新バージョン検知
   - 更新を促すUI

4. **インストールプロンプト**
   - 初回訪問時に案内
   - ホーム画面追加を促進

---

## ✅ チェックリスト

PWA化の完了確認：

- [ ] manifest.jsonが正しく配置
- [ ] Service Workerが登録
- [ ] アイコン（192px, 512px）が存在
- [ ] Safariでホーム画面に追加できる
- [ ] オフラインで動作する
- [ ] LocalStorageにデータが保存される
- [ ] フルスクリーンで表示される

---

## 🎉 完成！

これでiPhone 15 Proでオフラインプレイが可能になります！

**使い方:**
1. Safariでアクセス
2. 共有 → ホーム画面に追加
3. アイコンから起動
4. どこでも学習！

---

**Happy Learning Anywhere! 🃏✨**