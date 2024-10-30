// backend/controllers/tournamentController.js

exports.submitTournament = (req, res) => {
    const { name, location, date, contactInfo, notes } = req.body;

    // Basic check for fields (expand later)
    if(!name || !location || !date) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // Placeholder for response now
    res.status(201).json({
        message: 'Tournament submitted successfully',
        tournament: { name, location, date, contactInfo, notes }
    });
};