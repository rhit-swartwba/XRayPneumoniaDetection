# Chest X-Ray Pneumonia Detection

## Step 1: Obtain the Model File

1. Download the `vgg16_pneumonia_3class3.pth` file from Gauss server and save it locally. Access the Gauss server by going to [Gauss](http://gauss.csse.rose-hulman.edu/) and login. Ensure that you are on the Rose-Hulman network or connected to the VPN. Navigate to the project directory:
   ```bash
   cd ../../work/cssema416/202510/08/XRayPneumoniaDetection/
Download the `vgg16_pneumonia_3class3.pth` file and save it locally.


## Step 2: Download the Connection Script
2. Download the `Model_Connection.py` file from this repository and save it locally in the same directory as the `vgg16_pneumonia_3class3.pth` file.

## Step 3: Install Required Packages
3. Before running the script, ensure the following Python packages are installed. Use these commands to install them:
   ```bash
   pip install flask
   pip install flask_cors
   pip install torch
   pip install torchvision
   pip install pillow

## Step 4: Run the Connection Script
4. Run the `Model_Connection.py` file:
   ```bash
   python Model_Connection.py
   
## Step 5: Access the Frontend
5. Open the link to the frontend hosted via Firebase and use the application as normal.
   [X-Ray Pneumonia Detection](https://xraypneumoniadetection.web.app/)


