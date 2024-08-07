#!/bin/bash

# Install dependencies
npm install

# Build the React app
npm run build

# If you have a separate build process for your RAG pipeline, add it here
python api.py