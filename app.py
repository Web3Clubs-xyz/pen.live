from ultralytics import YOLO
import time
import numpy as np
import cv2
from flask import Flask, render_template, request, Response, session, redirect, url_for
from flask_socketio import SocketIO
import yt_dlp as youtube_dl
from tracker import *


model_object_detection = YOLO("cabra_best.pt")

app = Flask(__name__)

# Set the secret key to some random bytes. Keep this really secret!
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode='threading')
stop_flag = False

# Create a tracker object
tracker = EuclideanDistTracker()

class VideoStreaming(object):
    def __init__(self):
        super(VideoStreaming, self).__init__()
        print ("*********************************Video Streaming******************************")
        # self.VIDEO = cv2.VideoCapture(0)
        # self.VIDEO.set(10, 200)
        self._preview = False
        self._flipH = False
        self._detect = False
        self._model = False
        self._confidence = 75.0

    @property
    def confidence(self):
        return self._confidence

    @confidence.setter
    def confidence(self, value):
        self._confidence = int(value)

    @property
    def preview(self):
        return self._preview

    @preview.setter
    def preview(self, value):
        self._preview = bool(value)

    @property
    def flipH(self):
        return self._flipH

    @flipH.setter
    def flipH(self, value):
        self._flipH = bool(value)

    @property
    def detect(self):
        return self._detect

    @detect.setter
    def detect(self, value):
        self._detect = bool(value)


    def show(self, url):
        print(url)
        self._preview = False
        self._flipH = False
        self._detect = False

        self._confidence = 75.0
        ydl_opts = {
            "quiet": True,
            "no_warnings": True,
            "format": "best",
            "forceurl": True,
        }
        # Create a youtube-dl object
        ydl = youtube_dl.YoutubeDL(ydl_opts)

        # Extract the video URL
        info = ydl.extract_info(url, download=False)
        url = info["url"]

        cap = cv2.VideoCapture(url)
        while True:
            if self._preview:
                if stop_flag:
                    print("Process Stopped")
                    return

                grabbed, frame = cap.read()
                if not grabbed:
                    break
                if self.flipH:
                    frame = cv2.flip(frame, 1)
                if self.detect:
                    print("Confidence: ", self._confidence)

                    # frame = cv2.cvtColor(snap, cv2.COLOR_BGR2RGB)
                    # frame = cv2.resize(frame, (500,500
                    # ))
                    # Detect objects
                    detections = model_object_detection.predict(frame, conf=self._confidence/100)[0]
                    print("Detections:", detections.boxes)

                    # Detections list
                    detections_cords = []  # [x, y, w, h]

                    # Iterate over the detections and set the names attribute
                    #for fram in frame:
                     #   fram.names = {0: 'goat'}

                    #frame = frame[0].plot()
                    #list_labels = ["goat"]
                    # labels_confidences
                    # Emit the label "goat" via SocketIO
                    #socketio.emit('label', list_labels)

                    # loop over the detections
                    for data in detections.boxes.data.tolist():
                        # extract the confidence (i.e., probability) associated with the detection
                        confidence = data[4]

                        # filter out weak detections by ensuring the
                        
                        # [xmin, ymin, xmax, ymax, confidence_score, class_id]
                        xmin, ymin, xmax, ymax = int(data[0]), int(data[1]), int(data[2]), int(data[3])

                        # Add the bounding box coordinates to the detections list
                        detections_cords.append([xmin, ymin, xmax, ymax])

                        # Save the bounding box coordinates as image
                        crop_img = frame[ymin:ymax, xmin:xmax]
                        # cv2.imwrite(f"tests/detections/images/cropped_image{np.random.randint(0, 100)}.jpg", crop_img)

                        # if the confidence is greater than the minimum confidence,
                        # draw the bounding box on the frame
                        #cv2.rectangle(frame, (xmin, ymin), (xmax, ymax), (0, 255, 0), 2)

                        # Add text to the frame
                        #label = f"{model_object_detection.names[int(data[5])]}: {confidence:.2f}"
                        #cv2.putText(frame, label, (xmin, ymin - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

                    # Goats tracking
                    boxes_ids = tracker.update(detections_cords)
                    for box_id in boxes_ids:
                        x, y, w, h, id = box_id

                        # Add ID to the frame
                        cv2.putText(frame, str(id), (x, y - 15), cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)
                        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 3)

                        # Add INFO text to the frame
                        #label = f"{model_object_detection.names[int(data[5])]}: {confidence:.2f}"
                        #cv2.putText(frame, label, (xmin, ymin - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)



                # frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
                frame = cv2.imencode(".jpg", frame)[1].tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            else:
                snap = np.zeros((
                    1000,
                    1000
                ), np.uint8)
                label = "Streaming Off"
                H, W = snap.shape
                font = cv2.FONT_HERSHEY_PLAIN
                color = (255, 255, 255)
                cv2.putText(snap, label, (W//2 - 100, H//2),
                            font, 2, color, 2)
                frame = cv2.imencode(".jpg", snap)[1].tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


# check_settings()
VIDEO = VideoStreaming()


@app.route('/', methods=['GET', 'POST'])
def homepage():
    return render_template('hompage.html')


@app.route('/index', methods=['GET', 'POST'])
def index():
    print("index")
    global stop_flag
    stop_flag = False
    if request.method == 'POST':
        print("Index post request")
        url = request.form['url']
        print("index: ", url)
        session['url'] = url
        return redirect(url_for('index'))
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    url = session.get('url', None)
    print("video feed: ", url)
    if url is None:
        return redirect(url_for('homepage'))
    return Response(VIDEO.show(url), mimetype='multipart/x-mixed-replace; boundary=frame')

# * Button requests
@app.route("/request_preview_switch")
def request_preview_switch():
    VIDEO.preview = not VIDEO.preview
    print("*"*10, VIDEO.preview)
    return "nothing"

@app.route("/request_flipH_switch")
def request_flipH_switch():
    VIDEO.flipH = not VIDEO.flipH
    print("*"*10, VIDEO.flipH)
    return "nothing"

@app.route("/request_run_model_switch")
def request_run_model_switch():
    VIDEO.detect = not VIDEO.detect
    print("*"*10, VIDEO.detect)
    return "nothing"


@app.route('/update_slider_value', methods=['POST'])
def update_slider_value():
    slider_value = request.form['sliderValue']
    VIDEO.confidence = slider_value
    return 'OK'

@app.route('/stop_process')
def stop_process():
    print("Process stop Request")
    global stop_flag
    stop_flag = True
    return 'Process Stop Request'

@socketio.on('connect')
def test_connect():
    print('Connected')

if __name__ == "__main__":
    socketio.run(app, debug=True)