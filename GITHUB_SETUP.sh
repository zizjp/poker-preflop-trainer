#!/bin/bash

# GitHub Pages デプロイ自動化スクリプト
# 使い方: ./GITHUB_SETUP.sh your-github-username

set -e

# カラー定義
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🃏 Poker Preflop Trainer - GitHub Pages デプロイ${NC}"
echo ""

# GitHub ユーザー名の確認
if [ -z "$1" ]; then
    echo -e "${YELLOW}⚠️  GitHubユーザー名を引数として指定してください${NC}"
    echo "使い方: ./GITHUB_SETUP.sh your-github-username"
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME="poker-preflop-trainer"
REPO_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo -e "${GREEN}✓${NC} GitHubユーザー名: ${GITHUB_USERNAME}"
echo -e "${GREEN}✓${NC} リポジトリ名: ${REPO_NAME}"
echo ""

# 確認
read -p "このリポジトリにデプロイしますか？ (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}❌ キャンセルされました${NC}"
    exit 1
fi

# Gitリポジトリの初期化
echo -e "${BLUE}📦 Gitリポジトリを初期化中...${NC}"
if [ ! -d .git ]; then
    git init
    echo -e "${GREEN}✓${NC} リポジトリを初期化しました"
else
    echo -e "${YELLOW}⚠️  既存のGitリポジトリが見つかりました${NC}"
fi

# .gitignoreの確認
if [ ! -f .gitignore ]; then
    echo -e "${RED}❌ .gitignoreが見つかりません${NC}"
    exit 1
fi

# ファイルをステージング
echo -e "${BLUE}📝 ファイルをステージング中...${NC}"
git add .

# コミット
echo -e "${BLUE}💾 コミット中...${NC}"
git commit -m "Initial commit: Poker Preflop Trainer" || echo -e "${YELLOW}⚠️  コミットする変更がありません${NC}"

# リモートリポジトリの設定
echo -e "${BLUE}🔗 リモートリポジトリを設定中...${NC}"
if git remote get-url origin > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  既存のリモートリポジトリが見つかりました${NC}"
    git remote set-url origin $REPO_URL
else
    git remote add origin $REPO_URL
fi
echo -e "${GREEN}✓${NC} リモートリポジトリ: ${REPO_URL}"

# メインブランチの設定
echo -e "${BLUE}🌿 メインブランチを設定中...${NC}"
git branch -M main

# プッシュの準備完了
echo ""
echo -e "${GREEN}✅ セットアップ完了！${NC}"
echo ""
echo -e "${BLUE}次のステップ:${NC}"
echo ""
echo -e "${YELLOW}1.${NC} GitHubで新しいリポジトリを作成してください:"
echo -e "   ${BLUE}https://github.com/new${NC}"
echo -e "   リポジトリ名: ${GREEN}${REPO_NAME}${NC}"
echo -e "   Public リポジトリにしてください（GitHub Pages無料利用のため）"
echo ""
echo -e "${YELLOW}2.${NC} 以下のコマンドでコードをプッシュ:"
echo -e "   ${GREEN}git push -u origin main${NC}"
echo ""
echo -e "${YELLOW}3.${NC} GitHubリポジトリの Settings → Pages で:"
echo -e "   Source を ${GREEN}GitHub Actions${NC} に設定"
echo ""
echo -e "${YELLOW}4.${NC} デプロイ完了後、以下のURLでアクセス:"
echo -e "   ${BLUE}https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/${NC}"
echo ""
echo -e "${GREEN}🎉 Happy Coding!${NC}"