const generateStringCode = require("./generateStringCode");

const forgot_pass_subject = () => {
  return "Αιτηση για αλλαγή κωδικού";
};

const forgot_pass_body = (email) => {
  return `<div style="display:flex; justify-content:center; align-items:center">
<table id="m_-3870610325875335032m_8004900579165403754header" align="center" width="448" style="width:448px;background-color:#ffffff;padding:0;margin:15px;line-height:1px;font-size:1px" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0">
<tbody>
<tr align="left;">
<td width="24" style="padding:0;margin:0;line-height:1px;font-size:1px"></td>
<td align="left;" style="padding:0;margin:0;line-height:1px;font-size:1px">
<table cellpadding="0" cellspacing="0" border="0" style="padding:0;margin:0;line-height:1px;font-size:1px">
<tbody>
<tr>
<td align="left;" style="padding:0;margin:0;line-height:1px;font-size:1px;font-family:'HelveticaNeue','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:24px;line-height:32px;font-weight:bold;color:#292f33;text-align:left;text-decoration:none">
Επαναφορά του κωδικού πρόσβασής σας;</td>
</tr>
<tr>
<td height="12" style="padding:0;margin:0;line-height:1px;font-size:1px"></td>
</tr>
<tr>
<td align="left;" style="padding:0;margin:0;line-height:1px;font-size:1px;font-family:'HelveticaNeue','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;line-height:20px;font-weight:400;color:#292f33;text-align:left;text-decoration:none">
Εάν ζητήσατε επαναφορά κωδικού πρόσβασης για ${email},
χρησιμοποιήστε τον παρακάτω κωδικό επιβεβαίωσης για να ολοκληρώσετε τη διαδικασία.
Εάν δεν κάνατε αυτό το αίτημα, αγνοήστε αυτό το μήνυμα ηλεκτρονικού ταχυδρομείου. </td>
</tr>
<tr>
<td height="24" style="padding:0;margin:0;line-height:1px;font-size:1px"></td>
</tr>

<tr>
<td align="left;" style="padding:0;margin:0;line-height:1px;font-size:1px;font-family:'HelveticaNeue','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:16px;font-weight:400;color:#292f33;text-align:left;text-decoration:none">
<strong>${generateStringCode(5, "0123456789")}</strong> </td>
</tr>

<tr>
<td height="36" style="height:36px;padding:0;margin:0;line-height:1px;font-size:1px"></td>
</tr>
<tr>
<td align="left;" style="padding:0;margin:0;line-height:1px;font-size:1px;font-family:'HelveticaNeue','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;line-height:20px;font-weight:400;color:#292f33;text-align:left;text-decoration:none">
 <strong>Λήψη πολλών μηνυμάτων ηλεκτρονικού ταχυδρομείου επαναφοράς κωδικού πρόσβασης;</strong> </td>
</tr>
<tr>
<td height="12" style="padding:0;margin:0;line-height:1px;font-size:1px"></td>
</tr>
<tr>
<td align="left;" style="padding:0;margin:0;line-height:1px;font-size:1px;font-family:'HelveticaNeue','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;line-height:20px;font-weight:400;color:#292f33;text-align:left;text-decoration:none">

Μπορείτε να αλλάξετε τις ρυθμίσεις του λογαριασμού σας για να απαιτήσετε προσωπικές πληροφορίες για να επαναφέρετε τον κωδικό πρόσβασής σας <a href="https://trophy.gr" style="text-decoration:none;border-style:none;border:0;padding:0;margin:0;border:none;text-decoration:none;font-weight:400;color:#1da1f2" rel="noreferrer" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/i/redirect?url%3Dhttps%253A%252F%252Ftwitter.com%252Fsettings%252Faccount%26t%3D1%26cn%3DcGFzc3dvcmRfcmVzZXRfcGluX2Jhc2VkX2VtYWls%26sig%3D78bf9637aa12a5f23e0d35204d05e781a12f4207%26iid%3D23ff812513584ae586e24b28dda0cb4a%26uid%3D436575411%26nid%3D296%2B3&amp;source=gmail&amp;ust=1617098392085000&amp;usg=AFQjCNFlw73-jziILmMT9Wwp-UiYQo_S1Q">account settings</a> to require personal information to reset your password. </td>
</tr>
<tr>
<td height="36" style="padding:0;margin:0;line-height:1px;font-size:1px"></td>
</tr>
</tbody>
</table> </td>
<td width="24" style="padding:0;margin:0;line-height:1px;font-size:1px"></td>
</tr>

<tr>
<td height="1" style="line-height:1px;display:block;height:1px;background-color:#f5f8fa;padding:0;margin:0;line-height:1px;font-size:1px"></td>
<td align="center" style="padding:0;margin:0;line-height:1px;font-size:1px">
<table width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="padding:0;margin:0;line-height:1px;font-size:1px;background-color:#ffffff;border-radius:5px">
<tbody>
<tr>
<td height="1" style="line-height:1px;display:block;height:1px;background-color:#f5f8fa;padding:0;margin:0;line-height:1px;font-size:1px"></td>
</tr>
</tbody>
</table> </td>
<td height="1" style="line-height:1px;display:block;height:1px;background-color:#f5f8fa;padding:0;margin:0;line-height:1px;font-size:1px"></td>
</tr>
<tr>
<td colspan="3" height="24" style="padding:0;margin:0;line-height:1px;font-size:1px"></td>
</tr>
<tr>
<td width="24" style="padding:0;margin:0;line-height:1px;font-size:1px"></td>
<td align="center" style="padding:0;margin:0;line-height:1px;font-size:1px">
<table width="100%" align="center" cellpadding="0" cellspacing="0" border="0" bgcolor="#F5F8FA" style="padding:0;margin:0;line-height:1px;font-size:1px;background-color:#ffffff;border-radius:5px">
<tbody>
<tr>
<td align="left" style="padding:0;margin:0;line-height:1px;font-size:1px">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding:0;margin:0;line-height:1px;font-size:1px">
<tbody>
<tr>
<td style="padding:0;margin:0;line-height:1px;font-size:1px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;line-height:22px;text-align:left;color:#8899a6"> </td>
</tr>
<tr>
<td colspan="3" height="12" style="padding:0;margin:0;line-height:1px;font-size:1px"></td>
</tr>
<tr>
<td style="padding:0;margin:0;line-height:1px;font-size:1px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:19px;font-weight:400;text-align:left;color:#8899a6">  </td>
</tr>
</tbody>
</table> </td>
</tr>
</tbody>
</table> </td>
<td width="24" style="padding:0;margin:0;line-height:1px;font-size:1px"></td>
</tr>
<tr>
<td colspan="3" height="24" style="padding:0;margin:0;line-height:1px;font-size:1px"></td>
</tr>
<tr>
<td height="1" style="line-height:1px;display:block;height:1px;background-color:#f5f8fa;padding:0;margin:0;line-height:1px;font-size:1px"></td>
<td align="center" style="padding:0;margin:0;line-height:1px;font-size:1px">
<table width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="padding:0;margin:0;line-height:1px;font-size:1px;background-color:#ffffff;border-radius:5px">
<tbody>
<tr>
<td height="1" style="line-height:1px;display:block;height:1px;background-color:#f5f8fa;padding:0;margin:0;line-height:1px;font-size:1px"></td>
</tr>
</tbody>
</table> </td>
<td height="1" style="line-height:1px;display:block;height:1px;background-color:#f5f8fa;padding:0;margin:0;line-height:1px;font-size:1px"></td>
</tr>

</tbody>
</table>
</div>`;
};

module.exports.forgot_pass_subject = forgot_pass_subject;
module.exports.forgot_pass_body = forgot_pass_body;
