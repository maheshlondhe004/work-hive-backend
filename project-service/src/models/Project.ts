import mongoose, { Document, Schema } from "mongoose";

interface IProject extends Document {
    name: string;
    description: string;
    userId: string;  // Reference to the User who created the project
}

const ProjectSchema = new Schema<IProject>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

const Project = mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
