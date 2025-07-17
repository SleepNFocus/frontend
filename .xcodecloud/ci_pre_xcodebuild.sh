#!/bin/bash
set -e

echo "🔧 Pre-action: Installing CocoaPods dependencies..."
echo "현재 작업 디렉토리: $(pwd)"
ls -al

cd frontend-app/ios

echo "CocoaPods 버전:"
pod --version || (echo "CocoaPods가 설치되어 있지 않습니다!"; exit 1)

echo "pod install 실행"
pod install --repo-update

echo "Pods/Target Support Files/Pods-FOCUZ/ 디렉토리 확인"
ls -al Pods/Target\ Support\ Files/Pods-FOCUZ/ || (echo "Pods-FOCUZ 폴더가 없습니다!"; exit 1)

echo "✅ CocoaPods install finished!"
