function verificationEmail(req, user) {
  const subject = "Επιβεβαίωση Email";
  const message = `Προς ${user.fullname}  <br>
    <p>Για να επαληθευσέτε το email σας παρακαλώ πατήστε στον παρακάτω σύνδεσμο:
    <p><a href="${req.protocol}://${req.get(
    "host"
  )}/signup/email-verification/${user._id}/${
    user.hash
  }">Πατήστε εδώ</a></p><p>Με εκτίμηση,<br>Η ομάδα του Spot A Stray</p>`;
  return { subject: subject, message: message };
}

module.exports.verificationEmail = verificationEmail;
