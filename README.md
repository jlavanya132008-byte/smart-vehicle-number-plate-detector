# 🚗 Smart Vehicle Number Plate Detector

## 📌 Project Overview

**Smart Vehicle Number Plate Detector** is a computer vision mini project that automatically detects vehicle number plates from images or camera/video input and extracts the vehicle registration number using **OpenCV, Machine Learning, and OCR**.

The system processes the input image, identifies the number plate region, crops and enhances the plate, and uses Optical Character Recognition (OCR) to recognize the characters.

This project provides practical exposure to **Computer Vision, Image Processing, Machine Learning, and OCR-based text recognition**.

---

## 🎯 Objectives

* Detect vehicle number plates automatically.
* Process vehicle images using OpenCV.
* Identify the number plate region using image-processing techniques.
* Extract the detected plate from the vehicle image.
* Recognize characters from the number plate using OCR.
* Display the detected vehicle registration number.
* Provide confidence information for the detection and recognition.
* Demonstrate real-time number plate detection using a webcam/video.

---

## ✨ Features

* 📷 Vehicle image upload
* 🎥 Live camera detection
* 🔍 Number plate localization
* 🖼️ Plate image cropping
* ⚙️ Image preprocessing
* 🤖 Machine-learning-based classification
* 🔤 OCR-based number recognition
* 📊 Detection/OCR confidence display
* 🕒 Detection history
* ⚠️ Error handling for unsuccessful detection
* 💻 Simple and user-friendly interface

---

## 🧠 System Workflow

```text
Input Image / Camera
        ↓
Image Preprocessing
        ↓
Grayscale Conversion
        ↓
Noise Reduction
        ↓
Edge Detection
        ↓
Contour Detection
        ↓
Number Plate Localization
        ↓
Plate Cropping
        ↓
Image Enhancement
        ↓
ML Classification
        ↓
OCR Processing
        ↓
Vehicle Number
        ↓
Display Result
```

---

## 🛠️ Technologies Used

| Technology          | Purpose                              |
| ------------------- | ------------------------------------ |
| Python              | Main programming language            |
| OpenCV              | Image processing and plate detection |
| NumPy               | Numerical and image-array operations |
| Scikit-learn        | Machine learning component           |
| EasyOCR / Tesseract | Number plate text recognition        |
| Pillow              | Image handling                       |
| Streamlit           | Web-based user interface             |

---

## 📂 Project Structure

```text
Smart-Vehicle-Number-Plate-Detector/
│
├── app.py
├── detector.py
├── ocr.py
├── ml_model.py
├── preprocessing.py
│
├── requirements.txt
├── README.md
│
├── model/
│   └── plate_classifier.pkl
│
├── sample_images/
│   ├── car1.jpg
│   ├── car2.jpg
│   └── car3.jpg
│
├── outputs/
│   └── detected_plates/
│
└── screenshots/
    └── project_demo.png
```

---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Smart-Vehicle-Number-Plate-Detector.git
```

### 2. Open the project directory

```bash
cd Smart-Vehicle-Number-Plate-Detector
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

---

## 📦 Required Libraries

Example `requirements.txt`:

```text
opencv-python
numpy
pandas
scikit-learn
easyocr
Pillow
streamlit
```

---

## ▶️ How to Run

Start the Streamlit application:

```bash
streamlit run app.py
```

The application will open in your browser.

### Image Detection

1. Open the application.
2. Select **Upload Image**.
3. Upload a vehicle image.
4. Click **Detect Number Plate**.
5. The system identifies the plate.
6. The detected plate is cropped and displayed.
7. OCR extracts the registration number.
8. The final result is displayed on the screen.

### Camera Detection

1. Select **Live Camera Detection**.
2. Allow camera access.
3. Start the camera.
4. Place a vehicle in front of the camera.
5. The system attempts to detect the number plate.
6. The recognized number is displayed.

---

## 🔍 Image Processing

The system performs several preprocessing operations before detecting the number plate.

### Grayscale Conversion

The input image is converted into grayscale to simplify image processing.

### Noise Reduction

Noise reduction is applied to improve the quality of the image.

### Edge Detection

Edge detection helps identify boundaries and possible rectangular number plate regions.

### Contour Detection

Contours are analyzed to identify regions that have characteristics similar to a vehicle number plate.

### Plate Cropping

After identifying a potential plate region, the system crops that region for further processing.

---

## 🤖 Machine Learning Component

The project includes a lightweight machine-learning component for distinguishing potential number-plate regions from non-number-plate regions.

The basic classification pipeline is:

```text
Image Region
     ↓
Feature Extraction
     ↓
ML Classifier
     ↓
Plate / Non-Plate
```

The ML component can be implemented using **Scikit-learn** with a suitable lightweight classifier.

---

## 🔤 OCR Recognition

After the number plate is detected, the cropped plate is passed to an OCR system.

```text
Detected Plate
      ↓
Image Enhancement
      ↓
OCR
      ↓
Character Recognition
      ↓
Vehicle Registration Number
```

Example output:

```text
Detected Number: TN 38 AB 1234
OCR Confidence: 91%
```

> OCR results may vary depending on image quality, lighting, plate angle, font, and camera resolution.

---

## 📊 Sample Output

```text
-----------------------------------
     NUMBER PLATE DETECTION
-----------------------------------

Plate Status       : Detected
Registration Number: TN 38 AB 1234
Detection Confidence: 94%
OCR Confidence      : 91%
Processing Time     : 0.42 seconds

-----------------------------------
```

---

## ⚠️ Error Handling

The application handles common situations such as:

* No image uploaded
* Unsupported image format
* No vehicle detected
* Number plate not detected
* Multiple possible plate regions
* OCR recognition failure
* Invalid camera access
* Poor-quality images

Example:

```text
Number plate detected,
but text could not be recognized.
```

---

## 📈 Future Enhancements

The project can be extended with:

* 🚘 Multiple vehicle detection
* 📹 Real-time video processing
* 🅿️ Smart parking management
* 🗃️ Vehicle number database
* 🚪 Automatic entry/exit logging
* 📊 Detection analytics dashboard
* 🌐 Cloud-based storage
* 🔐 Authorized vehicle verification
* 📱 Mobile application integration
* 🎯 Improved deep-learning-based plate detection

---

## 🎓 Learning Outcomes

Through this project, students gain practical experience in:

* Computer Vision
* OpenCV
* Image preprocessing
* Edge and contour detection
* Machine Learning
* OCR
* Python programming
* Streamlit application development
* Model integration
* Real-time image processing

---

## 🧪 Example Use Cases

The system can serve as a prototype for:

* Smart parking systems
* Vehicle entry management
* Campus vehicle monitoring
* Automated toll systems
* Traffic monitoring
* Vehicle registration systems

The prototype is intended for **educational and demonstration purposes** and should be adapted to applicable laws, privacy requirements, and local regulations before real-world deployment.

---

## 👩‍💻 Project Information

**Project Title:** Smart Vehicle Number Plate Detector
**Domain:** Computer Vision
**Difficulty:** Medium
**Programming Language:** Python
**Primary Technology:** OpenCV
**ML Component:** Scikit-learn
**OCR:** EasyOCR / Tesseract
**Interface:** Streamlit

---

## 📜 License

This project is created for educational purposes. You may modify and extend the project for academic learning and demonstration.

---

## ⭐ Acknowledgement

This project was developed as a student mini project to demonstrate the practical application of **Computer Vision, Machine Learning, Image Processing, and OCR** for vehicle number plate detection.
