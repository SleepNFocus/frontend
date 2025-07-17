#!/bin/bash

echo "🔧 Pre-action: Installing CocoaPods dependencies..."

iOS 폴더로 이동 (Podfile이 있는 위치)
cd ios

최신 CocoaPods 설치 시도 (환경에 따라 이미 설치되어 있으면 무시됨)
gem install cocoapods --no-document

pod repo 업데이트 후 install
pod install --repo-update

echo "✅ CocoaPods install finished!"
