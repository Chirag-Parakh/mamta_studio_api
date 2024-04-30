// submitForm.js

const nodemailer = require('nodemailer');

export default async function submitForm(req, res) {
  if(req.method === 'GET'){
     res.status(200).send('Form submitted successfully');
  }
  if (req.method === 'POST') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    const { name, contact, email, eventDate, eventVenue, others } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cparakh09@gmail.com',
        pass: 'parakh#@09'
      }
    });

    const mailOptions = {
      from: 'cparakh09@gmail.com',
      to: 'cparakh09@gmail.com',
      subject: 'New client enquire',
      text: `Name: ${name}\nContact: ${contact}\nEmail: ${email}\nEvent Date: ${eventDate}\nEvent Venue: ${eventVenue}\nOthers: ${others}`
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send('Form submitted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
