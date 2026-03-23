import Branch from '../models/branches.js'

const branchesController = {}

branchesController.getBranches = async (req, res) => {
    const branches = await Branch.find();
    res.json(branches);
}

branchesController.insertBranch = async (req, res) => {
    const { name, address, schedule, isActive } = req.body;
    const newBranch = new Branch({ name, address, schedule, isActive});
    await newBranch.save();
    res.json({ message: "Branch saved" });
};

branchesController.updateBranch = async (req, res) => {
    const { name, address, schedule, isActive } = req.body;
    await Branch.findByIdAndUpdate(req.params.id, { name, address, schedule, isActive}, { new: true });
    res.json({ message: "Branch updated" });
}

branchesController.deleteBranch = async (req, res) => {
    await Branch.findByIdAndDelete(req.params.id);
    res.json({ message: "Branch deleted" });
}

export default branchesController;