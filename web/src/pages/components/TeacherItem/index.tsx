import React from 'react';

import whatsappIcon from '../../../assets/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://scontent.fsdu11-1.fna.fbcdn.net/v/t1.0-9/23376179_131889840910894_4303001279973488892_n.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_ohc=AWRHPoG42lEAX8Uc6nN&_nc_ht=scontent.fsdu11-1.fna&oh=e3feb7acd88909c71bfba8b564ab98af&oe=5F54A910"
          alt="Paulo Henrique"
        />
        <div>
          <strong>Paulo Henrique</strong>
          <span>Música</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de química avançada.
        <br />
        <br />
        Apaixonado por explodir coisas em laboratório e por mudar a vida das
        pessoas através de experiências. Mais de 200.000 pessoas já passaram por
        uma das minhas explosões.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp Icon" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
