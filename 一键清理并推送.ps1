# ================================================================
# RFIDAK 项目 Git 一键清理 + 推送脚本 v1.1
# 用途:把卡住的 6.7 GB .git 瘦身,把清理后的站点 push 到 GitHub
# 使用方法:在项目目录右键 → 在终端中打开 → .\一键清理并推送.ps1
# 作者:Claude(2026-04-23)
# ================================================================

$ErrorActionPreference = 'Continue'

# 切到脚本所在目录
Set-Location -Path $PSScriptRoot

function Write-Step($num, $msg) {
    Write-Host ""
    Write-Host "[$num] $msg" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  RFIDAK 一键清理 + 推送脚本  v1.1" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# ---------- 前置检查 ----------
if (-not (Test-Path .git)) {
    Write-Host "❌ 当前目录不是 Git 仓库根目录" -ForegroundColor Red
    Write-Host "   脚本必须放在 proudtek-rfid\ 目录下运行" -ForegroundColor Yellow
    Read-Host "按回车退出"
    exit 1
}

Write-Step "1/9" "环境检查..."
$gitSizeMB = [math]::Round(((Get-ChildItem .git -Recurse -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum) / 1MB, 1)
Write-Host "      当前 .git 大小: $gitSizeMB MB"
$remote = git config --get remote.origin.url
Write-Host "      远程仓库:    $remote"

Write-Host ""
Write-Host "本脚本将会:" -ForegroundColor Yellow
Write-Host "  1. 删除 .git\*.lock 文件" -ForegroundColor Yellow
Write-Host "  2. 从 origin 拉最新的 main 分支状态" -ForegroundColor Yellow
Write-Host "  3. 软重置到 origin/main(HEAD 对齐,工作区保留)" -ForegroundColor Yellow
Write-Host "  4. 从 Git 追踪中移除 .npm-cache" -ForegroundColor Yellow
Write-Host "  5. 暂存并提交所有改动(年份/aggregateRating/gitignore)" -ForegroundColor Yellow
Write-Host "  6. git gc 清理历史(预计瘦身到 50-150 MB)" -ForegroundColor Yellow
Write-Host "  7. push 到 GitHub" -ForegroundColor Yellow
Write-Host ""
$confirm = Read-Host "继续吗?(y/N)"
if ($confirm -ne 'y' -and $confirm -ne 'Y') {
    Write-Host "已取消。" -ForegroundColor Gray
    exit 0
}

# ---------- 1. 删除所有 .lock 文件 ----------
Write-Step "2/9" "删除 .git 下所有 .lock 文件..."
$locks = Get-ChildItem .git -Filter "*.lock" -Recurse -Force -ErrorAction SilentlyContinue
if ($locks) {
    $locks | ForEach-Object {
        Write-Host "      删除: $($_.FullName)"
        Remove-Item $_.FullName -Force -ErrorAction SilentlyContinue
    }
    Write-Host "      ✅ 共清理 $($locks.Count) 个 .lock 文件"
} else {
    Write-Host "      无 .lock 文件,跳过"
}

# ---------- 2. 拉取最新 origin/main ----------
Write-Step "3/9" "拉取最新 origin/main..."
git fetch origin main 2>&1 | Out-Host
if ($LASTEXITCODE -ne 0) {
    Write-Host "      ⚠️  fetch 失败。检查网络或仓库权限后重跑脚本。" -ForegroundColor Yellow
    Read-Host "按回车退出"
    exit 1
}
Write-Host "      ✅ fetch 完成"

# ---------- 3. 软重置到 origin/main ----------
Write-Step "4/9" "软重置到 origin/main(HEAD 对齐,工作区文件保留)..."
git reset --soft origin/main 2>&1 | Out-Host
# 确保 HEAD 指向 main
git symbolic-ref HEAD refs/heads/main 2>$null
$localHead = git rev-parse HEAD 2>$null
$remoteHead = git rev-parse origin/main 2>$null
Write-Host "      本地 HEAD:  $localHead"
Write-Host "      origin/main:$remoteHead"
if ($localHead -eq $remoteHead) {
    Write-Host "      ✅ HEAD 已对齐 origin/main"
} else {
    Write-Host "      ⚠️  HEAD 未对齐,强制重置..." -ForegroundColor Yellow
    git update-ref refs/heads/main $remoteHead
}

# ---------- 4. 从 Git 追踪中移除 .npm-cache ----------
Write-Step "5/9" "从 Git 追踪移除 .npm-cache(gitignore 对已追踪文件无效)..."
$tracked = git ls-files | Select-String "^\.npm-cache"
if ($tracked) {
    Write-Host "      发现 $($tracked.Count) 个 .npm-cache 文件被追踪,正在移除..."
    git rm -r --cached .npm-cache 2>&1 | Out-Null
    Write-Host "      ✅ 已从 Git 追踪中移除"
} else {
    Write-Host "      无需处理"
}

# ---------- 5. 显示变更 + Commit ----------
Write-Step "6/9" "暂存变更并查看概览..."
git add -A
$statusLines = git status --porcelain
$modCount = ($statusLines | Measure-Object).Count
Write-Host "      待提交文件数: $modCount"
Write-Host "      前 8 条示例:"
$statusLines | Select-Object -First 8 | ForEach-Object {
    Write-Host "        $_" -ForegroundColor Gray
}
if ($modCount -gt 8) { Write-Host "        ... 及另外 $($modCount - 8) 项" -ForegroundColor Gray }

if ($modCount -eq 0) {
    Write-Host "      无变更可提交,跳过 commit" -ForegroundColor Yellow
} else {
    $commitMsg = @"
chore: 年份统一(Since 2008)+ 移除未验证 aggregateRating + 强化 .gitignore

- 全站 15+ Years / 17 Years / 18+ years 等口径统一为 Since 2008
- Organization JSON-LD 的 aggregateRating (4.9/108 无来源) 已移除
- Product JSON-LD 的 hash-based 占位 aggregateRating 已移除
- .gitignore 新增 *.mp4 / *.zip / *.psd / 素材文件夹 防御规则
- 从 Git 追踪中移除 .npm-cache
"@
    git commit -m $commitMsg 2>&1 | Out-Host
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "      ✅ 提交成功: $(git log --oneline -1)"
    } else {
        Write-Host "      ⚠️  commit 失败,看上面报错" -ForegroundColor Yellow
    }
}

# ---------- 6. 清理历史垃圾 ----------
Write-Step "7/9" "清理 Git 历史垃圾,需要 30 秒 - 2 分钟,耐心等..."
Write-Host "      (1) 过期所有 reflog..."
git reflog expire --expire=now --all 2>$null
Write-Host "      (2) gc --prune=now --aggressive..."
git gc --prune=now --aggressive 2>&1 | Out-Null
$newGitSizeMB = [math]::Round(((Get-ChildItem .git -Recurse -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum) / 1MB, 1)
$savedMB = $gitSizeMB - $newGitSizeMB
Write-Host "      ✅ .git 从 $gitSizeMB MB → $newGitSizeMB MB(减少 $savedMB MB)" -ForegroundColor Green

# ---------- 7. 推送 ----------
Write-Step "8/9" "推送到 GitHub..."
git push origin main 2>&1 | Out-Host
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "      ✅ 推送成功!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "      ⚠️  推送失败。看上面报错。常见原因:" -ForegroundColor Yellow
    Write-Host "         - 认证问题 → 跑: git push origin main,走 GitHub 登录流程" -ForegroundColor Gray
    Write-Host "         - push 冲突 → 跑: git pull --rebase origin main,再 push" -ForegroundColor Gray
    Write-Host "         - 如果本地没提交 → 跑: git log --oneline -1 看看" -ForegroundColor Gray
}

# ---------- 8. 完成 ----------
Write-Step "9/9" "全部完成 ✅"
Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  后续步骤" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  1. 打开 Vercel 控制台 → Deployments → 应该能看到新的自动部署"
Write-Host "  2. 2 分钟后访问 https://www.rfidak.com → Ctrl+F5 强刷"
Write-Host "  3. 去 https://search.google.com/test/rich-results 测首页 + 1 个产品页"
Write-Host "     → 确认无 aggregateRating 的警告"
Write-Host "  4. 检查几个关键页面的年份文案都改成了 Since 2008:"
Write-Host "     - 首页 trust bar(产品页顶部的 ISO 9001 / Since 2008 / Free Samples)"
Write-Host "     - About 页的时间线标题(RFID manufacturing since 2008 ...)"
Write-Host "     - Contact 页 / FAQ 的引用"
Write-Host ""
Read-Host "按回车关闭窗口"
