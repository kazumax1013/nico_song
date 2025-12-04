#!/bin/bash
# Gitリポジトリの初期セットアップスクリプト

echo "🚀 Gitリポジトリをセットアップします..."

# ファイルを追加
git add .

# 初回コミット
git commit -m "Initial commit: ダンススクール ニコソング ウェブサイト"

echo "✅ コミット完了！"
echo ""
echo "📝 次のステップ："
echo "1. GitHubで新しいリポジトリを作成"
echo "2. 以下のコマンドを実行："
echo "   git remote add origin https://github.com/[ユーザー名]/[リポジトリ名].git"
echo "   git push -u origin main"
