import formModel from "../models/Form.js";

export const createFormController = async (req, res) => {
  const { title, questions } = req.body;

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
    const form = await formModel.findOne({ _id: req.params.slug });
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
