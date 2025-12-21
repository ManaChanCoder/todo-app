import mongoose from "mongoose";

const TodosSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
},
{
timestamps: true
}
);
const Todos = mongoose.model("Todo", TodosSchema);

export default Todos;
