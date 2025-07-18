import formModel from "../models/Form.js";
import responseModel from "../models/Response.js";

export const submitResponseController = async (req, res) => {
  try {
    const form = await formModel.findById(req.params.slug);
    const { answers } = req.body;
    if (!form) {
      return res.status(404).send({
        success: false,
        message: "Form not found",
      });
    }

    if (
      !answers ||
      !Array.isArray(answers) ||
      answers.length !== form.questions.length
    ) {
      return res.status(400).send({
        success: false,
        message: "Answer count must match number of questions",
      });
    }

    const newResponse = await new responseModel({
      formId: req.params.slug,
      answers,
    }).save();

    res.status(201).send({
      success: true,
      message: "Response submitted successfully!",
      newResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Server Error", error });
  }
};
