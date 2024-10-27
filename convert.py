import xml.etree.ElementTree as ET
import os
import re

# Load XML file
tree = ET.parse('myndworkz.wordpress.xml')
root = tree.getroot()

# Define namespace to handle WordPress XML format
namespaces = {'wp': 'http://wordpress.org/export/1.2/'}

# Create output directory if it doesn't exist
output_dir = 'wordpress_html'
os.makedirs(output_dir, exist_ok=True)

# Function to create safe filenames
def make_safe_filename(title):
    # Replace any character that is not alphanumeric or an underscore with an underscore
    return re.sub(r'[^a-zA-Z0-9_-]', '_', title).lower()

# Extract and write content to HTML files
for item in root.findall('.//item', namespaces):
    title = item.find('title').text
    content = item.find('{http://purl.org/rss/1.0/modules/content/}encoded').text
    if title and content:
        # Create a safe filename from the title
        filename = os.path.join(output_dir, f"{make_safe_filename(title)}.html")
        # Write HTML file
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
</head>
<body>
    <h1>{title}</h1>
    {content}
</body>
</html>""")

print("HTML files have been generated in the 'wordpress_html' directory.")
