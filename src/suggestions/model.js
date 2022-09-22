import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
const learnTodos = require('../Data/fact.json');
const exerciseTodos = require('../Data/fake.json');

const trainTasks = learnTodos.concat(exerciseTodos);

const MODEL_NAME = "suggestion-model";
const N_CLASSES = 2;
const FACT = "FACTS";
const FAKE = "FAKE";
const UNCERTAIN = "UNCERTAIN";

const encodeData = async (encoder, tasks) => {
  const sentences = tasks.map(t => t.text.toLowerCase());
  const embeddings = await encoder.embed(sentences);
  return embeddings;
};

const trainModel = async encoder => {
  // try {
  //   const loadedModel = await tf.loadLayersModel(
  //     `localstorage://${MODEL_NAME}`
  //   );
  //   console.log("Using existing model");
  //   return loadedModel;
  // } catch (e) {
  //   console.log("Training new model");
  // }

  const xTrain = await encodeData(encoder, trainTasks);

  const yTrain = tf.tensor2d(
    trainTasks.map(t => ([t.results === FACT ? 1 : 0, t.results === FAKE ? 1 : 0]))
  );

  const model = tf.sequential();

  model.add(
    tf.layers.dense({
      inputShape: [xTrain.shape[1]],
      activation: "softmax",
      units: N_CLASSES
    })
  );

  model.compile({
    loss: "categoricalCrossentropy",
    optimizer: tf.train.adam(0.002),
    metrics: ["accuracy"]
  });

 // const lossContainer = document.getElementById("loss-cont");

  await model.fit(xTrain, yTrain, {
    batchSize: 32,
    validationSplit: 0.1,
    shuffle: true,
    epochs: 150,
    callbacks:["onEphocEnd"]

    
  });

  //await model.save(`localstorage://${MODEL_NAME}`);

  return model;
};

const predictInfo = async (model, encoder, taskName, threshold) => {
    console.log("MODEL:" + model + "ENCODER: " + encoder, "TASKNAME: " + taskName, "THRESHOLD: "+ threshold )
  if (!taskName.trim().includes(" ")) {
    return null;
  }
  taskName = taskName.toLowerCase();
  const xPredict = await encodeData(encoder, [{ text: taskName }]);

  const prediction = await model.predict(xPredict).data();

  console.log(prediction[0] +"" + prediction[1]);

  if (prediction[0] > threshold && prediction[0] > prediction[1] ) {
    return {
      result : prediction[0] * 100,
      status: FACT
    };
  } else if (prediction[1] > threshold  && prediction[1] > prediction[0]) {
    return {
      result : prediction[1] * 100,
      status: FAKE
    };
  } else {
    return {
      result : 0,
      status: UNCERTAIN
    };
  }
};

export { predictInfo, trainModel };
