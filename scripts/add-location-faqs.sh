#!/bin/bash

# Add FAQ schema and sections to remaining location pages

PAGES=(
  "winchester:Winchester:SO22 SO23 SO24:ancient capital Cathedral Winchester College"
  "petersfield:Petersfield:GU31 GU32:market town Heath Pond East Hampshire"
  "basingstoke:Basingstoke:RG21 RG22 RG23 RG24:Festival Place Chineham Business Park Anvil theatre"
  "andover:Andover:SP10 SP11:Test Valley Georgian high street North West Hampshire"
  "romsey:Romsey:SO51:Abbey Cornmarket King John's House market town"
  "eastleigh:Eastleigh:SO50 SO53:Swan Centre railway heritage industrial estates"
)

cd /Users/jarvis/.openclaw/workspace/pm/meonvalleyweb2025/src/pages

for page_info in "${PAGES[@]}"; do
  IFS=':' read -r file location postcodes landmarks <<< "$page_info"
  file_path="web-design-${file}.astro"
  
  echo "Processing ${file_path}..."
  
  # This is a placeholder - actual script would use sed/awk to insert content
  # For now, we'll just output what needs to be done
  echo "  - Add SchemaFAQ import and FAQ array"
  echo "  - Add <SchemaFAQ faqs=${file}FAQs />"
  echo "  - Add visual FAQ section before CTA"
done

echo "Script framework created. Manual edits required due to complexity."
