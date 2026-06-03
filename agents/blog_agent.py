#!/usr/bin/env python3
"""
GradNiche Daily Trending Blog Generation Agent
Automates daily research on study-abroad news and generates premium blog articles.
Uses the new Google GenAI SDK (google-genai).
"""

import os
import sys
import json
from datetime import datetime
from google import genai
from google.genai import types

def get_trending_topics(client: genai.Client) -> list:
    """Uses Gemini 2.5 Flash to research and discover the top 3 trending global education/visa topics for today."""
    print("[*] Researching trending global education topics for today...")
    
    prompt = """
    Identify the top 3 most critical, trending topics in global education and study abroad for international students (especially Indian students) as of today.
    Focus on recent visa policy changes, currency/cost fluctuations, new scholarship deadlines, post-study work rules, or high-demand careers.
    
    Output ONLY a JSON array of strings containing the topics.
    Example: ["US F1 Visa Appointment Scarcity & Day 1 CPT Alternatives", "UK Skilled Worker Visa Salary Threshold Increases", "Canada Caps International Study Permits for Master's Programs"]
    Do not wrap the output in markdown code blocks.
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.7
            )
        )
        topics = json.loads(response.text)
        return topics
    except Exception as e:
        print(f"[!] Failed to research trending topics: {e}", file=sys.stderr)
        # Return fallback high-value topics in case of API failure
        return [
            "UK Graduate Route (PSW) Sponsorship Thresholds and Success Strategies",
            "US F1 Visa Interview Preparation Tips & Common Questions",
            "High-ROI Master's Degrees in Germany and Europe for Tech Grads"
        ]

def generate_blog_article(client: genai.Client, topic: str, prompt_path: str, output_dir: str):
    """Generates a premium HTML blog article on the researched topic and saves it as a JSON file."""
    print(f"[*] Selected Topic: {topic}")
    print("[*] Initiating blog draft generation using Gemini...")
    
    # Load prompt template
    try:
        with open(prompt_path, 'r', encoding='utf-8') as f:
            prompt_template = f.read()
    except Exception as e:
        print(f"[!] Error loading prompt template: {e}", file=sys.stderr)
        sys.exit(1)
        
    today_str = datetime.now().strftime("%B %d, %Y")
    
    prompt = prompt_template.replace("{blog_topic}", topic)
    prompt = prompt.replace("{today_date}", today_str)
    
    # We define a custom schema matching the BlogPost structure to guarantee compliance
    blog_schema = {
        "type": "OBJECT",
        "properties": {
            "title": { "type": "STRING", "description": "SEO-friendly click-worthy article title" },
            "excerpt": { "type": "STRING", "description": "2-3 sentence engaging summary card teaser" },
            "author": { "type": "STRING", "description": "Always 'GradNiche AI Writer'" },
            "date": { "type": "STRING", "description": "Current formatted date, e.g. May 31, 2026" },
            "readTime": { "type": "STRING", "description": "Estimated read duration, e.g. 7 min read" },
            "category": { "type": "STRING", "enum": ["Admissions", "Visas", "Finance", "Student Life", "Careers", "Test Prep"] },
            "image": { "type": "STRING", "description": "A high-quality relevant Unsplash image URL" },
            "content": { "type": "STRING", "description": "Comprehensive HTML-formatted body content of the blog post" }
        },
        "required": ["title", "excerpt", "author", "date", "readTime", "category", "image", "content"]
    }
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=blog_schema,
                temperature=0.6
            )
        )
        
        # Save output
        data = json.loads(response.text)
        slug = topic.lower().replace(" ", "-").replace("'", "").replace("(", "").replace(")", "").replace(":", "").replace("&", "and")
        slug = "".join([c for c in slug if c.isalnum() or c == '-'])[:50].strip('-')
        
        output_file = os.path.join(output_dir, f"{slug}.json")
        os.makedirs(output_dir, exist_ok=True)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
            
        print(f"[+] Success! Dynamic blog profile written to {output_file}")
        print(f"Title: {data['title']}")
    except Exception as e:
        print(f"[!] Blog generation failed: {e}", file=sys.stderr)
        sys.exit(1)

def main():
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("API_KEY")
    if not api_key:
        print("[!] Error: GEMINI_API_KEY environment variable is not set.", file=sys.stderr)
        sys.exit(1)
        
    client = genai.Client()
    
    # 1. Discover top trending topics for today
    trending = get_trending_topics(client)
    selected_topic = trending[0] # Pick the top trending topic
    
    # 2. Generate and save the blog post
    prompt_path = "prompts/blog_generation.txt"
    output_dir = "data/blogs"
    generate_blog_article(client, selected_topic, prompt_path, output_dir)

if __name__ == "__main__":
    main()
