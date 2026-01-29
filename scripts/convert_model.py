"""
Model Conversion Script for TensorFlow.js

This script converts your Keras emotion detection model to TensorFlow.js format
so it can run in the browser.

Usage:
    1. Install tensorflowjs: pip install tensorflowjs
    2. Run this script: python convert_model.py

The converted model will be saved to ../public/models/emotion_model/
"""

import os
import tensorflowjs as tfjs
from keras.models import load_model

# Configuration
MODEL_PATH = "../src/assets/best_model.h5"
OUTPUT_DIR = "../public/models/emotion_model"

def convert_model():
    print(f"Loading model from: {MODEL_PATH}")

    # Try loading .h5 format first, then .keras format
    try:
        model = load_model(MODEL_PATH)
    except Exception as e:
        print(f"Could not load {MODEL_PATH}: {e}")
        # Try .keras extension
        keras_path = MODEL_PATH.replace('.h5', '.keras')
        print(f"Trying: {keras_path}")
        model = load_model(keras_path)

    print("Model loaded successfully!")
    print(f"Model input shape: {model.input_shape}")
    print(f"Model output shape: {model.output_shape}")

    # Create output directory if it doesn't exist
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Convert and save the model
    print(f"\nConverting model to TensorFlow.js format...")
    tfjs.converters.save_keras_model(model, OUTPUT_DIR)

    print(f"\nModel converted successfully!")
    print(f"Files saved to: {OUTPUT_DIR}")
    print("\nGenerated files:")
    for f in os.listdir(OUTPUT_DIR):
        print(f"  - {f}")

    print("\n" + "="*50)
    print("Next steps:")
    print("1. The model is now ready to use in your portfolio")
    print("2. Restart your dev server: npm run dev")
    print("3. Navigate to the Demo section and click 'Try it yourself!'")
    print("="*50)

if __name__ == "__main__":
    convert_model()
