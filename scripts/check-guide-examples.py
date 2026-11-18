#!/usr/bin/env python3
"""Offline example checks; needs jsonschema==4.25.1. No HTTP/model/CLI enforcement tests."""
import json
import re
import shlex
import subprocess
import tempfile
import unittest
from pathlib import Path

from jsonschema import Draft202012Validator

ROOT = Path(__file__).resolve().parents[1]
SCHEMA = json.loads((ROOT / 'docs/research/fixtures/opencode-permissions-schema-2026-11-18.json').read_text())
Draft202012Validator.check_schema(SCHEMA)
VALIDATOR = Draft202012Validator(SCHEMA)


def article(locale, slug):
    return (ROOT / 'src/content' / locale / f'{slug}.md').read_text()


def blocks(text, language):
    return re.findall(rf'^```{language}\n(.*?)^```', text, re.M | re.S)


class GuideExamples(unittest.TestCase):
    def test_all_opencode_configurations_against_published_schema_extract(self):
        for locale in ('guides', 'guides-en'):
            examples = blocks(article(locale, 'opencode-2-permission-rules'), 'json')
            self.assertEqual(len(examples), 3)
            for example in examples:
                VALIDATOR.validate(json.loads(example))

    def test_invalid_policy_ask_is_rejected_offline(self):
        wrong = {'policies': [{'action': 'tool.use', 'resource': 'shell:*', 'effect': 'ask'}]}
        self.assertFalse(VALIDATOR.is_valid(wrong))
        wrong['policies'][0]['effect'] = 'deny'
        self.assertTrue(VALIDATOR.is_valid(wrong))

    def test_documented_scanner_shape_conflict_is_rejected_offline(self):
        # Shape observed on the public Permissions page, not a runtime test.
        wrong = {'policies': [{'permissions': [
            {'action': 'shell', 'resource': 'git status *', 'effect': 'allow'}]}]}
        self.assertFalse(VALIDATOR.is_valid(wrong))

    def test_deepseek_request_fixtures(self):
        for locale in ('guides', 'guides-en'):
            examples = blocks(article(locale, 'deepseek-pdf-flowchart-parsing'), 'json')
            self.assertEqual(len(examples), 1)
            request = json.loads(examples[0])
            self.assertEqual(request['model'], 'deepseek-flash')
            message, = request['messages']
            self.assertEqual(message['role'], 'user')
            document, prompt = message['content']
            self.assertEqual(document, {'type': 'file', 'file_id': 'file-api-REPLACE_WITH_RETURNED_ID'})
            self.assertEqual(prompt['type'], 'text')
            self.assertGreater(len(prompt['text']), 30)
            # This is a contract fixture checked against cited docs, not a vendor schema.
            self.assertNotIn('status', request)

    def test_curl_syntax_and_arguments_with_a_fake_curl_only(self):
        for locale in ('guides', 'guides-en'):
            snippets = blocks(article(locale, 'deepseek-pdf-flowchart-parsing'), 'bash')
            self.assertEqual(len(snippets), 2)
            with tempfile.TemporaryDirectory(prefix='codepick-curl-fixture-') as tmp:
                fake = Path(tmp) / 'curl'
                fake.write_text('#!/usr/bin/python3\nimport json,sys\nprint(json.dumps(sys.argv[1:]))\n')
                fake.chmod(0o700)
                env = {'PATH': f'{tmp}:/usr/bin:/bin', 'HOME': tmp,
                       'DEEPSEEK_API_KEY': 'OFFLINE-NOT-A-SECRET'}
                calls = []
                for snippet in snippets:
                    subprocess.run(['bash', '-n'], input=snippet, text=True, check=True, env=env)
                    # PATH resolves curl to our stub: no HTTP, no file upload, no real key.
                    result = subprocess.run(['bash', '-c', snippet], cwd=tmp, env=env,
                                            text=True, capture_output=True, check=True)
                    calls.append(json.loads(result.stdout))
                upload, chat = calls
                self.assertIn('Authorization: Bearer OFFLINE-NOT-A-SECRET', upload)
                purpose = upload.index('purpose=rich_layout_recognition')
                file = upload.index('file=@requirements-demo.pdf')
                self.assertLess(purpose, file)
                self.assertIn('expires_after[anchor]=created_at', upload)
                self.assertIn('expires_after[seconds]=86400', upload)
                self.assertEqual(upload[upload.index('--max-time') + 1], '300')
                self.assertIn('--fail-with-body', upload)
                self.assertIn('https://api.deepseek.com/files', upload)
                self.assertEqual(chat[chat.index('--data-binary') + 1], '@request.json')
                self.assertIn('https://api.deepseek.com/chat/completions', chat)

    def test_exact_git_arguments_in_an_isolated_synthetic_repository(self):
        config = json.loads(blocks(article('guides', 'opencode-2-permission-rules'), 'json')[0])
        commands = [r['resource'] for r in config['permissions']
                    if r['action'] == 'shell' and r['effect'] == 'allow']
        self.assertEqual(commands, ['git status --short',
                                   'git --no-pager diff --no-ext-diff --no-textconv'])
        with tempfile.TemporaryDirectory(prefix='codepick-git-fixture-') as tmp:
            env = {'PATH': '/usr/bin:/bin', 'HOME': tmp,
                   'GIT_CONFIG_NOSYSTEM': '1', 'GIT_CONFIG_GLOBAL': '/dev/null'}
            def run(args):
                return subprocess.run(args, cwd=tmp, env=env, text=True,
                                      capture_output=True, check=True).stdout
            run(['git', 'init', '-q', '--initial-branch=main'])
            readme = Path(tmp) / 'README.md'
            readme.write_text('synthetic before\n')
            run(['git', 'add', 'README.md'])
            readme.write_text('synthetic after\n')
            status, diff = [run(shlex.split(command)) for command in commands]
            self.assertIn('README.md', status)
            self.assertIn('-synthetic before', diff)
            self.assertIn('+synthetic after', diff)
            # No remote, commit, push, OpenCode binary or provider invocation.


if __name__ == '__main__':
    unittest.main(verbosity=2)
