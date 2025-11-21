# 🃏 Poker Preflop Trainer

ポーカーのプリフロップレンジを効率的に学習・暗記するためのWebアプリケーションです。

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 デモ

**Live Demo**: `https://your-username.github.io/poker-preflop-trainer/`

> GitHub Pagesでホスティング中

## 📱 機能

### ✅ 実装済み（MVP）

- **ポジション別トレーニング**
  - UTG, MP, CO, BTN, SB の5ポジション
  - 各ポジションに最適化されたレンジ（100bb想定）

- **直感的なスワイプ操作**
  - 👈 左スワイプ: Fold
  - 👉 右スワイプ: Raise
  - スムーズなアニメーション

- **即時フィードバック**
  - 正解/不正解の表示
  - 詳しい解説付き
  - 視覚的なフィードバック

- **復習機能**
  - 間違えた問題を自動記録
  - ポジション別の弱点復習
  - 効率的な学習サイクル

- **詳細統計**
  - 全体正解率
  - ポジション別マスター度
  - 苦手なハンド Top 10
  - 連続学習日数トラッキング

- **カテゴリ別分析**
  - ペア/スーテッド/オフスート別の正解率
  - 星評価システム
  - 進捗の可視化

## 🚀 セットアップ

### 必要要件

- Node.js 18.x 以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/your-username/poker-preflop-trainer.git
cd poker-preflop-trainer

# パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

### ビルド

```bash
# 本番用ビルド
npm run build

# 本番サーバーの起動
npm start

# 静的ファイルのエクスポート（GitHub Pages用）
npm run build
# out/ ディレクトリに静的ファイルが生成されます
```

## 📦 GitHub Pages へのデプロイ

### 自動デプロイ（推奨）

1. **GitHubリポジトリを作成**
   ```bash
   # セットアップスクリプトを実行
   ./GITHUB_SETUP.sh your-github-username
   ```

2. **コードをプッシュ**
   ```bash
   git push -u origin main
   ```

3. **GitHub Pagesを有効化**
   - リポジトリの Settings → Pages
   - Source を "GitHub Actions" に設定

4. **アクセス**
   - `https://your-username.github.io/poker-preflop-trainer/`

詳細は [DEPLOYMENT.md](./DEPLOYMENT.md) を参照してください。

## 🎮 使い方

1. **ホーム画面**でポジションを選択
2. **ゲーム画面**で表示されるハンドに対して:
   - 👈 左スワイプ: Fold
   - 👉 右スワイプ: Raise
3. 即座にフィードバックが表示されます
4. 50問終了後、**結果画面**で成績を確認
5. 間違えた問題は**復習モード**で集中トレーニング
6. **統計画面**で全体の進捗を確認

## 📚 技術スタック

- **Framework**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **アニメーション**: Framer Motion
- **データ保存**: LocalStorage
- **ホスティング**: GitHub Pages

## 📂 プロジェクト構造

```
poker-preflop-trainer/
├── app/                    # Next.js App Router
│   ├── page.tsx           # ホーム画面
│   ├── game/              # ゲーム画面
│   ├── result/            # 結果画面
│   ├── review/            # 復習画面
│   ├── statistics/        # 統計画面
│   ├── layout.tsx         # レイアウト
│   └── globals.css        # グローバルスタイル
├── components/             # Reactコンポーネント
│   ├── Card.tsx
│   ├── SwipeableCard.tsx
│   └── FeedbackModal.tsx
├── lib/                    # ビジネスロジック
│   ├── types.ts           # 型定義
│   ├── ranges.ts          # レンジデータ
│   ├── cards.ts           # カード関連ロジック
│   └── storage.ts         # データ保存ロジック
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions設定
└── public/                # 静的ファイル
```

## 🎯 学習のコツ

1. **順序立てて学習**
   - まずUTG（最も狭いレンジ）から始める
   - 徐々にCO、BTNと広いレンジに移行

2. **復習を活用**
   - 間違えた問題は必ず復習モードで確認
   - 弱点ハンドを重点的にトレーニング

3. **毎日少しずつ**
   - 連続学習日数を伸ばす
   - 短時間でも毎日プレイすることが効果的

4. **パターンで記憶**
   - ペア、スーテッド、オフスートのカテゴリで整理
   - ポジション別の「追加ハンド」として記憶

## 🔮 今後の拡張予定（Phase 2以降）

- [ ] タイムアタックモード
- [ ] ヒント機能
- [ ] 学習モード（答えを見せてから判断）
- [ ] デイリーチャレンジ
- [ ] ランキング機能
- [ ] レンジチャート表示
- [ ] エクスポート機能（学習データのCSV出力）
- [ ] PWA対応（オフライン利用）
- [ ] 多言語対応（英語/日本語）
- [ ] 3-bet, 4-bet レンジ

## 🤝 貢献

プルリクエストを歓迎します！

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照

## 🙏 謝辞

- プリフロップレンジデータは、一般的なGTO戦略に基づいています
- アニメーションには [Framer Motion](https://www.framer.com/motion/) を使用
- UIデザインは Tailwind CSS で構築

## 📧 お問い合わせ

問題や提案がある場合は、[Issue](https://github.com/your-username/poker-preflop-trainer/issues) を作成してください。

## 🌟 スター歴史

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/poker-preflop-trainer&type=Date)](https://star-history.com/#your-username/poker-preflop-trainer&Date)

---

**Made with ❤️ for Poker Players**

🃏 Happy Learning! 🃏