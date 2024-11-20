# Chest X-Ray Pneumonia Detection

## Step 1: Obtain the Model File

1. Download the `vgg16_3class_model.zip` zip from Github. Extract the  `vgg16_pneumonia_3class3.pth` file from the zip folder and save it locally.  
   - If for some reason it does not work, contact one of the following individuals to request the file:
     - **Brian Beasley**: [beaslebf@rose-hulman.edu](mailto:beaslebf@rose-hulman.edu)
     - **Blaise Swartwood**: [swartwba@rose-hulman.edu](mailto:swartwba@rose-hulman.edu)
     - **Tommaso Calviello**: [calviet@rose-hulman.edu](mailto:calviet@rose-hulman.edu)

## Step 2: Download the Connection Script
2. Download the `Model_Connection.py` file and save it locally in the same directory as the `vgg16_pneumonia_3class3.pth` file.

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


