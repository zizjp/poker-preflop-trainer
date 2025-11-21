/**
 * PWAアイコン生成スクリプト
 * Canvas APIを使用してアイコンを生成
 */

const fs = require('fs');
const path = require('path');

// HTMLキャンバスをNode.jsで使用するためのライブラリ（必要な場合）
// npm install canvas

const generateIcon = (size) => {
  // SVGとしてアイコンを生成
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <!-- 背景 -->
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0D5C3D;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a7f5a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size * 0.1}"/>
      
      <!-- カードシンボル -->
      <g transform="translate(${size/2}, ${size/2})">
        <!-- スペード -->
        <text 
          x="0" 
          y="${size * 0.15}" 
          font-size="${size * 0.5}" 
          text-anchor="middle" 
          fill="white"
          font-family="Arial, sans-serif"
        >♠</text>
        
        <!-- テキスト -->
        <text 
          x="0" 
          y="${size * 0.5}" 
          font-size="${size * 0.12}" 
          text-anchor="middle" 
          fill="white"
          font-family="Arial, sans-serif"
          font-weight="bold"
        >POKER</text>
      </g>
      
      <!-- 角の装飾 -->
      <circle cx="${size * 0.15}" cy="${size * 0.15}" r="${size * 0.05}" fill="white" opacity="0.3"/>
      <circle cx="${size * 0.85}" cy="${size * 0.15}" r="${size * 0.05}" fill="white" opacity="0.3"/>
      <circle cx="${size * 0.15}" cy="${size * 0.85}" r="${size * 0.05}" fill="white" opacity="0.3"/>
      <circle cx="${size * 0.85}" cy="${size * 0.85}" r="${size * 0.05}" fill="white" opacity="0.3"/>
    </svg>
  `;

  return svg;
};

// アイコンサイズ
const sizes = [192, 512];

// SVGファイルを生成
sizes.forEach(size => {
  const svg = generateIcon(size);
  const filename = `icon-${size}.svg`;
  const filepath = path.join(__dirname, '../public', filename);
  
  fs.writeFileSync(filepath, svg);
  console.log(`✓ Generated ${filename}`);
});

console.log('\n📱 アイコンSVGファイルが生成されました！');
console.log('\n次のステップ:');
console.log('1. SVGをPNGに変換:');
console.log('   - オンラインツール: https://svgtopng.com/');
console.log('   - またはデザインツールで開いてPNGエクスポート');
console.log('2. public/icon-192.png と public/icon-512.png として保存');
console.log('3. npm run build でビルド');
console.log('4. git push でデプロイ');