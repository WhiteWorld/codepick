#!/usr/bin/env python3
"""
CodePick 数据监控脚本
通过 GitHub Actions 定期运行，检测工具更新并提醒维护者。
"""

import os
import json
import hashlib
import datetime
from pathlib import Path

try:
    import urllib.request
    import yaml
except ImportError:
    yaml = None

DATA_DIR = Path(__file__).parent.parent / "data"
CACHE_DIR = Path(__file__).parent / ".cache"
CACHE_DIR.mkdir(exist_ok=True)


def check_github_release(repo: str, current_version: str) -> dict | None:
    """检查 GitHub 仓库是否有新版本"""
    url = f"https://api.github.com/repos/{repo}/releases/latest"
    headers = {"Accept": "application/vnd.github.v3+json"}
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"token {token}"

    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())
            latest = data.get("tag_name", "").lstrip("v")
            if latest and latest != current_version.lstrip("v"):
                return {
                    "repo": repo,
                    "current": current_version,
                    "latest": latest,
                    "url": data.get("html_url", ""),
                    "published": data.get("published_at", ""),
                }
    except Exception as e:
        print(f"  ⚠ 检查 {repo} 失败: {e}")
    return None


def check_page_hash(name: str, url: str) -> bool:
    """检查页面内容是否变化（通过 hash）"""
    cache_file = CACHE_DIR / f"{name}.hash"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "CodePick-Monitor/1.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            content = resp.read()
            new_hash = hashlib.md5(content).hexdigest()

        if cache_file.exists():
            old_hash = cache_file.read_text().strip()
            if old_hash != new_hash:
                cache_file.write_text(new_hash)
                return True  # Changed
        else:
            cache_file.write_text(new_hash)
        return False
    except Exception as e:
        print(f"  ⚠ 检查 {name} 页面失败: {e}")
        return False


def check_review_dates() -> list[dict]:
    """检查哪些数据需要评审"""
    overdue = []
    today = datetime.date.today()

    if not yaml:
        print("  ⚠ PyYAML 未安装，跳过评审日期检查")
        return overdue

    for subdir in ["tools", "apis", "plans"]:
        data_path = DATA_DIR / subdir
        if not data_path.exists():
            continue
        for f in data_path.glob("*.yaml"):
            try:
                data = yaml.safe_load(f.read_text())
                meta = data.get("meta", {})
                due = meta.get("next_review_due")
                if due:
                    due_date = datetime.date.fromisoformat(str(due))
                    if due_date <= today:
                        overdue.append({
                            "file": str(f.relative_to(DATA_DIR)),
                            "name": data.get("name", f.stem),
                            "due": str(due),
                            "days_overdue": (today - due_date).days,
                        })
            except Exception as e:
                print(f"  ⚠ 解析 {f} 失败: {e}")

    return overdue


def main():
    print("=" * 60)
    print("  CodePick 数据监控")
    print(f"  运行时间: {datetime.datetime.now().isoformat()}")
    print("=" * 60)

    # 1. 检查 GitHub 发布
    print("\n📦 检查 GitHub 新版本...")
    github_repos = {
        "cline": ("cline/cline", "3.14"),
        "roo-code": ("RooVetGit/Roo-Code", "3.14"),
        "opencode": ("nicepkg/opencode", "0.6"),
        "aider": ("Aider-AI/aider", "0.83"),
        "gemini-cli": ("google-gemini/gemini-cli", "0.1"),
    }

    updates = []
    for name, (repo, ver) in github_repos.items():
        result = check_github_release(repo, ver)
        if result:
            print(f"  🆕 {name}: {result['current']} → {result['latest']}")
            updates.append(result)
        else:
            print(f"  ✅ {name}: 已是最新")

    # 2. 检查定价页面变化
    print("\n💰 检查定价页面变化...")
    pages = {
        "cursor-pricing": "https://www.cursor.com/pricing",
        "copilot-pricing": "https://github.com/features/copilot",
        "windsurf-pricing": "https://windsurf.com/pricing",
        "kiro-pricing": "https://kiro.dev/pricing",
        "trae-cn-pricing": "https://trae.cn",
        "antigravity-pricing": "https://antigravity.dev",
    }
    for name, url in pages.items():
        changed = check_page_hash(name, url)
        if changed:
            print(f"  🔄 {name}: 页面内容已变化！")
        else:
            print(f"  ✅ {name}: 无变化")

    # 3. 检查评审日期
    print("\n📅 检查数据评审日期...")
    overdue = check_review_dates()
    if overdue:
        for item in overdue:
            print(f"  ⏰ {item['name']}: 已过期 {item['days_overdue']} 天 (到期: {item['due']})")
    else:
        print("  ✅ 所有数据均在有效期内")

    # 4. 输出摘要
    print("\n" + "=" * 60)
    total_alerts = len(updates) + len(overdue)
    if total_alerts > 0:
        print(f"  ⚠ 共 {total_alerts} 个待处理项")
        # 在 GitHub Actions 中可设置 output
        if os.environ.get("GITHUB_ACTIONS"):
            with open(os.environ.get("GITHUB_OUTPUT", "/dev/null"), "a") as f:
                f.write(f"alerts={total_alerts}\n")
    else:
        print("  ✅ 一切正常，无需操作")


if __name__ == "__main__":
    main()
