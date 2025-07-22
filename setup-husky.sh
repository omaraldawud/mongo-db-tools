#!/bin/bash

# Run this after npm install
echo "🔧 Setting up Husky (v9+) pre-commit hook..."

# Ensure husky is installed
if ! [ -d "node_modules/husky" ]; then
  echo "❌ Husky is not installed. Run 'npm install' first."
  exit 1
fi

# Create .husky directory if not exists
mkdir -p .husky

# Set Git hooks path
git config core.hooksPath .husky

# Create pre-commit hook
cat > .husky/pre-commit <<'EOF'
#!/bin/sh
npm test
EOF

chmod +x .husky/pre-commit

echo "✅ Husky pre-commit hook created and configured."
