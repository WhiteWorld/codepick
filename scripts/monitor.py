#!/usr/bin/env python3
"""
CodePick 数据监控脚本
通过 GitHub Actions 定期运行，检测工具更新并提醒维护者。
数据新鲜度检查由 check-freshness.mjs 负责，本脚本只做：
  1. GitHub 新版本检测
  2. 定价页面 hash 变化检测
"""

import os
import re
import json
import hashlib
import datetime
import urllib.request
from pathlib import Path

CACHE_DIR = Path(__file__).parent / ".cache"
CACHE_DIR.mkdir(exist_ok=True)

TOOLS_YAML_DIR = Path(__file__).parent.parent / "data" / "tools"


def read_current_version(tool_id: str) -> "str | None":
    """从 data/tools/<id>.yaml 读取 current_version，作为监控比对的唯一基线。"""
    yaml_path = TOOLS_YAML_DIR / f"{tool_id}.yaml"
    if not yaml_path.exists():
        return None
    match = re.search(
        r"^current_version:\s*['\"]?([^'\"\s#]+)",
        yaml_path.read_text(encoding="utf-8"),
        re.MULTILINE,
    )
    return match.group(1) if match else None


def check_github_release(repo: str, current_version: str, tag_pattern: str = r"^v\d") -> "dict | None":
    """检查 GitHub 仓库是否有新版本。

    跳过 prerelease 与 tag 形态不符的条目（如 cline 的 desktop-*/sdk/*/cli-*
    或各仓库的 preview/nightly/beta tag），只比较与我们追踪口径一致的稳定版。
    """
    url = f"https://api.github.com/repos/{repo}/releases?per_page=30"
    headers = {"Accept": "application/vnd.github.v3+json"}
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"token {token}"

    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            releases = json.loads(resp.read())
        latest = None
        for rel in releases:
            tag = rel.get("tag_name", "")
            if rel.get("prerelease"):
                continue
            if not re.match(tag_pattern, tag):
                continue
            if re.search(r"preview|nightly|beta|alpha|rc\b|\.dev", tag, re.IGNORECASE):
                continue
            latest = tag.lstrip("v")
            break
        if latest and latest != (current_version or "").lstrip("v"):
            return {
                "repo": repo,
                "current": current_version,
                "latest": latest,
                "url": f"https://github.com/{repo}/releases",
                "published": "",
            }
    except Exception as e:
        print(f"  ⚠ 检查 {repo} 失败: {e}")
    return None


def check_pypi_version(package: str, current_version: str) -> "dict | None":
    """检查 PyPI 包是否有新版本（适用于以 PyPI 为主要发布渠道的工具，如 aider）。"""
    url = f"https://pypi.org/pypi/{package}/json"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "CodePick-Monitor/1.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())
        latest = data.get("info", {}).get("version", "")
        if latest and latest != (current_version or "").lstrip("v"):
            return {
                "repo": f"pypi:{package}",
                "current": current_version,
                "latest": latest,
                "url": f"https://pypi.org/project/{package}/",
                "published": "",
            }
    except Exception as e:
        print(f"  ⚠ 检查 PyPI {package} 失败: {e}")
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


def main():
    print("=" * 60)
    print("  CodePick 数据监控")
    print(f"  运行时间: {datetime.datetime.now().isoformat()}")
    print("=" * 60)

    # 1. 检查 GitHub 新版本（当前版本从 data/tools/*.yaml 读取，避免硬编码漂移）
    print("\n📦 检查 GitHub 新版本...")
    github_repos = {
        "cline": ("cline/cline", r"^v\d"),
        "roo-code": ("RooCodeInc/Roo-Code", r"^v\d"),
        "opencode": ("anomalyco/opencode", r"^v\d"),
        "gemini-cli": ("google-gemini/gemini-cli", r"^v\d"),
    }
    pypi_packages = {
        # aider 的 GitHub Releases 落后于 PyPI（0.86.1+ 仅发 PyPI/源码 tag），以 PyPI 为准
        "aider": "aider-chat",
    }

    updates = []
    for name, package in pypi_packages.items():
        current_version = read_current_version(name)
        if not current_version:
            print(f"  ⚠ {name}: 无法从 data/tools/{name}.yaml 读取 current_version，跳过")
            continue
        result = check_pypi_version(package, current_version)
        if result:
            print(f"  🆕 {name}: {result['current']} -> {result['latest']} (PyPI)")
            updates.append(result)
        else:
            print(f"  ✅ {name}: 已是最新 (PyPI)")
    for name, (repo, tag_pattern) in github_repos.items():
        current_version = read_current_version(name)
        if not current_version:
            print(f"  ⚠ {name}: 无法从 data/tools/{name}.yaml 读取 current_version，跳过")
            continue
        result = check_github_release(repo, current_version, tag_pattern)
        if result:
            print(f"  🆕 {name}: {result['current']} → {result['latest']}")
            updates.append(result)
        else:
            print(f"  ✅ {name}: 已是最新")

    # 2. 检查定价页面变化
    print("\n💰 检查定价页面变化...")
    pages = {
        # 旧 URL 308 重定向，urllib 不跟随 308：cursor -> /en/pricing；windsurf -> devin.ai（Cognition 收购后定价并入 Devin）
        "cursor-pricing": "https://cursor.com/en/pricing",
        "copilot-pricing": "https://github.com/features/copilot",
        "windsurf-pricing": "https://devin.ai/pricing",
        "kiro-pricing": "https://kiro.dev/pricing",
        "trae-cn-pricing": "https://trae.cn",
        "antigravity-pricing": "https://antigravity.dev",
    }
    page_changes = []
    for name, url in pages.items():
        changed = check_page_hash(name, url)
        if changed:
            print(f"  🔄 {name}: 页面内容已变化！")
            page_changes.append(name)
        else:
            print(f"  ✅ {name}: 无变化")

    # 3. 输出摘要
    print("\n" + "=" * 60)
    total_alerts = len(updates) + len(page_changes)
    if total_alerts > 0:
        print(f"  ⚠ 共 {total_alerts} 个待处理项")
        if os.environ.get("GITHUB_ACTIONS"):
            with open(os.environ.get("GITHUB_OUTPUT", "/dev/null"), "a") as f:
                f.write(f"alerts={total_alerts}\n")
    else:
        print("  ✅ 一切正常，无需操作")


if __name__ == "__main__":
    main()
