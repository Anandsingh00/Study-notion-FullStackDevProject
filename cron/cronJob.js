const cron = require("node-cron");
const User = require("./models/User");
const Profile = require("./models/Profile");

// Run every day at midnight
cron.schedule("0 0 * * *", async () => {
    console.log("Checking for scheduled user deletions...");

    const now = new Date();

    // Find all users whose deletion date has passed
    const usersToDelete = await User.find({
        scheduledDeletion: { $lte: now }
    });

    for (let user of usersToDelete) {
        try {
            // Delete profile
            await Profile.findByIdAndDelete(user.additionalDetails);

            // Delete user
            await User.findByIdAndDelete(user._id);

            console.log(`Deleted user: ${user._id}`);
        } catch (err) {
            console.log("Error deleting user:", err);
        }
    }
});
