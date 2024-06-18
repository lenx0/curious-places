import React, { useEffect, useRef, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

const App: React.FC = () => {
  const slidesRef = useRef<HTMLDivElement>(null);
  const eraserRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const intervalTime = 7000;
  const eraserActiveTime = 700;
  let sliderInterval: number;
  const [isPaused, setIsPaused] = useState(false)

  const changeSlide = (direction: 'next' | 'prev' | 'pause') => {
    const eraser = eraserRef.current;
    const slides = slidesRef.current?.querySelectorAll('.slide');
    if (!eraser || !slides) return;

    eraser.classList.add('active');

    setTimeout(() => {
      const active = slidesRef.current?.querySelector('.slide.active') as HTMLElement;
      active?.classList.remove('active');

      let newActive;
      if (direction === 'next') {
        newActive = active?.nextElementSibling || slides[0];
      } else {
        newActive = active?.previousElementSibling || slides[slides.length - 1];
      }
      (newActive as HTMLElement)?.classList.add('active');

      setTimeout(() => {
        eraser.classList.remove('active');
      }, 200);
    }, eraserActiveTime);
  };

  const handlePauseClick = () => {
    if(isPaused) {
      setIsPaused(false)
    } else {
      setIsPaused(true)
    }
  }

  useEffect(() => {
    if(isPaused === true) {
      const nextButton = nextRef.current;
      const prevButton = prevRef.current;
      const handleNextClick = () => {
        changeSlide('next');
      };
  
      const handlePrevClick = () => {
        changeSlide('prev');
      };
      nextButton?.addEventListener('click', handleNextClick);
      prevButton?.addEventListener('click', handlePrevClick);
    } else {
      sliderInterval = window.setInterval(() => changeSlide('next'), intervalTime);

      const nextButton = nextRef.current;
      const prevButton = prevRef.current;
  
      const handleNextClick = () => {
        changeSlide('next');
        clearInterval(sliderInterval);
        sliderInterval = window.setInterval(() => changeSlide('next'), intervalTime);
      };
  
      const handlePrevClick = () => {
        changeSlide('prev');
        clearInterval(sliderInterval);
        sliderInterval = window.setInterval(() => changeSlide('next'), intervalTime);
      };
  
      nextButton?.addEventListener('click', handleNextClick);
      prevButton?.addEventListener('click', handlePrevClick);
  
      return () => {
        nextButton?.removeEventListener('click', handleNextClick);
        prevButton?.removeEventListener('click', handlePrevClick);
        clearInterval(sliderInterval);
      };
    }
    
  }, [isPaused, handlePauseClick]);

  const slides = [
    {
      image: "url('https://images.unsplash.com/photo-1487947366323-374a622aeccf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      title: 'Salar de Uyuni',
      description: 'Salar de Uyuni, nos Andes, sudoeste da Bolívia, é o maior deserto de sal do mundo. Trata-se do legado de um lago pré-histórico que secou, deixando uma paisagem desértica de quase 11.000 km2 com sal branco e claro, formações rochosas e ilhas repletas de cactos. Seu tamanho impressionante pode ser observado da ilha Incahuasi central. Embora a vida selvagem seja rara nesse ecossistema único, ele recebe muitos flamingos rosas.',
    },
    {
      image: "url('https://images.unsplash.com/photo-1559160581-44bd4222d397?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      title: 'Dead Vlei',
      description: 'Deadvlei é considerada como uma “bacia de argila branca”, localizada dentro do Parque Namib-Naukluft, na Namíbia. Também escrito como DeadVlei ou simplesmente Deadvlei, este nome significa algo parecido com “charco morto” (do Inglês dead, e do Africâner vlei, um lago ou pântano entre dunas). O local é conhecido ainda como Dooie Vlei, que é seu nome completo em Africâner, além de presumivelmente o original.',
    },
    {
      image: "url('https://images.unsplash.com/photo-1703003119420-5935ec14235f?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      title: 'Nazca Lines',
      description: 'Linhas de Nasca ou Nazca são um grupo de grandes geoglifos feitos no solo do deserto de Sechura no sul do Peru. Eles foram criados pela cultura nasca entre os anos 500 a.C. e 500 d.C. por pessoas fazendo depressões ou incisões rasas no solo do deserto, removendo seixos e deixando pó de cores diferentes exposto.',
    },
  ];

  return (
    <>
      <div className="slider">
        <div className="slider-container" ref={slidesRef}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === 0 ? 'active' : ''}`}
              style={{ backgroundImage: slide.image }}
            >
              <div className="info">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="eraser" ref={eraserRef}></div>
        <div className="buttons-container">
          <button id="previous" ref={prevRef}><i className="fa fa-arrow-left"></i></button>
          <button id="pause" onClick={handlePauseClick}><i className={`fa ${isPaused ? 'fa-play' : 'fa-pause'}`}></i></button>
          <button id="next" ref={nextRef}><i className="fa fa-arrow-right"></i></button>
        </div>
      </div>

      <h4>Lugares curiosos</h4>

      <footer>
        <p>
          Desenvolvido por
          <a target="_blank" rel="noopener noreferrer" href=" https://myportfolio-phi-ruddy.vercel.app/"> Thiago Beraldo </a>
          - Veja como eu desenvolvi isso:
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/lenx0/curious-places"> Acessar</a>
        </p>
      </footer>
    </>
  );
};

export default App;
