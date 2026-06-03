#!/usr/bin/env python3
"""
GradNiche University Research Agent
Automates the crawling, extraction, and generation of university JSON files conforming to schema.
Uses the new Google GenAI SDK (google-genai).
"""

import os
import sys
import json
import argparse
from google import genai
from google.genai import types

def load_schema(schema_path: str) -> dict:
    """Loads the university JSON Schema."""
    with open(schema_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def load_prompt_template(prompt_path: str) -> str:
    """Loads the research system prompt template."""
    with open(prompt_path, 'r', encoding='utf-8') as f:
        return f.read()

def run_research(university_name: str, schema_path: str, prompt_path: str, output_dir: str):
    """Executes the AI research loop using Gemini 2.5 Flash."""
    print(f"[*] Starting research for: {university_name}")
    
    # 1. Check API Key
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("API_KEY")
    if not api_key:
        print("[!] Error: GEMINI_API_KEY environment variable is not set.", file=sys.stderr)
        sys.exit(1)
        
    # 2. Load configurations
    try:
        schema = load_schema(schema_path)
        prompt_template = load_prompt_template(prompt_path)
    except Exception as e:
        print(f"[!] Error loading dependencies: {e}", file=sys.stderr)
        sys.exit(1)
        
    # 3. Format the prompt
    prompt = prompt_template.replace("{university_name}", university_name)
    prompt = prompt.replace("{json_schema}", json.dumps(schema, indent=2))
    
    # 4. Initialize the Gemini Client using the new SDK
    # The new SDK automatically resolves GEMINI_API_KEY from env
    client = genai.Client()
    
    # We enforce structured outputs using responseSchema to guarantee compliance
    print("[*] Dispatching research request to Gemini...")
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=schema,
                temperature=0.3
            )
        )
    except Exception as e:
        print(f"[!] Gemini API call failed: {e}", file=sys.stderr)
        sys.exit(1)
        
    # 5. Save the output
    try:
        data = json.loads(response.text)
        university_id = data.get("id") or university_name.lower().replace(" ", "-")
        output_file = os.path.join(output_dir, f"{university_id}.json")
        
        # Ensure output directory exists
        os.makedirs(output_dir, exist_ok=True)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
            
        print(f"[+] Success! University profile written to {output_file}")
    except json.JSONDecodeError:
        print("[!] Error: Received invalid JSON from model.", file=sys.stderr)
        print("Raw Response:", response.text)
        sys.exit(1)
    except Exception as e:
        print(f"[!] Error saving output: {e}", file=sys.stderr)
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="GradNiche University Research AI Agent")
    parser.add_argument("university", help="Name of the university to research")
    parser.add_argument("--schema", default="data/schema/university-schema.json", help="Path to university JSON schema")
    parser.add_argument("--prompt", default="prompts/university_research.txt", help="Path to research prompt template")
    parser.add_argument("--output-dir", default="data/universities", help="Directory to save generated profile JSON")
    
    args = parser.parse_args()
    
    # Setup working directory paths relative to root if needed
    run_research(args.university, args.schema, args.prompt, args.output_dir)

if __name__ == "__main__":
    main()
