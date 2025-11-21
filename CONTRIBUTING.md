# 🤝 貢献ガイド

Poker Preflop Trainerへの貢献を歓迎します！

## 📋 貢献の種類

### バグ報告

バグを見つけた場合：

1. [Issues](https://github.com/your-username/poker-preflop-trainer/issues) で既存のバグ報告を確認
2. 新しいIssueを作成し、以下を含める：
   - バグの説明
   - 再現手順
   - 期待される動作
   - 実際の動作
   - スクリーンショット（可能であれば）
   - ブラウザ/OS情報

### 機能提案

新機能のアイデアがある場合：

1. Issueを作成
2. 機能の詳細を説明
3. ユースケースを提供
4. 可能であればモックアップを添付

### コード貢献

プルリクエストを送る前に：

1. **フォークとクローン**
   ```bash
   git clone https://github.com/your-username/poker-preflop-trainer.git
   cd poker-preflop-trainer
   ```

2. **ブランチを作成**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **開発環境をセットアップ**
   ```bash
   npm install
   npm run dev
   ```

4. **コードスタイルに従う**
   - TypeScriptを使用
   - ESLintルールに従う
   - Prettierでフォーマット

5. **変更をテスト**
   ```bash
   npm run build
   npm run lint
   ```

6. **コミット**
   ```bash
   git add .
   git commit -m "feat: 新機能の説明"
   ```

   コミットメッセージの規則：
   - `feat:` 新機能
   - `fix:` バグ修正
   - `docs:` ドキュメント変更
   - `style:` コードスタイル変更
   - `refactor:` リファクタリング
   - `test:` テスト追加
   - `chore:` その他の変更

7. **プッシュとPR作成**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🎯 開発ガイドライン

### コードスタイル

- **TypeScript**: 型安全性を重視
- **関数コンポーネント**: Reactのfunctional componentsを使用
- **Hooks**: useStateやuseEffectを適切に使用
- **命名規則**:
  - コンポーネント: PascalCase (`SwipeableCard`)
  - 関数: camelCase (`generateHands`)
  - 定数: UPPER_SNAKE_CASE (`TOTAL_QUESTIONS`)

### ファイル構成

```
app/           # ページコンポーネント
components/    # 再利用可能なコンポーネント
lib/           # ビジネスロジック
  types.ts     # 型定義
  ranges.ts    # レンジデータ
  cards.ts     # カードロジック
  storage.ts   # データ保存
```

### コンポーネント作成

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export default function MyComponent({ title, onAction }: MyComponentProps) {
  const [state, setState] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2>{title}</h2>
      <button onClick={onAction}>Click</button>
    </motion.div>
  );
}
```

## 📚 ドキュメント

ドキュメントの改善も歓迎：

- README.mdの明確化
- コメントの追加
- 使用例の追加
- チュートリアルの作成

## 🐛 デバッグ

### 開発ツール

```bash
# 型チェック
npm run type-check

# リント
npm run lint

# ビルド確認
npm run build
```

### ブラウザ開発者ツール

- React Developer Tools
- Console ログ
- Network タブ（API呼び出し）
- LocalStorage の確認

## ✅ プルリクエストチェックリスト

- [ ] コードが正常に動作する
- [ ] 型エラーがない
- [ ] リントエラーがない
- [ ] ビルドが成功する
- [ ] 既存機能が壊れていない
- [ ] READMEを更新（必要な場合）
- [ ] コミットメッセージが明確

## 🎨 デザインガイドライン

### カラーパレット

```css
/* ポーカーテーブルグリーン */
--poker-green: #0D5C3D;
--poker-green-light: #1a7f5a;

/* アクション */
--success: #10b981;
--error: #ef4444;
--warning: #f59e0b;
--info: #3b82f6;
```

### アニメーション

- スムーズな遷移（0.3s）
- ユーザーフィードバックは即座に
- 過度なアニメーションは避ける

## 🚀 今後の開発予定

優先度の高い機能：

1. **タイムアタックモード**
2. **ヒント機能**
3. **レンジチャート表示**
4. **PWA対応**
5. **多言語対応**

これらの機能に興味がある場合は、Issueで議論しましょう！

## 📞 コミュニケーション

- **Issues**: バグ報告や機能提案
- **Discussions**: 一般的な質問や議論
- **Pull Requests**: コード貢献

## 🙏 感謝

すべての貢献者に感謝します！

あなたの貢献が、多くのポーカープレイヤーの学習を助けます。

---

**Happy Contributing! 🎉**