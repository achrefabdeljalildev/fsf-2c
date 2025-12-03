#!/bin/bash
default_env_file="./src/environments/environment.ts"
# Check if the version (tag) is provided as an argument
if [ -z "$1" ]; then
  echo "Error: No version provided. Usage: ./update-app-version.sh <version>"
  exit 1
fi

# Arguments
new_version=$1

# File paths
env_file="${2:-$default_env_file}"
package_file="./package.json"

# Update the appVersion in environment.ts
if [ -f "$env_file" ]; then
  sed -i.bak -E "s/(appVersion: ')(.*?)(')/\1${new_version}\3/" "$env_file"
  echo "Updated appVersion to ${new_version} in ${env_file}"
else
  echo "Error: File not found at ${env_file}"
  exit 1
fi

# Update the version in package.json
if [ -f "$package_file" ]; then
  sed -i.bak -E "s/(\"version\": \")(.*?)\"/\1${new_version}\"/" "$package_file"
  echo "Updated version to ${new_version} in ${package_file}"
else
  echo "Error: File not found at ${package_file}"
  exit 1
fi
