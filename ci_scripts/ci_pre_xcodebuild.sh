#!/bin/bash

echo "🔧 Pre-action: Installing CocoaPods dependencies..."

#iOS 폴더로 이동 (Podfile이 있는 위치)
cd frontend-app/ios

# CocoaPods가 설치되어 있지 않으면 brew, gem 순으로 설치 시도
if ! command -v pod &> /dev/null; then
  echo "CocoaPods가 설치되어 있지 않습니다. brew로 설치 시도..."
  brew install cocoapods || {
    echo "brew로 설치 실패, gem으로 설치 시도..."
    gem install cocoapods --no-document || {
      echo "CocoaPods 설치 실패! 빌드 중단"
      exit 1
    }
  }
else
  echo "CocoaPods가 이미 설치되어 있습니다."
fi

pod --version
pod install --repo-update