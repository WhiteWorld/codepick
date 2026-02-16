---
title: "Ollama + Aider 本地部署完全指南"
description: "零成本、零数据外泄的本地 AI 编程方案。使用 Ollama 运行本地模型，配合 Aider 实现 AI 辅助编码。"
date: "2026-02-16"
tags: ["ollama", "aider", "本地部署", "隐私", "免费"]
---

本指南介绍如何搭建完全本地运行的 AI 编程环境：**Ollama**（本地模型运行时）+ **Aider**（AI 编程助手）。这个方案的优点是：

- **完全免费**：没有 API 费用，一次配置终身使用
- **数据安全**：代码不出本机，适合涉密项目
- **无需代理**：不依赖任何外部服务
- **可离线使用**：模型下载后可在无网络环境运行

## 前置要求

- macOS、Linux 或 Windows（WSL2）
- 至少 8GB RAM（推荐 16GB+）
- 至少 10GB 磁盘空间（用于存储模型）
- 有 GPU 更好，但 CPU 也能跑（慢一些）

---

## 第一步：安装 Ollama

### macOS / Linux

```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Windows

访问 [ollama.ai](https://ollama.ai) 下载安装包，或通过 WSL2 运行 Linux 版本。

### 验证安装

```bash
ollama --version
# 输出类似：ollama version is 0.5.x
```

---

## 第二步：下载编程模型

根据你的硬件条件选择合适的模型：

### 推荐模型

```bash
# 轻量级 · 8GB RAM 可用 · 推荐入门
ollama pull qwen2.5-coder:7b

# 中等配置 · 16GB RAM · 编程能力更强
ollama pull qwen2.5-coder:14b

# 高配 · 32GB+ RAM · 最强本地编程模型
ollama pull qwen2.5-coder:32b

# DeepSeek Coder（备选）
ollama pull deepseek-coder-v2:16b
```

### 下载时间参考

| 模型 | 大小 | 下载时间（100Mbps）|
|------|------|--------------------|
| qwen2.5-coder:7b | ~4.7GB | ~7 分钟 |
| qwen2.5-coder:14b | ~9GB | ~12 分钟 |
| qwen2.5-coder:32b | ~20GB | ~30 分钟 |

### 测试模型

```bash
ollama run qwen2.5-coder:7b
# 输入：写一个 Python 快速排序
# Ctrl+D 退出
```

---

## 第三步：安装 Aider

### 方式一：使用 pip（推荐）

```bash
# 建议使用虚拟环境
python -m venv ~/.aider-env
source ~/.aider-env/bin/activate  # Windows: ~/.aider-env/Scripts/activate

pip install aider-chat
```

### 方式二：使用 pipx（全局安装）

```bash
pip install pipx
pipx install aider-chat
```

### 验证安装

```bash
aider --version
# 输出：aider x.x.x
```

---

## 第四步：配置 Aider 使用 Ollama

Aider 通过 OpenAI 兼容接口连接 Ollama：

```bash
# 方式一：命令行参数
aider --model ollama/qwen2.5-coder:14b \
      --openai-api-base http://localhost:11434/v1 \
      --openai-api-key ollama

# 方式二：设置环境变量（推荐）
export OLLAMA_API_BASE=http://localhost:11434
aider --model ollama/qwen2.5-coder:14b
```

### 创建配置文件（推荐）

在 `~/.aider.conf.yml` 创建全局配置：

```yaml
# ~/.aider.conf.yml
model: ollama/qwen2.5-coder:14b
openai-api-base: http://localhost:11434/v1
openai-api-key: ollama
auto-commits: true
dark-mode: true
```

之后只需运行 `aider` 即可使用上述配置。

---

## 第五步：在项目中使用 Aider

### 基础使用

```bash
# 进入你的项目目录
cd ~/my-project

# 启动 Aider（会自动加载 .aider.conf.yml）
aider

# 或者指定要编辑的文件
aider src/main.py src/utils.py
```

### 常用命令

在 Aider 交互界面中：

```
# 添加文件到上下文
/add src/components/Button.tsx

# 查看已添加的文件
/ls

# 撤销最后一次修改
/undo

# 查看 git diff
/diff

# 退出
/exit
```

### 实际使用示例

```
You: 帮我给 src/api/users.py 添加分页功能，参考 src/api/posts.py 的实现方式

Aider: 我来分析两个文件...
[读取 users.py 和 posts.py]
[生成修改方案]
[显示 diff]

Apply this change? (y/n): y

You: 还需要给 paginate 函数添加单元测试

Aider: 好的，我来在 tests/test_api.py 中添加测试...
```

---

## 性能优化

### 使用 GPU 加速（NVIDIA）

Ollama 自动检测 CUDA，有 NVIDIA GPU 会自动使用：

```bash
# 验证 GPU 是否被使用
ollama run qwen2.5-coder:7b
# 在运行时用 nvidia-smi 查看 GPU 利用率
```

### 使用 GPU 加速（Apple Silicon）

Apple M 系列芯片天然支持，Ollama 会自动使用 Metal 加速：

```bash
# M1/M2/M3/M4 Mac 推荐配置
ollama pull qwen2.5-coder:14b  # 16GB 统一内存可跑 14B
```

### 调整上下文长度

```bash
# 增大上下文窗口（需要更多内存）
ollama run qwen2.5-coder:14b --num-ctx 8192
```

---

## 本地 vs 云端方案对比

| 维度 | Ollama + Aider | Cline + 火山方舟 | Claude Code |
|------|----------------|------------------|-------------|
| 月费用 | 免费 | ¥9.9+ | $20+ |
| 数据安全 | ★★★★★ | ★★★☆☆ | ★★★☆☆ |
| 模型质量 | ★★★☆☆ | ★★★★☆ | ★★★★★ |
| 响应速度 | 依硬件 | 快 | 快 |
| 离线使用 | ✅ | ❌ | ❌ |

---

## 常见问题

### Q：Ollama 服务没有启动

```bash
# 手动启动 Ollama 服务
ollama serve

# 或者检查状态
curl http://localhost:11434/api/tags
```

### Q：模型响应很慢

- CPU 运行是正常的，7B 模型在 CPU 上约 3-10 token/秒
- 考虑使用更小的模型（3B/4B）
- 有 GPU 的话确认驱动和 CUDA 版本兼容

### Q：Aider 说找不到模型

确保 Ollama 服务正在运行，且模型已下载：

```bash
ollama list  # 查看已下载的模型
ollama pull qwen2.5-coder:7b  # 重新下载
```

### Q：能用更强的模型吗？

如果想用更强的模型但不想完全依赖云端，可以考虑：
- **混合方案**：本地用 Ollama 做简单任务，复杂任务用 Aider 连接 DeepSeek API（约 $0.07/百万 token）
- **配置方法**：Aider 支持同时配置多个模型，用 `/model` 命令切换

---

## 进阶配置

### 项目级配置

在项目根目录创建 `.aider.conf.yml`：

```yaml
# .aider.conf.yml（项目级，优先级高于全局配置）
model: ollama/qwen2.5-coder:14b
auto-commits: false  # 项目中手动控制提交
```

### 结合 Git Hooks

```bash
# 在 .git/hooks/pre-commit 中添加
# 让 Aider 在提交前检查代码质量
```

---

你已经完成了本地 AI 编程环境的搭建！这个方案虽然模型能力不及顶级云端服务，但对于日常的代码补全、函数生成、重构等任务已经完全够用，而且完全免费、数据安全。

有问题欢迎在 [GitHub Issues](https://github.com/WhiteWorld/codepick/issues) 讨论。
