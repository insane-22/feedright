import mongoose from "mongoose";
import formModel from "../models/Form.js";
import responseModel from "../models/Response.js";

export const createFormController = async (req, res) => {
  const { title, questions, description, thankYouMessage } = req.body;

  if (!title || !questions || questions.length < 3 || questions.length > 5) {
    return res.status(400).send({
      success: false,
      message: "Form must have 3–5 questions and a title",
    });
  }

  try {
    const newForm = await new formModel({
      adminId: req.admin._id,
      title,
      questions,
      description,
      thankYouMessage,
    }).save();

    res.status(201).send({
      success: true,
      message: "Form creation successful!",
      newForm,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error",
      error,
    });
  }
};

export const getFormsController = async (req, res) => {
  try {
    const forms = await formModel.find({ adminId: req.admin._id });

    res.status(200).send({
      success: true,
      totalCount: forms.length,
      message: "All Forms by this admin",
      forms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting forms",
    });
  }
};

export const getSingleFormController = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.slug)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid form ID" });
    }

    const form = await formModel.findById(req.params.slug);
    if (!form) {
      return res
        .status(404)
        .send({ success: false, message: "Form not found" });
    }

    res.status(200).send({
      success: true,
      message: "Single Form Fetched",
      form,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single form",
      error,
    });
  }
};

export const deleteFormController = async (req, res) => {
  try {
    const { id } = req.params;
    await formModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Deleted form successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in deleting the category",
    });
  }
};

export const getAdminStatsController = async (req, res) => {
  try {
    const adminId = req.admin._id;
    const forms = await formModel.find({ adminId });
    const totalForms = forms.length;

    let totalResponses = 0;
    let mostActiveForm = { title: "N/A", count: 0 };
    let lastCreatedTitle = forms.at(-1)?.title || "N/A";

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    let recentResponsesCount = 0;

    for (const form of forms) {
      const responses = await responseModel
        .find({ formId: form._id })
        .sort({ createdAt: -1 });

      const count = responses.length;
      totalResponses += count;

      if (count > mostActiveForm.count) {
        mostActiveForm = {
          title: form.title,
          count,
        };
      }

      const recent = responses.filter(
        (r) => r.createdAt >= sevenDaysAgo
      ).length;
      recentResponsesCount += recent;
    }

    const stats = {
      totalForms,
      totalResponses,
      mostActiveForm: mostActiveForm.title,
      recentResponsesCount,
    };

    res.status(200).send({
      success: true,
      message: "Stats received",
      stats,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single form",
      error,
    });
  }
};
