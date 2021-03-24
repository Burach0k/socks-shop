import { env } from "../environments/environments";

export const tg_url: string = `https://api.telegram.org/bot${env.telegram.token}`;

export const chat_id: string = env.telegram.charId;

export const from_email: string = `"Socks Shop" <${env.email.login}>`;

export const email_html: string = `<img src='https://cdn1.vectorstock.com/i/1000x1000/92/90/cute-socks-baisolated-icon-vector-29909290.jpg' width='100px' height='100px'>
                           <h2>Socks shop</h2>`;

export const transport_config = {
  service: 'gmail',
  auth: {
    user: env.email.login,
    pass: env.email.password,
  },
};
