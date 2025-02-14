#!/bin/bash

# Define the subfolder name
SUBFOLDER="renamed_images"

# Create the subfolder if it doesn't exist
mkdir -p "$SUBFOLDER"

# Initialize counter
i=1

# Loop through all .jpg files in the current directory
for file in *.jpg; do
  mv "$file" "$SUBFOLDER/We$i.jpg"
  ((i++))
done
