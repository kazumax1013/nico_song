# ダンススクール ニコソング ウェブサイト

大阪・大正・豊中・蛍池のダンススクール「ニコソング」の公式ウェブサイトです。

## ファイル構成

- `index.html` - メインのHTMLファイル
- `images/` - 画像・動画ファイル
  - `logo/` - ロゴ画像
  - `instructor/` - インストラクター画像
  - `hero/` - ヒーローセクションの動画
  - `gallery/` - ギャラリー画像

## デプロイ方法

### Netlify（推奨）

#### 方法1: ドラッグ&ドロップ
1. [Netlify](https://www.netlify.com/)にアカウントを作成
2. ダッシュボードで「Add new site」→「Deploy manually」を選択
3. プロジェクトフォルダ全体をドラッグ&ドロップ
4. デプロイが自動的に開始されます

#### 方法2: GitHub連携
1. GitHubリポジトリにコードをプッシュ
2. Netlifyで「Add new site」→「Import an existing project」を選択
3. GitHubリポジトリを選択
4. ビルド設定は自動検出されます（`netlify.toml`が使用されます）
5. 「Deploy site」をクリック

### Vercel

1. [Vercel](https://vercel.com/)にアカウントを作成
2. 「Add New Project」をクリック
3. GitHubリポジトリをインポート、またはフォルダをドラッグ&ドロップ
4. フレームワークプリセットは「Other」を選択
5. 「Deploy」をクリック
6. `vercel.json`の設定が自動的に適用されます

### GitHub Pages

1. GitHubリポジトリを作成
2. すべてのファイルをプッシュ
3. リポジトリの「Settings」→「Pages」に移動
4. 「Source」で「Deploy from a branch」を選択
5. ブランチを「main」（または「master」）に設定
6. フォルダを「/ (root)」に設定
7. 「Save」をクリック
8. 数分後に `https://[ユーザー名].github.io/[リポジトリ名]` でアクセス可能になります

## ローカル開発

```bash
# ローカルサーバーを起動
python3 -m http.server 8000

# ブラウザで開く
open http://localhost:8000
```

## デプロイ前のチェックリスト

- [ ] すべての画像ファイルが `images/` ディレクトリに配置されている
  - `images/logo/logo.png`
  - `images/hero/マイビデオ.mp4`
  - `images/instructor/3867aa_c178d69f118a4826bf246099679ccdf6~mv2.webp`
- [ ] 動画ファイルのサイズを確認（大きすぎる場合は最適化を検討）
  - ⚠️ 現在の動画ファイルは約129MBです。10MB以下に圧縮することを強く推奨します
  - 動画圧縮ツール: HandBrake, FFmpeg, オンライン圧縮ツール
- [ ] すべてのリンクが正しく動作することを確認
- [ ] モバイル表示を確認
- [ ] コンタクト情報（メールアドレス、電話番号）が正しいことを確認

## 技術スタック

- HTML5
- Tailwind CSS (CDN)
- JavaScript (Vanilla)
- Google Fonts

## ファイル構成

```
.
├── index.html          # メインHTMLファイル
├── netlify.toml        # Netlifyデプロイ設定
├── vercel.json         # Vercelデプロイ設定
├── package.json        # プロジェクト情報
├── .gitignore          # Git除外設定
├── .nojekyll           # GitHub Pages用（Jekyll無効化）
├── README.md           # このファイル
└── images/             # 画像・動画ファイル
    ├── logo/
    │   └── logo.png
    ├── hero/
    │   └── マイビデオ.mp4
    └── instructor/
        └── 3867aa_c178d69f118a4826bf246099679ccdf6~mv2.webp
```

## トラブルシューティング

### 画像が表示されない場合
- 画像ファイルのパスが正しいか確認
- ファイル名に日本語や特殊文字が含まれていないか確認
- 大文字・小文字の区別を確認（特にLinuxサーバー）

### 動画が再生されない場合
- 動画ファイルの形式がMP4であることを確認
- ファイルサイズが大きすぎないか確認（推奨: 10MB以下）
- ブラウザの互換性を確認

### デプロイ後のパフォーマンス
- 画像の最適化を検討（WebP形式への変換など）
- 動画の圧縮を検討
- CDNの利用を検討



