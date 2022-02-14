const submit = document.getElementById("submit");
let op = document.getElementById("op");
let model;
// const img = "/img/test.jpg";

let TARGET_CLASSES = {
  0: "akiec, Actinic Keratoses (Solar Keratoses) or intraepithelial Carcinoma (Bowen’s disease)",
  1: "bcc, Basal Cell Carcinoma",
  2: "bkl, Benign Keratosis",
  3: "df, Dermatofibroma",
  4: "mel, Melanoma",
  5: "nv, Melanocytic Nevi",
  6: "vasc, Vascular skin lesion",
};

const loadModel = async () => {
  console.log("Loading model...");
  await tf.loadLayersModel("models/model.json").then(function (tf) {
    model = tf;
  });
  console.log("Model loaded");
  let image = document.getElementById("image-upload-preview");

  let tensorImg = tf.browser
    .fromPixels(image)
    .resizeNearestNeighbor([224, 224])
    .toFloat();

  // console.dir(tensorImg);
  let offset = tf.scalar(127.5);
  tensorImg = tensorImg.sub(offset).div(offset).expandDims();
  // let tensor = tf.fromPixels(image).resizeNearestNeighbor([224, 224]).toFloat();

  // tensor = tensor.sub(offset).div(offset).expandDims();

  await getPrediction(tensorImg);
  // getPrediction(img);
};

const getPrediction = async (image) => {
  console.log("Getting prediction...");
  let predictions = await model.predict(image).data();
  console.log("Prediction done");
  // console.log(predictions);
  let top5 = Array.from(predictions)
    .map(function (p, i) {
      // this is Array.map
      return {
        probability: p,
        className: TARGET_CLASSES[i],
      };
    })
    .sort(function (a, b) {
      return b.probability - a.probability;
    })
    .slice(0, 3);
  // console.log(predictions[0]);
  let prediction = predictions.sort((a, b) => b - a);
  // console.log(prediction);
  op.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const li = document.createElement("li");
    let pred = prediction[i].toFixed(3) * 100;
    li.innerText = pred + "%" + " - " + TARGET_CLASSES[i];
    op.append(li);
  }
};
// loadModel();
const output = () => {};
async function showPreview(event) {
  if (event.target.files.length > 0) {
    var src = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("image-upload-preview");
    preview.src = src;
    preview.style.display = "block";
  }
}

submit.addEventListener("click", loadModel);
