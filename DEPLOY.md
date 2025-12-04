# 公開手順ガイド

このウェブサイトを公開するための手順です。

## 🚀 最も簡単な方法：Netlify（推奨）

### 方法1: ドラッグ&ドロップ（最も簡単）

1. **Netlifyにアクセス**
   - https://www.netlify.com/ にアクセス
   - 無料アカウントを作成（GitHubアカウントでログイン可能）

2. **デプロイ**
   - ダッシュボードで「Add new site」→「Deploy manually」をクリック
   - このフォルダ全体をドラッグ&ドロップ
   - 数秒でデプロイ完了！

3. **カスタムドメイン設定（オプション）**
   - デプロイ後、サイト設定からカスタムドメインを設定可能
   - 無料で `https://[サイト名].netlify.app` のURLが自動生成されます

### 方法2: GitHub経由

1. **GitHubリポジトリを作成**
   ```bash
   # このフォルダで実行
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/[ユーザー名]/[リポジトリ名].git
   git push -u origin main
   ```

2. **Netlifyで連携**
   - Netlifyで「Add new site」→「Import an existing project」
   - GitHubを選択してリポジトリを選択
   - ビルド設定は自動検出されます
   - 「Deploy site」をクリック

## 🌐 Vercelでの公開

1. **Vercelにアクセス**
   - https://vercel.com/ にアクセス
   - GitHubアカウントでログイン

2. **プロジェクトをインポート**
   - 「Add New Project」をクリック
   - GitHubリポジトリを選択、またはフォルダをドラッグ&ドロップ
   - フレームワークプリセットは「Other」を選択
   - 「Deploy」をクリック

3. **完了**
   - 数分で `https://[プロジェクト名].vercel.app` でアクセス可能

## 📄 GitHub Pagesでの公開

1. **GitHubリポジトリを作成**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/[ユーザー名]/[リポジトリ名].git
   git push -u origin main
   ```

2. **GitHub Pagesを有効化**
   - リポジトリの「Settings」→「Pages」に移動
   - 「Source」で「Deploy from a branch」を選択
   - ブランチ: `main`、フォルダ: `/ (root)` を選択
   - 「Save」をクリック

3. **アクセス**
   - 数分後に `https://[ユーザー名].github.io/[リポジトリ名]` でアクセス可能

## ✅ デプロイ前チェックリスト

- [x] すべての画像ファイルが `images/` ディレクトリに配置されている
- [x] 動画ファイル（`images/hero/マイビデオ.mp4`）が存在する
- [x] ロゴファイル（`images/logo/logo.png`）が存在する
- [x] インストラクター画像が存在する
- [ ] 動画ファイルのサイズを確認（10MB以下推奨）
- [ ] すべてのリンクが正しく動作することを確認
- [ ] モバイル表示を確認
- [ ] コンタクト情報（メール、電話番号）が正しいことを確認

## 🔧 トラブルシューティング

### 画像が表示されない
- ファイルパスが正しいか確認（相対パスを使用）
- ファイル名に特殊文字が含まれていないか確認
- 大文字・小文字を確認

### 動画が再生されない
- MP4形式であることを確認
- ファイルサイズが大きすぎないか確認（10MB以下推奨）
- ブラウザの互換性を確認

### デプロイ後のパフォーマンス改善
- 画像をWebP形式に変換
- 動画を圧縮
- CDNの利用

## 📞 サポート

問題が発生した場合は、各プラットフォームのドキュメントを参照してください：
- [Netlify ドキュメント](https://docs.netlify.com/)
- [Vercel ドキュメント](https://vercel.com/docs)
- [GitHub Pages ドキュメント](https://docs.github.com/ja/pages)

