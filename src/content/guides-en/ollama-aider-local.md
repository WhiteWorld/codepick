---
title: "Ollama + Aider Local Deployment Complete Guide"
description: "A zero-cost, zero-data-leak local AI coding setup. Run local models with Ollama and pair them with Aider for AI-assisted coding — completely free, offline-capable, and privacy-first."
date: "2026-02-16"
tags: ["ollama", "aider", "local-deployment", "privacy", "free"]
draft: false
---

This guide covers how to set up a fully local AI coding environment using **Ollama** (local model runtime) and **Aider** (AI coding assistant). The advantages of this approach are:

- **Completely free**: No API costs — configure once, use forever
- **Data security**: Your code never leaves your machine, ideal for sensitive projects
- **No VPN required**: Does not depend on any external services
- **Offline capable**: Once models are downloaded, you can work without an internet connection

## Prerequisites

- macOS, Linux, or Windows (WSL2)
- At least 8GB RAM (16GB+ recommended)
- At least 10GB of disk space (for storing models)
- A GPU helps but is not required — CPU works too (just slower)

---

## Step 1: Install Ollama

### macOS / Linux

```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Windows

Visit [ollama.ai](https://ollama.ai) to download the installer, or run the Linux version through WSL2.

### Verify Installation

```bash
ollama --version
# Output should be something like: ollama version is 0.5.x
```

---

## Step 2: Download a Coding Model

Choose a model that matches your hardware:

### Recommended Models

```bash
# Lightweight · 8GB RAM sufficient · Recommended for beginners
ollama pull qwen2.5-coder:7b

# Mid-range · 16GB RAM · Stronger coding capabilities
ollama pull qwen2.5-coder:14b

# High-end · 32GB+ RAM · Best local coding model
ollama pull qwen2.5-coder:32b

# DeepSeek Coder (alternative)
ollama pull deepseek-coder-v2:16b
```

### Download Time Estimates

| Model | Size | Download Time (100 Mbps) |
|-------|------|--------------------------|
| qwen2.5-coder:7b | ~4.7GB | ~7 minutes |
| qwen2.5-coder:14b | ~9GB | ~12 minutes |
| qwen2.5-coder:32b | ~20GB | ~30 minutes |

### Test the Model

```bash
ollama run qwen2.5-coder:7b
# Type: Write a Python quicksort function
# Press Ctrl+D to exit
```

---

## Step 3: Install Aider

### Option 1: Using pip (Recommended)

```bash
# Using a virtual environment is recommended
python -m venv ~/.aider-env
source ~/.aider-env/bin/activate  # Windows: ~/.aider-env/Scripts/activate

pip install aider-chat
```

### Option 2: Using pipx (Global Install)

```bash
pip install pipx
pipx install aider-chat
```

### Verify Installation

```bash
aider --version
# Output: aider x.x.x
```

---

## Step 4: Configure Aider to Use Ollama

Aider connects to Ollama through its OpenAI-compatible interface:

```bash
# Option 1: Command-line arguments
aider --model ollama/qwen2.5-coder:14b \
      --openai-api-base http://localhost:11434/v1 \
      --openai-api-key ollama

# Option 2: Environment variables (recommended)
export OLLAMA_API_BASE=http://localhost:11434
aider --model ollama/qwen2.5-coder:14b
```

### Create a Configuration File (Recommended)

Create a global config at `~/.aider.conf.yml`:

```yaml
# ~/.aider.conf.yml
model: ollama/qwen2.5-coder:14b
openai-api-base: http://localhost:11434/v1
openai-api-key: ollama
auto-commits: true
dark-mode: true
```

After this, simply running `aider` will use the configuration above.

---

## Step 5: Use Aider in Your Projects

### Basic Usage

```bash
# Navigate to your project directory
cd ~/my-project

# Start Aider (automatically loads .aider.conf.yml)
aider

# Or specify files to edit
aider src/main.py src/utils.py
```

### Common Commands

Within the Aider interactive interface:

```
# Add a file to the context
/add src/components/Button.tsx

# List files currently in context
/ls

# Undo the last change
/undo

# View the git diff
/diff

# Exit Aider
/exit
```

### Practical Usage Example

```
You: Add pagination to src/api/users.py, following the implementation in src/api/posts.py

Aider: Let me analyze both files...
[Reads users.py and posts.py]
[Generates modification plan]
[Shows diff]

Apply this change? (y/n): y

You: Also add unit tests for the paginate function

Aider: Sure, I'll add tests in tests/test_api.py...
```

---

## Performance Optimization

### GPU Acceleration (NVIDIA)

Ollama automatically detects CUDA. If you have an NVIDIA GPU, it will be used automatically:

```bash
# Verify GPU is being used
ollama run qwen2.5-coder:7b
# While running, use nvidia-smi to check GPU utilization
```

### GPU Acceleration (Apple Silicon)

Apple M-series chips have native support — Ollama automatically uses Metal acceleration:

```bash
# Recommended setup for M1/M2/M3/M4 Macs
ollama pull qwen2.5-coder:14b  # 16GB unified memory can run 14B
```

### Adjust Context Length

```bash
# Increase the context window (requires more memory)
ollama run qwen2.5-coder:14b --num-ctx 8192
```

---

## Local vs. Cloud Solutions Comparison

| Dimension | Ollama + Aider | Cline + Volcengine Ark | Claude Code |
|-----------|----------------|------------------------|-------------|
| Monthly cost | Free | 9.9+ CNY | $20+ |
| Data security | ★★★★★ | ★★★☆☆ | ★★★☆☆ |
| Model quality | ★★★☆☆ | ★★★★☆ | ★★★★★ |
| Response speed | Hardware-dependent | Fast | Fast |
| Offline use | Yes | No | No |

---

## FAQ

### Q: Ollama service isn't starting

```bash
# Manually start the Ollama service
ollama serve

# Or check the service status
curl http://localhost:11434/api/tags
```

### Q: Model responses are very slow

- Running on CPU is expected to be slow — the 7B model generates roughly 3–10 tokens/second on CPU
- Consider using a smaller model (3B/4B)
- If you have a GPU, verify that your drivers and CUDA version are compatible

### Q: Aider says it can't find the model

Make sure the Ollama service is running and the model has been downloaded:

```bash
ollama list  # View downloaded models
ollama pull qwen2.5-coder:7b  # Re-download if needed
```

### Q: Can I use a more powerful model?

If you want stronger models without fully relying on the cloud, consider:
- **Hybrid approach**: Use Ollama locally for simple tasks, and connect Aider to the DeepSeek API for complex tasks (~$0.07 per million tokens)
- **Configuration**: Aider supports configuring multiple models simultaneously — use the `/model` command to switch between them

---

## Advanced Configuration

### Project-Level Configuration

Create `.aider.conf.yml` in your project root:

```yaml
# .aider.conf.yml (project-level, takes priority over global config)
model: ollama/qwen2.5-coder:14b
auto-commits: false  # Manually control commits in this project
```

### Integration with Git Hooks

```bash
# Add to .git/hooks/pre-commit
# Have Aider check code quality before each commit
```

---

You've finished setting up your local AI coding environment! While the model capabilities don't match top-tier cloud services, this setup is more than sufficient for everyday tasks like code completion, function generation, and refactoring — and it's completely free with full data privacy.

If you have any questions, feel free to discuss on [GitHub Issues](https://github.com/WhiteWorld/codepick/issues).
