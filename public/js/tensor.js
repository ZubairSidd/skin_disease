const submit = document.getElementById("submit");

let model;

const loadModel = async () => {
  console.log("Loading model...");
  await tf.loadLayersModel("models/model.json").then(function (tf) {
    model = tf;
  });
  //   console.dir(model);
};

submit.addEventListener("click", loadModel);
