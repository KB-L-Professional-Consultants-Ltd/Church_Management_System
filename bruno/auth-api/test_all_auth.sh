#!/usr/bin/env bash
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ ! -f "$DIR/.env" ]; then
  echo "ERROR: $DIR/.env not found"
  exit 2
fi
set -a
source "$DIR/.env"
set +a

BASE_URL="${baseUrl%/}"
ADMIN_EMAIL="${adminEmail}"
ADMIN_PASSWORD="${adminPassword}"
USER_EMAIL="${userEmail}"
USER_PASSWORD="${userPassword}"

echo "Using baseUrl=$BASE_URL"
echo ""

curl_json() {
  curl -sS "$@" | jq . 2>/dev/null || curl -sS "$@"
}

echo "=========================================="
echo "1) Login admin -> get tokens"
echo "=========================================="
LOGIN=$(curl -sS "$BASE_URL/v1/auth/login" -H "Content-Type: application/json" -d "{\"email\": \"$ADMIN_EMAIL\", \"password\": \"$ADMIN_PASSWORD\"}")
echo "$LOGIN" | jq .
ACCESS_TOKEN=$(echo "$LOGIN" | jq -r '.accessToken // empty')
REFRESH_TOKEN=$(echo "$LOGIN" | jq -r '.refreshToken // empty')
if [ -z "$ACCESS_TOKEN" ]; then
  echo "ERROR: login failed"
  exit 1
fi
echo "✓ Got tokens"
echo ""

echo "=========================================="
echo "2) GET /v1/auth/me"
echo "=========================================="
curl_json -H "Authorization: Bearer $ACCESS_TOKEN" "$BASE_URL/v1/auth/me"
echo ""

echo "=========================================="
echo "3) POST /v1/auth/register (create user)"
echo "=========================================="
curl_json -X POST "$BASE_URL/v1/auth/register" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d "{\"email\": \"$USER_EMAIL\", \"password\": \"$USER_PASSWORD\", \"role\": \"VIEWER\"}"
echo ""

echo "=========================================="
echo "4) POST /v1/auth/refresh (new tokens)"
echo "=========================================="
curl_json -X POST "$BASE_URL/v1/auth/refresh" \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\": \"$REFRESH_TOKEN\"}"
echo ""

echo "=========================================="
echo "5) POST /v1/auth/forgot-password"
echo "=========================================="
curl_json -X POST "$BASE_URL/v1/auth/forgot-password" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$USER_EMAIL\"}"
echo ""

echo "=========================================="
echo "6) POST /v1/auth/logout"
echo "=========================================="
curl_json -X POST "$BASE_URL/v1/auth/logout" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d "{\"refreshToken\": \"$REFRESH_TOKEN\"}"
echo ""

echo "=========================================="
echo "✓ All tests complete!"
echo "=========================================="
