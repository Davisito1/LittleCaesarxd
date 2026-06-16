import adminsModel from '../models/admins.js';

const adminsController = {};

adminsController.getAdmins = async (req, res) => {
    try {
        const admins = await adminsModel.find()
        res.status(200).json(admins)
    } catch (error) {
        console.log("error" + error)
        res.status(500).json({ message: "Internal server error" })
    }
}

adminsController.updateAdmin = async (req, res) => {
    try {
        let {
            name,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body;

        name = name?.trim();
        email = email?.trim();

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Fields required" });
        }

        if (name.length < 3 || name.length > 50) {
            return res.status(400).json({message: "Name must be real"});
        }

        const admindUpdated = await adminsModel.findByIdAndUpdate(req.params.id, {
            name,
            lastName,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut
        }, { new: true }
        );

        if (!admindUpdated) {
            return res.status(400).json({ message: "Admin not found" });
        }

        res.status(200).json({ message: "Admin updated" });
    } catch (error) {
        console.log("error" + error);
        res.status(500).json({ message: "Internal server error" });
    }
}

adminsController.deleteAdmin = async (req, res) => {
    try {
        const adminDeleted = await adminsModel.findByIdAndDelete(req.params.id);

        if (!adminDeleted) {
            return res.status(404).json({ message: "Admin not found" });
        }

        return res.status(200).json({ message: "Admin deleted" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default adminsController