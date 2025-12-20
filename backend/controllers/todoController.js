import Todos from "../model/todosSchema.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todos.find().sort(-1);

    res.status(200).json({ data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const createTodo = async (req, res) => {
  const { todo, description } = req.body;
  if (!todo || !description) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newTodo = await Todos.create({ todo, description });

    res.status(201).json({
      success: true,
      message: "Note saved successfully!",
      data: newTodo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateTodo = async (req, res) => {
  const { todo, description } = req.body;

  try {
    const updateItem = await Todos.findByIdAndUpdate(
      req.params.id,
      { todo, description },
      { new: true }
    );
    if (!updateItem)
      return res
        .status(400)
        .json({ success: false, message: "Note not found" });

    res
      .status(200)
      .json({ success: true, message: "Update successfully!", updateItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteID = await Todos.findByIdAndDelete(id);
    if (!deleteID)
      return res
        .status(404)
        .json({ success: false, message: "Note not found to delete." });

    res.status(200).json({ success: true, message: "Delete successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
