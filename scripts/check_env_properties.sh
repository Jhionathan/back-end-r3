# Define paths for .env and .env.example
ENV_FILE=".env"
EXAMPLE_FILE=".env.example"

# Check if .env and .env.example exist
if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: $ENV_FILE not found!"
  exit 1
fi

if [ ! -f "$EXAMPLE_FILE" ]; then
  echo "ERROR: $EXAMPLE_FILE not found!"
  exit 1
fi

# Get the properties from each file
ENV_PROPERTIES=$(grep -v '^#' "$ENV_FILE" | grep -v '^$' | cut -d= -f1)
EXAMPLE_PROPERTIES=$(grep -v '^#' "$EXAMPLE_FILE" | grep -v '^$' | cut -d= -f1)

# Check for missing properties in .env
MISSING_PROPERTIES=""
for prop in $EXAMPLE_PROPERTIES; do
  if ! grep -q "^$prop=" "$ENV_FILE"; then
    MISSING_PROPERTIES="$MISSING_PROPERTIES $prop"
  fi
done

# Fail the pipeline if there are missing properties
if [ -n "$MISSING_PROPERTIES" ]; then
  echo "ERROR: Missing properties in $ENV_FILE:$MISSING_PROPERTIES"
  exit 1
fi

echo "All properties from $EXAMPLE_FILE are present in $ENV_FILE"
