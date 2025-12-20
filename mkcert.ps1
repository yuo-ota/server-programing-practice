Write-Host "=== mkcert セットアップ ==="

if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    Write-Error "winget が見つかりません"
    exit 1
}

if (-not (Get-Command mkcert -ErrorAction SilentlyContinue)) {
    Write-Host "mkcert をインストールしています..."
    winget install mkcert --accept-source-agreements --accept-package-agreements
    mkcert -install
    mkcert -CAROOT
}

if (-not (Get-Command openssl -ErrorAction SilentlyContinue)) {
    Write-Host "OpenSSL をインストールしています..."
    winget install --id ShiningLight.OpenSSL.Light -e `
  --accept-source-agreements --accept-package-agreements
}

# mkcert CA install
mkcert -install

# パスワード入力（非表示）
$securePassword = Read-Host "パスワード" -AsSecureString

$plainPassword = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
)

# 証明書生成
mkcert localhost

# keystore 生成
openssl pkcs12 -export `
  -in localhost.pem `
  -inkey localhost-key.pem `
  -out keystore.p12 `
  -name tomcat `
  -passout pass:$plainPassword

# 移動
mv keystore.p12 backend/src/main/resources/keystore.p12
mv localhost.pem frontend/localhost.pem
mv localhost-key.pem frontend/localhost-key.pem

Write-Host "完了しました"