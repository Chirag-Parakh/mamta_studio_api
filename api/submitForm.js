
import cors from 'cors';
const nodemailer = require('nodemailer');

const corsMiddleware = cors({
  origin: '*',
  // origin: 'https://mamta-studio.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization'],
});

export default async function submitForm(req, res) {
  corsMiddleware(req, res, async () => {
    if (req.method === 'GET') {
      res.status(200).json({ message: 'Form submitted' });
    } else if (req.method === 'POST') {
      const { name, contact, email, eventDate, eventVenue, others } = req.body;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'cparakh53@gmail.com',
          pass: 'zlsnzyzkdjclfiol'
        }
      });

      const mailOptions = {
        from: 'cparakh53@gmail.com',
        to: 'rajdara.highway@gmail.com',
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
  });
}
