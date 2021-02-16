export const tg_url: string = `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}`;

export const chat_id: string = process.env.TG_CHAT_ID;

export const from_email: string = `"Socks Shop" <${process.env.EMAIL_NAME}>`;

export const email_html = `<img src='https://cdn1.vectorstock.com/i/1000x1000/92/90/cute-socks-baisolated-icon-vector-29909290.jpg' width='100px' height='100px'>
                           <h2>Socks shop</h2>`;

export const transport_config = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASS,
  },
};
