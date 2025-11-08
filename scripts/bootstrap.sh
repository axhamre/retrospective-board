#!/usr/bin/env bash

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}${BOLD}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║             Node TypeScript Backend Template Setup            ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${YELLOW}This script will help you set up your new TypeScript backend service.${NC}"
echo -e "${YELLOW}It will replace placeholders and create the necessary directory structure.${NC}"
echo ""

# Function to validate input is not empty
validate_not_empty() {
    local input=$1
    local message=$2

    while [ -z "$input" ]; do
        echo -e "${RED}$message${NC}"
        read -r input
    done

    echo "$input"
}

# Convert a string (service name) to lower camelCase (e.g., "user-service api" -> "userServiceApi")
to_camel_case() {
    local input="$1"
    # Split on common delimiters (space, hyphen, underscore, slash)
    IFS=' -_/' read -ra parts <<< "$input"
    local camel=""
    for i in "${!parts[@]}"; do
        local part="${parts[$i]}"
        # Lowercase the entire part first
        local lower_part=$(echo "$part" | tr '[:upper:]' '[:lower:]')
        if [ $i -eq 0 ]; then
            camel+="$lower_part"
        else
            # Capitalize first letter, keep rest lowercase
            camel+="$(echo "${lower_part:0:1}" | tr '[:lower:]' '[:upper:]')${lower_part:1}"
        fi
    done
    echo "$camel"
}

# Convert a string (service name) to PascalCase (e.g., "user-service api" -> "UserServiceApi")
to_pascal_case() {
    local input="$1"
    IFS=' -_/' read -ra parts <<< "$input"
    local pascal=""
    for part in "${parts[@]}"; do
        local lower_part=$(echo "$part" | tr '[:upper:]' '[:lower:]')
        [ -z "$lower_part" ] && continue
        pascal+="$(echo "${lower_part:0:1}" | tr '[:lower:]' '[:upper:]')${lower_part:1}"
    done
    echo "$pascal"
}

# Collect information
echo -e "${BLUE}${BOLD}Step 1: Basic Information${NC}"
echo ""

# Repository name
echo -e "Enter your repository name (e.g., user-services):"
read -r REPOSITORY_NAME
REPOSITORY_NAME=$(validate_not_empty "$REPOSITORY_NAME" "Repository name cannot be empty. Please enter a valid name:")

# Service name
echo -e "Enter your service name (e.g., users, payments):"
read -r SERVICE_NAME
SERVICE_NAME=$(validate_not_empty "$SERVICE_NAME" "Service name cannot be empty. Please enter a valid name:")
SERVICE_NAME_PASCAL=$(to_pascal_case "$SERVICE_NAME")
SERVICE_NAME_CAMEL=$(to_camel_case "$SERVICE_NAME")
# GitHub environments end up being lowercase
DEV_ENV_VALUE=$(echo "${SERVICE_NAME_CAMEL}_tv4_dev1" | tr '[:upper:]' '[:lower:]')

# Service description
echo -e "Enter a brief description of your service:"
read -r DESCRIPTION
DESCRIPTION=$(validate_not_empty "$DESCRIPTION" "Description cannot be empty. Please enter a description:")

# Service owner
echo -e "Enter the owner of this service (team or individual):"
read -r OWNER
OWNER=$(validate_not_empty "$OWNER" "Owner cannot be empty. Please enter an owner:")

echo ""
echo -e "${GREEN}Information collected successfully!${NC}"
echo ""

# Replace placeholders in files
echo -e "${BLUE}${BOLD}Step 2: Replacing Placeholders in Files${NC}"
echo ""

# Find all files that contain placeholders and replace them
echo -e "Searching for files with placeholders..."
FILES_WITH_PLACEHOLDERS=$(grep -l "{{SERVICE_NAME}}\|{{DESCRIPTION}}\|{{OWNER}}\|{{REPOSITORY_NAME}}\|<TV4_ENVIRONMENT_DEV>" --include="*.json" --include="*.md" --include="*.ts" --include="*.js" --include="*.yml" --include="*.yaml" -r . 2>/dev/null || echo "")

if [ -z "$FILES_WITH_PLACEHOLDERS" ]; then
    echo -e "${YELLOW}No files with placeholders found.${NC}"
else
    echo -e "Found files with placeholders. Replacing..."

    for file in $FILES_WITH_PLACEHOLDERS; do
        echo -e "Processing ${BLUE}$file${NC}"
        # Use different sed syntax based on OS
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s/{{SERVICE_NAME}}/$SERVICE_NAME/g" "$file"
            sed -i '' "s/{{DESCRIPTION}}/$DESCRIPTION/g" "$file"
            sed -i '' "s/{{OWNER}}/$OWNER/g" "$file"
            sed -i '' "s/{{REPOSITORY_NAME}}/$REPOSITORY_NAME/g" "$file"
            sed -i '' "s#<TV4_ENVIRONMENT_DEV>#$DEV_ENV_VALUE#g" "$file"
        else
            # Linux and others
            sed -i "s/{{SERVICE_NAME}}/$SERVICE_NAME/g" "$file"
            sed -i "s/{{DESCRIPTION}}/$DESCRIPTION/g" "$file"
            sed -i "s/{{OWNER}}/$OWNER/g" "$file"
            sed -i "s/{{REPOSITORY_NAME}}/$REPOSITORY_NAME/g" "$file"
            sed -i "s#<TV4_ENVIRONMENT_DEV>#$DEV_ENV_VALUE#g" "$file"
        fi
    done

    echo -e "${GREEN}Placeholder replacement in files completed!${NC}"
fi

# Rename directories
echo -e "${BLUE}${BOLD}Step 3: Renaming Template Directories${NC}"
echo ""

# Rename github workflows
echo -e "${BLUE}${BOLD}Step 3: Renaming Github Workflows${NC}"
echo ""
echo -e "Renaming GitHub workflow..."
mv ".github/workflows/deploy-{{SERVICE_NAME}}.yml" ".github/workflows/deploy-$SERVICE_NAME.yml"
echo -e "${GREEN}GitHub workflow renamed successfully!${NC}"

# Check if template service directory exists
TEMPLATE_SERVICE_DIR="services/{{SERVICE_NAME}}"
if [ -d "$TEMPLATE_SERVICE_DIR" ]; then
    echo -e "Found template service directory. Renaming to ${BLUE}services/$SERVICE_NAME${NC}"

    # Create target directory if it doesn't exist
    mkdir -p "services/$SERVICE_NAME"

    # Copy files from template to new directory
    cp -R "$TEMPLATE_SERVICE_DIR"/. "services/$SERVICE_NAME"/ 2>/dev/null || true

    # Remove template directory
    rm -rf "$TEMPLATE_SERVICE_DIR"

    echo -e "${GREEN}Service directory renamed successfully!${NC}"
else
    echo -e "${YELLOW}Template service directory not found. Skipping directory renaming.${NC}"
fi

# Check for other template directories that might need renaming
echo -e "Checking for other template directories..."
OTHER_TEMPLATE_DIRS=$(find . -type d -name "*{{SERVICE_NAME}}*" 2>/dev/null || echo "")

if [ -n "$OTHER_TEMPLATE_DIRS" ]; then
    echo -e "Found other template directories. Renaming..."

    for dir in $OTHER_TEMPLATE_DIRS; do
        NEW_DIR_NAME=$(echo "$dir" | sed "s/{{SERVICE_NAME}}/$SERVICE_NAME/g")
        echo -e "Renaming ${BLUE}$dir${NC} to ${BLUE}$NEW_DIR_NAME${NC}"

        # Create target directory
        mkdir -p "$NEW_DIR_NAME"

        # Copy files
        cp -R "$dir"/* "$NEW_DIR_NAME"/ 2>/dev/null || true

        # Remove original directory
        rm -rf "$dir"
    done

    echo -e "${GREEN}All template directories renamed!${NC}"
else
    echo -e "${YELLOW}No other template directories found.${NC}"
fi

# Update package.json in the root directory
echo -e "${BLUE}${BOLD}Step 4: Updating Root Package.json${NC}"
echo ""

if [ -f "package.json" ]; then
    echo -e "Updating package.json with project information..."

    # Use different sed syntax based on OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/\"name\": \"node-template\"/\"name\": \"$REPOSITORY_NAME\"/g" "package.json"
        sed -i '' "s/\"description\": \"\"/\"description\": \"$DESCRIPTION\"/g" "package.json"
        sed -i '' "s/\"author\": \"\"/\"author\": \"$OWNER\"/g" "package.json"
    else
        # Linux and others
        sed -i "s/\"name\": \"node-template\"/\"name\": \"$REPOSITORY_NAME\"/g" "package.json"
        sed -i "s/\"description\": \"\"/\"description\": \"$DESCRIPTION\"/g" "package.json"
        sed -i "s/\"author\": \"\"/\"author\": \"$OWNER\"/g" "package.json"
    fi

    echo -e "${GREEN}Package.json updated successfully!${NC}"
else
    echo -e "${YELLOW}Root package.json not found. Skipping update.${NC}"
fi


echo -e "${BLUE}${BOLD}Step 5: Setting up repository rules${NC}"
echo ""

./scripts/bootstrap-repository.sh "$REPOSITORY_NAME"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Repository rules set successfully!${NC}"
else
    echo -e "${YELLOW}Failed to set repository rules. Please check the setup-repository.sh script for errors.${NC}"
fi

# Final instructions
echo -e "${BLUE}${BOLD}Setup Complete!${NC}"
echo ""
echo -e "${GREEN}Your new TypeScript backend service has been set up successfully.${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "${BLUE}${BOLD}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║             Bootstrap the infrastructure repository           ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo "git clone https://github.com/TV4/tv4-infrastructure.git"
echo "cd tv4-infrastructure"
echo "./bin/create-project.sh $SERVICE_NAME_PASCAL --repository $REPOSITORY_NAME --environments tv4 --application-type container-service --accounts Dev1"
echo ""
echo "After that, simply follow instructions from there!"
echo ""
echo -e "${BLUE}Happy coding!${NC}"

