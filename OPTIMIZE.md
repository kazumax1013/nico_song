# 動画ファイル最適化ガイド

## ⚠️ 重要：動画ファイルのサイズ

現在の動画ファイル（`images/hero/マイビデオ.mp4`）は約**129MB**です。
これは公開時に以下の問題を引き起こす可能性があります：

- 読み込みが非常に遅い
- モバイルデータ通信量の消費が大きい
- 一部のホスティングサービスの制限に引っかかる可能性

## 🎬 推奨サイズ

- **目標サイズ**: 5-10MB以下
- **解像度**: 1920x1080（Full HD）以下
- **ビットレート**: 2-5Mbps
- **形式**: MP4 (H.264)

## 🛠️ 最適化方法

### 方法1: HandBrake（GUI、推奨）

1. **HandBrakeをダウンロード**
   - https://handbrake.fr/ からダウンロード

2. **動画を開く**
   - 「Source」→「Open File」で `images/hero/マイビデオ.mp4` を選択

3. **設定**
   - Preset: 「Fast 1080p30」を選択
   - Video Codec: H.264 (x264)
   - Quality: RF 23-28（数値が大きいほど圧縮率が高い）
   - Resolution: 1920x1080 または 1280x720

4. **出力**
   - 出力先を指定
   - 「Start Encode」をクリック

### 方法2: FFmpeg（コマンドライン）

```bash
# 基本的な圧縮
ffmpeg -i images/hero/マイビデオ.mp4 \
  -c:v libx264 \
  -preset medium \
  -crf 23 \
  -c:a aac \
  -b:a 128k \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease" \
  images/hero/マイビデオ_optimized.mp4

# より強力な圧縮（ファイルサイズを小さく）
ffmpeg -i images/hero/マイビデオ.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 28 \
  -c:a aac \
  -b:a 96k \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease" \
  images/hero/マイビデオ_optimized.mp4
```

### 方法3: オンライン圧縮ツール

- **CloudConvert**: https://cloudconvert.com/mp4-compressor
- **FreeConvert**: https://www.freeconvert.com/mp4-compressor
- **Clideo**: https://clideo.com/compress-video

## 📝 最適化後の手順

1. 最適化された動画ファイルを `images/hero/` に配置
2. 元のファイルをバックアップ（必要に応じて）
3. 最適化されたファイルを `マイビデオ.mp4` にリネーム
4. ローカルで動作確認
5. デプロイ

## ✅ 確認事項

- [ ] 動画ファイルサイズが10MB以下になっている
- [ ] 画質が許容範囲内である
- [ ] ローカルで正常に再生される
- [ ] モバイルでも正常に再生される

## 💡 その他の最適化のヒント

- **動画の長さ**: 必要最小限の長さにトリミング
- **フレームレート**: 30fps以下に設定（24fpsでも可）
- **音声**: モノラルに変換（ステレオが不要な場合）
- **事前読み込み**: HTMLで `preload="metadata"` を使用（既に設定済み）

