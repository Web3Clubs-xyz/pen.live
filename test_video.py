import cv2
import numpy as np
from ultralytics import YOLO

# Load the trained model (replace 'path/to/model.pt' with the actual path)
model = YOLO("cabra_best.pt")

# Load video for detection
cap = cv2.VideoCapture("./test_data/videos/pen_recording.mp4")

# define some constants
CONFIDENCE_THRESHOLD = 0.5
GREEN = (0, 255, 0)
BLUE = (255, 0, 0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Perform detection
    detections = model.predict(frame)[0]
    #print("Detections:", detections)
    
    # loop over the detections
    for data in detections.boxes.data.tolist():
        # extract the confidence (i.e., probability) associated with the detection
        confidence = data[4]
        print("Data: ", data)

        # filter out weak detections by ensuring the 
        # confidence is greater than the minimum confidence
        if float(confidence) < CONFIDENCE_THRESHOLD:
            continue

        # if the confidence is greater than the minimum confidence,
        # draw the bounding box on the frame
        # [xmin, ymin, xmax, ymax, confidence_score, class_id]
        xmin, ymin, xmax, ymax = int(data[0]), int(data[1]), int(data[2]), int(data[3])
        cv2.rectangle(frame, (xmin, ymin) , (xmax, ymax), GREEN, 2)

        # Add text to the frame
        label = f"{model.names[int(data[5])]}: {confidence:.2f}"
        cv2.putText(frame, label, (xmin, ymin - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, BLUE, 2)


    # Display the frame with the detected objects
    cv2.imshow("frame", frame)
    if cv2.waitKey(1) & 0xFF == ord("s"):
        break

cap.release()
cv2.destroyAllWindows()