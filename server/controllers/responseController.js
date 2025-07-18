import mongoose from "mongoose";
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

export const getFormResponseController = async (req, res) => {
  const formId = req.params.formId;
  try {
    if (!mongoose.Types.ObjectId.isValid(formId)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid form ID" });
    }

    const form = await formModel.findById(formId);
    if (!form) {
      return res.status(404).send({
        success: false,
        message: "Form not found",
      });
    }

    const responses = await responseModel
      .find({ formId })
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Responses fetched successfully",
      form: {
        title: form.title,
        description: form.description,
        questions: form.questions,
      },
      responses,
    });
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({
      success: false,
      message: "Server Error while fetching responses",
      error,
    });
  }
};
