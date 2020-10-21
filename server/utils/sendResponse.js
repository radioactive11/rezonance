const sendResponse = (response, message, res) => {
	res.status(200).json({
		success: true,
		response,
		message
	});
};

module.exports = sendResponse;
