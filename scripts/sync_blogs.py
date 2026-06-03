#!/usr/bin/env python3
"""
GradNiche Blog Synchronizer Bridge
Compiles all individual raw blog JSON files in `data/blogs/` 
and merges them with the existing hardcoded blogs in `data/blogs.ts`
into a compiled frontend module.
"""

import os
import sys
import json
import glob
import re

def validate_blog_profile(data: dict, file_path: str) -> bool:
    """Rigorous zero-dependency check for crucial blog fields to prevent frontend rendering failures."""
    required_keys = ["title", "excerpt", "author", "date", "readTime", "category", "image", "content"]
    missing = [key for key in required_keys if key not in data]
    if missing:
        print(f"[!] Validation Error in {file_path}: Missing required keys {missing}", file=sys.stderr)
        return False
    return True

def parse_existing_blogs(ts_path: str) -> list:
    """Parses existing blogs from the TypeScript file using regex to preserve them in our merge."""
    if not os.path.exists(ts_path):
        return []
        
    try:
        with open(ts_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Locate the array: export const blogPosts: BlogPost[] = [ ... ];
        match = re.search(r'export const blogPosts:\s*BlogPost\[\]\s*=\s*(\[.*\]);', content, re.DOTALL)
        if not match:
            print("[!] Warning: Could not locate blogPosts array in existing blogs.ts file.")
            return []
            
        # We can try to evaluate it, or simply parse it as JSON if it's formatted cleanly.
        # But wait! A safer and extremely robust way is to just keep the original array content 
        # and append the new JSON files.
        # To do this, we can extract the individual blog objects or use a custom parser.
        # Let's write a simple python parser for the existing JS objects.
        # However, to be 100% safe, we can read the file up to 'export const blogPosts: BlogPost[] = ['
        # and then write out our merged lists as JSON! That is extremely clean.
        # Let's extract the JS objects and convert them to Python dicts.
        js_array_str = match.group(1)
        
        # Simple parser: clean up JS trailing commas, double-quote keys and strings to make it valid JSON
        # Since the original blogs.ts is very clean, we can extract details or parse using basic regex.
        # Let's find each blog object: { id: 1, ... }
        blog_objects = []
        # We find content between {...} blocks
        # Let's search using a regex that captures individual blog objects
        matches = re.finditer(r'\{\s*id:\s*(\d+),\s*title:\s*"(.*?)",\s*excerpt:\s*"(.*?)",\s*author:\s*"(.*?)",\s*date:\s*"(.*?)",\s*readTime:\s*"(.*?)",\s*category:\s*"(.*?)",\s*image:\s*"(.*?)",\s*(?:visualType:\s*\'(.*?)\',\s*)?content:\s*`(.*?)`\s*\}', content, re.DOTALL)
        
        for m in matches:
            blog_objects.append({
                "id": int(m.group(1)),
                "title": m.group(2).replace('\\"', '"'),
                "excerpt": m.group(3).replace('\\"', '"'),
                "author": m.group(4),
                "date": m.group(5),
                "readTime": m.group(6),
                "category": m.group(7),
                "image": m.group(8),
                "visualType": m.group(9) if m.group(9) else None,
                "content": m.group(10).strip()
            })
            
        return blog_objects
    except Exception as e:
        print(f"[!] Warning parsing existing blogs.ts: {e}. Starting fresh.")
        return []

def main():
    workspace_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_pattern = os.path.join(workspace_root, "data", "blogs", "*.json")
    blogs_ts_path = os.path.join(workspace_root, "data", "blogs.ts")
    
    use_production = "--production" in sys.argv
    output_filename = "blogs.ts" if use_production else "blogs_compiled.ts"
    output_ts_path = os.path.join(workspace_root, "data", output_filename)
    
    # 1. Parse existing static blogs
    existing_blogs = parse_existing_blogs(blogs_ts_path)
    print(f"[*] Parsed {len(existing_blogs)} existing static blogs from blogs.ts")
    
    # Calculate next ID
    max_id = max([b["id"] for b in existing_blogs]) if existing_blogs else 0
    next_id = max(100, max_id + 1) # Start automated blogs from 100 or higher
    
    # 2. Load and validate new automated blogs
    json_files = glob.glob(json_pattern)
    print(f"[*] Found {len(json_files)} raw automated blog JSON files.")
    
    automated_blogs = []
    for jf in json_files:
        try:
            with open(jf, 'r', encoding='utf-8') as f:
                data = json.load(f)
            if validate_blog_profile(data, jf):
                # Assign dynamic ID and append
                data["id"] = next_id
                next_id += 1
                automated_blogs.append(data)
            else:
                print(f"[!] Skipping {jf} due to validation errors.")
        except Exception as e:
            print(f"[!] Error reading {jf}: {e}", file=sys.stderr)
            sys.exit(1)
            
    # 3. Merge lists
    merged_blogs = existing_blogs + automated_blogs
    print(f"[*] Target Output File: {output_ts_path}")
    print(f"[*] Compiled {len(merged_blogs)} total blogs (Static: {len(existing_blogs)}, AI-Generated: {len(automated_blogs)})")
    
    # 4. Generate TS code
    ts_content = """// ============================================================================
// GradNiche Study Abroad Blogs Layer
// WARNING: This file is automatically compiled.
// Do not edit this file directly. Instead, add raw JSON files to `/data/blogs/`
// and run `scripts/sync_blogs.py` to compile.
// ============================================================================

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    content: string;
    visualType?: 'comparison' | 'cost-chart' | 'timeline' | 'scholarship-table' | 'university-list'; 
}

"""
    # Write the array
    ts_content += "export const blogPosts: BlogPost[] = [\n"
    for blog in merged_blogs:
        ts_content += "    {\n"
        ts_content += f"        id: {blog['id']},\n"
        ts_content += f"        title: {json.dumps(blog['title'])},\n"
        ts_content += f"        excerpt: {json.dumps(blog['excerpt'])},\n"
        ts_content += f"        author: {json.dumps(blog['author'])},\n"
        ts_content += f"        date: {json.dumps(blog['date'])},\n"
        ts_content += f"        readTime: {json.dumps(blog['readTime'])},\n"
        ts_content += f"        category: {json.dumps(blog['category'])},\n"
        ts_content += f"        image: {json.dumps(blog['image'])},\n"
        if blog.get("visualType"):
            ts_content += f"        visualType: '{blog['visualType']}',\n"
        # We store content inside template literals (backticks) for multiline compatibility
        # Escape any backticks inside the content
        escaped_content = blog['content'].replace("`", "\\`").replace("${", "\\${")
        ts_content += f"        content: `\n{escaped_content}\n        `\n"
        ts_content += "    },\n"
    ts_content += "];\n"
    
    # Save the file
    try:
        with open(output_ts_path, 'w', encoding='utf-8') as f:
            f.write(ts_content)
        print(f"[+] Successfully wrote merged blogs to {output_ts_path}")
    except Exception as e:
        print(f"[!] Failed to write compiled blogs: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
