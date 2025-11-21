# 📱 iPhone 15 Proでオフラインプレイする全方法

## 🌟 方法の比較

| 方法 | 難易度 | オフライン | 更新 | おすすめ度 |
|------|--------|-----------|------|-----------|
| **PWA** | ⭐️ | ✅ 完全 | ✅ 自動 | ⭐️⭐️⭐️⭐️⭐️ |
| **ローカルHTML** | ⭐️⭐️ | ✅ 完全 | ❌ 手動 | ⭐️⭐️⭐️⭐️ |
| **Shortcuts + HTML** | ⭐️⭐️⭐️ | ✅ 完全 | ❌ 手動 | ⭐️⭐️⭐️ |
| **WebArchive** | ⭐️⭐️ | ✅ 完全 | ❌ 不可 | ⭐️⭐️ |

---

## 📦 方法1: PWA（Progressive Web App）★★★★★

### 概要
最もおすすめの方法。Webアプリをネイティブアプリのように使用できます。

### メリット
- ✅ ホーム画面にアイコン追加
- ✅ フルスクリーンで動作
- ✅ 完全オフライン対応
- ✅ 自動更新
- ✅ App Store不要

### セットアップ
```bash
# 既に実装済み！
npm run build
git push
```

### iPhone での使い方
1. Safariで `https://your-username.github.io/poker-preflop-trainer/` にアクセス
2. 共有ボタン（□↑）をタップ
3. 「ホーム画面に追加」を選択
4. 完了！

詳細は [PWA_SETUP.md](./PWA_SETUP.md) を参照

---

## 📄 方法2: ローカルHTMLファイル ★★★★

### 概要
単一のHTMLファイルとしてエクスポートし、iCloudやファイルアプリに保存。

### メリット
- ✅ 完全オフライン
- ✅ インターネット接続不要
- ✅ プライバシー保護
- ✅ カスタマイズ可能

### デメリット
- ❌ 手動更新が必要
- ❌ Next.jsの機能が使えない

### セットアップ

#### ステップ1: 単一HTMLファイルの作成

```bash
# 簡易版を作成
cd /home/user/poker-trainer
```

**簡易的なスタンドアロン版を作成:**

```html
<!-- standalone.html として作成 -->
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Poker Preflop Trainer - Offline</title>
    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* カスタムスタイル */
        .poker-felt {
            background: linear-gradient(135deg, #0D5C3D 0%, #1a7f5a 100%);
        }
    </style>
</head>
<body class="poker-felt min-h-screen">
    <!-- アプリのコード -->
    <div id="app"></div>
    
    <script>
        // レンジデータをインライン化
        const RANGES = {
            UTG: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', ...],
            // ...
        };
        
        // アプリロジック
        // ...
    </script>
</body>
</html>
```

#### ステップ2: iPhoneに転送

**方法A: AirDrop**
1. MacでHTMLファイルをAirDrop
2. iPhoneで受信
3. ファイルアプリに保存

**方法B: iCloud Drive**
1. HTMLファイルをiCloud Driveにアップロード
2. iPhoneのファイルアプリで開く

**方法C: メール**
1. 自分にメールで送信
2. 添付ファイルをダウンロード
3. ファイルアプリに保存

#### ステップ3: Safariで開く

1. ファイルアプリを開く
2. HTMLファイルをタップ
3. Safariで開く
4. ブックマークに追加

---

## ⚡ 方法3: Shortcuts + ローカルHTML ★★★

### 概要
iOSのショートカットアプリを使って、HTMLファイルを簡単に開けるようにします。

### セットアップ

#### ステップ1: ショートカットの作成

1. **ショートカットアプリ**を開く
2. 「+」で新規ショートカット作成
3. 以下のアクションを追加：

```
1. 「ファイルを取得」
   → iCloud Drive/poker-trainer.html を選択

2. 「HTMLをリッチテキストに変換」
   → オフ

3. 「クイックルック」
   → 入力: ファイル
```

4. ショートカット名を「Poker Trainer」に変更
5. ホーム画面に追加

#### ステップ2: 起動

- ホーム画面のショートカットアイコンをタップ
- HTMLが表示される

---

## 📚 方法4: Webアーカイブ ★★

### 概要
Safariのページ全体を保存機能を使用。

### セットアップ

#### ステップ1: ページを保存

1. Safariでアプリを開く
2. 共有ボタン → 「PDFを作成」の代わりに「リーダーで表示」
3. または、スクリーンショットでページ全体を保存

※ iOSのSafariは完全なWebアーカイブ保存に制限があります

### デメリット
- ❌ インタラクティブ性が失われる
- ❌ JavaScriptが動作しない
- ❌ 実用的ではない

---

## 🛠 方法5: 自前のスタンドアロンHTML ★★★★

### 概要
完全に機能するスタンドアロンHTMLファイルを生成。

### 特徴
- ✅ すべてのロジックを1ファイルに
- ✅ 外部依存なし
- ✅ 完全オフライン
- ✅ LocalStorageも使用可能

### 実装

スタンドアロン版の作成スクリプトを実行:

```bash
cd /home/user/poker-trainer
npm run build:standalone
```

これにより、以下が生成されます:
- `standalone/poker-trainer-offline.html` - 完全版
- `standalone/poker-trainer-lite.html` - 軽量版

---

## 📲 推奨設定: PWA + バックアップHTML

### ベストプラクティス

1. **メイン:** PWA版を使用
   - 常に最新版
   - オフライン対応
   - 自動更新

2. **バックアップ:** スタンドアロンHTML
   - iCloud Driveに保存
   - 完全オフライン
   - 更新時に手動で置き換え

### 手順

```bash
# 1. PWA版をデプロイ
git push

# 2. スタンドアロン版を生成
npm run build:standalone

# 3. HTMLファイルをiCloud Driveに保存
# 4. iPhoneでPWA版をホーム画面に追加
# 5. バックアップとしてHTML版も保持
```

---

## 🎯 各方法の使い分け

### PWA版（推奨）
**使うべき場面:**
- 通常の学習
- 最新機能を使いたい
- 統計データを保存したい

### スタンドアロンHTML版
**使うべき場面:**
- 完全オフライン環境
- データのプライバシーが重要
- バックアップとして

### どちらも準備しておく
- メイン: PWA
- サブ: スタンドアロンHTML（iCloud Drive保存）

---

## 💾 データの扱い

### PWA版
```javascript
// LocalStorageに自動保存
localStorage.setItem('poker-trainer-data', JSON.stringify(data));
```

### スタンドアロンHTML版
```javascript
// 同じくLocalStorageを使用
// ファイルが異なるオリジン（file://）なので別データ
```

### データのバックアップ

将来の実装予定:
```javascript
// エクスポート機能
function exportData() {
  const data = {
    statistics: getStatistics(),
    sessions: getSessions(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], 
    { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  // ダウンロードリンクを生成
}
```

---

## 🔒 オフライン使用時の注意点

### iOS Safari の制限

1. **LocalStorage容量**
   - 約5-10MBまで
   - 大量のセッションデータは注意

2. **キャッシュの削除**
   - iOSが自動的に削除する場合あり
   - 定期的にアクセスを推奨

3. **プライベートブラウジング**
   - LocalStorageが使用不可
   - 通常モードを使用

### 対策

- 定期的なデータエクスポート（実装予定）
- 重要な統計はスクリーンショット保存
- 両方式（PWA + HTML）を併用

---

## 🚀 実装状況

### ✅ 現在利用可能
- PWA化（Service Worker + Manifest）
- LocalStorageによるデータ保存
- オフラインキャッシング

### 🔄 今後実装予定
- スタンドアロンHTML生成スクリプト
- データエクスポート機能
- データインポート機能
- オフライン検知UI

---

## 📖 関連ドキュメント

- [PWA_SETUP.md](./PWA_SETUP.md) - PWA詳細ガイド
- [README.md](./README.md) - プロジェクト概要
- [DEPLOYMENT.md](./DEPLOYMENT.md) - デプロイ手順

---

## 🎉 まとめ

**iPhone 15 Proでオフラインプレイ:**

1. **最も簡単:** PWA化（既に実装済み）
2. **完全オフライン:** スタンドアロンHTML（今後実装）
3. **両方使う:** PWA + バックアップHTML（推奨）

**次のステップ:**
1. GitHub Pagesにデプロイ
2. iPhoneのSafariでアクセス
3. 「ホーム画面に追加」
4. オフラインで学習開始！

---

**Learn Poker Anywhere, Anytime! 🃏✨**